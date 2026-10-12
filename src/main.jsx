import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@xyflow/react/dist/style.css'
import 'github-markdown-css/github-markdown.css'
import './index.css'
import './roadmap/roadmap.css'

// Dev only: a file in home/ changed (see vite.config.js). Reader pages simply reload to
// show it; admin pages hold unsaved work and read files through the API, so they stay put.
if (import.meta.hot) {
  import.meta.hot.on('home:changed', () => {
    if (!window.location.pathname.startsWith(import.meta.env.BASE_URL + 'admin')) window.location.reload()
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
