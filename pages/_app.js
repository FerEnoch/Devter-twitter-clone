import AppLayout from '@/components/AppLayout'
import Head from 'next/head'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='description' content='Clon de Twitter por FerEnøch_dev!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}
