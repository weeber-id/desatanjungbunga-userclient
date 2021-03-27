import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { useMemo, useState } from 'react';
import { ApiResponse, Travel } from '../../@types/types';
import { IconOpen } from '../../assets';
import {
  BreadCrumb,
  BreadCrumbItem,
  Footer,
  Header,
  InfoDetail,
  LoadingPage,
  OpenHour,
  RekomendasiTerdekat,
} from '../../components';
import { DayHashMap } from '../../helpers';
import { urlApi } from '../../helpers/urlApi';
import { Travels } from './index';

interface StaticProps {
  initialData: ApiResponse<Travel>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlApi + '/travels');

  const data: Travels = await res.json();

  const { id, slug } = data.data.data[0];

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

  const res = await fetch(urlApi + `/travel?id=${id}&slug=${slug}`);

  const initialData: ApiResponse<Travel> = await res.json();

  if (initialData.meta.code === 404) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const WisataDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const Router = useRouter();

  const { data } = initialData;
  const { operation_time } = data;

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
        <title>Wisata | {data.name}</title>
        <meta name="description" content={data.short_description} />
      </Head>
      {openHour && (
        <OpenHour
          onClose={() => setOpenHour(false)}
          title={data.name}
          operationTime={operation_time}
        />
      )}
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/wisata">Wisata</BreadCrumbItem>
            <BreadCrumbItem isActive>{data.name}</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-10 mb-16">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-16">
          <div>
            <div className="sticky top-24">
              <Image layout="responsive" width={1200} height={900} src={data.image || '/'} />
            </div>
          </div>
          <div>
            <h3 className="md:text-h3 text-h5 font-medium text-black mb-3">{data.name}</h3>
            <p className="text-body-sm md:text-body text-purple-light mb-3 font-bold">
              Harga Masuk:
            </p>
            <h4 className="md:text-h4 text-h5 text-black font-medium mb-1">
              Rp {numeral(data.price).format('0,0')}
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
            <p className="text-body-sm md:text-body text-purple-light mb-3 font-bold">
              Sekilas Tentang {data.name}
            </p>
            <p className="text-body-sm md:text-body text-black mb-11 md:mb-16">
              {data.short_description}
            </p>
            <InfoDetail description={data.description} />
          </div>
        </div>
      </section>
      <RekomendasiTerdekat />
      <Footer />
    </>
  );
};

export default WisataDetailPage;
