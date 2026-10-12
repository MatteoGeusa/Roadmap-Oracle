import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import { href, roadmapRoute } from '../content.js'
import { useResizable } from '../useResizable.js'
import { readFile, savePage, saveRoadmap } from '../admin/api.js'
import InitialViewport from './InitialViewport.jsx'
import MarkdownEditor from './MarkdownEditor.jsx'
import { nodeTypes } from './RoadmapNode.jsx'
import { KINDS, LINES, PRIORITIES, edgeStyle, fromFlow, newId, toFlow } from './model.js'

const NEW_LABELS = { title: 'Titolo', topic: 'Nuovo argomento', subtopic: 'Nuovo sotto-argomento', note: 'Nota' }

const slug = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'argomento'

const validPagePath = (p) => /^[\w\- ]+(\/[\w\- ]+)*\.md$/.test(p)


export default function RoadmapEditor(props) {
  return (
    <ReactFlowProvider>
      <Editor {...props} />
    </ReactFlowProvider>
  )
}

// `pageFiles`: the .md files currently in home/. `openRequest` ({ path, seq }) opens a page
// from outside (the content tree): it selects and centers the node linked to it, or shows
// the page on its own in the panel. `apiRef.current` lets the workspace ask about unsaved
// work and report renames/deletions made in the tree.
function Editor({ file, doc, pageFiles, openRequest, apiRef }) {
  const initial = useMemo(() => toFlow(doc), [doc])
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges)
  // Title and description are kept as they are in the file
  const [meta] = useState({ title: doc.title ?? '', description: doc.description ?? '' })
  const [dirty, setDirty] = useState(false)
  // Markdown being written: { path: text }, and what each page holds on disk, read through
  // the API (the bundled content isn't refreshed while editing, see vite.config.js)
  const [drafts, setDrafts] = useState({})
  const [disk, setDisk] = useState({})
  // A page shown in the panel with no node selected
  const [panelPage, setPanelPage] = useState(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const { screenToFlowPosition, setCenter, getZoom, getInternalNode } = useReactFlow()
  const panel = useResizable('editor-panel-width', 520, 340)
  const canvasRef = useRef(null)

  const selectedNodes = nodes.filter((n) => n.selected)
  const selectedEdges = edges.filter((e) => e.selected)
  const selectionCount = selectedNodes.length + selectedEdges.length
  const node = selectedNodes.length === 1 && !selectedEdges.length ? selectedNodes[0] : null
  const edge = selectedEdges.length === 1 && !selectedNodes.length ? selectedEdges[0] : null

  const pageText = (p) => drafts[p] ?? disk[p]
  const unsavedPages = Object.keys(drafts).filter((p) => drafts[p] !== disk[p])
  const unsaved = (dirty ? 1 : 0) + unsavedPages.length
  const pageList = [...new Set([...pageFiles, ...Object.keys(drafts)])].sort()

  // Read a page from disk the first time it's shown
  const shownPage = node?.data.page || (!selectionCount && panelPage) || null
  useEffect(() => {
    if (!shownPage || shownPage in disk || shownPage in drafts) return
    readFile(shownPage).then(
      (text) => setDisk((d) => ({ ...d, [shownPage]: text })),
      () => setDisk((d) => ({ ...d, [shownPage]: '' })),
    )
  }, [shownPage, disk, drafts])

  // Open a page asked for by the content tree
  useEffect(() => {
    if (!openRequest) return
    const linked = nodes.find((n) => n.data.page === openRequest.path)
    setNodes((nds) => nds.map((n) => ({ ...n, selected: n.id === linked?.id })))
    setEdges((eds) => eds.map((e) => (e.selected ? { ...e, selected: false } : e)))
    setPanelPage(linked ? null : openRequest.path)
    const internal = linked && getInternalNode(linked.id)
    if (internal?.measured?.width) {
      const { x, y } = internal.internals.positionAbsolute
      setCenter(x + internal.measured.width / 2, y + internal.measured.height / 2, { zoom: getZoom(), duration: 400 })
    }
    // Only when a new request arrives, not when the nodes change afterwards
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest])

  if (apiRef) {
    apiRef.current = {
      hasUnsaved: () => unsaved > 0,
      // A page or folder moved in the tree: follow it in the open nodes and drafts
      applyRename(from, to) {
        const move = (p) => (p === from || p.startsWith(from + '/') ? to + p.slice(from.length) : p)
        const rekey = (obj) => Object.fromEntries(Object.entries(obj).map(([p, v]) => [move(p), v]))
        setNodes((nds) => nds.map((n) => (n.data.page && move(n.data.page) !== n.data.page ? { ...n, data: { ...n.data, page: move(n.data.page) } } : n)))
        setDrafts(rekey)
        setDisk(rekey)
        setPanelPage((p) => p && move(p))
      },
      // A page or folder was deleted in the tree (the server already unlinked it on disk)
      applyDelete(path) {
        const gone = (p) => p === path || p.startsWith(path + '/')
        const keep = (obj) => Object.fromEntries(Object.entries(obj).filter(([p]) => !gone(p)))
        setNodes((nds) => nds.map((n) => (n.data.page && gone(n.data.page) ? { ...n, data: { ...n.data, page: '' } } : n)))
        setDrafts(keep)
        setDisk(keep)
        setPanelPage((p) => (p && gone(p) ? null : p))
      },
    }
  }

  // Any change except selection and React Flow's own measuring counts as unsaved work
  const track = (changes) => changes.some((c) => c.type !== 'select' && c.type !== 'dimensions') && setDirty(true)
  const handleNodesChange = useCallback(
    (c) => {
      onNodesChange(c)
      // However a node goes away, its links go with it
      const gone = new Set(c.filter((x) => x.type === 'remove').map((x) => x.id))
      if (gone.size) setEdges((eds) => eds.filter((e) => !gone.has(e.source) && !gone.has(e.target)))
      track(c)
    },
    [onNodesChange, setEdges],
  )
  const handleEdgesChange = useCallback((c) => (onEdgesChange(c), track(c)), [onEdgesChange])

  const onConnect = useCallback(
    (conn) => {
      if (conn.source === conn.target) return
      setEdges((eds) => addEdge({ ...conn, id: newId('e'), data: { line: 'solid' } }, eds))
      setDirty(true)
    },
    [setEdges],
  )

  // New nodes appear in the middle of the canvas, selected so the panel shows them
  const addNode = (kind) => {
    const c = canvasRef.current.getBoundingClientRect()
    const position = screenToFlowPosition({ x: c.left + c.width / 2 - 80, y: c.top + c.height / 2 - 20 })
    setNodes((nds) => [
      ...nds.map((n) => ({ ...n, selected: false })),
      { id: newId('n'), type: 'roadmap', position, selected: true, data: { kind, label: NEW_LABELS[kind], priority: 'normal', page: '' } },
    ])
    setEdges((eds) => eds.map((e) => ({ ...e, selected: false })))
    setDirty(true)
  }

  const updateNode = (id, patch) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n)))
    setDirty(true)
  }

  const updateEdge = (id, patch) => {
    setEdges((eds) => eds.map((e) => (e.id === id ? { ...e, data: { ...e.data, ...patch } } : e)))
    setDirty(true)
  }

  const removeSelected = () => {
    const gone = new Set(selectedNodes.map((n) => n.id))
    setNodes((nds) => nds.filter((n) => !n.selected))
    setEdges((eds) => eds.filter((e) => !e.selected && !gone.has(e.source) && !gone.has(e.target)))
    setDirty(true)
  }

  const clearSelection = () => {
    setNodes((nds) => nds.map((n) => (n.selected ? { ...n, selected: false } : n)))
    setEdges((eds) => eds.map((e) => (e.selected ? { ...e, selected: false } : e)))
  }

  const save = async () => {
    if (saving) return
    setSaving(true)
    try {
      for (const p of unsavedPages) await savePage(p, drafts[p])
      if (dirty) await saveRoadmap(file, fromFlow(meta, nodes, edges))
      setDisk((prev) => ({ ...prev, ...Object.fromEntries(unsavedPages.map((p) => [p, drafts[p]])) }))
      setDirty(false)
      const n = unsavedPages.length + (dirty ? 1 : 0)
      setMessage(n ? `Salvati ${n} file` : 'Niente da salvare')
    } catch (err) {
      setMessage(`Errore nel salvataggio: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  // Ctrl/Cmd+S saves, and leaving with unsaved work asks first
  const saveRef = useRef(save)
  saveRef.current = save
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        saveRef.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    if (!unsaved) return
    const warn = (e) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [unsaved])

  const shownNodes = useMemo(() => nodes.map((n) => ({ ...n, data: { ...n.data, editing: true } })), [nodes])
  const shownEdges = useMemo(
    () => edges.map((e) => ({ ...e, style: edgeStyle(e.data?.line), className: e.selected ? 'rm-edge-selected' : '' })),
    [edges],
  )

  return (
    <div className="rm-shell rm-editor">
      <div className="ed-toolbar">
        <strong className="ed-title" title={`home/${file}`}>
          🗺️ {meta.title || file}
        </strong>
        <div className="ed-add">
          <span className="rm-muted">Aggiungi</span>
          {Object.entries(KINDS).map(([kind, label]) => (
            <button key={kind} onClick={() => addNode(kind)}>
              + {label}
            </button>
          ))}
        </div>
        <span className="ed-message rm-muted">{message}</span>
        <button className="rm-primary" onClick={save} disabled={saving} title="Ctrl+S">
          {saving ? 'Salvo…' : unsaved ? `Salva (${unsaved})` : 'Salva'}
        </button>
        <a className="ed-view" href={href(roadmapRoute(file))}>
          Vedi roadmap →
        </a>
      </div>

      <div className="ed-body">
        <div className="rm-canvas" ref={canvasRef}>
          <ReactFlow
            nodes={shownNodes}
            edges={shownEdges}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            connectionMode={ConnectionMode.Loose}
            colorMode="system"
            snapToGrid
            snapGrid={[10, 10]}
            deleteKeyCode={['Delete', 'Backspace']}
            minZoom={0.2}
            maxZoom={2}
          >
            <Background gap={20} size={1} color="var(--rm-grid)" />
            <Controls />
            <MiniMap pannable zoomable />
            <InitialViewport />
          </ReactFlow>
        </div>

        {/* The panel only appears when there is something to edit */}
        {(selectionCount > 0 || panelPage) && (
        <aside className="ed-panel" style={{ width: panel.width }}>
          <div className="resize-handle" {...panel.handleProps} title="Trascina per ridimensionare, doppio clic per ripristinare" />

          {node ? (
            <NodePanel
              key={node.id}
              node={node}
              pageList={pageList}
              pageText={pageText}
              isUnsaved={(p) => unsavedPages.includes(p)}
              onUpdate={(patch) => updateNode(node.id, patch)}
              onWrite={(p, text) => setDrafts((d) => ({ ...d, [p]: text }))}
              onRemove={removeSelected}
              onClose={clearSelection}
            />
          ) : edge ? (
            <section className="ed-section">
              <PanelHead title="Collegamento" onClose={clearSelection} />
              <label className="ed-field">
                Linea
                <select value={edge.data?.line ?? 'solid'} onChange={(e) => updateEdge(edge.id, { line: e.target.value })}>
                  {Object.entries(LINES).map(([k, l]) => (
                    <option key={k} value={k}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
              <button className="rm-danger" onClick={removeSelected}>
                Elimina collegamento
              </button>
            </section>
          ) : selectionCount === 0 && panelPage ? (
            <section className="ed-section ed-node">
              <PanelHead title="Documento" onClose={() => setPanelPage(null)} />
              <p className="rm-muted cm-path">
                home/{panelPage}
                {unsavedPages.includes(panelPage) && <span className="cm-dirty"> •</span>}
              </p>
              <p className="rm-muted ed-file">Nessun nodo di questa roadmap è collegato a questo documento.</p>
              <div className="ed-content">
                <PageEditor path={panelPage} text={pageText(panelPage)} onChange={(t) => setDrafts((d) => ({ ...d, [panelPage]: t }))} />
              </div>
            </section>
          ) : selectionCount > 1 ? (
            <section className="ed-section">
              <PanelHead title={`${selectionCount} elementi selezionati`} onClose={clearSelection} />
              <p className="rm-muted">Trascinali insieme per spostarli, oppure eliminali.</p>
              <button className="rm-danger" onClick={removeSelected}>
                Elimina selezionati
              </button>
            </section>
          ) : null}
        </aside>
        )}
      </div>
    </div>
  )
}

// Markdown editor for a page, once its text has been read from disk
function PageEditor({ path, text, onChange }) {
  if (text === undefined) return <p className="rm-muted">Caricamento…</p>
  return <MarkdownEditor key={path} path={path} value={text} onChange={onChange} />
}

function PanelHead({ title, onClose }) {
  return (
    <div className="ed-panel-head">
      <h3>{title}</h3>
      <button className="rm-close" onClick={onClose} aria-label="Chiudi" title="Deseleziona">
        ×
      </button>
    </div>
  )
}

function NodePanel({ node, pageList, pageText, isUnsaved, onUpdate, onWrite, onRemove, onClose }) {
  const { kind, label, priority, page } = node.data
  // Proposed in home/ itself: a folder named like the roadmap would clash with its page
  const [newPath, setNewPath] = useState(() => `${slug(label)}.md`)
  const pathOk = validPagePath(newPath)

  const createPage = () => {
    if (!pathOk) return
    if (!pageList.includes(newPath)) onWrite(newPath, `# ${label}\n\n`)
    onUpdate({ page: newPath })
  }

  return (
    <section className="ed-section ed-node">
      <PanelHead title={KINDS[kind]} onClose={onClose} />
      <label className="ed-field">
        Testo
        <textarea rows={2} value={label} onChange={(e) => onUpdate({ label: e.target.value })} />
      </label>
      <div className="ed-row">
        <label className="ed-field">
          Tipo
          <select value={kind} onChange={(e) => onUpdate({ kind: e.target.value })}>
            {Object.entries(KINDS).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="ed-field">
          Priorità
          <select value={priority} onChange={(e) => onUpdate({ priority: e.target.value })}>
            {Object.entries(PRIORITIES).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="ed-content">
        <div className="ed-content-head">
          <h4>Contenuto</h4>
          {page && (
            <>
              <select value={page} onChange={(e) => onUpdate({ page: e.target.value })} title="Documento collegato">
                {!pageList.includes(page) && <option value={page}>{page} (mancante)</option>}
                {pageList.map((p) => (
                  <option key={p} value={p}>
                    {p}
                    {isUnsaved(p) ? ' •' : ''}
                  </option>
                ))}
              </select>
              <button className="ed-link-btn" onClick={() => onUpdate({ page: '' })} title="Scollega il documento (il file resta)">
                Scollega
              </button>
            </>
          )}
        </div>

        {page ? (
          <PageEditor path={page} text={pageText(page)} onChange={(text) => onWrite(page, text)} />
        ) : (
          <div className="ed-nocontent">
            <p className="rm-muted">Questo nodo non ha ancora un documento.</p>
            <label className="ed-field">
              Nuovo documento in home/
              <div className="ed-inline">
                <input value={newPath} onChange={(e) => setNewPath(e.target.value.trim())} />
                <button className="rm-primary" onClick={createPage} disabled={!pathOk}>
                  {pageList.includes(newPath) ? 'Collega' : 'Crea'}
                </button>
              </div>
            </label>
            {!pathOk && <p className="ed-error">Usa un percorso tipo cartella/nome.md (lettere, numeri, - e _).</p>}
            {pageList.length > 0 && (
              <label className="ed-field">
                Oppure collega un documento esistente
                <select value="" onChange={(e) => e.target.value && onUpdate({ page: e.target.value })}>
                  <option value="">— scegli —</option>
                  {pageList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}
      </div>

      <button className="rm-danger" onClick={onRemove}>
        Elimina nodo
      </button>
    </section>
  )
}
