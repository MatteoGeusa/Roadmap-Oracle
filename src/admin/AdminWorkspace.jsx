import { useCallback, useEffect, useState } from 'react'
import { ROADMAP_EXT } from '../content.js'
import RoadmapEditor from '../roadmap/RoadmapEditor.jsx'
import Sidebar from '../Sidebar.jsx'
import './admin.css'
import { getTree, readFile } from './api.js'

const isRoadmap = (p) => p.endsWith(ROADMAP_EXT)
const param = (name) => new URLSearchParams(window.location.search).get(name)

// The default roadmap: the first one directly in home/ (the one the home page shows), else any
const defaultRoadmap = (files) => {
  const maps = files.filter(isRoadmap).sort()
  return maps.find((f) => !f.includes('/')) ?? maps[0] ?? ''
}

// /admin: the roadmap's index on the left, to search it and move around, the open roadmap
// in the editor, and the editor's panel on the right for nodes and pages.
// State is kept in ?roadmap= and ?path=.
export default function AdminWorkspace({ initialRoadmap }) {
  const [tree, setTree] = useState(null)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(() => param('path') ?? '')
  // null until the tree tells us which roadmap to open; '' when there is none
  const [roadmapFile, setRoadmapFile] = useState(() => initialRoadmap ?? param('roadmap'))
  const [loaded, setLoaded] = useState(null) // { file, doc, key }
  const [openRequest, setOpenRequest] = useState(() => (param('path')?.endsWith('.md') ? { path: param('path'), seq: 0 } : null))
  // The editor's index and selected node: { index, active }
  const [outline, setOutline] = useState(null)

  const refresh = useCallback(async () => {
    try {
      setTree(await getTree())
      setError('')
    } catch (err) {
      setError(`Impossibile leggere home/: ${err.message}. L'admin funziona solo con npm run dev.`)
    }
  }, [])

  // Reload the tree on start and whenever home/ changes, including edits made outside the
  // browser (e.g. in a code editor); the dev server announces them (see vite.config.js)
  useEffect(() => {
    refresh()
    import.meta.hot?.on('home:changed', refresh)
    return () => import.meta.hot?.off?.('home:changed', refresh)
  }, [refresh])

  useEffect(() => {
    if (tree && roadmapFile === null) setRoadmapFile(defaultRoadmap(tree.files))
  }, [tree, roadmapFile])

  // Load the roadmap to edit, fresh from disk
  useEffect(() => {
    if (!roadmapFile) return setLoaded(null)
    let cancelled = false
    readFile(roadmapFile)
      .then((text) => !cancelled && setLoaded({ file: roadmapFile, doc: JSON.parse(text), key: Date.now() }))
      .catch((err) => !cancelled && setError(`Impossibile aprire home/${roadmapFile}: ${err.message}`))
    return () => {
      cancelled = true
    }
  }, [roadmapFile])

  // Keep the address in step, so a reload reopens the same roadmap and page
  useEffect(() => {
    if (roadmapFile === null) return
    const url = new URL(window.location.href)
    url.pathname = import.meta.env.BASE_URL + 'admin'
    roadmapFile ? url.searchParams.set('roadmap', roadmapFile) : url.searchParams.delete('roadmap')
    selected ? url.searchParams.set('path', selected) : url.searchParams.delete('path')
    window.history.replaceState(null, '', url)
  }, [roadmapFile, selected])

  // An entry of the index: select and center its node in the editor
  const openNode = (node) => {
    setOpenRequest({ id: node.id, seq: Date.now() })
    setSelected(node.page ?? '')
  }
  const nodeHref = (node) => {
    const url = new URL(window.location.href)
    node.page ? url.searchParams.set('path', node.page) : url.searchParams.delete('path')
    return url.pathname + url.search
  }

  const pageFiles = tree ? tree.files.filter((f) => f.endsWith('.md')) : []

  return (
    <div className="ws">
      <Sidebar side="left" index={loaded ? outline?.index ?? null : null} active={outline?.active} nodeHref={nodeHref} onOpen={openNode} />
      <div className="ws-main">
        {error && <p className="ed-error ws-error">{error}</p>}
        {loaded ? (
          <RoadmapEditor
            key={loaded.key}
            file={loaded.file}
            doc={loaded.doc}
            pageFiles={pageFiles}
            openRequest={openRequest}
            onOutline={setOutline}
          />
        ) : roadmapFile === '' ? (
          <div className="cm-card">
            <h2>Nessuna roadmap</h2>
            <p className="rm-muted">
              Aggiungi un file <code>home/&lt;nome&gt;.roadmap.json</code> con <code>{'{ "nodes": [], "edges": [] }'}</code>: si
              aprirà qui per modificarlo.
            </p>
          </div>
        ) : (
          !error && <p className="cm-empty rm-muted">Caricamento…</p>
        )}
      </div>
    </div>
  )
}
