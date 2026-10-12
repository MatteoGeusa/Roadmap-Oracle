import { useEffect, useMemo, useState } from 'react'
import { useResizable } from './useResizable.js'

const KEY = 'sidebar-open'

function loadOpen() {
  try {
    const v = localStorage.getItem(KEY)
    if (v !== null) return v === '1'
  } catch {
    // Storage blocked: fall back to the screen-size default
  }
  return window.innerWidth > 800
}

// A plain click opens the node through onOpen (on the roadmap); ctrl/cmd/middle
// click keeps the browser's own behaviour on the link
const isPlainClick = (e) => e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey

// Case and accents don't matter when searching ("proprieta" finds "Proprietà")
const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Ids of the entries on the way to `id`, outermost first ([] if it isn't in the index)
function pathTo(entries, id) {
  for (const { node, children } of entries) {
    if (node.id === id) return []
    const sub = pathTo(children, id)
    if (sub) return [node.id, ...sub]
  }
  return null
}

const branchIds =(entries) => entries.flatMap((e) => (e.children.length ? [e.node.id, ...branchIds(e.children)] : []))

// Only the entries whose label matches, with the branches that lead to them
const filterEntries = (entries, q) =>
  entries.flatMap((e) => {
    const children = filterEntries(e.children, q)
    return children.length || normalize(e.node.label ?? '').includes(q) ? [{ ...e, children }] : []
  })

function Highlight({ text, q }) {
  const at = q ? normalize(text).indexOf(q) : -1
  // Normalizing can change the length (rare decomposed characters): then just don't highlight
  if (at < 0 || normalize(text).length !== text.length) return text
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  )
}

function Entries({ entries, nav }) {
  return (
    <ul className="tree">
      {entries.map((entry) => (
        <Entry key={entry.node.id} entry={entry} nav={nav} />
      ))}
    </ul>
  )
}

function Entry({ entry, nav }) {
  const { node, children } = entry
  const hasChildren = children.length > 0
  const open = hasChildren && nav.isOpen(node.id)
  const section = node.kind === 'title'
  const label = node.label || 'Senza nome'
  const toggle = () => nav.toggle(node.id)

  const text = (
    <>
      {node.priority === 'important' && <span className="tree-star">★</span>}
      <span className="tree-label">
        <Highlight text={label} q={nav.q} />
      </span>
      {section && hasChildren && <span className="tree-count">{children.length}</span>}
    </>
  )
  const cls = ['tree-row', `tree-${node.kind ?? 'topic'}`, node.id === nav.active ? 'active' : ''].join(' ')

  // A section heading without a document has nothing to open: the whole row expands it
  const row =
    section && !node.page && hasChildren ? (
      <button className={cls} onClick={toggle} aria-expanded={open} title={label}>
        {text}
      </button>
    ) : (
      <a
        href={nav.nodeHref(node)}
        className={cls}
        title={label}
        onClick={(e) => {
          if (nav.onOpen && isPlainClick(e)) {
            e.preventDefault()
            nav.onOpen(node)
          }
        }}
      >
        {text}
      </a>
    )

  return (
    <li className={section ? 'tree-section' : undefined}>
      <div className="tree-item">
        {hasChildren ? (
          <button className="tree-caret" onClick={toggle} aria-expanded={open} aria-label={open ? 'Comprimi' : 'Espandi'}>
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="tree-caret" />
        )}
        {row}
      </div>
      {open && <Entries entries={children} nav={nav} />}
    </li>
  )
}

// `index`: the roadmap's table of contents (see buildIndex), or null when there is no roadmap.
// `active`: id of the node to highlight. `nodeHref(node)`: where a node's link points.
// `onOpen(node)`: opens a node in place; when missing, links simply navigate.
export default function Sidebar({ index, active, nodeHref, onOpen }) {
  const [open, setOpen] = useState(loadOpen)
  const resize = useResizable('sidebar-width', 300, 220)
  const [query, setQuery] = useState('')
  // Expanded branches; the index starts with only the sections, plus the way to the open node
  const [expanded, setExpanded] = useState(() => new Set(pathTo(index ?? [], active) ?? []))

  // Opening a node from the map expands the branches that lead to it
  useEffect(() => {
    const path = pathTo(index ?? [], active)
    if (path?.length) setExpanded((prev) => (path.every((id) => prev.has(id)) ? prev : new Set([...prev, ...path])))
  }, [index, active])

  const q = normalize(query.trim())
  const entries = useMemo(() => (q ? filterEntries(index ?? [], q) : index ?? []), [index, q])
  const nav = {
    active,
    nodeHref,
    onOpen,
    q,
    // While searching every branch with a match is open
    isOpen: (id) => q !== '' || expanded.has(id),
    toggle: (id) =>
      setExpanded((prev) => {
        const next = new Set(prev)
        if (!next.delete(id)) next.add(id)
        return next
      }),
  }

  const toggleSidebar = () => {
    setOpen(!open)
    try {
      localStorage.setItem(KEY, open ? '0' : '1')
    } catch {
      // Not remembered across visits, still works for this one
    }
  }

  return (
    <aside className={open ? 'sidebar open' : 'sidebar closed'} style={open ? { width: resize.width } : undefined}>
      {open && <div className="resize-handle" {...resize.handleProps} title="Trascina per ridimensionare, doppio clic per ripristinare" />}
      <div className="sidebar-head">
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-expanded={open} title={open ? 'Chiudi indice' : 'Apri indice'}>
          {open ? '›' : '‹'}
        </button>
        {open && <span>Indice</span>}
        {open && index?.length > 0 && (
          <span className="sidebar-actions">
            <button onClick={() => setExpanded(new Set(branchIds(index)))} title="Espandi tutto">
              ⊞
            </button>
            <button onClick={() => setExpanded(new Set())} title="Comprimi tutto">
              ⊟
            </button>
          </span>
        )}
      </div>
      {open && index?.length > 0 && (
        <div className="sidebar-search">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca un argomento…"
            aria-label="Cerca nell'indice"
          />
        </div>
      )}
      {open && (
        <nav className="sidebar-body">
          {!index?.length ? (
            <p className="sidebar-empty">{index ? 'La roadmap è vuota.' : 'Nessuna roadmap.'}</p>
          ) : entries.length ? (
            <Entries entries={entries} nav={nav} />
          ) : (
            <p className="sidebar-empty">Nessun argomento trovato.</p>
          )}
        </nav>
      )}
    </aside>
  )
}
