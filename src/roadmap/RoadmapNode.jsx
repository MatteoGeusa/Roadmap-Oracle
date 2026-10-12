import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { STATUSES } from './model.js'

// One handle per side; with ConnectionMode.Loose each can start or end an edge
const SIDES = [
  ['t', Position.Top],
  ['r', Position.Right],
  ['b', Position.Bottom],
  ['l', Position.Left],
]

const STATUS_ICONS = { done: '✓', learning: '◐', recover: '↺', deepen: '＋', skip: '–' }

function RoadmapNode({ data, selected }) {
  const { kind, label, priority, page, status, editing } = data
  const cls = ['rm-node', `rm-kind-${kind}`, `rm-prio-${priority}`]
  if (status) cls.push(`rm-status-${status}`)
  if (selected) cls.push('rm-selected')

  return (
    <div className={cls.join(' ')} title={status ? STATUSES[status] : undefined}>
      {SIDES.map(([id, pos]) => (
        <Handle key={id} id={id} type="source" position={pos} className="rm-handle" />
      ))}
      {priority === 'important' && <span className="rm-badge rm-badge-important" title="Importante">★</span>}
      {status && <span className={`rm-badge rm-badge-status rm-badge-${status}`}>{STATUS_ICONS[status]}</span>}
      <span className="rm-label">{label || (editing ? 'Senza nome' : '')}</span>
      {editing && page && <span className="rm-page-dot" title={page} />}
    </div>
  )
}

export default memo(RoadmapNode)

export const nodeTypes = { roadmap: RoadmapNode }
