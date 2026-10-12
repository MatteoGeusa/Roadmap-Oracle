import { useEffect, useRef, useState } from 'react'
import Markdown from '../Markdown.jsx'

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
      {tab === 'write' ? (
        <textarea
          ref={area}
          className="md-source"
          value={value}
          spellCheck
          placeholder="Scrivi il contenuto in markdown…"
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="md-preview">
          {value.trim() ? <Markdown path={path} source={value} /> : <p className="rm-muted">Niente da mostrare.</p>}
        </div>
      )}
    </div>
  )
}
