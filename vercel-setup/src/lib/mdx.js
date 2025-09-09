import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

// Ajuste: permitir que a pasta `content` esteja no mesmo nível da pasta do projeto (../content) quando não encontrada localmente
const projectRoot = process.cwd()
let contentDir = path.join(projectRoot, 'content')
if (!fs.existsSync(contentDir)) {
  const alt = path.join(projectRoot, '..', 'content')
  if (fs.existsSync(alt)) contentDir = alt
}

function getClusterDir() { return path.join(contentDir, 'cluster-ingressando') }

export function getArticleSlugs() {
  const clusterDir = getClusterDir()
  if (!fs.existsSync(clusterDir)) return [] // fallback silencioso
  const files = fs.readdirSync(clusterDir)
  // Agrupar por basename e priorizar .mdx > .md > .html
  const map = new Map()
  files.forEach(f => {
    if (!/(\.mdx|\.md|\.html)$/.test(f)) return
    const base = f.replace(/\.(mdx|md|html)$/,'')
    const current = map.get(base)
    const priority = f.endsWith('.mdx') ? 3 : f.endsWith('.md') ? 2 : 1
    if (!current || priority > current.priority) {
      map.set(base, { file: f, priority })
    }
  })
  return Array.from(map.values()).map(v => v.file)
}

function computeReadTime(text) {
  if (!text) return 1
  const plain = text
    .replace(/<[^>]+>/g, ' ') // remove tags
    .replace(/`[^`]*`/g, ' ') // remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // markdown links keep label
    .replace(/[#>*_~`-]/g, ' ') // markdown symbols
  const words = plain.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200)) // 200 wpm
}

function injectSubHeadingIds(html) {
  if (!html) return html
  return html.replace(/<section([^>]*)id="([^"]+)"([^>]*)>([\s\S]*?)<\/section>/gi, (full, pre1, sectionId, pre2, inner) => {
    let h3Index = 0
    const newInner = inner.replace(/<h3([^>]*)>([\s\S]*?)<\/h3>/gi, (h3Full, h3Attrs, h3Content) => {
      if (/id="[^"]+"/i.test(h3Attrs)) return h3Full // já tem id
      const newId = `${sectionId}-sub-${++h3Index}`
      return `<h3 id="${newId}"${h3Attrs}>${h3Content}</h3>`
    })
    return `<section${pre1}id="${sectionId}"${pre2}>${newInner}</section>`
  })
}

export function getArticleBySlug(slugOrFile) {
  const clusterDir = getClusterDir()
  if (!fs.existsSync(clusterDir)) throw new Error('Content directory ausente: cluster-ingressando')
  // Accept direct file or slug
  let targetFile = slugOrFile
  if (!/(\.mdx|\.md|\.html)$/.test(slugOrFile)) {
    const candidates = ['.mdx','.md','.html']
    targetFile = candidates.map(ext => `${slugOrFile}${ext}`).find(f => fs.existsSync(path.join(clusterDir, f)))
    if (!targetFile) throw new Error(`Article not found for slug: ${slugOrFile}`)
  }
  const fullPath = path.join(clusterDir, targetFile)
  const raw = fs.readFileSync(fullPath, 'utf8')
  if (targetFile.endsWith('.html')) {
    const readTime = computeReadTime(raw)
    const processed = injectSubHeadingIds(raw)
    const sanitized = DOMPurify.sanitize(processed, { ADD_TAGS: ['section'] })
    return { frontmatter: { title: targetFile.replace(/\.(html|mdx|md)$/,''), readTime }, content: sanitized, isHtml: true, slug: targetFile.replace(/\.(html|mdx|md)$/,'') }
  }
  const { data, content } = matter(raw)
  const html = marked.parse(content, { mangle: false, headerIds: false })
  const processedHtml = injectSubHeadingIds(html)
  const sanitized = DOMPurify.sanitize(processedHtml, { ADD_TAGS: ['section'] })
  const fm = { ...data }
  if (!fm.readTime) {
    fm.readTime = computeReadTime(content)
  }
  return { frontmatter: fm, content: sanitized, isHtml: false, slug: targetFile.replace(/\.(html|mdx|md)$/,'') }
}
