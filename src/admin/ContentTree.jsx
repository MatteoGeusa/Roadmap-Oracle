import { useEffect, useMemo, useState } from 'react'
import { useResizable } from '../useResizable.js'
import { makeDir, rename, savePage, trash } from './api.js'

const parentOf = (p) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '')
const baseName = (p) => p.split('/').pop()
const join = (dir, name) => (dir ? `${dir}/${name}` : name)
const ancestors = (p) => p.split('/').slice(0, -1).map((_, i, a) => a.slice(0, i + 1).join('/'))

// Nested tree { dirs: { name: node }, files: [path] } from the flat lists the API returns.
// Only folders and markdown pages: roadmaps are edited in the main area, not listed here.
function nest({ dirs, files }) {
  const root = { dirs: {}, files: [] }
  const at = (p) => p.split('/').reduce((node, seg) => (node.dirs[seg] ??= { dirs: {}, files: [] }), root)
  for (const d of dirs) at(d)
  for (const f of files) if (f.endsWith('.md')) (parentOf(f) ? at(parentOf(f)) : root).files.push(f)
  return root
}

// Tree of home/ with create, rename/move and delete. `onSelect(path)` opens an item;
// `onChanged({ type, path, from, to, relinked })` reports what changed on disk, after
// the tree has been reloaded with `refresh`.
export default function ContentTree({ tree, error, selected, onSelect, onChanged, refresh }) {
  const [expanded, setExpanded] = useState(() => new Set(ancestors(selected)))
  // Inline form: { type: 'dir' | 'page' | 'rename', base, from, value }
  const [form, setForm] = useState(null)
  const [message, setMessage] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const side = useResizable('admin-tree-width', 280, 200, 'left')
  const nested = useMemo(() => tree && nest(tree), [tree])

  const isDir = (p) => p === '' || tree?.dirs.includes(p)
  const baseDir = isDir(selected) ? selected : parentOf(selected)

  // Keep the folders leading to the selection open
  useEffect(() => {
    setExpanded((prev) => new Set([...prev, ...ancestors(selected)]))
  }, [selected])

  const toggle = (dir) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(dir) ? next.delete(dir) : next.add(dir)
      return next
    })

  const startCreate = (type) => {
    setForm({ type, base: baseDir, value: '' })
    if (baseDir) setExpanded((prev) => new Set([...prev, baseDir, ...ancestors(baseDir)]))
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const value = form.value.trim().replace(/^\/+|\/+$/g, '')
    if (!value) return
    try {
      let change
      if (form.type === 'dir') {
        const path = join(form.base, value)
        await makeDir(path)
        change = { type: 'created', path }
      } else if (form.type === 'page') {
        const path = join(form.base, value.endsWith('.md') ? value : `${value}.md`)
        await savePage(path, `# ${baseName(path).replace(/\.md$/, '')}\n\n`, true)
        change = { type: 'created', path }
      } else {
        const ext = form.from.endsWith('.md') ? '.md' : ''
        const to = ext && !value.endsWith(ext) ? value + ext : value
        if (to === form.from) return setForm(null)
        const { relinked } = await rename(form.from, to)
        change = { type: 'renamed', from: form.from, to, relinked }
      }
      await refresh()
      setForm(null)
      setMessage(
        change.type === 'created'
          ? `Creato home/${change.path}`
          : change.relinked.length
            ? `Spostato. Collegamenti aggiornati in: ${change.relinked.join(', ')}`
            : 'Spostato.',
      )
      onChanged(change)
    } catch (err) {
      setMessage(`Errore: ${err.message}`)
    }
  }

  const remove = async (p) => {
    const what = isDir(p) ? `la cartella "${p}" e tutto il suo contenuto` : `"${p}"`
    const note = 'Si può recuperare da lì; i nodi della roadmap collegati verranno scollegati.'
    if (!confirm(`Spostare ${what} nel cestino (.trash/)? ${note}`)) return
    try {
      const { trashed, unlinked } = await trash(p)
      await refresh()
      setMessage(
        `Spostato nel cestino: ${trashed}` + (unlinked.length ? `. Nodi scollegati in: ${unlinked.join(', ')}` : ''),
      )
      onChanged({ type: 'deleted', path: p })
    } catch (err) {
      setMessage(`Errore: ${err.message}`)
    }
  }

  const actions = { select: onSelect, toggle, remove, rename: (p) => setForm({ type: 'rename', from: p, value: p }) }

  if (collapsed) {
    return (
      <aside className="cm-tree cm-collapsed">
        <button className="sidebar-toggle" onClick={() => setCollapsed(false)} title="Mostra contenuti">
          ›
        </button>
      </aside>
    )
  }

  return (
    <aside className="cm-tree" style={{ width: side.width }}>
      <div className="cm-tree-head">
        <div className="cm-tree-title">
          <strong>Contenuti</strong>
          <button className="sidebar-toggle" onClick={() => setCollapsed(true)} title="Nascondi contenuti">
            ‹
          </button>
        </div>
        <div className="cm-new">
          <button onClick={() => startCreate('dir')} title={`Nuova cartella in home/${baseDir}`}>+ Cartella</button>
          <button onClick={() => startCreate('page')} title={`Nuovo documento in home/${baseDir}`}>+ Documento</button>
        </div>
      </div>

      {form && (
        <form className="cm-form" onSubmit={submitForm}>
          <label>
            {form.type === 'rename'
              ? 'Rinomina o sposta (percorso in home/)'
              : `${{ dir: 'Nuova cartella', page: 'Nuovo documento' }[form.type]} in home/${form.base}`}
            <input
              autoFocus
              value={form.value}
              placeholder={{ dir: 'nome-cartella', page: 'nome-documento', rename: '' }[form.type]}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              onKeyDown={(e) => e.key === 'Escape' && setForm(null)}
            />
          </label>
          <div className="cm-form-buttons">
            <button type="submit" className="rm-primary">
              {form.type === 'rename' ? 'Rinomina' : 'Crea'}
            </button>
            <button type="button" onClick={() => setForm(null)}>
              Annulla
            </button>
          </div>
        </form>
      )}

      <nav className="cm-tree-body">
        {error && <p className="ed-error">{error}</p>}
        {nested && (
          <>
            <div className={`cm-row${selected === '' ? ' active' : ''}`} style={{ '--depth': 0 }}>
              <button className="cm-name" onClick={() => onSelect('')}>
                <span className="tree-icon">🏠</span>home
              </button>
            </div>
            <TreeLevel node={nested} depth={1} selected={selected} expanded={expanded} actions={actions} />
          </>
        )}
      </nav>
      {message && (
        <p className="cm-message" onClick={() => setMessage('')} title="Clic per chiudere">
          {message}
        </p>
      )}
      <div className="resize-handle cm-resize" {...side.handleProps} title="Trascina per ridimensionare" />
    </aside>
  )
}

