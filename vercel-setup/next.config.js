/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next-build',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  env: {
    SITE_URL: 'https://formacaodevigilantes.com.br',
    LUDUS_MAGNUS_URL: 'https://www.ludusmagnusvigilantes.com.br'
  }
  // redirects removidos (static export já possui página alias)
}

module.exports = nextConfig
