import AppLayout from '@/components/AppLayout'
import HeadMetaTags from '@/components/HeadMetaTags'
import Head from 'next/head'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <HeadMetaTags />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}
