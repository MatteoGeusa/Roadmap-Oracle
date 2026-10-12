// Content management API for the admin pages, mounted by vite.config.js on the dev
// server only (npm run dev). The built site never includes it and stays fully static.
//
//   GET  /__admin/tree                       -> { dirs: [...], files: [...] } under home/
//   GET  /__admin/file?path=a/b.md           -> raw file content
//   POST /__admin/save   { file, content }   -> write a .md page
//   POST /__admin/save   { file, data }      -> write a .roadmap.json
//        add "create": true to refuse overwriting an existing file
//   POST /__admin/upload { file, data }      -> write an image (data in base64); if the name is
//                                               taken, saves as name-2.png... and returns { file }
//   POST /__admin/mkdir  { dir }
//   POST /__admin/rename { from, to }        -> also rewrites roadmap links to moved pages
//   POST /__admin/delete { path }            -> moves it to .trash/<timestamp>/, never erases,
//                                               and unlinks roadmap nodes that pointed to it
import fs from 'node:fs'
import path from 'node:path'

const ROADMAP_EXT = '.roadmap.json'
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
const MAX_IMAGE_MB = 10

// One path segment: no separators, no reserved characters, not hidden, not . or ..
// Folders under OneDrive or watched by Vite often refuse a plain rename on Windows (EPERM):
// fall back to copying, then removing the original once the copy is complete
function move(src, dst) {
  try {
    fs.renameSync(src, dst)
  } catch (err) {
    if (!['EPERM', 'EXDEV', 'EBUSY', 'EACCES'].includes(err.code)) throw err
    fs.cpSync(src, dst, { recursive: true, errorOnExist: true, force: false })
    fs.rmSync(src, { recursive: true, force: true })
  }
}

// One path segment: no separators or reserved characters, not hidden (leading dot) and not
// ending with a dot or space, which Windows silently strips
const SEGMENT = /^(?!\.)[^\\/:*?"<>|\u0000-\u001f]*[^\\/:*?"<>|\u0000-\u001f. ]$/

// A roadmap must at least have a nodes and an edges list, or the site can't draw it
function checkRoadmap(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
    throw new Error('roadmap non valida: servono "nodes" ed "edges"')
  }
}

