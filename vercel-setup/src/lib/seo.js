export function buildCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Ludus Magnus Cariri',
    description: 'Escola de formação de vigilantes com mais de 10 anos de experiência',
    url: process.env.SITE_URL || 'https://formacaodevigilantes.com.br',
    address: { '@type': 'PostalAddress', addressRegion: 'CE', addressCountry: 'BR' },
    offers: { '@type': 'Offer', name: 'Curso de Formação de Vigilante', description: 'Curso completo de 200 horas' }
  }
}
