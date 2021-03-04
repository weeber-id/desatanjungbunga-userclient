import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { Lodgings } from '.';
import { ApiResponse, Lodging } from '../../@types/types';
import {
  BreadCrumb,
  BreadCrumbItem,
  Button,
  FasilitasIcon,
  Footer,
  Header,
  InfoDetail,
} from '../../components';
import { urlApi } from '../../helpers/urlApi';

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
  const router = useRouter();
  if (router.isFallback) return <h1>Loading...</h1>;

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

  return (
    <>
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
              <Image layout="responsive" width={1200} height={900} src={image} />
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
            <p className="md:text-body text-body-sm text-black mb-8">{operation_time}</p>
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
