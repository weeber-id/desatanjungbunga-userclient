import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import NProgress from 'nprogress'; //nprogress module
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import { useEffect } from 'react';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();
dayjs.extend(relativeTime);
dayjs.locale('id');

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Wisata Samosir|Desa Tanjung Bunga</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Temukan pengalaman wisata terbaik di Pulau Samosir dan Danau Toba melalui Desa Tanjung Bunga. Pesan secara online penginapan di Desa Tanjung Bunga yang dekat dengan danau Toba di Kab. Samosir. Pesan online Buah segar dan sayuran segar lokal Sumatera Utara. Pesan online kerajinan khas Samosir, Sumatera Utara. Ayo dapatkan pengalaman Adat khas Samosir di Desa Tanjung Bunga."
        />
        <meta
          name="keywords"
          content="Wisata Samosir, akomodasi wisata di pulau samosir, kerajinan khas sumatera utara, komoditas khas sumatera utara, kerajinan khas pulau samosir, booking penginapan di danau toba, desa tanjung bunga"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
