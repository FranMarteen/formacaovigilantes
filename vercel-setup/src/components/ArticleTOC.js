import { useEffect, useMemo, useState } from 'react'

export function ArticleTOC({ items }) {
  if (!items || !items.length) return null

  const [activeId, setActiveId] = useState(null)

  // Flatten all section/subsection ids for observation
  const allIds = useMemo(() => {
    const ids = []
    items.forEach((i) => {
      if (i?.id) ids.push(i.id)
      if (i?.children?.length) {
        i.children.forEach((c) => {
          if (c?.id) ids.push(c.id)
        })
      }
    })
    return ids
  }, [items])

  // Initialize from hash (if any)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash?.replace('#', '')
    if (hash) setActiveId(hash)
  }, [])

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!allIds.length) return

    const opts = {
      root: null,
      // Trigger when headings enter upper 40% of viewport; favor current section
      rootMargin: '0px 0px -60% 0px',
      threshold: [0.1, 0.25, 0.5]
    }

    const observer = new IntersectionObserver((entries) => {
      // Prefer the entry nearest to the top that is intersecting
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length > 0) {
        const id = visible[0].target.id
        if (id && id !== activeId) setActiveId(id)
      }
    }, opts)

    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [allIds, activeId])

  // Smooth scroll with offset to account for fixed AppBar
  const handleClick = (e, id) => {
    if (typeof window === 'undefined') return
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = 80 // approx AppBar + spacing
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' })
    try {
      history.replaceState(null, '', `#${id}`)
    } catch {}
  }

  return (
    <section className='article-toc' aria-label='Sumário do artigo'>
      <div className='container'>
        <div className='toc-box'>
          <h3>📋 O que você vai aprender neste artigo:</h3>
          <nav aria-label='Índice do artigo'>
            <ul>
              {items.map((i, idx) => {
                const parentActive = activeId === i.id || (i.children || []).some((c) => c.id === activeId)
                return (
                  <li key={idx} data-active={parentActive ? 'true' : undefined}>
                    <a
                      href={`#${i.id}`}
                      onClick={(e) => handleClick(e, i.id)}
                      aria-current={activeId === i.id ? 'true' : undefined}
                    >
                      {i.label}
                    </a>
                    {i.children && i.children.length > 0 && (
                      <ul>
                        {i.children.map((c, cIdx) => (
                          <li key={cIdx} data-active={activeId === c.id ? 'true' : undefined}>
                            <a
                              href={`#${c.id}`}
                              onClick={(e) => handleClick(e, c.id)}
                              aria-current={activeId === c.id ? 'true' : undefined}
                            >
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
