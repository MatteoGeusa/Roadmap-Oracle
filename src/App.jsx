import { Suspense, useCallback, useMemo, useState } from 'react'
import { BASE, ROADMAP_EXT, currentPath, href, isFolder, listFolder, pages, roadmapByRoute, roadmapRoute, roadmaps } from './content.js'
import Markdown from './Markdown.jsx'
import Sidebar from './Sidebar.jsx'
import RoadmapView from './roadmap/RoadmapView.jsx'
import { buildIndex } from './roadmap/model.js'
import { AdminWorkspace } from './admin.js'

// The home page shows the first roadmap directly inside home/, if there is one
const homeRoadmap = Object.keys(roadmaps)
  .filter((f) => !f.includes('/'))
  .sort()[0]

function FolderView({ path }) {
  const { folders, files, roadmaps: maps } = listFolder(path)
  const join = (name) => (path ? `${path}/${name}` : name)
  if (!folders.length && !files.length && !maps.length) return <p>Nessun file.</p>
  return (
    <ul className="listing">
      {maps.map((f) => (
        <li key={f}>🗺️ <a href={href(roadmapRoute(f))}>{roadmaps[f].title || roadmapRoute(f).split('/').pop()}</a></li>
      ))}
      {folders.map((f) => (
        <li key={f}>📁 <a href={href(join(f))}>{f}</a></li>
      ))}
      {files.map((f) => (
        <li key={f}>📄 <a href={href(join(f))}>{f}</a></li>
      ))}
    </ul>
  )
}

const isAdmin = (path) => import.meta.env.DEV && (path === 'admin' || path.startsWith('admin/'))

// The roadmap shown at a path: the home roadmap on /, or the one at its own route
const roadmapAt = (path) => (isAdmin(path) ? undefined : path === '' ? homeRoadmap : roadmapByRoute[path])

// The editor and plain pages; roadmaps are rendered by App itself
function Content({ path }) {
  if (isAdmin(path)) {
    // /admin is the whole workspace; the older /admin/<file>.roadmap.json opens that roadmap in it
    const file = path.slice('admin/'.length)
    return (
      <Suspense fallback={null}>
        <AdminWorkspace initialRoadmap={file.endsWith(ROADMAP_EXT) ? file : undefined} />
      </Suspense>
    )
  }

  let body
  if (pages[path] !== undefined) body = <Markdown path={path} />
  else if (isFolder(path)) body = <FolderView path={path} />
  else body = <p>Pagina non trovata.</p>
  return <div className="page">{body}</div>
}

const searchParam = (name) => new URLSearchParams(window.location.search).get(name)

export default function App() {
  const path = currentPath()
  const roadmapFile = roadmapAt(path)
  // The index shows this roadmap; off a roadmap page it shows the home one
  const indexFile = roadmapFile ?? (isAdmin(path) ? undefined : homeRoadmap)
  const indexRoute = roadmapFile ? path : ''
  const index = useMemo(() => (indexFile ? buildIndex(roadmaps[indexFile]) : null), [indexFile])

  // ?node= or ?doc= reopens a node or a document beside the roadmap
  const [focus, setFocus] = useState(() => {
    if (!roadmapFile) return null
    const id = searchParam('node')
    const page = searchParam('doc')
    return id ? { id, seq: 0 } : page ? { page, seq: 0 } : null
  })
  const [openId, setOpenId] = useState(null)

  // Keep the address bar in step with the panel, so a reload or a shared link reopens it:
  // ?doc= for a node with a document (or a document alone), ?node= for one without
  const onOpenChange = useCallback((id, page) => {
    setOpenId(id)
    const url = new URL(window.location.href)
    url.searchParams.delete('doc')
    url.searchParams.delete('node')
    if (page) url.searchParams.set('doc', page)
    else if (id) url.searchParams.set('node', id)
    window.history.replaceState(null, '', url)
  }, [])

  const nodeHref = (node) =>
    `${indexRoute ? href(indexRoute) : BASE}?${node.page ? `doc=${encodeURIComponent(node.page)}` : `node=${encodeURIComponent(node.id)}`}`

  // On a document's own page, highlight the node of the home roadmap that links to it
  const active = roadmapFile
    ? openId
    : indexFile && pages[path] !== undefined
      ? (roadmaps[indexFile].nodes ?? []).find((n) => n.page === path)?.id ?? null
      : null

  return (
    <div className="app">
      <div className="app-body">
        {/* The admin pages show the index of the roadmap being edited themselves */}
        {!isAdmin(path) && (
          <Sidebar
            index={index}
            active={active}
            nodeHref={nodeHref}
            onOpen={roadmapFile ? (node) => setFocus({ id: node.id, seq: Date.now() }) : null}
          />
        )}
        <main className="app-main">
          {roadmapFile ? (
            <RoadmapView
              key={roadmapFile}
              file={roadmapFile}
              doc={roadmaps[roadmapFile]}
              focus={focus}
              onOpenChange={onOpenChange}
            />
          ) : (
            <Content path={path} />
          )}
        </main>
      </div>
    </div>
  )
}
