import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>West Discovery</title>
        <meta name="description" content="✨ Tetap Update Info Keuangan & Acara di Discovery Barat! 💸🎊 Pengen tahu update soal keuangan dan acara seru di Discovery Barat? Yuk, cek website! Semua info penting ada di satu tempat, biar gak ketinggalan." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
