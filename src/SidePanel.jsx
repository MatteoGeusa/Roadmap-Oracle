// A panel docked on one side of the page, the same everywhere: the index on the left, the
// content of a node on the right. It slides in from its own side when it appears, and is
// resized by dragging its inner edge.
// `size`: the result of useResizable(key, width, min, side), or null for a fixed width
// (e.g. the collapsed index), which then comes from the CSS.
export default function SidePanel({ side, size, className = '', children }) {
  return (
    <aside className={`side-panel side-panel-${side} ${className}`} style={size ? { width: size.width } : undefined}>
      {size && <div className="resize-handle" {...size.handleProps} title="Trascina per ridimensionare, doppio clic per ripristinare" />}
      {children}
    </aside>
  )
}
