import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { ApiResponse, Travel } from '../../@types/types';
import {
  BreadCrumb,
  BreadCrumbItem,
  Footer,
  Header,
  InfoDetail,
  LoadingPage,
  RekomendasiTerdekat,
} from '../../components';
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
  const router = useRouter();
  if (router.isFallback) return <LoadingPage />;

  const { data } = initialData;
  const { from, to } = data.operation_time;

  return (
    <>
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
              <Image layout="responsive" width={1200} height={900} src={data.image} />
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
            <p className="text-body-sm md:text-body text-black mb-8">
              Buka {from.day} - {to.day} ({from.time} - {to.time})
            </p>
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
