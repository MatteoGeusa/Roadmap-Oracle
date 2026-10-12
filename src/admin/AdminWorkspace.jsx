import { useCallback, useEffect, useRef, useState } from 'react'
import { ROADMAP_EXT } from '../content.js'
import RoadmapEditor from '../roadmap/RoadmapEditor.jsx'
import './admin.css'
import { getTree, readFile } from './api.js'
import ContentTree from './ContentTree.jsx'

const isRoadmap = (p) => p.endsWith(ROADMAP_EXT)
const param = (name) => new URLSearchParams(window.location.search).get(name)
const within = (p, root) => p === root || p.startsWith(root + '/')

// The default roadmap: the first one directly in home/ (the one the home page shows), else any
const defaultRoadmap = (files) => {
  const maps = files.filter(isRoadmap).sort()
  return maps.find((f) => !f.includes('/')) ?? maps[0] ?? ''
}

// /admin: the content tree on the left, the open roadmap in the editor, and the editor's
// panel on the right for nodes and pages. State is kept in ?roadmap= and ?path=.
export default function AdminWorkspace({ initialRoadmap }) {
  const [tree, setTree] = useState(null)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(() => param('path') ?? '')
  // null until the tree tells us which roadmap to open; '' when there is none
  const [roadmapFile, setRoadmapFile] = useState(() => initialRoadmap ?? param('roadmap'))
  const [loaded, setLoaded] = useState(null) // { file, doc, key }
  const [openRequest, setOpenRequest] = useState(() => (param('path')?.endsWith('.md') ? { path: param('path'), seq: 0 } : null))
  const editor = useRef(null)
  // Set when the open roadmap was renamed: follow the new path without reloading the editor
  const renamedTo = useRef(null)

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
    if (renamedTo.current === roadmapFile) {
      renamedTo.current = null
      return setLoaded((l) => l && { ...l, file: roadmapFile })
    }
    let cancelled = false
    readFile(roadmapFile)
      .then((text) => !cancelled && setLoaded({ file: roadmapFile, doc: JSON.parse(text), key: Date.now() }))
      .catch((err) => !cancelled && setError(`Impossibile aprire home/${roadmapFile}: ${err.message}`))
    return () => {
      cancelled = true
    }
  }, [roadmapFile])

  // Keep the address in step, so a reload reopens the same roadmap and item
  useEffect(() => {
    if (roadmapFile === null) return
    const url = new URL(window.location.href)
    url.pathname = import.meta.env.BASE_URL + 'admin'
    roadmapFile ? url.searchParams.set('roadmap', roadmapFile) : url.searchParams.delete('roadmap')
    selected ? url.searchParams.set('path', selected) : url.searchParams.delete('path')
    window.history.replaceState(null, '', url)
  }, [roadmapFile, selected])

  const canLeaveRoadmap = () =>
    !editor.current?.hasUnsaved() || confirm('La roadmap aperta ha modifiche non salvate. Lasciarle?')

  const select = (p) => {
    if (isRoadmap(p) && p !== roadmapFile) {
      if (!canLeaveRoadmap()) return
      setRoadmapFile(p)
      setOpenRequest(null)
    } else if (p.endsWith('.md')) {
      setOpenRequest({ path: p, seq: Date.now() })
    }
    setSelected(p)
  }

  const onChanged = (change) => {
    if (change.type === 'created') return select(change.path)
    if (change.type === 'renamed') {
      const move = (p) => (p && within(p, change.from) ? change.to + p.slice(change.from.length) : p)
      editor.current?.applyRename(change.from, change.to)
      if (roadmapFile && within(roadmapFile, change.from)) {
        renamedTo.current = move(roadmapFile)
        setRoadmapFile(move(roadmapFile))
      }
      setSelected(move)
      setOpenRequest((r) => r && { ...r, path: move(r.path) })
      return
    }
    // deleted
    editor.current?.applyDelete(change.path)
    if (within(selected, change.path)) setSelected('')
    if (roadmapFile && within(roadmapFile, change.path)) {
      setLoaded(null)
      setRoadmapFile(null) // falls back to the default roadmap once the tree reloads
    }
  }

  const pageFiles = tree ? tree.files.filter((f) => f.endsWith('.md')) : []

  return (
    <div className="ws rm-editor">
      <ContentTree
        tree={tree}
        error={error}
        selected={selected}
        onSelect={select}
        onChanged={onChanged}
        refresh={refresh}
      />
      <div className="ws-main">
        {loaded ? (
          <RoadmapEditor
            key={loaded.key}
            file={loaded.file}
            doc={loaded.doc}
            pageFiles={pageFiles}
            openRequest={openRequest}
            apiRef={editor}
          />
        ) : roadmapFile === '' ? (
          <div className="cm-card">
            <h2>Nessuna roadmap</h2>
            <p className="rm-muted">
              Crea la prima con <strong>+ Roadmap</strong> nella colonna dei contenuti: si aprirà qui per modificarla.
            </p>
          </div>
        ) : (
          <p className="cm-empty rm-muted">Caricamento…</p>
        )}
      </div>
    </div>
  )
}
