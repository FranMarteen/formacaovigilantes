import SiteLayout from '../src/layouts/SiteLayout'
import Link from 'next/link'

export default function Custom404() {
  return (
    <SiteLayout title="Conteúdo não encontrado" description="Página não encontrada">
      <div className="container" style={{padding:'4rem 0'}}>
        <h1 style={{fontSize:'2.25rem', marginBottom:'1rem'}}>Página não encontrada</h1>
        <p>O conteúdo que você procura não existe ou foi movido.</p>
        <ul style={{margin:'1.5rem 0'}}>
          <li><Link href="/">Voltar para a página inicial</Link></li>
          <li><Link href="/artigos/requisitos-vigilante-2025">Ver guia de requisitos 2025</Link></li>
        </ul>
      </div>
    </SiteLayout>
  )
}
