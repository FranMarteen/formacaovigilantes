export function ArticleHero({ category, date, readTime, title, subtitle }) {
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
      </div>
    </section>
  )
}
