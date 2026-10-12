import { useEffect, useState } from 'react'
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

const contains = (entry, id) => entry.node.id === id || entry.children.some((c) => contains(c, id))

function Entries({ entries, depth, nav }) {
  return (
    <ul className="tree" style={{ '--depth': depth }}>
      {entries.map((entry) => (
        <Entry key={entry.node.id} entry={entry} depth={depth} nav={nav} />
      ))}
    </ul>
  )
}

function Entry({ entry, depth, nav }) {
  const { node, children } = entry
  // Branches on the way to the open node expand, also when it is opened from the map
  const leadsToActive = children.some((c) => contains(c, nav.active))
  const [open, setOpen] = useState(leadsToActive)
  useEffect(() => {
    if (leadsToActive) setOpen(true)
  }, [leadsToActive])
  const label = node.label || 'Senza nome'

  const link = (
    <a
      href={nav.nodeHref(node)}
      className={['tree-row', `tree-${node.kind ?? 'topic'}`, node.id === nav.active ? 'active' : ''].join(' ')}
      title={label}
      onClick={(e) => {
        if (nav.onOpen && isPlainClick(e)) {
          e.preventDefault()
          nav.onOpen(node)
        }
      }}
    >
      {node.priority === 'important' && <span className="tree-star">★</span>}
      <span className="tree-label">{label}</span>
    </a>
  )

  // Titles are section headings: their content is always shown
  if (node.kind === 'title') {
    return (
      <li className="tree-section">
        {link}
        {children.length > 0 && <Entries entries={children} depth={depth} nav={nav} />}
      </li>
    )
  }

  return (
    <li>
      <div className="tree-item">
        {children.length > 0 ? (
          <button className="tree-caret" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Comprimi' : 'Espandi'}>
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="tree-caret" />
        )}
        {link}
      </div>
      {open && children.length > 0 && <Entries entries={children} depth={depth + 1} nav={nav} />}
    </li>
  )
}

// `index`: the roadmap's table of contents (see buildIndex), or null when there is no roadmap.
// `active`: id of the node to highlight. `nodeHref(node)`: where a node's link points.
// `onOpen(node)`: opens a node in place; when missing, links simply navigate.
export default function Sidebar({ index, active, nodeHref, onOpen }) {
  const nav = { active, nodeHref, onOpen }
  const [open, setOpen] = useState(loadOpen)
  const resize = useResizable('sidebar-width', 280, 200)

  const toggle = () => {
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
        <button className="sidebar-toggle" onClick={toggle} aria-expanded={open} title={open ? 'Chiudi indice' : 'Apri indice'}>
          {open ? '›' : '‹'}
        </button>
        {open && <span>Indice</span>}
      </div>
      {open && (
        <nav className="sidebar-body">
          {index?.length ? (
            <Entries entries={index} depth={0} nav={nav} />
          ) : (
            <p className="sidebar-empty">{index ? 'La roadmap è vuota.' : 'Nessuna roadmap.'}</p>
          )}
        </nav>
      )}
    </aside>
  )
}
