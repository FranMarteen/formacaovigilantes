import Head from 'next/head'
import Link from 'next/link'

export default function SiteLayout({ children, title, description, schema, canonicalPath, noIndex, image, breadcrumb }) {
  const siteUrl = process.env.SITE_URL || 'https://formacaodevigilantes.com.br'
  const brand = 'Formação de Vigilantes'
  const brandSuffix = 'Ludus Magnus Cariri'

  // Normalização de título
  const providedTitle = title || `${brand} - ${brandSuffix}`
  const hasBrand = /formação de vigilantes/i.test(providedTitle)
  let baseTitle = providedTitle
    .replace(/\s+/g,' ') // espaços
    .trim()
  // Evitar duplicação de marca múltipla
  baseTitle = baseTitle.replace(new RegExp(`(\s*[-|–]\s*${brand}.*)$`, 'i'), '')
  let finalTitle = hasBrand ? baseTitle : `${baseTitle} | ${brand}`
  // Truncar se ultrapassar ~65 chars (mantendo a marca)
  if (finalTitle.length > 65) {
    const parts = finalTitle.split('|')
    const core = parts[0].trim()
    const tail = parts[1] ? ` | ${parts[1].trim()}` : ''
    const maxCore = 65 - tail.length
    const truncatedCore = core.length > maxCore ? core.slice(0, maxCore - 1).split(' ').slice(0, -1).join(' ') : core
    finalTitle = `${truncatedCore}${tail}`.trim()
  }

  // Normalização de description
  const rawDescription = description || 'Curso de formação de vigilantes com certificação. Inicie sua carreira na segurança privada.'
  let cleanDescription = rawDescription
    .replace(/\s+/g,' ') // collapse spaces
    .trim()
  if (cleanDescription.length > 160) {
    // Tentar cortar em limite de palavra antes de 155-160
    const slice = cleanDescription.slice(0, 155)
    const lastSpace = slice.lastIndexOf(' ')
    cleanDescription = `${slice.slice(0, lastSpace > 60 ? lastSpace : 155)}…`
  }

  const canonical = canonicalPath ? `${siteUrl.replace(/\/$/,'')}${canonicalPath.startsWith('/')?canonicalPath:`/${canonicalPath}`}` : siteUrl
  const ogImage = image || `${siteUrl.replace(/\/$/,'')}/og-default.jpg`

  // Montagem de schemas combinados (schema passado + breadcrumb)
  const schemas = []
  if (schema) {
    if (Array.isArray(schema)) schemas.push(...schema)
    else schemas.push(schema)
  }
  if (breadcrumb && Array.isArray(breadcrumb) && breadcrumb.length) {
    const breadcrumbItems = breadcrumb.map((b, idx) => {
      const itemUrl = b.href ? `${siteUrl.replace(/\/$/,'')}${b.href.startsWith('/')?b.href:`/${b.href}`}` : (idx === breadcrumb.length -1 ? canonical : siteUrl)
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: b.label || b.name || `Nível ${idx+1}`,
        item: itemUrl
      }
    })
    schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbItems })
  }

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{finalTitle}</title>
        <meta name='description' content={cleanDescription} />
        {noIndex && <meta name='robots' content='noindex, nofollow' />}
        <link rel='canonical' href={canonical} />
        {/* Open Graph */}
        <meta property='og:site_name' content={brand} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={finalTitle} />
        <meta property='og:description' content={cleanDescription} />
        <meta property='og:url' content={canonical} />
        <meta property='og:image' content={ogImage} />
        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={finalTitle} />
        <meta name='twitter:description' content={cleanDescription} />
        <meta name='twitter:image' content={ogImage} />
        {schemas.length > 0 && (
          <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }} />
        )}
      </Head>

      <header className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <span className="brand-text" aria-label="Página inicial - Ludus Magnus Cariri">Ludus Magnus Cariri</span>
            </Link>
          </div>
          <nav className="navbar-nav" aria-label="Navegação principal">
            <Link href="#requisitos">Requisitos</Link>
            {/* Removidos links quebrados (#curso, #especializacoes) até criação das seções */}
            <Link href="#faq">FAQ</Link>
            <a href="https://ludusmagnuscariri.com.br" className="btn-primary">Matricule-se</a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Ludus Magnus Cariri</h3>
              <p>Formando profissionais de segurança há mais de 10 anos</p>
            </div>
            <div className="footer-links">
              <h4>Links</h4>
              <Link href="#requisitos">Requisitos</Link>
              <Link href="#curso">Estrutura do Curso</Link>
              <Link href="#especializacoes">Especializações</Link>
            </div>
            <div className="footer-contact">
              <h4>Contato</h4>
              <p>📞 (88) 9999-9999</p>
              <p>📧 contato@ludusmagnuscariri.com.br</p>
              <p>📍 Cariri - CE</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Ludus Magnus Cariri. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <a 
        href="https://wa.me/5588999999999?text=Olá! Gostaria de mais informações sobre os cursos de formação de vigilantes." 
        className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp" title="Conversar no WhatsApp">💬</a>
    </>
  )
}
