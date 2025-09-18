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

// Function to generate Unsplash photo IDs based on article content
function getUnsplashPhotoId(title, category, index) {
  const photoIds = {
    // Security-related images
    'security': [
      '1556075798-4e24fb4e7e72', // Security guard
      '1560472354-b33ff7c65e53', // CCTV cameras
      '1556075956-4b3fe2d58b27', // Security badge
      '1556076044-4d5444b1f2a9', // Security uniform
      '1517077177-4e9d2be3b2e8', // Security equipment
      '1587825140-4d7c9e8c5c1d'  // Night security
    ],
    // Career-related images
    'carreira': [
      '1507003211-a457f11a10f4', // Professional person
      '1560472355-5b3fe2d58b29', // Career growth
      '1556076087-4d5444b1f2b1', // Training classroom
      '1517077178-4e9d2be3b2f0'  // Job interview
    ],
    // Technology images
    'tecnologia': [
      '1518709268-fd8bfd0e32d1', // Modern technology
      '1560472356-5b3fe2d58b30', // IoT devices
      '1556076088-4d5444b1f2b2'  // Tech equipment
    ],
    // Market/employment images
    'mercado': [
      '1486406146-b7c21cc9b979', // Business/market
      '1560472357-5b3fe2d58b31', // Employment
      '1556076089-4d5444b1f2b3'  // Professional meeting
    ],
    // Legal/requirements images
    'legislacao': [
      '1589994459-c1e1fc2a27f2', // Documents/legal
      '1560472358-5b3fe2d58b32', // Legal books
      '1556076090-4d5444b1f2b4'  // Official documents
    ],
    // Default fallback images
    'default': [
      '1556075798-4e24fb4e7e72', // Security guard
      '1507003211-a457f11a10f4', // Professional
      '1518709268-fd8bfd0e32d1', // Technology
      '1486406146-b7c21cc9b979', // Business
      '1589994459-c1e1fc2a27f2', // Documents
      '1517077177-4e9d2be3b2e8'  // Equipment
    ]
  }

  // Determine category key
  let categoryKey = 'default'
  if (category) {
    const cat = category.toLowerCase()
    if (cat.includes('carreira') || cat.includes('salario')) categoryKey = 'carreira'
    else if (cat.includes('tecnologia') || cat.includes('iot')) categoryKey = 'tecnologia'
    else if (cat.includes('mercado') || cat.includes('emprego')) categoryKey = 'mercado'
    else if (cat.includes('legislacao') || cat.includes('requisito')) categoryKey = 'legislacao'
    else categoryKey = 'security'
  } else if (title) {
    const t = title.toLowerCase()
    if (t.includes('carreira') || t.includes('salário') || t.includes('ganha')) categoryKey = 'carreira'
    else if (t.includes('tecnologia') || t.includes('iot') || t.includes('ia')) categoryKey = 'tecnologia'
    else if (t.includes('mercado') || t.includes('emprego') || t.includes('oportunidade')) categoryKey = 'mercado'
    else if (t.includes('requisito') || t.includes('lei') || t.includes('estatuto')) categoryKey = 'legislacao'
    else categoryKey = 'security'
  }

  const photos = photoIds[categoryKey] || photoIds['default']
  return photos[index % photos.length]
}

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
      <section className="features-section" id="por-que-ludus">
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

          <div className="articles-grid">
            {filtered.slice(0, 6).map((a, index) => {
              // Generate Unsplash image URL based on article content
              const unsplashImageUrl = `https://images.unsplash.com/photo-${getUnsplashPhotoId(a.title, a.category, index)}?w=400&h=250&fit=crop&auto=format&q=80`;
              
              return (
                <article key={a.slug} className="article-card">
                  <div className="article-image">
                    <Image
                      src={a.image || unsplashImageUrl}
                      alt={a.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      priority={false}
                    />
                    {a.category && (
                      <div className="article-category">{a.category}</div>
                    )}
                  </div>
                  
                  <div className="article-content">
                    <div className="article-meta">
                      {a.readTime && (
                        <span className="read-time">
                          <AccessTimeOutlined fontSize="small" />
                          {a.readTime} min
                        </span>
                      )}
                      {a.date && (
                        <time className="article-date">
                          {new Date(a.date).toLocaleDateString('pt-BR')}
                        </time>
                      )}
                    </div>
                    
                    <h3 className="article-title">
                      <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
                    </h3>
                    
                    <p className="article-excerpt">
                      {a.description}
                    </p>
                    
                    <div className="article-footer">
                      <Button
                        component={Link}
                        href={`/artigos/${a.slug}`}
                        className="read-more-btn"
                        endIcon={<ArticleOutlined />}
                      >
                        Ler artigo
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

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

      {/* REQUISITOS SECTION */}
      <section className="requisitos-section" id="requisitos">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" component="h2" className="section-title">
              Requisitos para ser Vigilante
            </Typography>
            <Typography variant="body1" className="section-intro">
              Confira os requisitos essenciais para ingressar no curso e iniciar sua carreira na segurança privada.
            </Typography>
          </Box>

          <div className="requisitos-grid">
            <Card className="requisito-card">
              <CardContent>
                <div className="req-icon">👤</div>
                <Typography variant="h3" component="h3">
                  Idade e Escolaridade
                </Typography>
                <Typography variant="body2">
                  Ter no mínimo 18 anos completos e ensino fundamental completo (9º ano).
                </Typography>
              </CardContent>
            </Card>

            <Card className="requisito-card">
              <CardContent>
                <div className="req-icon">🏥</div>
                <Typography variant="h3" component="h3">
                  Aptidão Física e Mental
                </Typography>
                <Typography variant="body2">
                  Apresentar atestado médico e psicológico que comprove aptidão para a função.
                </Typography>
              </CardContent>
            </Card>

            <Card className="requisito-card">
              <CardContent>
                <div className="req-icon">📋</div>
                <Typography variant="h3" component="h3">
                  Antecedentes Criminais
                </Typography>
                <Typography variant="body2">
                  Não ter antecedentes criminais e apresentar certidões negativas da Justiça.
                </Typography>
              </CardContent>
            </Card>

            <Card className="requisito-card">
              <CardContent>
                <div className="req-icon">🎓</div>
                <Typography variant="h3" component="h3">
                  Curso de Formação
                </Typography>
                <Typography variant="body2">
                  Concluir curso de formação de 120h em escola credenciada pela Polícia Federal.
                </Typography>
              </CardContent>
            </Card>

            <Card className="requisito-card">
              <CardContent>
                <div className="req-icon">🔫</div>
                <Typography variant="h3" component="h3">
                  Porte de Arma (Opcional)
                </Typography>
                <Typography variant="body2">
                  Para vigilantes armados, necessário curso adicional e registro na Polícia Federal.
                </Typography>
              </CardContent>
            </Card>

            <Card className="requisito-card">
              <CardContent>
                <div className="req-icon">💼</div>
                <Typography variant="h3" component="h3">
                  Registro Profissional
                </Typography>
                <Typography variant="body2">
                  Após aprovação, solicitar registro de vigilante na Polícia Federal da região.
                </Typography>
              </CardContent>
            </Card>
          </div>

          <Box textAlign="center" mt={6}>
            <div className="cta-banner">
              <Typography variant="h3" component="h3">
                Atende todos os requisitos?
              </Typography>
              <Typography variant="body1">
                Então você está pronto para se tornar um vigilante profissional!
              </Typography>
              <Button
                variant="contained"
                size="large"
                className="btn-primary btn-large"
                href="https://www.ludusmagnusvigilantes.com.br/landing/loja"
                target="_blank"
                rel="noopener"
                endIcon={<OpenInNewIcon />}
                sx={{ mt: 2 }}
              >
                Iniciar Matrícula
              </Button>
            </div>
          </Box>
        </Container>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section" id="faq">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" component="h2" className="section-title">
              Perguntas Frequentes
            </Typography>
            <Typography variant="body1" className="section-intro">
              Esclareça suas principais dúvidas sobre o curso e a profissão de vigilante.
            </Typography>
          </Box>

          <div className="faq-container">
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => {
                e.currentTarget.classList.toggle('active');
                const answer = e.currentTarget.nextElementSibling;
                if (answer.style.display === 'block') {
                  answer.style.display = 'none';
                } else {
                  answer.style.display = 'block';
                }
              }}>
                <span>Qual é a duração do curso de formação?</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer" style={{ display: 'none' }}>
                O curso de formação de vigilantes tem duração de 120 horas, divididas entre aulas teóricas e práticas, conforme determinação da Polícia Federal.
              </div>
            </div>

            <div className="faq-item">
              <button className="faq-question" onClick={(e) => {
                e.currentTarget.classList.toggle('active');
                const answer = e.currentTarget.nextElementSibling;
                if (answer.style.display === 'block') {
                  answer.style.display = 'none';
                } else {
                  answer.style.display = 'block';
                }
              }}>
                <span>Posso trabalhar imediatamente após o curso?</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer" style={{ display: 'none' }}>
                Após concluir o curso, você deve solicitar o registro de vigilante na Polícia Federal. Com o registro em mãos, já pode começar a trabalhar.
              </div>
            </div>

            <div className="faq-item">
              <button className="faq-question" onClick={(e) => {
                e.currentTarget.classList.toggle('active');
                const answer = e.currentTarget.nextElementSibling;
                if (answer.style.display === 'block') {
                  answer.style.display = 'none';
                } else {
                  answer.style.display = 'block';
                }
              }}>
                <span>Qual é o salário médio de um vigilante?</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer" style={{ display: 'none' }}>
                O salário varia conforme a região e especialização, mas no Ceará fica entre R$ 1.400 a R$ 2.800, podendo ser maior com especializações.
              </div>
            </div>

            <div className="faq-item">
              <button className="faq-question" onClick={(e) => {
                e.currentTarget.classList.toggle('active');
                const answer = e.currentTarget.nextElementSibling;
                if (answer.style.display === 'block') {
                  answer.style.display = 'none';
                } else {
                  answer.style.display = 'block';
                }
              }}>
                <span>É obrigatório ser armado?</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer" style={{ display: 'none' }}>
                Não. Existem vagas para vigilantes desarmados e armados. Para trabalhar armado, é necessário curso adicional de extensão em armamento e tiro.
              </div>
            </div>
          </div>
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
