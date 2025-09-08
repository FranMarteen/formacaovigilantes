import SiteLayout from '../src/layouts/SiteLayout'
import { useState } from 'react'

export default function Home() {
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
    <SiteLayout schema={schema}>
      {/* Hero Section */}
      <section className='hero'>
        <div className='container'>
          <div className='hero-content'>
            <h1>Torne-se um <span className='highlight'>Vigilante Profissional</span> em 2025</h1>
            <p className='hero-subtitle'>Curso completo de formação com certificação nacional. <strong>+10 anos formando profissionais</strong> no Cariri e região.</p>
            <div className='hero-stats'>
              <div className='stat'><span className='stat-number'>95%</span><span className='stat-label'>Taxa de Aprovação</span></div>
              <div className='stat'><span className='stat-number'>500+</span><span className='stat-label'>Alunos Formados</span></div>
              <div className='stat'><span className='stat-number'>R$ 2.800</span><span className='stat-label'>Salário Médio</span></div>
            </div>
            <div className='hero-cta'>
              <a href='https://ludusmagnuscariri.com.br' className='btn-primary btn-large'>Comece Sua Carreira Agora</a>
              <a href='#requisitos' className='btn-secondary'>Ver Requisitos</a>
            </div>
          </div>
        </div>
      </section>
      {/* Table of Contents */}
      <section className='toc-section'>
        <div className='container'>
          <h2>📋 Índice do Conteúdo</h2>
          <div className='toc-grid'>
            <div className='toc-item'><h3><a href='#requisitos'>1. Requisitos Básicos</a></h3><p>O que você precisa para iniciar</p></div>
            <div className='toc-item'><h3><a href='#curso'>2. Estrutura do Curso</a></h3><p>200 horas de formação completa</p></div>
            <div className='toc-item'><h3><a href='#especializacoes'>3. Especializações</a></h3><p>Áreas de atuação e crescimento</p></div>
            <div className='toc-item'><h3><a href='#faq'>4. Perguntas Frequentes</a></h3><p>Tire todas as suas dúvidas</p></div>
          </div>
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
            <a href='https://ludusmagnuscariri.com.br' className='btn-primary'>Iniciar Processo</a>
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
          <h2>🚀 Comece Sua Nova Carreira Hoje!</h2>
            <p>Junte-se aos <strong>mais de 500 profissionais</strong> já formados pela Ludus Magnus. Sua oportunidade está aqui!</p>
            <a href='https://ludusmagnuscariri.com.br' className='btn-primary btn-large'>Quero Me Inscrever Agora</a>
        </div>
      </section>
    </SiteLayout>
  )
}
