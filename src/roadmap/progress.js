import { useCallback, useState } from 'react'

// Each user's statuses live only in their own browser: { nodeId: 'done' | 'recover' | ... }
const key = (file) => `roadmap-progress:${file}`

function load(file) {
  try {
    return JSON.parse(localStorage.getItem(key(file))) ?? {}
  } catch {
    return {}
  }
}

function store(file, progress) {
  try {
    localStorage.setItem(key(file), JSON.stringify(progress))
  } catch {
    // Storage blocked (private mode, disabled site data): progress lasts only for this visit
  }
}

export function useProgress(file) {
  const [progress, setProgress] = useState(() => load(file))

  const setStatus = useCallback(
    (nodeId, status) => {
      setProgress((prev) => {
        const next = { ...prev }
        if (status) next[nodeId] = status
        else delete next[nodeId]
        store(file, next)
        return next
      })
    },
    [file],
  )

  const reset = useCallback(() => {
    store(file, {})
    setProgress({})
  }, [file])

  return [progress, setStatus, reset]
}
