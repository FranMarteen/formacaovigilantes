import SiteLayout from '../../src/layouts/SiteLayout'
import { getArticleSlugs, getArticleBySlug } from '../../src/lib/mdx'
import { Breadcrumb } from '../../src/components/Breadcrumb'
import { Timeline } from '../../src/components/Timeline'
import { CostBreakdown } from '../../src/components/CostBreakdown'
import { ArticleHero } from '../../src/components/ArticleHero'
import { ArticleTOC } from '../../src/components/ArticleTOC'
import { buildTOC } from '../../src/lib/toc'
import { RelatedPosts } from '../../src/components/RelatedPosts'

export default function ArticlePage({ html, frontmatter, slug, tocItems, relatedPosts = [] }) {
  const schema = frontmatter.schema || null
  const image = frontmatter.image || undefined
  const description = frontmatter.description || ''
  const title = frontmatter.title || slug
  const timelineSteps = frontmatter.timelineSteps || []
  const costGroups = frontmatter.costGroups || []
  const costTotal = frontmatter.costTotal || null
  const breadcrumb = frontmatter.breadcrumb || []
  const readTime = frontmatter.readTime || null
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : (typeof frontmatter.tags === 'string'
      ? frontmatter.tags.split(',').map(s => s.trim()).filter(Boolean)
      : [])
  const articleMeta = {
    date: frontmatter.date || null,
    lastmod: frontmatter.lastmod || null,
    author: frontmatter.author || null,
    section: frontmatter.category || null,
    tags
  }

  return (
    <SiteLayout title={title} description={description} schema={schema} canonicalPath={`/artigos/${slug}`} image={image} isArticle articleMeta={articleMeta}>
      {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
      <ArticleHero category={frontmatter.category} date={frontmatter.date} readTime={readTime} title={title} subtitle={description} image={frontmatter.image || frontmatter.cover} />
      {tocItems.length > 0 && <ArticleTOC items={tocItems} />}
      <div className='container article-wrapper' dangerouslySetInnerHTML={{ __html: html }} />
      {costGroups.length > 0 && (
        <section id='custos-investimento' className='container'>
          <h2>💰 Custos e Investimento Total</h2>
          <CostBreakdown groups={costGroups} total={costTotal} />
        </section>
      )}
      {timelineSteps.length > 0 && (
        <section id='cronograma-processo' className='container'>
          <h2>📅 Cronograma Completo do Processo</h2>
          <Timeline steps={timelineSteps} />
        </section>
      )}
      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
    </SiteLayout>
  )
}

export async function getStaticPaths() {
  const files = getArticleSlugs()
  return {
    paths: files.map(file => ({ params: { slug: file.replace(/\.(html|mdx|md)$/,'') } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { frontmatter, content, slug } = getArticleBySlug(params.slug)
  const tocItems = buildTOC(content, { costGroups: frontmatter.costGroups, timelineSteps: frontmatter.timelineSteps })

  // Build related posts by category/tags
  const allSlugs = getArticleSlugs().map(f => f.replace(/\.(html|mdx|md)$/,''))
  const currentTags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : (typeof frontmatter.tags === 'string' ? frontmatter.tags.split(',').map(s => s.trim()).filter(Boolean) : [])
  const related = allSlugs
    .filter(s => s !== slug)
    .map(s => {
      const { frontmatter: fm } = getArticleBySlug(s)
      const fmTags = Array.isArray(fm.tags)
        ? fm.tags
        : (typeof fm.tags === 'string' ? fm.tags.split(',').map(t => t.trim()).filter(Boolean) : [])
      const sameCategory = (fm.category || null) && fm.category === (frontmatter.category || null)
      const tagOverlap = fmTags.filter(t => currentTags.includes(t)).length
      const dateStr = fm.date || ''
      const score = (sameCategory ? 2 : 0) + tagOverlap + (dateStr ? 0.1 : 0) // small bias for dated posts
      return {
        slug: s,
        title: fm.title || s,
        description: fm.description || '',
        image: fm.image || fm.cover || null,
        category: fm.category || null,
        date: dateStr,
        score
      }
    })
    .sort((a, b) => b.score - a.score || (b.date || '').localeCompare(a.date || ''))
    .slice(0, 3)
    .map(p => ({ slug: p.slug, title: p.title, description: p.description, image: p.image }))

  return { props: { html: content, frontmatter, slug, tocItems, relatedPosts: related } }
}
