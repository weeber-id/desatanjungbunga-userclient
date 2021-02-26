import Image from 'next/image';
import numeral from 'numeral';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ApiResponse, Commodity } from '../../@types';
import { DummyMasakan } from '../../assets';
import { BreadCrumb, BreadCrumbItem, Button, Footer, Header, InfoDetail } from '../../components';
import { urlApi } from '../../helpers/urlApi';

interface StaticProps {
  initialData: ApiResponse<Commodity>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {
        params: { slug: 'asdf' },
      },
    ],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/culinary?id=6036fb449ff38f076a43a74f');

  const initialData: ApiResponse<Commodity> = await res.json();

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

const KomoditasDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const {
    name,
    description,
    short_description,
    links,
    operation_time: { from, to },
    price,
  } = initialData.data;

  console.log(initialData.data);

  return (
    <>
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/komoditas">Komoditas</BreadCrumbItem>
            <BreadCrumbItem isActive>{name}</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-10 mb-16">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-16">
          <div>
            <div className="sticky top-24">
              <Image layout="responsive" width={1200} height={900} src={DummyMasakan} />
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
            <p className="md:text-body text-body-sm text-black mb-8">
              Buka {from.day} - {to.day} ({from.time} - {to.time})
            </p>
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

                return (
                  <Button isExternal href={link.link} className="mr-6 last:mr-0" key={link.link}>
                    {link.name}
                  </Button>
                );
              })}
            </div>
            <InfoDetail description={description} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default KomoditasDetailPage;
