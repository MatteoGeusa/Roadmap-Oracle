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

// Depth of each kind in the index: topics go under titles, subtopics under topics.
// Notes are only listed when they link a document, at the level of a subtopic.
const RANK = { title: 0, topic: 1, subtopic: 2, note: 2 }

// The roadmap as a table of contents: [{ node, children: [...] }]. Edges carry no
// direction, so each node goes under the nearest node one level up (by number of hops,
// moving only through nodes of its own level), or the nearest higher one if there is
// none. Titles are the top-level sections; nodes with nothing above them come before
// them, and empty titles are skipped. Siblings follow the layout, top to bottom then
// left to right.
export function buildIndex(doc) {
  const byPos = (a, b) => (a.y ?? 0) - (b.y ?? 0) || (a.x ?? 0) - (b.x ?? 0)
  const rank = (n) => RANK[n.kind ?? 'topic']
  const nodes = (doc.nodes ?? []).filter((n) => n.kind !== 'note' || n.page).sort(byPos)
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const links = new Map(nodes.map((n) => [n.id, []]))
  for (const e of doc.edges ?? []) {
    if (!byId.has(e.source) || !byId.has(e.target)) continue
    links.get(e.source).push(e.target)
    links.get(e.target).push(e.source)
  }

  const parent = new Map()
  for (const level of [1, 2]) {
    for (let up = level - 1; up >= 0; up--) {
      // Breadth-first from every candidate parent at once: the first to reach a node is the nearest
      const queue = nodes.filter((n) => rank(n) === up).map((n) => [n.id, n.id])
      const seen = new Set(queue.map(([id]) => id))
      while (queue.length) {
        const [id, from] = queue.shift()
        for (const next of links.get(id)) {
          if (seen.has(next) || rank(byId.get(next)) !== level) continue
          seen.add(next)
          if (!parent.has(next)) parent.set(next, from)
          queue.push([next, from])
        }
      }
    }
  }

  const entries = new Map(nodes.map((n) => [n.id, { node: n, children: [] }]))
  const roots = []
  for (const n of nodes) (parent.has(n.id) ? entries.get(parent.get(n.id)).children : roots).push(entries.get(n.id))
  // A section's content isn't indented under its title, so nodes linked to no title go
  // before the first section: listed after one they would look like part of it.
  // A title with nothing under it and no document (the roadmap's own heading) is left out.
  const titles = roots.filter((e) => e.node.kind === 'title' && (e.children.length || e.node.page))
  return [...roots.filter((e) => e.node.kind !== 'title'), ...titles]
}

export const emptyRoadmap =(title) => ({ title, description: '', nodes: [], edges: [] })

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
