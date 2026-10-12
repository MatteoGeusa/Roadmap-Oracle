import { useCallback, useState } from 'react'

// Width of a side panel, resized by dragging its inner edge: the left edge of a panel
// docked on the right (side "right"), or the right edge of one docked on the left.
// The chosen width is remembered in the browser under `key`.
export function useResizable(key, initial, min, side = 'right') {
  const [width, setWidth] = useState(() => {
    try {
      return Number(localStorage.getItem(key)) || initial
    } catch {
      return initial
    }
  })

  const clamp = (w) => Math.round(Math.max(min, Math.min(w, window.innerWidth - 120)))

  const save = (w) => {
    try {
      localStorage.setItem(key, String(w))
    } catch {
      // Not remembered across visits
    }
  }

  const onPointerDown = useCallback(
    (e) => {
      e.preventDefault()
      const startX = e.clientX
      const startW = e.currentTarget.parentElement.getBoundingClientRect().width
      let last = startW
      document.body.classList.add('resizing')
      const sign = side === 'right' ? -1 : 1
      const move = (ev) => setWidth((last = clamp(startW + sign * (ev.clientX - startX))))
      const up = () => {
        document.body.classList.remove('resizing')
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
        save(last)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      // Released outside the window or interrupted by the browser: stop resizing anyway
      window.addEventListener('pointercancel', up)
    },
    [key, min, side],
  )

  // Double-click on the handle goes back to the default width
  const reset = useCallback(() => {
    setWidth(initial)
    save(initial)
  }, [key, initial])

  return { width: clamp(width), handleProps: { onPointerDown, onDoubleClick: reset } }
}
