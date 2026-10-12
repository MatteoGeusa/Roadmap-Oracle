// Shape of a .roadmap.json file:
// {
//   "title": "...", "description": "...",
//   "nodes": [{ "id", "kind", "label", "x", "y", "priority", "page" }],
//   "edges": [{ "id", "source", "target", "sourceHandle", "targetHandle", "line" }]
// }

export const KINDS = {
  title: 'Titolo',
  topic: 'Argomento',
  subtopic: 'Sotto-argomento',
  note: 'Nota',
}

// Set by the admin, the same for everyone
export const PRIORITIES = {
  normal: 'Normale',
  important: 'Importante',
  optional: 'Opzionale',
}

// Set by each user for themselves, kept in their browser
export const STATUSES = {
  done: 'Fatto',
  learning: 'In corso',
  recover: 'Da recuperare',
  deepen: 'Da approfondire',
  skip: 'Salta',
}

export const LINES = {
  solid: 'Continua',
  dashed: 'Tratteggiata',
}

// Only topics and subtopics are things to study
export const isTrackable = (kind) => kind === 'topic' || kind === 'subtopic'

export const emptyRoadmap = (title) => ({ title, description: '', nodes: [], edges: [] })

export function toFlow(doc) {
  const nodes = (doc.nodes ?? []).map((n) => ({
    id: n.id,
    type: 'roadmap',
    position: { x: n.x ?? 0, y: n.y ?? 0 },
    data: { kind: n.kind ?? 'topic', label: n.label ?? '', priority: n.priority ?? 'normal', page: n.page ?? '' },
  }))
  const edges = (doc.edges ?? []).map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle ?? null,
    targetHandle: e.targetHandle ?? null,
    data: { line: e.line ?? 'solid' },
  }))
  return { nodes, edges }
}

export function fromFlow({ title, description }, nodes, edges) {
  return {
    title,
    description,
    nodes: nodes.map(({ id, position, data }) => ({
      id,
      kind: data.kind,
      label: data.label,
      x: Math.round(position.x),
      y: Math.round(position.y),
      ...(data.priority !== 'normal' && { priority: data.priority }),
      ...(data.page && { page: data.page }),
    })),
    edges: edges.map(({ id, source, target, sourceHandle, targetHandle, data }) => ({
      id,
      source,
      target,
      sourceHandle,
      targetHandle,
      ...(data?.line === 'dashed' && { line: 'dashed' }),
    })),
  }
}

// Visual style of an edge from its line type
export const edgeStyle = (line) => ({
  stroke: 'var(--rm-edge)',
  strokeWidth: 2,
  ...(line === 'dashed' && { strokeDasharray: '6 5' }),
})

export const newId = (prefix) => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
