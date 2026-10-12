// Client for the dev server's content API (admin-api.js). Only works under npm run dev.

async function call(method, endpoint, body) {
  const res = await fetch(`/__admin/${endpoint}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const type = res.headers.get('Content-Type') ?? ''
  const data = type.includes('application/json') ? await res.json() : await res.text()
  if (!res.ok) throw new Error(data?.error ?? String(data))
  return data
}

export const getTree = () => call('GET', 'tree')
export const readFile = (path) => call('GET', `file?path=${encodeURIComponent(path)}`)
export const savePage = (file, content, create = false) => call('POST', 'save', { file, content, create })
export const saveRoadmap = (file, data, create = false) => call('POST', 'save', { file, data, create })
export const makeDir = (dir) => call('POST', 'mkdir', { dir })
export const rename = (from, to) => call('POST', 'rename', { from, to })
export const trash = (path) => call('POST', 'delete', { path })
