import { Suspense, useCallback, useState } from 'react'
import { BASE, ROADMAP_EXT, currentPath, href, isFolder, listFolder, pages, roadmapByRoute, roadmapRoute, roadmaps } from './content.js'
import Markdown from './Markdown.jsx'
import Sidebar from './Sidebar.jsx'
import RoadmapView from './roadmap/RoadmapView.jsx'
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

const docFromUrl = () => new URLSearchParams(window.location.search).get('doc')

export default function App() {
  const path = currentPath()
  const roadmapFile = roadmapAt(path)
  // Documents open beside this roadmap; off a roadmap page they open beside the home one
  const docRoute = roadmapFile ? path : homeRoadmap ? '' : null

  const [openDoc, setOpenDoc] = useState(() => (roadmapFile ? docFromUrl() : null))
  const [focus, setFocus] = useState(() => (openDoc ? { page: openDoc, seq: 0 } : null))

  // Keep ?doc= in the address bar in step with the panel, so a reload or a shared link reopens it
  const onPageChange = useCallback((page) => {
    setOpenDoc(page)
    const url = new URL(window.location.href)
    if (page) url.searchParams.set('doc', page)
    else url.searchParams.delete('doc')
    window.history.replaceState(null, '', url)
  }, [])

  const fileHref = (file) =>
    docRoute === null ? href(file) : `${docRoute ? href(docRoute) : BASE}?doc=${encodeURIComponent(file)}`

  return (
    <div className="app">
      <div className="app-body">
        <main className="app-main">
          {roadmapFile ? (
            <RoadmapView
              key={roadmapFile}
              file={roadmapFile}
              doc={roadmaps[roadmapFile]}
              focus={focus}
              onPageChange={onPageChange}
            />
          ) : (
            <Content path={path} />
          )}
        </main>
        {/* The admin pages have their own content tree */}
        {!isAdmin(path) && (
          <Sidebar
            active={roadmapFile ? openDoc : pages[path] !== undefined ? path : null}
            fileHref={fileHref}
            onOpen={roadmapFile ? (file) => setFocus({ page: file, seq: Date.now() }) : null}
          />
        )}
      </div>
    </div>
  )
}