export function adminApi({ homeDir, trashDir }) {
  // Resolve a client path inside home/, or throw
  function resolve(rel, { allowRoot = false } = {}) {
    const clean = String(rel ?? '').replace(/^\/+|\/+$/g, '')
    if (!clean) {
      if (allowRoot) return homeDir
      throw new Error('percorso mancante')
    }
    const segs = clean.split('/')
    if (!segs.every((s) => SEGMENT.test(s) && s.trim() === s)) {
      throw new Error(`nome non valido: ${clean} (niente \\ : * ? " < > |, né punto o spazio iniziale o finale)`)
    }
    const abs = path.resolve(homeDir, ...segs)
    if (!abs.startsWith(homeDir + path.sep)) throw new Error(`percorso non valido: ${clean}`)
    return abs
  }

  const isContentFile = (name) => name.endsWith('.md') || name.endsWith(ROADMAP_EXT)
  const rel = (abs) => path.relative(homeDir, abs).split(path.sep).join('/')

  function walk(dir, out = { dirs: [], files: [] }) {
    if (!fs.existsSync(dir)) return out
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue
      const abs = path.join(dir, e.name)
      if (e.isDirectory()) {
        out.dirs.push(rel(abs))
        walk(abs, out)
      } else if (isContentFile(e.name)) {
        out.files.push(rel(abs))
      }
    }
    return out
  }

  // After a page or folder moves, point roadmap nodes at the new path (`to`), or unlink
  // them when it was deleted (`to` null). A roadmap that isn't valid JSON is skipped
  // rather than failing a move that has already happened.
  function relinkRoadmaps(from, to) {
    const updated = []
    for (const file of walk(homeDir).files.filter((f) => f.endsWith(ROADMAP_EXT))) {
      const abs = path.join(homeDir, file)
      let doc
      try {
        doc = JSON.parse(fs.readFileSync(abs, 'utf8'))
      } catch {
        continue
      }
      let changed = false
      for (const n of doc.nodes ?? []) {
        if (n.page === from || n.page?.startsWith(from + '/')) {
          if (to === null) delete n.page
          else n.page = to + n.page.slice(from.length)
          changed = true
        }
      }
      if (changed) {
        fs.writeFileSync(abs, JSON.stringify(doc, null, 2) + '\n')
        updated.push(file)
      }
    }
    return updated
  }

  const handlers = {
    'GET /tree': () => {
      const t = walk(homeDir)
      return { dirs: t.dirs.sort(), files: t.files.sort() }
    },

    'GET /file': (_, query) => {
      const abs = resolve(query.get('path'))
      if (!fs.existsSync(abs)) throw Object.assign(new Error('file non trovato'), { status: 404 })
      return fs.readFileSync(abs, 'utf8')
    },

    'POST /save': ({ file, data, content, create }) => {
      const abs = resolve(file)
      const isRoadmap = file.endsWith(ROADMAP_EXT)
      if (!isRoadmap && !(file.endsWith('.md') && typeof content === 'string')) {
        throw new Error(`si possono salvare solo file .md e ${ROADMAP_EXT}`)
      }
      if (isRoadmap) checkRoadmap(data)
      if (create && fs.existsSync(abs)) throw Object.assign(new Error(`esiste già: ${file}`), { status: 409 })
      fs.mkdirSync(path.dirname(abs), { recursive: true })
      fs.writeFileSync(abs, isRoadmap ? JSON.stringify(data, null, 2) + '\n' : content)
      return { ok: true }
    },

    'POST /upload': ({ file, data }) => {
      let abs = resolve(file)
      if (!IMAGE_EXT.includes(path.extname(abs).toLowerCase())) {
        throw new Error(`si possono caricare solo immagini (${IMAGE_EXT.join(' ')})`)
      }
      const bytes = Buffer.from(String(data ?? ''), 'base64')
      if (!bytes.length) throw new Error('immagine vuota')
      if (bytes.length > MAX_IMAGE_MB * 1024 * 1024) throw new Error(`immagine troppo grande (massimo ${MAX_IMAGE_MB} MB)`)
      // Never overwrite: another page may already show the image with this name
      const { dir, name, ext } = path.parse(abs)
      for (let i = 2; fs.existsSync(abs); i++) abs = path.join(dir, `${name}-${i}${ext}`)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(abs, bytes)
      return { ok: true, file: rel(abs) }
    },

    'POST /mkdir': ({ dir }) => {
      const abs = resolve(dir)
      if (fs.existsSync(abs)) throw Object.assign(new Error(`esiste già: ${dir}`), { status: 409 })
      fs.mkdirSync(abs, { recursive: true })
      return { ok: true }
    },

    'POST /rename': ({ from, to }) => {
      const src = resolve(from)
      const dst = resolve(to)
      if (!fs.existsSync(src)) throw Object.assign(new Error(`non trovato: ${from}`), { status: 404 })
      // On Windows "sql.md" and "SQL.md" are the same file: changing only the case is allowed
      const caseOnly = src.toLowerCase() === dst.toLowerCase()
      if (fs.existsSync(dst) && !caseOnly) throw Object.assign(new Error(`esiste già: ${to}`), { status: 409 })
      const isDir = fs.statSync(src).isDirectory()
      if (!isDir && from.endsWith(ROADMAP_EXT) !== to.endsWith(ROADMAP_EXT)) {
        throw new Error('una roadmap deve restare .roadmap.json')
      }
      if (!isDir && !isContentFile(to)) throw new Error('il file deve finire con .md')
      if (isDir && dst.startsWith(src + path.sep)) throw new Error('non puoi spostare una cartella dentro sé stessa')
      fs.mkdirSync(path.dirname(dst), { recursive: true })
      move(src, dst)
      const relinked = isDir || from.endsWith('.md') ? relinkRoadmaps(rel(src), rel(dst)) : []
      return { ok: true, relinked }
    },

    'POST /delete': ({ path: target }) => {
      const abs = resolve(target)
      if (!fs.existsSync(abs)) throw Object.assign(new Error(`non trovato: ${target}`), { status: 404 })
      const stamp = new Date().toISOString().replace(/[:.]/g, '-')
      const dst = path.join(trashDir, stamp, rel(abs))
      fs.mkdirSync(path.dirname(dst), { recursive: true })
      const removed = rel(abs)
      move(abs, dst)
      const unlinked = removed.endsWith(ROADMAP_EXT) ? [] : relinkRoadmaps(removed, null)
      return { ok: true, trashed: path.relative(path.dirname(trashDir), dst).split(path.sep).join('/'), unlinked }
    },
  }

  return (req, res, next) => {
    const url = new URL(req.url, 'http://localhost')
    const handler = handlers[`${req.method} ${url.pathname}`]
    if (!handler) return next()

    // Only the app itself may call this: any other web page open in the browser could
    // otherwise send requests to localhost and edit or delete the content
    const origin = req.headers.origin
    const crossSite = req.headers['sec-fetch-site'] === 'cross-site'
    const foreignOrigin = origin && URL.canParse(origin) ? new URL(origin).host !== req.headers.host : Boolean(origin)
    const notJson = req.method === 'POST' && !String(req.headers['content-type']).startsWith('application/json')
    if (crossSite || foreignOrigin || notJson) {
      res.statusCode = 403
      return res.end('richiesta non consentita')
    }

    const reply = (status, body) => {
      res.statusCode = status
      if (typeof body === 'string') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(body)
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      }
    }

    let raw = ''
    req.on('data', (chunk) => (raw += chunk))
    req.on('end', () => {
      try {
        const body = raw ? JSON.parse(raw) : {}
        reply(200, handler(body, url.searchParams))
      } catch (err) {
        reply(err.status ?? 400, { error: err.message })
      }
    })
  }
}
