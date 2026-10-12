import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { linkedPage, pages, resolveLink } from './content.js'

// A code block with a button that copies its text
function CodeBlock({ node, ...props }) {
  const pre = useRef(null)
  const [copied, setCopied] = useState(false)
  const copy = () =>
    navigator.clipboard.writeText(pre.current.textContent.replace(/\n$/, '')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  return (
    <div className="code-block">
      <pre ref={pre} {...props} />
      <button type="button" className="code-copy" onClick={copy}>
        {copied ? 'Copiato' : 'Copia'}
      </button>
    </div>
  )
}

// Renders a markdown file from home/, with its relative links and images resolved against
// its folder. With `onOpen`, a plain click on a link to another page calls onOpen(path)
// instead of leaving the current view. `source` renders unsaved text as if it were the
// file at `path`.
export default function Markdown({ path, onOpen, source = pages[path] ?? '' }) {
  const Link = ({ href: h, node, ...props }) => {
    const target = linkedPage(h, path)
    const external = /^[a-z]+:/i.test(h ?? '')
    const onClick =
      onOpen && target !== null && pages[target] !== undefined
        ? (e) => {
            if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
            e.preventDefault()
            onOpen(target)
          }
        : undefined
    return (
      <a
        href={resolveLink(h, path)}
        onClick={onClick}
        {...(external && { target: '_blank', rel: 'noreferrer' })}
        {...props}
      />
    )
  }
  // Images live next to the page in home/ and are published at /home/<path>
  const Image = ({ src, alt, node, ...props }) => <img src={resolveLink(src, path)} alt={alt ?? ''} loading="lazy" {...props} />

  return (
    <article className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: Link, img: Image, pre: CodeBlock }}>
        {source}
      </ReactMarkdown>
    </article>
  )
}
