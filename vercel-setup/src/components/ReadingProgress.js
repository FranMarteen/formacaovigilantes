import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const doc = document.documentElement
      const max = (doc.scrollHeight || 0) - window.innerHeight
      const val = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
      setProgress(val)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: '100%',
        background: 'transparent',
        zIndex: 2000,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background:
            'linear-gradient(90deg, rgba(219,168,7,1) 0%, rgba(255,215,96,1) 100%)',
          transformOrigin: 'left',
          transition: 'width 120ms ease-out'
        }}
      />
    </div>
  )
}
