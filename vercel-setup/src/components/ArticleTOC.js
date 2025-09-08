export function ArticleTOC({ items }) {
  if (!items || !items.length) return null
  return (
    <section className='article-toc'>
      <div className='container'>
        <div className='toc-box'>
          <h3>📋 O que você vai aprender neste artigo:</h3>
          <ul>
            {items.map((i, idx) => (
              <li key={idx}>
                <a href={`#${i.id}`}>{i.label}</a>
                {i.children && i.children.length > 0 && (
                  <ul>
                    {i.children.map((c, cIdx) => (
                      <li key={cIdx}><a href={`#${c.id}`}>{c.label}</a></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
