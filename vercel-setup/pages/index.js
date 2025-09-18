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
  Chip,
  Container
} from '@mui/material'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SchoolIcon from '@mui/icons-material/School'
import SecurityIcon from '@mui/icons-material/Security'
import WorkIcon from '@mui/icons-material/Work'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export default function Home({ articles = [] }) {
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
      '.hero .hero-content',
      '.features-grid .feature-card',
      '.blog-section .post-card'
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
      title="Curso de Formação de Vigilante em Juazeiro do Norte - Ludus Magnus Cariri"
      description="Escola de formação de vigilantes renomada no Cariri. Com instrutores experientes, infraestrutura completa e foco na empregabilidade no mercado de segurança privada em Juazeiro do Norte."
      canonicalPath="/"
    >
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badges">
              <span className="badge">✓ Certificado pelo MTE</span>
              <span className="badge">✓ 10+ Anos de Experiência</span>
              <span className="badge">✓ 95% Empregabilidade</span>
            </div>
            
            <Typography
              variant="h1"
              component="h1"
              className="hero-title"
            >
              Curso de Formação de Vigilante em{' '}
              <span className="highlight">Juazeiro do Norte</span> – Ludus Magnus Cariri
            </Typography>
            
            <Typography variant="body1" className="hero-subtitle">
              Escola de formação de vigilantes renomada no Cariri. Com instrutores experientes, infraestrutura 
              completa e foco na empregabilidade no mercado de segurança privada em Juazeiro do Norte.
            </Typography>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Vigilantes Formados</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Taxa de Aprovação</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Anos de Experiência</span>
              </div>
            </div>

            <div className="hero-cta">
              <Button
                variant="contained"
                size="large"
                className="btn-primary btn-large"
                href="https://www.ludusmagnusvigilantes.com.br/landing/loja"
                target="_blank"
                rel="noopener"
                endIcon={<OpenInNewIcon />}
              >
                Matricule-se Agora
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="btn-secondary btn-large"
                component={Link}
                href="#requisitos"
              >
                Ver Requisitos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section section-dark" id="por-que-ludus">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" component="h2" className="section-title">
              Por que a Ludus Magnus é a sua melhor escolha?
            </Typography>
            <Typography variant="body1" className="section-intro">
              Formamos profissionais prontos para os desafios reais do mercado.
            </Typography>
          </Box>

          <div className="features-grid">
            <Card className="feature-card">
              <CardContent>
                <SchoolIcon className="feature-icon" />
                <Typography variant="h3" component="h3">
                  Instrução de Excelência
                </Typography>
                <Typography variant="body2">
                  Nossa equipe é formada por instrutores especializados com experiência prática no mercado de segurança.
                </Typography>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent>
                <SecurityIcon className="feature-icon" />
                <Typography variant="h3" component="h3">
                  Infraestrutura Completa
                </Typography>
                <Typography variant="body2">
                  Salas de aula modernas e espaços de treinamento equipados com toda tecnologia necessária para uma formação de qualidade.
                </Typography>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent>
                <WorkIcon className="feature-icon" />
                <Typography variant="h3" component="h3">
                  Foco na Empregabilidade
                </Typography>
                <Typography variant="body2">
                  Nossos cursos são desenhados para a realidade do mercado de trabalho no Cariri, com foco em empregabilidade garantida.
                </Typography>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent>
                <TrendingUpIcon className="feature-icon" />
                <Typography variant="h3" component="h3">
                  Conveniência e Segurança
                </Typography>
                <Typography variant="body2">
                  Nosso projeto educacional inclui orientação sobre os procedimentos de segurança e planos de alimentação saudável.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* BLOG SECTION */}
      <section className="blog-section" aria-label="Artigos e guias recentes">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" component="h2" className="section-title">
              Guias e Artigos Recentes
            </Typography>
            <Typography variant="body1" className="section-intro">
              Conteúdo direto ao ponto: requisitos PF, salários em CCT, mercado no Cariri/RMF e
              caminhos para empregabilidade formal.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
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
                maxWidth: 600,
                mx: 'auto',
                '& .MuiOutlinedInput-root': {
                  backdropFilter: 'blur(6px)',
                  backgroundColor: '#fff',
                  borderRadius: 'var(--radius-lg)'
                }
              }}
            />
          </Box>

          <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
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

          <Grid container spacing={3}>
            {filtered.slice(0, 6).map((a) => (
              <Grid item xs={12} sm={6} md={4} key={a.slug}>
                <Card elevation={1} className="post-card">
                  {a.image && (
                    <div style={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
                      <Image
                        src={a.image || '/og-default.jpg'}
                        alt={a.title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        priority={false}
                      />
                    </div>
                  )}
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
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

          {articles.length > 6 && (
            <Box textAlign="center" sx={{ mt: 4 }}>
              <Button
                component={Link}
                href="/artigos"
                variant="outlined"
                size="large"
                endIcon={<ArticleOutlined />}
              >
                Ver Todos os Artigos
              </Button>
            </Box>
          )}

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
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta">
        <div className="container">
          <Typography variant="h2" component="h2">
            Pronto para iniciar sua carreira como vigilante?
          </Typography>
          <Typography variant="body1">
            Junte-se aos mais de 500 profissionais já formados pela Ludus Magnus Cariri.
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="btn-primary btn-large"
            href="https://www.ludusmagnusvigilantes.com.br/landing/loja"
            target="_blank"
            rel="noopener"
            endIcon={<OpenInNewIcon />}
          >
            Matricule-se Agora
          </Button>
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
