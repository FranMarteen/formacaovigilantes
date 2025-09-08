import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import createEmotionCache from '../src/theme/createEmotionCache'
import theme from '../src/theme/theme'
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* Insertion point for MUI/Emotion to avoid FOUC */}
        <meta name="emotion-insertion-point" content="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Google Analytics desativado até definir ID real */}
      {false && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `}
          </Script>
        </>
      )}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${montserrat.variable} ${openSans.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
