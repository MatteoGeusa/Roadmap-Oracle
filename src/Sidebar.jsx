import { useState } from 'react'
import { href, pages } from './content.js'
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

// Nested { folders: { name: tree }, files: [path] } from the markdown pages in home/.
// Roadmaps are left out: they are shown in the main area, not listed as content.
function buildTree() {
  const root = { folders: {}, files: [] }
  for (const file of Object.keys(pages)) {
    const parts = file.split('/')
    let node = root
    for (const dir of parts.slice(0, -1)) node = node.folders[dir] ??= { folders: {}, files: [] }
    node.files.push(file)
  }
  return root
}

const tree = buildTree()

// A plain click opens the file through onOpen (beside the roadmap); ctrl/cmd/middle
// click keeps the browser's own behaviour on the link
const isPlainClick = (e) => e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey

function Folder({ node, prefix, depth, nav }) {
  return (
    <ul className="tree" style={{ '--depth': depth }}>
      {Object.keys(node.folders)
        .sort()
        .map((name) => (
          <FolderItem key={name} name={name} node={node.folders[name]} path={prefix + name} depth={depth} nav={nav} />
        ))}
      {[...node.files].sort().map((file) => (
        <li key={file}>
          <a
            href={nav.fileHref(file)}
            className={file === nav.active ? 'tree-row active' : 'tree-row'}
            onClick={(e) => {
              if (nav.onOpen && isPlainClick(e)) {
                e.preventDefault()
                nav.onOpen(file)
              }
            }}
          >
            <span className="tree-icon">📄</span>
            {file.split('/').pop()}
          </a>
        </li>
      ))}
    </ul>
  )
}

// Folders only expand and collapse, they are not pages of their own
function FolderItem({ name, node, path, depth, nav }) {
  // Folders on the way to the open file start expanded
  const [open, setOpen] = useState(Boolean(nav.active?.startsWith(path + '/')))
  return (
    <li>
      <button className="tree-row tree-folder" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="tree-caret">{open ? '▾' : '▸'}</span>
        <span className="tree-icon">📁</span>
        {name}
      </button>
      {open && <Folder node={node} prefix={path + '/'} depth={depth + 1} nav={nav} />}
    </li>
  )
}

// `active`: the file to highlight. `fileHref(file)`: where a file's link points.
// `onOpen(file)`: opens a file in place; when missing, links simply navigate.
export default function Sidebar({ active, fileHref, onOpen }) {
  const nav = { active, fileHref, onOpen }
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
        <button className="sidebar-toggle" onClick={toggle} aria-expanded={open} title={open ? 'Chiudi contenuti' : 'Apri contenuti'}>
          {open ? '›' : '‹'}
        </button>
        {open && <span>Contenuti</span>}
      </div>
      {open && (
        <nav className="sidebar-body">
          <a href={href('')} className="tree-row">
            <span className="tree-icon">🏠</span>home
          </a>
          <Folder node={tree} prefix="" depth={1} nav={nav} />
        </nav>
      )}
    </aside>
  )
}
