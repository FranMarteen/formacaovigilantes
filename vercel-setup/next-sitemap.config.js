module.exports = {
  siteUrl: process.env.SITE_URL || 'https://formacaodevigilantes.com.br',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/drafts/*'],
  transform: async (config, url) => {
    return {
      loc: url,
      changefreq: 'weekly',
      priority: url === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: []
    }
  }
}
