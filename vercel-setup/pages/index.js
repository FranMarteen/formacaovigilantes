import SiteLayout from '../src/layouts/SiteLayout'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import { getArticleSlugs, getArticleBySlug } from '../src/lib/mdx'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import SearchIcon from '@mui/icons-material/Search'

export default function BlogHome({ articles = [] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')

  // categorias únicas a partir do frontmatter
  const categories = useMemo(() => {
    const set = new Set()
    articles.forEach(a => { if (a.category) set.add(a.category) })
    return ['Todos', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [articles])

  // filtro por busca e categoria
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return articles.filter(a => {
      const catOk = category === 'Todos' || (a.category || '') === category
      const qOk =
        !q ||
        (a.title || '').toLowerCase().includes(q) ||
        (a.description || '').toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [articles, category, search])

  // reveal on scroll
  useEffect(() => {
    const targets = document.querySelectorAll([
      '.blog-hero .container',
      '.posts-grid .post-card'
    ].join(','))
    targets.forEach(el => el.classList.add('reveal'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' })
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <SiteLayout
      title="Blog e Guias | Formação de Vigilantes"
      description="Leituras essenciais sobre carreira, requisitos da PF, remuneração em CCT e especializações para vigilantes no Cariri e RMF."
      canonicalPath="/"
    >
      {/* HERO BLOG */}
      <section className="blog-hero" aria-label="Blog e guias sobre formação de vigilantes">
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
          }}
        >
          <div className="container">
            <Stack spacing={2} sx={{ position: 'relative' }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  background: 'linear-gradient(180deg, #ffffff 0%, #E5E7EB 60%, #C4C9D1 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 12px rgba(219,168,7,0.06)'
                }}
              >
                Blog e Guias de Formação de Vigilantes
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 820 }}>
                Conteúdo direto ao ponto: requisitos PF, salários em CCT, mercado no Cariri/RMF e
                caminhos para empregabilidade formal.
              </Typography>

              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar artigos por título ou descrição..."
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    backdropFilter: 'blur(6px)',
                    backgroundColor: '#fff',
                    borderRadius: 'var(--radius-lg)'
                  }
                }}
              />

              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                {categories.map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    onClick={() => setCategory(c)}
                    color={c === category ? 'primary' : 'default'}
                    variant={c === category ? 'filled' : 'outlined'}
                    sx={{ borderRadius: 9999 }}
                  />
                ))}
              </Stack>
            </Stack>
          </div>
        </Box>
      </section>

      {/* POSTS GRID */}
      <section className="posts-grid" aria-label="Lista de artigos recentes">
        <div className="container">
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {filtered.map((a) => (
                <Grid item xs={12} sm={6} key={a.slug}>
<Card elevation={1} className="post-card">
                    {a.image && (
                      <div style={{ position: 'relative', width: '100%', height: 180, overflow: 'hidden', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
                        <Image
                          src={a.image || '/og-default.jpg'}
                          alt={a.title}
                          fill
                          sizes="(max-width: 600px) 100vw, 50vw"
                          style={{ objectFit: 'cover' }}
                          priority={false}
                        />
                      </div>
                    )}
                    <CardContent>
<Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{
                        '& a': {
                          color: 'text.primary',
                          textDecoration: 'none'
                        },
                        '& a:hover': { color: 'primary.main' },
                        '& a:visited': { color: 'text.primary' }
                      }}
                    >
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
                        {a.date && (
                          <time dateTime={a.date}>
                            {new Date(a.date).toLocaleDateString('pt-BR')}
                          </time>
                        )}
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button
                        component={Link}
                        href={`/artigos/${a.slug}`}
                        size="small"
                        endIcon={<ArticleOutlined />}
                      >
                        Ler artigo
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filtered.length === 0 && (
              <Stack alignItems="center" sx={{ py: 6 }}>
                <Typography variant="body1" color="text.secondary">
                  Nenhum artigo encontrado para sua busca/filtro. Tente limpar os filtros.
                </Typography>
                <Button sx={{ mt: 2 }} variant="outlined" onClick={() => { setSearch(''); setCategory('Todos') }}>
                  Limpar filtros
                </Button>
              </Stack>
            )}
          </Box>
        </div>
      </section>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const slugs = getArticleSlugs().map((f) => f.replace(/\.(html|md|mdx)$/, ''))
  const articles = slugs
    .map((slug) => {
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
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return { props: { articles } }
}
