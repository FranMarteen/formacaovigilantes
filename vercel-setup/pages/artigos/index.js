import SiteLayout from '../../src/layouts/SiteLayout'
import PostCard from '../../src/components/PostCard'
import Link from 'next/link'
import { getArticleSlugs, getArticleBySlug } from '../../src/lib/mdx'
import { Box, Grid, Typography } from '@mui/material'

export default function ArticlesIndex({ articles }) {
  const breadcrumb = [
    { label: 'Início', href: '/' },
    { label: 'Artigos' }
  ]
  return (
    <SiteLayout title="Artigos e Guias" description="Lista de artigos e guias sobre carreira de vigilante, requisitos, salários e especializações." breadcrumb={breadcrumb} canonicalPath="/artigos">
      <section>
        <div className="container" style={{padding:'2rem 0'}}>
        <h1 style={{marginBottom:'1rem'}}>Guias para entrar no mercado formal de segurança</h1>
        <p style={{marginBottom:'2rem'}}>Conteúdo direto ao ponto: requisitos PF, remuneração em CCT e caminhos para empregabilidade no Cariri e RMF.</p>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {articles.map((a) => (
              <Grid item xs={12} sm={6} key={a.slug}>
                <PostCard article={a} elevation={0} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      </section>
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
      date: frontmatter.date || null,
      image: frontmatter.image || frontmatter.cover || null
    }
  }).sort((a,b) => (b.date || '').localeCompare(a.date || ''))
  return { props: { articles } }
}
