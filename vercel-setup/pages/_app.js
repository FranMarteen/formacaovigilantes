import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import createEmotionCache from '../src/theme/createEmotionCache'
import theme from '../src/theme/theme'
import { Inter, Lora } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

/* Using Inter as the unified font to align with Vigil App tokens */

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* Insertion point for MUI/Emotion to avoid FOUC */}
        <meta name="emotion-insertion-point" content="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
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
        <div className={`${inter.variable} ${lora.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
