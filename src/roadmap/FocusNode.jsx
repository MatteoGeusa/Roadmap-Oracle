import { useEffect, useRef } from 'react'
import { useReactFlow, useStore } from '@xyflow/react'

// Center of a node as "x,y" once React Flow has measured it, else null. Read from the
// store rather than getInternalNode in the effect: right after the nodes prop changes the
// node is rebuilt with empty measurements, and centering on NaN freezes the viewport.
const nodeCenter = (id) => (s) => {
  const n = id && s.nodeLookup.get(id)
  const w = n?.measured?.width
  const h = n?.measured?.height
  if (!w || !h) return null
  const { x, y } = n.internals.positionAbsolute
  return `${x + w / 2},${y + h / 2}`
}

// Centers the viewport on a node whenever `request` ({ id, seq }) changes, keeping the
// current zoom. `coveredRight` is how many pixels the side panel hides on the right,
// so the node lands in the middle of the part of the canvas still visible.
export default function FocusNode({ request, coveredRight, lockRef }) {
  const { getZoom, setCenter } = useReactFlow()
  const width = useStore((s) => s.width)
  const center = useStore(nodeCenter(request?.id))
  const doneSeq = useRef(null)

  useEffect(() => {
    if (!request || !center || !width || doneSeq.current === request.seq) return
    const [cx, cy] = center.split(',').map(Number)
    const zoom = getZoom()
    if (![cx, cy, zoom].every(Number.isFinite) || zoom <= 0) return
    doneSeq.current = request.seq
    // Stop the initial fit from moving the view away afterwards
    if (lockRef) lockRef.current = true
    const covered = width - coveredRight >= 240 ? Math.min(coveredRight, width) : 0
    setCenter(cx + covered / 2 / zoom, cy, { zoom, duration: 450 })
  }, [request, center, width, coveredRight, lockRef, getZoom, setCenter])

  return null
}
