import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { useState, useMemo } from 'react';
import { Lodgings } from '.';
import { ApiResponse, Lodging } from '../../@types/types';
import { IconOpen } from '../../assets';
import {
  BreadCrumb,
  BreadCrumbItem,
  Button,
  FasilitasIcon,
  Footer,
  Header,
  InfoDetail,
  LoadingPage,
  OpenHour,
} from '../../components';
import { DayHashMap, urlApi } from '../../helpers';

interface StaticProps {
  initialData: ApiResponse<Lodging>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlApi + '/lodgings');

  const data: Lodgings = await res.json();

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

  const res = await fetch(urlApi + `/lodging?id=${id}&slug=${slug}`);

  const initialData: ApiResponse<Lodging> = await res.json();

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

const PenginapanDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const [openHour, setOpenHour] = useState<boolean>(false);

  const {
    image,
    name,
    operation_time,
    price,
    short_description,
    description,
    links,
    facilities,
  } = initialData.data;

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

  const router = useRouter();
  if (router.isFallback) return <LoadingPage />;

  return (
    <>
      {openHour && (
        <OpenHour onClose={() => setOpenHour(false)} title={name} operationTime={operation_time} />
      )}
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/penginapan">Penginapan</BreadCrumbItem>
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
              Rp {numeral(price.value).format('0,0')}/{price.unit}
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
            <div className="flex items-center mb-10">
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
            <p className="md:text-body text-body-sm text-purple-light mb-5 font-bold">
              Fasilitas :
            </p>
            <div className="grid grid-cols-3 gap-y-10 mb-12">
              {facilities ? (
                facilities?.map(({ icon, name, id }) => (
                  <FasilitasIcon key={id} text={name} src={icon} />
                ))
              ) : (
                <span className="italic text-black">Data fasilitas tidak tersedia</span>
              )}
            </div>
            <InfoDetail description={description} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PenginapanDetailPage;
