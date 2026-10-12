import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { adminApi } from './admin-api.js'

const HOME_DIR = path.resolve('home')
const ROADMAP_EXT = '.roadmap.json'

// On GitHub Actions the site lives under /<repo>/; locally it is served from /
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repo ? `/${repo}/` : '/'

// Every route the app can render: each folder and each .md file under home/,
// and each roadmap at its path without the extension
function collectRoutes(dir, rel = '') {
  if (!fs.existsSync(dir)) return []
  const routes = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relPath = rel ? `${rel}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      routes.push(relPath, ...collectRoutes(path.join(dir, entry.name), relPath))
    } else if (entry.name.endsWith('.md')) {
      routes.push(relPath)
    } else if (entry.name.endsWith(ROADMAP_EXT)) {
      routes.push(relPath.slice(0, -ROADMAP_EXT.length))
    }
  }
  return routes
}

// Other files under home/ (images, PDFs...) that pages link to, served at /home/<path>
function collectAssets(dir, rel = '') {
  if (!fs.existsSync(dir)) return []
  const assets = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const relPath = rel ? `${rel}/${entry.name}` : entry.name
    if (entry.isDirectory()) assets.push(...collectAssets(path.join(dir, entry.name), relPath))
    else if (!entry.name.endsWith('.md') && !entry.name.endsWith(ROADMAP_EXT)) assets.push(relPath)
  }
  return assets
}

// GitHub Pages is static: write a copy of index.html at <route>/index.html so that
// dominio/cartella/file.md is a real page, plus 404.html for unknown paths, and copy
// the files pages refer to (images...) to home/
function staticRoutes() {
  let outDir
  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      for (const route of collectRoutes(HOME_DIR)) {
        const target = path.join(outDir, route)
        fs.mkdirSync(target, { recursive: true })
        fs.writeFileSync(path.join(target, 'index.html'), html)
      }
      fs.writeFileSync(path.join(outDir, '404.html'), html)
      for (const asset of collectAssets(HOME_DIR)) {
        const target = path.join(outDir, 'home', asset)
        fs.mkdirSync(path.dirname(target), { recursive: true })
        fs.copyFileSync(path.join(HOME_DIR, asset), target)
      }
    },
  }
}

// Problems in a roadmap that would break the site: missing or duplicate ids, links to
// nodes or pages that don't exist
function roadmapProblems(doc, pages) {
  if (!doc || !Array.isArray(doc.nodes) || !Array.isArray(doc.edges)) return ['servono le liste "nodes" ed "edges"']
  const problems = []
  const ids = new Set()
  for (const n of doc.nodes) {
    if (typeof n?.id !== 'string' || !n.id) problems.push(`un nodo non ha "id": ${JSON.stringify(n)}`)
    else if (ids.has(n.id)) problems.push(`id di nodo ripetuto: "${n.id}"`)
    else ids.add(n.id)
    if (n?.page && pages[n.page] === undefined) problems.push(`il nodo "${n.label ?? n.id}" è collegato a home/${n.page}, che non esiste`)
  }
  const edgeIds = new Set()
  for (const e of doc.edges) {
    if (typeof e?.id !== 'string' || !e.id || edgeIds.has(e.id)) problems.push(`collegamento senza "id" o con id ripetuto: ${JSON.stringify(e)}`)
    else edgeIds.add(e.id)
    if (!ids.has(e?.source) || !ids.has(e?.target)) problems.push(`il collegamento "${e?.id}" unisce nodi che non esistono`)
  }
  return problems
}

// Everything under home/ as one module: `virtual:home-content` exports
// pages ({ 'a/b.md': '# ...' }) and roadmaps ({ 'a/x.roadmap.json': { ... } }).
// Used instead of import.meta.glob so that adding or removing files doesn't go through
// Vite's own HMR, which would remount the admin editors and lose unsaved work.
const HOME_MODULE = 'virtual:home-content'
const RESOLVED_HOME_MODULE = '\0' + HOME_MODULE

function homeContent() {
  let building = false
  return {
    name: 'home-content',
    configResolved(config) {
      building = config.command === 'build'
    },
    resolveId: (id) => (id === HOME_MODULE ? RESOLVED_HOME_MODULE : undefined),
    load(id) {
      if (id !== RESOLVED_HOME_MODULE) return
      const pages = {}
      const roadmaps = {}
      const problems = []
      const walk = (dir, rel = '') => {
        if (!fs.existsSync(dir)) return
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          if (e.name.startsWith('.')) continue
          const relPath = rel ? `${rel}/${e.name}` : e.name
          const abs = path.join(dir, e.name)
          if (e.isDirectory()) walk(abs, relPath)
          else if (e.name.endsWith('.md')) pages[relPath] = fs.readFileSync(abs, 'utf8')
          else if (e.name.endsWith(ROADMAP_EXT)) {
            try {
              roadmaps[relPath] = JSON.parse(fs.readFileSync(abs, 'utf8'))
            } catch (err) {
              problems.push(`home/${relPath} non è un JSON valido: ${err.message}`)
            }
          }
        }
      }
      walk(HOME_DIR)
      for (const [file, doc] of Object.entries(roadmaps)) {
        for (const p of roadmapProblems(doc, pages)) problems.push(`home/${file}: ${p}`)
      }
      // A broken roadmap must not reach the published site: fail the build (and so the
      // pull request check). While editing locally, only warn.
      if (problems.length) {
        const message = `Contenuti non validi:\n  - ${problems.join('\n  - ')}`
        if (building) this.error(message)
        this.warn(message)
        for (const file of Object.keys(roadmaps)) if (!Array.isArray(roadmaps[file]?.nodes)) delete roadmaps[file]
      }
      return `export const pages = ${JSON.stringify(pages)}\nexport const roadmaps = ${JSON.stringify(roadmaps)}\n`
    },
  }
}

// Dev only: the admin pages manage home/ through /__admin/* (see admin-api.js)
function admin() {
  return {
    name: 'admin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__admin', adminApi({ homeDir: HOME_DIR, trashDir: path.resolve('.trash') }))
    },
    // A file under home/ was added, changed or removed: mark the content module stale and
    // tell the browser, which decides what to refresh (see src/main.jsx). No regular HMR,
    // so open editors keep their unsaved work.
    handleHotUpdate({ file, server }) {
      if (!path.resolve(file).startsWith(HOME_DIR + path.sep)) return
      const mod = server.moduleGraph.getModuleById(RESOLVED_HOME_MODULE)
      if (mod) server.moduleGraph.invalidateModule(mod)
      server.ws.send({ type: 'custom', event: 'home:changed', data: { file: path.relative(HOME_DIR, file) } })
      return []
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), homeContent(), staticRoutes(), admin()],
})
