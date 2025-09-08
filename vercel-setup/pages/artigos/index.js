import SiteLayout from '../../src/layouts/SiteLayout'
import Link from 'next/link'
import { getArticleSlugs, getArticleBySlug } from '../../src/lib/mdx'

export default function ArticlesIndex({ articles }) {
  const breadcrumb = [
    { label: 'Início', href: '/' },
    { label: 'Artigos' }
  ]
  return (
    <SiteLayout title="Artigos e Guias" description="Lista de artigos e guias sobre carreira de vigilante, requisitos, salários e especializações." breadcrumb={breadcrumb} canonicalPath="/artigos">
      <div className="container" style={{padding:'2rem 0'}}>
        <h1 style={{marginBottom:'1rem'}}>Artigos e Guias</h1>
        <p style={{marginBottom:'2rem'}}>Conteúdo atualizado sobre requisitos, formação, salários e evolução na carreira de vigilante.</p>
        <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:'1.25rem'}}>
          {articles.map(a => (
            <li key={a.slug} style={{border:'1px solid #eee', borderRadius:8, padding:'1rem 1.25rem'}}>
              <h2 style={{fontSize:'1.15rem', margin:'0 0 .5rem'}}>
                <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
              </h2>
              <p style={{margin:'0 0 .75rem', fontSize:'.9rem', lineHeight:1.4}}>{a.description}</p>
              <div style={{display:'flex', gap:'1rem', fontSize:'.75rem', opacity:.75}}>
                {a.category && <span>{a.category}</span>}
                {a.readTime && <span>⏱️ {a.readTime} min</span>}
                {a.date && <time dateTime={a.date}>{new Date(a.date).toLocaleDateString('pt-BR')}</time>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const slugs = getArticleSlugs().map(f => f.replace(/\.(html|mdx|md)$/,''))
  const articles = slugs.map(slug => {
    const { frontmatter } = getArticleBySlug(slug)
    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      category: frontmatter.category || null,
      readTime: frontmatter.readTime || null,
      date: frontmatter.date || null
    }
  }).sort((a,b) => (b.date || '').localeCompare(a.date || ''))
  return { props: { articles } }
}
