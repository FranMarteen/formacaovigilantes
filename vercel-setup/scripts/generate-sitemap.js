/* Minimal sitemap/robots generator for static export without relying on next-sitemap build-manifest.
   It scans content slugs and known static pages and writes sitemap.xml + robots.txt into /public.
*/
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://formacaodevigilantes.com.br');

// Resolve paths
const publicDir = path.join(projectRoot, 'vercel-setup', 'public');
const contentDirLocal = path.join(projectRoot, 'content', 'cluster-ingressando');
const contentDirAlt = path.join(projectRoot, 'vercel-setup', '..', 'content', 'cluster-ingressando');
const contentDir = fs.existsSync(contentDirLocal)
  ? contentDirLocal
  : (fs.existsSync(contentDirAlt) ? contentDirAlt : null);

// Collect routes
const routes = new Set();
const add = (p) => routes.add(p.startsWith('/') ? p : `/${p}`);

// Known static pages
add('/');
add('/artigos');
// These pages exist in repo
if (fs.existsSync(path.join(projectRoot, 'vercel-setup', 'pages', 'requisitos-vigilante-2025.js'))) add('/requisitos-vigilante-2025');
if (fs.existsSync(path.join(projectRoot, 'vercel-setup', 'pages', 'test.js'))) add('/test');

// Article slugs from content
if (contentDir && fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir);
  // group by basename, prefer .mdx > .md > .html (same logic as app)
  const map = new Map();
  for (const f of files) {
    if (!/(\.mdx|\.md|\.html)$/i.test(f)) continue;
    const base = f.replace(/\.(mdx|md|html)$/i, '');
    const priority = f.endsWith('.mdx') ? 3 : (f.endsWith('.md') ? 2 : 1);
    const current = map.get(base);
    if (!current || priority > current.priority) {
      map.set(base, { file: f, priority });
    }
  }
  for (const base of map.keys()) {
    add(`/artigos/${base}`);
  }
}

// Build sitemap.xml
const now = new Date().toISOString();
const urlset = Array.from(routes)
  .sort()
  .map((route) => {
    const loc = `${siteUrl.replace(/\/$/, '')}${route}`;
    const priority = route === '/' ? '1.0' : (route.startsWith('/artigos/') ? '0.8' : '0.7');
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

// Ensure public dir exists
fs.mkdirSync(publicDir, { recursive: true });

// Write sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');

// Write robots.txt (include sitemap reference)
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log(`[sitemap] Generated ${routes.size} routes into ${path.relative(projectRoot, path.join(publicDir, 'sitemap.xml'))}`);
