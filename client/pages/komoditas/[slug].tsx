import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import numeral from 'numeral';
import { ApiResponse, Commodity } from '../../@types/types';
import {
  BreadCrumb,
  BreadCrumbItem,
  Button,
  Footer,
  Header,
  InfoDetail,
  LoadingPage,
  OpenHour,
} from '../../components';
import { Commodities } from './index';
import { urlApi } from '../../helpers/urlApi';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { DayHashMap, defaultOperationTIme } from '../../helpers';
import dayjs from 'dayjs';
import { IconOpen } from '../../assets';
import Head from 'next/head';

interface StaticProps {
  initialData: ApiResponse<Commodity>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlApi + '/culinaries');

  const data: Commodities = await res.json();

  const { id, slug } = !data.data?.data ? { id: '', slug: '' } : data.data.data[0];

  return {
    fallback: true,
    paths: [
      {
        params: { slug: slug + '@!@' + id },
      },
    ],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  const [slug, id] = params.slug.toString().split('@!@');

  const res = await fetch(urlApi + `/culinary?id=${id}&slug=${slug}`);

  const initialData: ApiResponse<Commodity> = await res.json();

  if (initialData.meta.code === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const KomoditasDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const Router = useRouter();

  if (!initialData?.data) {
    // eslint-disable-next-line
    // @ts-ignore
    initialData = {};
    // eslint-disable-next-line
    // @ts-ignore
    initialData.data = {};
  }

  const {
    id = '',
    name = '',
    description = '',
    short_description = '',
    links = [],
    operation_time = { ...defaultOperationTIme },
    price = {
      end: '',
      start: '',
      unit: '',
    },
    image = '',
  } = initialData?.data;

  const [openHour, setOpenHour] = useState<boolean>(false);

  const today = new Date().getDay();
  const todayString = DayHashMap[today];
  const todayOperationTime = operation_time[todayString];

  const isOpen = useMemo(() => {
    const { open } = todayOperationTime;

    const date = dayjs().format('D MMMM YYYY');

    const from = dayjs(new Date(`${date} ${todayOperationTime.from} GMT+0700`)).valueOf();
    const to = dayjs(new Date(`${date} ${todayOperationTime.to} GMT+0700`)).valueOf();
    const now = dayjs().valueOf();

    return open && to > now && from < now;
  }, [todayOperationTime]);

  if (Router.isFallback) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>Produk & Kuliner | {name}</title>
        <meta property="og:site_name" content="Wisata Samosir" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={name} />
        <meta property="og:image" content={image} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={short_description} />
        <meta
          name="keywords"
          content="Wisata Samosir, komoditas khas sumatera utara, buah khas sumatera utara, sayuran khas sumatera utara,  komoditas di pulau samosir, komoditas unggulan danau toba, komoditas unggulan desa tanjung bunga"
        />
      </Head>
      <AnimatePresence exitBeforeEnter>
        {openHour && (
          <OpenHour
            onClose={() => setOpenHour(false)}
            title={name}
            operationTime={operation_time}
          />
        )}
      </AnimatePresence>
      <Header />
      <section className="bg-blue-light mb-16 pt-20 md:pt-[9.5rem]">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/komoditas">Produk & Kuliner</BreadCrumbItem>
            <BreadCrumbItem isActive>{name}</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-10 mb-16">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-16">
          <div>
            <div className="sticky top-24">
              <Image layout="responsive" width={1200} height={900} src={image || '/'} />
            </div>
          </div>
          <div>
            <h3 className="md:text-h3 text-h5 font-medium text-black mb-3">{name}</h3>
            <p className="md:text-body text-body-sm text-purple-light mb-3 font-bold">
              Harga mulai:
            </p>
            <h4 className="md:text-h4 text-h5 text-black font-medium mb-1">
              Rp {numeral(price.start).format('0,0')} ~ {numeral(price.end).format('0,0')}/
              {price.unit}
            </h4>
            <div className="flex items-center mb-8">
              <p className="md:text-body text-body-sm text-black mr-2">
                Jam:&nbsp;
                {isOpen ? (
                  <>
                    <span className="text-[#30AB3D]">Buka &#8226;</span> Tutup pukul{' '}
                    {todayOperationTime.to}
                  </>
                ) : (
                  <>
                    <span className="text-red">Tutup</span>
                  </>
                )}
              </p>
              <button onClick={() => setOpenHour(true)}>
                <IconOpen />
              </button>
            </div>
            <p className="md:text-body text-body-sm text-purple-light mb-3 font-bold">
              Sekilas Tentang {name}
            </p>
            <p className="md:text-body text-body-sm text-black mb-6">{short_description}</p>
            <p className="md:text-body text-body-sm text-purple-light mb-5 font-bold">
              Pesan Sekarang :
            </p>
            <div className="flex items-center mb-12">
              {links.map((link) => {
                if (!link.link.includes('http')) link.link = 'https://' + link.link;

                if (!link.name) return;

                return (
                  <Button isExternal href={link.link} className="mr-6 last:mr-0" key={link.link}>
                    {link.name}
                  </Button>
                );
              })}
            </div>
            <InfoDetail
              title={name}
              content_name="culinary"
              content_id={id}
              description={description}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default KomoditasDetailPage;
