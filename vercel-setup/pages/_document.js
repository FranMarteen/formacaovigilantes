import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../src/theme/createEmotionCache'

export default function MyDocument(props) {
  const { emotionStyleTags } = props
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Emotion/MUI SSR insertion point */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
        {/* Favicon/manifest placeholders (add files in /public se desejar) */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// `getInitialProps` custom para coletar estilos do Emotion no SSR e evitar FOUC
MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  // Extrai estilos críticos do Emotion
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
