import { useEffect, useRef } from 'react'
import { useReactFlow, useStore } from '@xyflow/react'

const PAD = 40

// Bounds of all nodes from React Flow's own measurements, or null until every node
// is measured. useNodesInitialized can't be used: in the read-only view nodes are
// controlled without onNodesChange, so the user nodes never receive their sizes.
function measuredBounds(s) {
  if (!s.nodeLookup.size) return null
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity
  for (const n of s.nodeLookup.values()) {
    const w = n.measured?.width
    if (!w || !n.measured.height || !n.internals.handleBounds) return null
    const { x, y } = n.internals.positionAbsolute
    x1 = Math.min(x1, x)
    y1 = Math.min(y1, y)
    x2 = Math.max(x2, x + w)
  }
  // A string, so the selector result compares equal while nothing moves
  return `${x1},${y1},${x2 - x1}`
}

// Like roadmap.sh: fit the roadmap's width and start from its top, instead of
// shrinking a tall roadmap until it all fits on screen. Refits when the canvas
// width changes, until the user pans, zooms or clicks for the first time, or until
// `lockRef` is set (another component moved the view on purpose).
export default function InitialViewport({ lockRef }) {
  const { setViewport } = useReactFlow()
  const width = useStore((s) => s.width)
  const domNode = useStore((s) => s.domNode)
  const bounds = useStore(measuredBounds)
  const touched = useRef(false)
  const fittedWidth = useRef(0)

  useEffect(() => {
    if (!domNode) return
    const stop = () => (touched.current = true)
    domNode.addEventListener('pointerdown', stop)
    domNode.addEventListener('wheel', stop, { passive: true })
    return () => {
      domNode.removeEventListener('pointerdown', stop)
      domNode.removeEventListener('wheel', stop)
    }
  }, [domNode])

  useEffect(() => {
    if (touched.current || lockRef?.current || !bounds || !width || width === fittedWidth.current) return
    fittedWidth.current = width
    const [bx, by, bw] = bounds.split(',').map(Number)
    const zoom = Math.min(1, Math.max(0.3, width / (bw + PAD * 2)))
    setViewport({ x: (width - bw * zoom) / 2 - bx * zoom, y: PAD - by * zoom, zoom })
  }, [bounds, width, setViewport])

  return null
}
