import SiteLayout from '../../src/layouts/SiteLayout'
import Link from 'next/link'
import { getArticleSlugs, getArticleBySlug } from '../../src/lib/mdx'
import { Box, Card, CardContent, CardActions, Typography, Stack, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'

export default function ArticlesIndex({ articles }) {
  const breadcrumb = [
    { label: 'Início', href: '/' },
    { label: 'Artigos' }
  ]
  return (
    <SiteLayout title="Artigos e Guias" description="Lista de artigos e guias sobre carreira de vigilante, requisitos, salários e especializações." breadcrumb={breadcrumb} canonicalPath="/artigos">
      <section className="section-dark">
        <div className="container" style={{padding:'2rem 0'}}>
        <h1 style={{marginBottom:'1rem'}}>Guias para entrar no mercado formal de segurança</h1>
        <p style={{marginBottom:'2rem'}}>Conteúdo direto ao ponto: requisitos PF, remuneração em CCT e caminhos para empregabilidade no Cariri e RMF.</p>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {articles.map((a) => (
              <Grid xs={12} sm={6} key={a.slug}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {a.description}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ opacity: 0.85, fontSize: '.85rem' }}>
                      {a.category && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <CategoryOutlined fontSize="small" /> <span>{a.category}</span>
                        </Stack>
                      )}
                      {a.readTime && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <AccessTimeOutlined fontSize="small" /> <span>{a.readTime} min</span>
                        </Stack>
                      )}
                      {a.date && <time dateTime={a.date}>{new Date(a.date).toLocaleDateString('pt-BR')}</time>}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} href={`/artigos/${a.slug}`} size="small" endIcon={<ArticleOutlined />}>
                      Ler artigo
                    </Button>
                  </CardActions>
                </Card>
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
      date: frontmatter.date || null
    }
  }).sort((a,b) => (b.date || '').localeCompare(a.date || ''))
  return { props: { articles } }
}