function TreeLevel({ node, prefix = '', depth, selected, expanded, actions }) {
  return (
    <>
      {Object.keys(node.dirs)
        .sort()
        .map((name) => {
          const p = join(prefix, name)
          const open = expanded.has(p)
          return (
            <div key={p}>
              <Row path={p} depth={depth} selected={selected} actions={actions} onClick={() => (actions.toggle(p), actions.select(p))}>
                <span className="cm-caret">{open ? '▾' : '▸'}</span>
                <span className="tree-icon">📁</span>
                {name}
              </Row>
              {open && (
                <TreeLevel node={node.dirs[name]} prefix={p} depth={depth + 1} selected={selected} expanded={expanded} actions={actions} />
              )}
            </div>
          )
        })}
      {[...node.files]
        .sort()
        .map((f) => (
          <Row key={f} path={f} depth={depth} selected={selected} actions={actions}>
            <span className="cm-caret" />
            <span className="tree-icon">📄</span>
            {baseName(f)}
          </Row>
        ))}
    </>
  )
}

function Row({ path, depth, selected, actions, onClick, children }) {
  return (
    <div className={`cm-row${selected === path ? ' active' : ''}`} style={{ '--depth': depth }}>
      <button className="cm-name" onClick={onClick ?? (() => actions.select(path))} title={path}>
        {children}
      </button>
      <span className="cm-row-actions">
        <button onClick={() => actions.rename(path)} title="Rinomina o sposta">
          ✎
        </button>
        <button onClick={() => actions.remove(path)} title="Sposta nel cestino">
          🗑
        </button>
      </span>
    </div>
  )
}
