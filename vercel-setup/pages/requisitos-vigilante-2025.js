import { useEffect } from 'react'
import SiteLayout from '../src/layouts/SiteLayout'

export default function RequisitosAlias() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/artigos/requisitos-vigilante-2025')
    }
  }, [])
  return (
    <SiteLayout title="Redirecionando..." description="Redirecionando para requisitos 2025" noIndex canonicalPath="/requisitos-vigilante-2025">
      <meta httpEquiv="refresh" content="0; url=/artigos/requisitos-vigilante-2025" />
      <div className="container" style={{padding:'2rem 0'}}>
        <p>Redirecionando para <a href="/artigos/requisitos-vigilante-2025">Requisitos para ser Vigilante 2025</a>...</p>
      </div>
    </SiteLayout>
  )
}
