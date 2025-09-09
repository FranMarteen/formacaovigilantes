import SiteLayout from '../src/layouts/SiteLayout'
import { useState } from 'react'
import Link from 'next/link'
import { getArticleSlugs, getArticleBySlug } from '../src/lib/mdx'
import { Box, Card, CardContent, CardActions, Typography, Stack, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import TrendingUp from '@mui/icons-material/TrendingUp'
import Business from '@mui/icons-material/Business'
import Gavel from '@mui/icons-material/Gavel'
import ReportProblem from '@mui/icons-material/ReportProblem'
import Verified from '@mui/icons-material/Verified'
import Place from '@mui/icons-material/Place'
import Apartment from '@mui/icons-material/Apartment'
import LocalMall from '@mui/icons-material/LocalMall'
import AttachMoney from '@mui/icons-material/AttachMoney'
import Security from '@mui/icons-material/Security'

export default function Home({ featured = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const toggleFaq = (index) => { setOpenFaq(openFaq === index ? null : index) }
  const faqs = [
    { question: 'Quanto tempo dura o curso de formação de vigilante?', answer: 'O curso de formação tem duração de 200 horas-aula, distribuídas em aproximadamente 8 semanas de treinamento intensivo.' },
    { question: 'Qual o salário médio de um vigilante em 2025?', answer: 'No Ceará, o salário médio varia entre R$ 1.800 a R$ 3.500, dependendo da especialização e local de trabalho.' },
    { question: 'Preciso ter experiência anterior para fazer o curso?', answer: 'Não é necessária experiência anterior. O curso é completo e forma profissionais desde o nível básico.' },
    { question: 'O certificado é válido em todo o Brasil?', answer: 'Sim, o certificado emitido pela Ludus Magnus é reconhecido pela Polícia Federal e válido nacionalmente.' },
    { question: 'Quais especializações posso fazer após a formação?', answer: 'Oferecemos especializações em Segurança Eletrônica, Escolta Armada, Transporte de Valores e Segurança Pessoal.' }
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Ludus Magnus Cariri',
    description: 'Escola de formação de vigilantes com mais de 10 anos de experiência',
    url: 'https://formacaodevigilantes.com.br',
    address: { '@type': 'PostalAddress', addressRegion: 'CE', addressCountry: 'BR' },
    offers: { '@type': 'Offer', name: 'Curso de Formação de Vigilante', description: 'Curso completo de 200 horas' }
  }

  return (
    <SiteLayout
      title="Formação de Vigilantes no Cariri 2025 | Curso Credenciado"
      description="Curso de formação de vigilantes no Cariri (Juazeiro do Norte). Alinhado ao novo Estatuto (Lei 14.967/2024), empregabilidade com mercado em formalização e pacote remuneratório definido por CCT. +10 anos no Cariri."
      schema={schema}
    >
      {/* Hero Section */}
      <section
        className='hero'
        aria-label="Vigilante em treinamento na Ludus Magnus Cariri, representando a formação profissional no Cariri"
      >
        <div className='container'>
          <div className='hero-content'>
            <h1>Formação de Vigilantes no Cariri — Profissionalize-se agora</h1>
            <p className='hero-subtitle'>Mercado em formalização acelerada, fiscalização da PF em alta e remuneração definida em CCT. Formação credenciada no Cariri para entrar no mercado legal.</p>
            <div className='hero-stats'>
              <div className='stat'><span className='stat-number'>Mercado</span><span className='stat-label'>Formalização acelerada no CE</span></div>
              <div className='stat'><span className='stat-number'>CCT</span><span className='stat-label'>Pacote definido e previsível</span></div>
              <div className='stat'><span className='stat-number'>Cariri</span><span className='stat-label'>Vagas exigem certificação PF</span></div>
            </div>
            <div className='hero-cta'>
              <Button variant='contained' color='primary' size='large' href='https://www.ludusmagnusvigilantes.com.br/landing/loja'>
                Comece Sua Carreira Agora
              </Button>
              <Button variant='outlined' color='primary' href='#requisitos'>
                Ver Requisitos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Por que a Ludus Magnus é a sua melhor escolha */}
      <section className="section-dark">
        <div className="container">
          <h2>Por que a Ludus Magnus é a sua melhor escolha?</h2>
          <p className="section-intro" style={{ color: 'rgba(229,231,235,0.9)' }}>
            Formamos profissionais prontos para se destacar mais no mercado.
          </p>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={3}>
                <Card elevation={0}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Verified color="success" /><Typography variant="h6">Instrução de Excelência</Typography>
                    </Stack>
                    <Typography variant="body2">
                      Instrutores experientes e forte base prática para formar profissionais prontos para atuar.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={3}>
                <Card elevation={0}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Apartment color="primary" /><Typography variant="h6">Infraestrutura Completa</Typography>
                    </Stack>
                    <Typography variant="body2">
                      Salas, estande e recursos de primeira para uma experiência de aprendizado superior.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={3}>
                <Card elevation={0}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <TrendingUp color="primary" /><Typography variant="h6">Foco na Empregabilidade</Typography>
                    </Stack>
                    <Typography variant="body2">
                      Conteúdos e práticas voltados às exigências do mercado formal e das empresas autorizadas.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={3}>
                <Card elevation={0}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Security color="primary" /><Typography variant="h6">Conveniência e Segurança</Typography>
                    </Stack>
                    <Typography variant="body2">
                      Processo orientado, apoio em documentação e foco em conformidade com a PF e CCT.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </section>

      {/* Table of Contents */}
      <section className='toc-section'>
        <div className='container'>
          <h2>📋 Índice do Conteúdo</h2>
          <div className='toc-grid'>
            <div className='toc-item'><h3><a href='#mercado'>1. Mercado no Ceará e Cariri (2024/25)</a></h3><p>Crescimento, formalização e demanda real</p></div>
            <div className='toc-item'><h3><a href='#estatuto'>2. Novo Estatuto 14.967/2024</a></h3><p>Por que a certificação é obrigatória</p></div>
            <div className='toc-item'><h3><a href='#oportunidades'>3. Oportunidades no Cariri e RMF</a></h3><p>Juazeiro do Norte em destaque</p></div>
            <div className='toc-item'><h3><a href='#remuneracao'>4. Remuneração (CCT 2024)</a></h3><p>Pacote salarial e benefícios</p></div>
            <div className='toc-item'><h3><a href='#porque-ludus'>5. Por que Ludus Magnus</a></h3><p>Diferenciais e compromisso</p></div>
            <div className='toc-item'><h3><a href='#requisitos'>6. Requisitos Básicos</a></h3><p>O que você precisa para iniciar</p></div>
          </div>
        </div>
      </section>
      {/* Mercado Section */}
      <section id="mercado" className="toc-section">
        <div className="container">
          <h2>📊 Mercado de Segurança Privada: 2024/25</h2>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={4}>
                <Card elevation={1}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <TrendingUp color="primary" /><Typography variant="h6">Crescimento</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      +9,3% de vigilantes contratados no 1º semestre de 2024 no Brasil; recuperação robusta do setor de serviços.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <Card elevation={1}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Business color="primary" /><Typography variant="h6">Dimensão</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      4.978 empresas autorizadas e gasto empresarial anual de R$ 171 bi com proteção patrimonial.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <Card elevation={1}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <ReportProblem color="warning" /><Typography variant="h6">Clandestinidade</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      11,2 mil empresas clandestinas; Nordeste concentra 22% — cenário de formalização acelerada em 2024/25.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </section>

      {/* Estatuto Section */}
      <section id="estatuto" className="toc-section">
        <div className="container">
          <h2>📜 Novo Estatuto 14.967/2024: Profissionalização Obrigatória</h2>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Gavel color="primary" /><Typography variant="h6">Regras Centrais</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Proibida a prestação por autônomos; fiscalização ampliada pela PF; expansão de atividades formais. Formação certificada passa a ser pré-requisito.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Verified color="success" /><Typography variant="h6">Empregabilidade</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Migração acelerada para o mercado legal eleva a demanda por profissionais certificados. Sua formação abre portas nas empresas autorizadas.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Oportunidades CE Section */}
      <section id="oportunidades" className="toc-section">
        <div className="container">
          <h2>🗺️ Oportunidades no Ceará: RMF e Cariri</h2>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Apartment color="primary" /><Typography variant="h6">Região Metropolitana de Fortaleza</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    64% do PIB do estado, alta densidade de ativos (indústria, centros logísticos, shopping centers). Fiscalização ativa e vagas que exigem curso e reciclagem em dia.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Place color="primary" /><Typography variant="h6">Região do Cariri (Juazeiro do Norte)</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Polo econômico em crescimento (comércio, indústria, saúde, educação, turismo). Ações da PF contra clandestinos abrem espaço para mão de obra certificada local.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Cariri em Foco */}
      <section id="cariri" className="toc-section">
        <div className="container">
          <h2>🌄 Cariri em Foco: Oportunidade Local Real</h2>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} lg={3}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Place color="primary" /><Typography variant="h6">Economia Forte</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Segundo polo do CE e motor regional: Juazeiro lidera consumo com potencial de R$ 7,8 bi em 2025.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Verified color="success" /><Typography variant="h6">Formalização</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    PF encerrou 4 empresas clandestinas em Juazeiro (2024). Mercado migra para profissionais certificados.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <LocalMall color="primary" /><Typography variant="h6">Setores em Alta</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Comércio, saúde, educação e turismo religioso ampliam a demanda por segurança profissional.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Security color="primary" /><Typography variant="h6">Empregabilidade</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Vagas exigem curso e reciclagem atualizada. Formação credenciada é o seu passaporte.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Featured Articles */}
      <section className='section-dark'>
        <div className='container'>
          <h2>📰 Artigos em Destaque</h2>
          <Box className='featured-list' sx={{ my: 2 }}>
            <Grid container spacing={2}>
              {featured.map((a) => (
                <Grid xs={12} sm={6} key={a.slug}>
                  <Card elevation={2}>
                    <CardContent>
                      <Typography variant='h6' component='h3' gutterBottom>
                        <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
                      </Typography>
                      <Typography variant='body2' color='text.secondary' gutterBottom>
                        {a.description}
                      </Typography>
                      <Stack direction='row' spacing={2} sx={{ opacity: 0.85, fontSize: '.85rem' }}>
                        {a.category && (
                          <Stack direction='row' spacing={0.5} alignItems='center'>
                            <CategoryOutlined fontSize='small' /> <span>{a.category}</span>
                          </Stack>
                        )}
                        {a.readTime && (
                          <Stack direction='row' spacing={0.5} alignItems='center'>
                            <AccessTimeOutlined fontSize='small' /> <span>{a.readTime} min</span>
                          </Stack>
                        )}
                        {a.date && <time dateTime={a.date}>{new Date(a.date).toLocaleDateString('pt-BR')}</time>}
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button component={Link} href={`/artigos/${a.slug}`} size='small' endIcon={<ArticleOutlined />}>
                        Ler artigo
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack alignItems='center' sx={{ mt: 2 }}>
              <Button component={Link} href="/artigos" variant="outlined" color="secondary">Ver todos os artigos</Button>
            </Stack>
          </Box>
        </div>
      </section>

      {/* Remuneração Section */}
      <section id="remuneracao" className="toc-section">
        <div className="container">
          <h2>💵 Remuneração no Ceará (CCT 2024)</h2>
          <Grid container spacing={2}>
            <Grid xs={12} md={4}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <AttachMoney color="primary" /><Typography variant="h6">Vigilante Patrimonial</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Salário bruto (piso + 30% periculosidade): ~R$ 2.245,44<br/>
                    Vale alimentação: ~R$ 777,92/mês<br/>
                    Pacote total estimado: <strong>~R$ 3.023,36</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Security color="primary" /><Typography variant="h6">Supervisor Operações</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Salário bruto: ~R$ 2.706,33<br/>
                    Vale alimentação: ~R$ 777,92/mês<br/>
                    Pacote total estimado: <strong>~R$ 3.484,25</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <LocalMall color="primary" /><Typography variant="h6">Benefícios e Reciclagem</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Vale refeição/alim. diário, custeio de reciclagem a cada 2 anos pela empresa, e previsibilidade definida em CCT.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Por que Ludus Magnus */}
      <section id="porque-ludus" className="toc-section">
        <div className="container">
          <h2>🏆 Por que Estudar na Ludus Magnus Cariri</h2>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} md={4}>
              <Card elevation={1}><CardContent>
                <Typography variant="h6">Escola Credenciada</Typography>
                <Typography variant="body2" color="text.secondary">Conformidade total com o novo estatuto e exigências da PF.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card elevation={1}><CardContent>
                <Typography variant="h6">Estande de Tiro & Estrutura</Typography>
                <Typography variant="body2" color="text.secondary">Infra prática e instrutores experientes para formação completa.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card elevation={1}><CardContent>
                <Typography variant="h6">Parcerias & Empregabilidade</Typography>
                <Typography variant="body2" color="text.secondary">Relacionamento com empresas formais e apoio no processo com a PF.</Typography>
              </CardContent></Card>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" href="https://www.ludusmagnusvigilantes.com.br/landing/loja">Próximas Turmas</Button>
            <Button variant="outlined" color="secondary" href="/artigos">Ler Guias e Artigos</Button>
          </Stack>
        </div>
      </section>

      {/* Requisitos Section */}
      <section id='requisitos' className='requisitos-section'>
        <div className='container'>
          <h2>📋 Requisitos para ser Vigilante</h2>
          <p className='section-intro'>Para ingressar na carreira de vigilante, você precisa atender aos seguintes requisitos estabelecidos pela Polícia Federal:</p>
          <div className='requisitos-grid'>
            <div className='requisito-card'><div className='req-icon'>📅</div><h3>Idade Mínima</h3><p>Ter completado <strong>18 anos</strong> na data da matrícula</p></div>
            <div className='requisito-card'><div className='req-icon'>📚</div><h3>Escolaridade</h3><p><strong>Ensino fundamental completo</strong> (9º ano concluído)</p></div>
            <div className='requisito-card'><div className='req-icon'>🏥</div><h3>Saúde Mental</h3><p>Certificado de <strong>sanidade mental</strong> expedido por psicólogo</p></div>
            <div className='requisito-card'><div className='req-icon'>💪</div><h3>Aptidão Física</h3><p>Atestado médico de <strong>capacidade física</strong></p></div>
            <div className='requisito-card'><div className='req-icon'>📄</div><h3>Antecedentes</h3><p><strong>Certidão negativa</strong> de antecedentes criminais</p></div>
            <div className='requisito-card'><div className='req-icon'>🎯</div><h3>Curso de Formação</h3><p>Conclusão do <strong>curso de 200 horas</strong> em escola credenciada</p></div>
          </div>
          <div className='cta-banner'>
            <h3>✅ Atende aos requisitos?</h3>
            <p>A Ludus Magnus te acompanha em todo o processo de documentação!</p>
            <Button variant="contained" color="primary" size="large" href='https://www.ludusmagnusvigilantes.com.br/landing/loja'>
              Iniciar Processo
            </Button>
          </div>
        </div>
      </section>
      {/* Curso Section */}
      <section id='curso' className='curso-section'>
        <div className='container'>
          <h2>🎓 Estrutura do Curso de Formação</h2>
          <p className='section-intro'>O programa completo possui 200 horas distribuídas em módulos teóricos e práticos que cobrem legislação, técnicas operacionais, prevenção de perdas, primeiros socorros e tiro.</p>
          <div className='curso-grid'>
            <div className='curso-modulo'><h3>Módulo 1</h3><p>Legislação aplicada e ética profissional.</p></div>
            <div className='curso-modulo'><h3>Módulo 2</h3><p>Noções de segurança privada e procedimentos.</p></div>
            <div className='curso-modulo'><h3>Módulo 3</h3><p>Defesa pessoal, imobilização e técnicas preventivas.</p></div>
            <div className='curso-modulo'><h3>Módulo 4</h3><p>Primeiros socorros e gestão de riscos.</p></div>
            <div className='curso-modulo'><h3>Módulo 5</h3><p>Segurança eletrônica e tecnologias de monitoramento.</p></div>
            <div className='curso-modulo'><h3>Módulo 6</h3><p>Prática de estande / tiro e avaliação final.</p></div>
          </div>
        </div>
      </section>

      {/* Especializações Section */}
      <section id='especializacoes' className='especializacoes-section'>
        <div className='container'>
          <h2>🚀 Especializações Após a Formação</h2>
        <p className='section-intro'>Após concluir a formação básica você pode ampliar seu currículo com cursos complementares que aumentam empregabilidade e faixa salarial.</p>
          <div className='especializacoes-grid'>
            <div className='esp-card'><h3>Segurança Eletrônica</h3><p>Operação e suporte de sistemas de CFTV e alarmes.</p></div>
            <div className='esp-card'><h3>Escolta Armada</h3><p>Procedimentos de proteção em deslocamentos e rotas.</p></div>
            <div className='esp-card'><h3>Transporte de Valores</h3><p>Atuação em carros-fortes com foco em controle e risco.</p></div>
            <div className='esp-card'><h3>Segurança Pessoal</h3><p>Proteção de executivos / pessoas de alto risco.</p></div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id='faq' className='faq-section'>
        <div className='container'>
          <h2>❓ Perguntas Frequentes</h2>
          <div className='faq-container'>
            {faqs.map((faq, index) => (
              <div key={index} className='faq-item'>
                <button aria-expanded={openFaq === index} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`} className={`faq-question ${openFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className='faq-toggle'>{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (<div id={`faq-panel-${index}`} role='region' aria-labelledby={`faq-button-${index}`} className='faq-answer'><p>{faq.answer}</p></div>)}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className='final-cta'>
        <div className='container'>
          <h2>🚀 O Cariri precisa de profissionais certificados</h2>
            <p>Com a fiscalização da PF e a nova lei, as oportunidades estão migrando para o mercado formal. Garanta sua vaga com <strong>formação reconhecida</strong> e remuneração definida em CCT.</p>
            <Button variant="contained" color="primary" size="large" href='https://www.ludusmagnusvigilantes.com.br/landing/loja/checkout3?cursoId=19581a47-1af9-4ff9-9536-19c08e38dc4a'>
              Quero me inscrever no Cariri
            </Button>
        </div>
      </section>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const slugs = getArticleSlugs().map(f => f.replace(/\.(html|md|mdx)$/,''))
  const articles = slugs.map((slug) => {
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
  return { props: { featured: articles.slice(0, 4) } }
}
