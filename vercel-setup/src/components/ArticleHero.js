import Image from 'next/image'
export function ArticleHero({ category, date, readTime, title, subtitle, image }) {
  return (
    <section className='article-hero'>
      <div className='container'>
        <div className='article-meta'>
          {category && <span className='category'>{category}</span>}
          {date && <time dateTime={date}>{new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>}
          {readTime && <span className='read-time'>⏱️ {readTime} min de leitura</span>}
        </div>
        <h1>{title}</h1>
        {subtitle && <p className='article-subtitle'>{subtitle}</p>}
        {image && (
          <div className='article-cover'>
            <Image
              src={image}
              alt={title}
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              fetchPriority="high"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
