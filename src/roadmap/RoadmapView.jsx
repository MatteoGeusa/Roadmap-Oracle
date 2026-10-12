import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Background, ConnectionMode, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import { href, pages } from '../content.js'
import Markdown from '../Markdown.jsx'
import SidePanel from '../SidePanel.jsx'
import FocusNode from './FocusNode.jsx'
import InitialViewport from './InitialViewport.jsx'
import { nodeTypes } from './RoadmapNode.jsx'
import { PRIORITIES, STATUSES, edgeStyle, isTrackable, toFlow } from './model.js'
import { useProgress } from './progress.js'
import { useResizable } from '../useResizable.js'

// `focus` asks from outside (the index, the address bar) to show a node or a page:
// { id, seq } centers on that node and opens it if it can be opened; { page, seq } opens
// a markdown page beside the roadmap, centering on the node linked to it if there is one.
// `onOpenChange(id, page)` reports the node and the page open in the panel, or nulls.
export default function RoadmapView({ file, doc, focus, onOpenChange }) {
  const [progress, setStatus, resetProgress] = useProgress(file)
  // What the side panel shows: { id } for a node, { page } for a page no node links to
  const [panelItem, setPanelItem] = useState(null)
  const [centerOn, setCenterOn] = useState(null)
  const viewLock = useRef(false)
  // 'important' or one of STATUSES: highlights only the matching nodes
  const [filter, setFilter] = useState(null)
  // Node sizes measured by React Flow. The nodes are rebuilt on every render here, so
  // without handing the sizes back React Flow forgets them and can't center or fit.
  const [sizes, setSizes] = useState({})
  const onNodesChange = useCallback((changes) => {
    const dims = changes.filter((c) => c.type === 'dimensions' && c.dimensions)
    if (dims.length) setSizes((prev) => ({ ...prev, ...Object.fromEntries(dims.map((c) => [c.id, c.dimensions])) }))
  }, [])
  const panel = useResizable('roadmap-panel-width', 460, 320)

  const flow = useMemo(() => toFlow(doc), [doc])
  const openId = panelItem?.id ?? null
  const setOpenId = (id) => setPanelItem(id ? { id } : null)

  // Open a page in the panel, centering on the node that links to it if any
  const openDocument = useCallback(
    (page, seq = Date.now()) => {
      const node = flow.nodes.find((n) => n.data.page === page)
      if (node) {
        setPanelItem({ id: node.id })
        setCenterOn({ id: node.id, seq })
      } else {
        setPanelItem({ page })
      }
    },
    [flow],
  )

  const openNode = useCallback(
    (id, seq = Date.now()) => {
      const node = flow.nodes.find((n) => n.id === id)
      if (!node) return
      if (isTrackable(node.data.kind) || node.data.page) setPanelItem({ id })
      setCenterOn({ id, seq })
    },
    [flow],
  )

  useEffect(() => {
    if (focus?.id) openNode(focus.id, focus.seq)
    else if (focus?.page) openDocument(focus.page, focus.seq)
  }, [focus, openNode, openDocument])

  const nodes = useMemo(
    () =>
      flow.nodes.map((n) => {
        const trackable = isTrackable(n.data.kind)
        const status = trackable ? progress[n.id] : undefined
        const matches = !filter || (filter === 'important' ? n.data.priority === 'important' : status === filter)
        return {
          ...n,
          data: { ...n.data, status },
          ...(sizes[n.id] && { measured: sizes[n.id] }),
          className: [
            trackable || n.data.page ? 'rm-clickable' : '',
            matches ? '' : 'rm-dim',
            n.id === openId ? 'rm-open' : '',
          ].join(' '),
        }
      }),
    [flow, progress, filter, openId, sizes],
  )

  const edges = useMemo(
    () => flow.edges.map((e) => ({ ...e, style: edgeStyle(e.data.line), className: filter ? 'rm-dim' : '' })),
    [flow, filter],
  )

  const trackable = flow.nodes.filter((n) => isTrackable(n.data.kind))
  const counts = Object.fromEntries(Object.keys(STATUSES).map((s) => [s, 0]))
  for (const n of trackable) if (progress[n.id] in counts) counts[progress[n.id]]++
  const importantCount = trackable.filter((n) => n.data.priority === 'important').length
  const percent = trackable.length ? Math.round(((counts.done + counts.skip) / trackable.length) * 100) : 0

  const open = flow.nodes.find((n) => n.id === openId)
  const openPage = open ? open.data.page || null : panelItem?.page ?? null

  useEffect(() => {
    onOpenChange?.(open ? open.id : null, openPage)
  }, [open, openPage, onOpenChange])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setPanelItem(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleFilter = (f) => setFilter((cur) => (cur === f ? null : f))

  return (
    <div className="rm-shell">
      <div className="rm-view-head">
        <div className="rm-title-row">
          <div className="rm-heading">
            <h2>{doc.title}</h2>
            {doc.description && <p>{doc.description}</p>}
          </div>
          {import.meta.env.DEV && (
            <a className="rm-edit-link" href={`${href('admin')}?roadmap=${encodeURIComponent(file)}`}>
              ✎ Modifica
            </a>
          )}
        </div>
        {trackable.length > 0 && (
          <div className="rm-stats-row">
            <div className="rm-progress" title={`${counts.done} di ${trackable.length} argomenti fatti`}>
              <div className="rm-progress-bar">
                <div style={{ width: `${percent}%` }} />
              </div>
              <span className="rm-progress-text">
                <strong>{percent}%</strong> · {counts.done}/{trackable.length} fatti
              </span>
              <button
                className="rm-link-btn"
                onClick={() => confirm('Cancellare tutti i tuoi stati su questa roadmap?') && resetProgress()}
              >
                Azzera
              </button>
            </div>
            <div className="rm-filters">
              {importantCount > 0 && (
                <button
                  className={`rm-chip rm-chip-important${filter === 'important' ? ' rm-active' : ''}`}
                  onClick={() => toggleFilter('important')}
                >
                  ★ {PRIORITIES.important} <span>{importantCount}</span>
                </button>
              )}
              {Object.entries(STATUSES).map(([s, label]) => (
                <button
                  key={s}
                  className={`rm-chip rm-chip-${s}${filter === s ? ' rm-active' : ''}`}
                  onClick={() => toggleFilter(s)}
                  disabled={!counts[s] && filter !== s}
                >
                  {label} <span>{counts[s]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rm-canvas">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            colorMode="system"
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            onNodesChange={onNodesChange}
            panOnScroll
            minZoom={0.2}
            maxZoom={2}
            onNodeClick={(_, n) => {
              if (!isTrackable(n.data.kind) && !n.data.page) return
              // Bring the node into the part of the canvas the panel leaves visible
              setOpenId(n.id)
              setCenterOn({ id: n.id, seq: Date.now() })
            }}
            onPaneClick={() => setOpenId(null)}
          >
            <Background gap={20} size={1} color="var(--rm-grid)" />
            <Controls showInteractive={false} />
            <InitialViewport lockRef={viewLock} />
            <FocusNode request={centerOn} coveredRight={panel.width} lockRef={viewLock} />
          </ReactFlow>
        </ReactFlowProvider>

        {(open || panelItem?.page) && (
          <SidePanel side="right" size={panel} className="rm-panel">
            {open ? (
              <>
                <div className="rm-panel-head">
                  <h3>
                    {open.data.priority === 'important' && <span className="rm-star">★ </span>}
                    {open.data.label}
                  </h3>
                  <button className="rm-close" onClick={() => setOpenId(null)} aria-label="Chiudi">
                    ×
                  </button>
                </div>
                {open.data.priority !== 'normal' && (
                  <span className={`rm-tag rm-tag-${open.data.priority}`}>{PRIORITIES[open.data.priority]}</span>
                )}
                {isTrackable(open.data.kind) && (
                  <div className="rm-status-buttons">
                    {Object.entries(STATUSES).map(([s, label]) => (
                      <button
                        key={s}
                        className={`rm-chip rm-chip-${s}${progress[open.id] === s ? ' rm-active' : ''}`}
                        onClick={() => setStatus(open.id, progress[open.id] === s ? null : s)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="rm-panel-body">
                  {open.data.page && pages[open.data.page] !== undefined ? (
                    <>
                      <Markdown path={open.data.page} onOpen={openDocument} />
                      <p>
                        <a href={href(open.data.page)}>Apri come pagina →</a>
                      </p>
                    </>
                  ) : (
                    <p className="rm-muted">Nessun contenuto collegato a questo argomento.</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="rm-panel-head">
                  <h3>{panelItem.page.split('/').pop()}</h3>
                  <button className="rm-close" onClick={() => setPanelItem(null)} aria-label="Chiudi">
                    ×
                  </button>
                </div>
                {pages[panelItem.page] === undefined ? (
                  // e.g. an old ?doc= link to a page that has since been removed
                  <p className="rm-muted">Questo documento non esiste (più).</p>
                ) : (
                  <>
                    <p className="rm-muted rm-panel-note">Nessun argomento della roadmap è collegato a questo documento.</p>
                    <div className="rm-panel-body">
                      <Markdown path={panelItem.page} onOpen={openDocument} />
                    </div>
                  </>
                )}
              </>
            )}
          </SidePanel>
        )}
      </div>
    </div>
  )
}
