import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import NProgress from 'nprogress'; //nprogress module
import Head from 'next/head';
import Router from 'next/router';
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/globals.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();
dayjs.extend(relativeTime);
dayjs.locale('id');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Desa Tanjung Bunga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
