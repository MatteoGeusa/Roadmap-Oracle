import { useEffect, useRef, useState } from 'react'
import Markdown from '../Markdown.jsx'
import { uploadImage } from '../admin/api.js'

// Images that can be uploaded (same list as admin-api.js), by extension and by type for
// pasted images, which may come without a file name
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
const IMAGE_TYPES = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/webp': '.webp', 'image/svg+xml': '.svg' }
const MAX_IMAGE_MB = 10

const slug = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// File name for an image saved next to the page: links with spaces or accents would need
// escaping, so the name is reduced to a slug. Pasted screenshots all arrive as "image.png":
// they take the page's name instead.
function imageName(file, pagePath) {
  const dot = file.name.lastIndexOf('.')
  const ext = (dot > 0 ? file.name.slice(dot) : IMAGE_TYPES[file.type] ?? '').toLowerCase()
  let base = slug(dot > 0 ? file.name.slice(0, dot) : file.name)
  if (!base || base === 'image') base = slug(pagePath.split('/').pop().replace(/\.md$/, '')) || 'immagine'
  return base + ext
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const imageFiles = (list) => [...(list ?? [])].filter((f) => f.type.startsWith('image/'))

// [label, title, before, after, placeholder]: wraps the selection, or inserts the placeholder
const FORMATS = [
  ['B', 'Grassetto', '**', '**', 'testo'],
  ['I', 'Corsivo', '_', '_', 'testo'],
  ['H2', 'Titolo', '\n## ', '\n', 'Titolo'],
  ['•', 'Elenco', '\n- ', '', 'voce'],
  ['1.', 'Elenco numerato', '\n1. ', '', 'voce'],
  ['🔗', 'Link', '[', '](url)', 'testo'],
  ['`', 'Codice', '`', '`', 'codice'],
  ['SQL', 'Blocco SQL', '\n```sql\n', '\n```\n', 'SELECT * FROM dual;'],
  ['▦', 'Tabella', '\n| Colonna | Valore |\n| ------- | ------ |\n| ', ' | |\n', 'A'],
]

// Markdown source editor with a rendered preview of the same text
export default function MarkdownEditor({ path, value, onChange }) {
  const [tab, setTab] = useState('write')
  // Full screen: the editor covers the whole window; Esc or the button goes back
  const [full, setFull] = useState(false)
  const area = useRef(null)
  const picker = useRef(null)
  // Uploads finish after the user may have typed more: insert into the latest text
  const latest = useRef(value)
  latest.current = value
  const [status, setStatus] = useState(null)

  // A completed upload is reported for a few seconds; errors stay until closed
  useEffect(() => {
    if (!status || status.busy || status.error) return
    const timer = setTimeout(() => setStatus(null), 5000)
    return () => clearTimeout(timer)
  }, [status])

  useEffect(() => {
    if (!full) return
    const onKey = (e) => e.key === 'Escape' && setFull(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [full])

  const apply = ([, , before, after, placeholder]) => {
    const el = area.current
    const { selectionStart: s, selectionEnd: e } = el
    const picked = value.slice(s, e) || placeholder
    onChange(value.slice(0, s) + before + picked + after + value.slice(e))
    // Reselect the wrapped text once React has re-rendered the textarea
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(s + before.length, s + before.length + picked.length)
    })
  }

  // Save the images in the page's folder right away, then link them where the cursor is
  const addImages = async (files) => {
    if (!files.length) return
    const folder = path.split('/').slice(0, -1).join('/')
    const links = []
    const saved = []
    try {
      for (const file of files) {
        const name = imageName(file, path)
        if (!IMAGE_EXT.some((ext) => name.endsWith(ext))) throw new Error(`${file.name}: formato non supportato (${IMAGE_EXT.join(' ')})`)
        if (file.size > MAX_IMAGE_MB * 1024 * 1024) throw new Error(`${file.name}: troppo grande (massimo ${MAX_IMAGE_MB} MB)`)
        setStatus({ text: `Caricamento di ${file.name}…`, busy: true })
        const { file: savedPath } = await uploadImage(folder ? `${folder}/${name}` : name, await toBase64(file))
        const savedName = savedPath.split('/').pop()
        links.push(`![${savedName.replace(/\.[^.]+$/, '').replace(/-/g, ' ')}](${savedName})`)
        saved.push(`home/${savedPath}`)
      }
      setStatus({ text: `Salvata: ${saved.join(', ')}` })
    } catch (err) {
      setStatus({ text: `Immagine non caricata: ${err.message}`, error: true })
    }
    if (!links.length) return
    const text = latest.current
    const el = area.current
    const at = el ? el.selectionStart : text.length
    const before = text.slice(0, at)
    const lead = !before || before.endsWith('\n\n') ? '' : before.endsWith('\n') ? '\n' : '\n\n'
    const insert = lead + links.join('\n\n') + '\n'
    onChange(before + insert + text.slice(at))
    if (el)
      requestAnimationFrame(() => {
        el.focus()
        el.setSelectionRange(at + insert.length, at + insert.length)
      })
  }

  // Pasting or dropping image files on the text uploads them; anything else behaves as usual
  const onPaste = (e) => {
    const files = imageFiles(e.clipboardData?.files)
    if (!files.length) return
    e.preventDefault()
    addImages(files)
  }
  const onDragOver = (e) => {
    if (e.dataTransfer?.types.includes('Files')) e.preventDefault()
  }
  const onDrop = (e) => {
    const files = imageFiles(e.dataTransfer?.files)
    if (!files.length) return
    e.preventDefault()
    addImages(files)
  }

  return (
    <div className={full ? 'md-editor md-full' : 'md-editor'}>
      <div className="md-editor-bar">
        {full && <span className="md-full-path">{path}</span>}
        <div className="md-tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'write'} className={tab === 'write' ? 'active' : ''} onClick={() => setTab('write')}>
            Scrivi
          </button>
          <button role="tab" aria-selected={tab === 'preview'} className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>
            Anteprima
          </button>
        </div>
        {tab === 'write' && (
          <div className="md-formats">
            {FORMATS.map((f) => (
              <button key={f[1]} title={f[1]} onClick={() => apply(f)}>
                {f[0]}
              </button>
            ))}
            <button title="Immagine (anche incollandola o trascinandola nel testo)" onClick={() => picker.current.click()}>
              🖼
            </button>
            <input
              ref={picker}
              type="file"
              accept={IMAGE_EXT.join(',')}
              multiple
              hidden
              onChange={(e) => {
                addImages([...e.target.files])
                e.target.value = ''
              }}
            />
          </div>
        )}
        <button
          className="md-full-toggle"
          onClick={() => setFull(!full)}
          title={full ? 'Esci dallo schermo intero (Esc)' : 'Apri a schermo intero'}
        >
          {full ? '✕ Riduci' : '⛶ Schermo intero'}
        </button>
      </div>
      {status && (
        <div className={status.error ? 'md-status md-status-error' : 'md-status'} role="status">
          <span>{status.text}</span>
          {!status.busy && (
            <button onClick={() => setStatus(null)} aria-label="Chiudi">
              ×
            </button>
          )}
        </div>
      )}
      {tab === 'write' ? (
        <textarea
          ref={area}
          className="md-source"
          value={value}
          spellCheck
          placeholder="Scrivi il contenuto in markdown…"
          onChange={(e) => onChange(e.target.value)}
          onPaste={onPaste}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ) : (
        <div className="md-preview">
          {value.trim() ? <Markdown path={path} source={value} /> : <p className="rm-muted">Niente da mostrare.</p>}
        </div>
      )}
    </div>
  )
}
