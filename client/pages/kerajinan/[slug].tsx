import dayjs from 'dayjs';
import { AnimatePresence } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { useMemo, useState } from 'react';
import { ApiResponse, HandCraft } from '../../@types/types';
import { IconOpen } from '../../assets';
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
import { DayHashMap, defaultOperationTIme } from '../../helpers';
import { urlApi } from '../../helpers/urlApi';
import { HandCrafts } from './index';

interface StaticProps {
  initialData: ApiResponse<HandCraft>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlApi + '/handcrafts');

  const data: HandCrafts = await res.json();

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

  const res = await fetch(urlApi + `/handcraft?id=${id}&slug=${slug}`);

  const initialData: ApiResponse<HandCraft> = await res.json();

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

const KerajinanDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
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
    image = '',
    name = '',
    operation_time = {
      ...defaultOperationTIme,
    },
    price = 0,
    short_description = '',
    description = '',
    links = [],
  } = initialData.data;

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

  if (Router.isFallback) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Kerajinan | {name}</title>
        <meta property="og:site_name" content="Wisata Samosir" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={name} />
        <meta property="og:image" content={image} />
        <meta name="description" content={short_description} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Wisata Samosir, kerajinan khas sumatera utara, kerajinan di pulau samosir, kerajinan di danau toba, kerajinan khas desa tanjung bunga"
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
            <BreadCrumbItem href="/kerajinan">Kerajinan</BreadCrumbItem>
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
              Rp {numeral(price).format('0,0')}
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
              Sekilas Tentang {name} :
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
              <Button className="mr-6">Tokopedia</Button>
            </div>
            <InfoDetail
              title={name}
              content_name="handcraft"
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

export default KerajinanDetailPage;
