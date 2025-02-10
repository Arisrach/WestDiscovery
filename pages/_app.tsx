import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>West Discovery</title>
        <meta name="description" content="Deskripsi website saya di sini." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
