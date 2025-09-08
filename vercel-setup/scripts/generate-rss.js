#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { getArticleSlugs, getArticleBySlug } from '../src/lib/mdx.js'

const siteUrl = process.env.SITE_URL || 'https://formacaodevigilantes.com.br'

function iso(dateStr) {
  try { return new Date(dateStr).toUTCString() } catch { return new Date().toUTCString() }
}

function buildFeed() {
  const slugFiles = getArticleSlugs()
  if (!slugFiles.length) {
    console.warn('[RSS] Nenhum artigo encontrado (cluster-ingressando). Feed vazio gerado.')
  }
  const slugs = slugFiles.map(f => f.replace(/\.(html|mdx|md)$/,''))
  const itemsXml = slugs.map(slug => {
    try {
      const { frontmatter } = getArticleBySlug(slug)
      const url = `${siteUrl.replace(/\/$/,'')}/artigos/${slug}`
      const title = (frontmatter.title || slug).replace(/&/g,'&amp;')
      const description = (frontmatter.description || '').replace(/&/g,'&amp;')
      const pubDate = iso(frontmatter.date || frontmatter.updated || Date.now())
      return `<item><title>${title}</title><link>${url}</link><guid>${url}</guid><pubDate>${pubDate}</pubDate><description><![CDATA[${description}]]></description></item>`
    } catch (e) {
      console.error(`[RSS] Falha ao processar slug ${slug}:`, e.message)
      return ''
    }
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n<title>Formação de Vigilantes - Artigos</title>\n<link>${siteUrl}</link>\n<description>Artigos sobre carreira, formação e salários de vigilantes</description>\n<language>pt-BR</language>\n${itemsXml}\n</channel>\n</rss>`
}

const outDir = path.join(process.cwd(), 'out')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
fs.writeFileSync(path.join(outDir, 'feed.xml'), buildFeed(), 'utf8')
console.log('RSS feed gerado em out/feed.xml')
