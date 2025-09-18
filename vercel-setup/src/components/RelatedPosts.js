import Link from 'next/link'
import Image from 'next/image'

export function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="related-articles" aria-label="Artigos relacionados">
      <div className="container">
        <h3 style={{ marginBottom: '1rem' }}>Artigos relacionados</h3>
        <div className="related-grid">
          {posts.map((p) => (
            <article key={p.slug} className="related-card">
              {p.image && (
                <div style={{ position: 'relative', width: '100%', height: 180 }}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              )}
              <h4>
                <Link href={`/artigos/${p.slug}`}>{p.title}</Link>
              </h4>
              {p.description && <p>{p.description}</p>}
              <div style={{ padding: '0 1.5rem 1.5rem' }}>
                <Link href={`/artigos/${p.slug}`} className="btn-secondary" aria-label={`Ler artigo ${p.title}`}>
                  Ler artigo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
