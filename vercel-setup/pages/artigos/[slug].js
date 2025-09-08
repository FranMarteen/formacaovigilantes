import SiteLayout from '../../src/layouts/SiteLayout'
import { getArticleSlugs, getArticleBySlug } from '../../src/lib/mdx'
import { Breadcrumb } from '../../src/components/Breadcrumb'
import { Timeline } from '../../src/components/Timeline'
import { CostBreakdown } from '../../src/components/CostBreakdown'
import { ArticleHero } from '../../src/components/ArticleHero'
import { ArticleTOC } from '../../src/components/ArticleTOC'
import { buildTOC } from '../../src/lib/toc'

export default function ArticlePage({ html, frontmatter, slug, tocItems }) {
  const schema = frontmatter.schema || null
  const image = frontmatter.image || undefined
  const description = frontmatter.description || ''
  const title = frontmatter.title || slug
  const timelineSteps = frontmatter.timelineSteps || []
  const costGroups = frontmatter.costGroups || []
  const costTotal = frontmatter.costTotal || null
  const breadcrumb = frontmatter.breadcrumb || []
  const readTime = frontmatter.readTime || null

  return (
    <SiteLayout title={title} description={description} schema={schema} canonicalPath={`/${slug}`} image={image}>
      {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
      <ArticleHero category={frontmatter.category} date={frontmatter.date} readTime={readTime} title={title} subtitle={description} />
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
  return { props: { html: content, frontmatter, slug, tocItems } }
}
