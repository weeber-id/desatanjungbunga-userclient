import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ApiResponse, Commodity } from '../../@types';
import { DummyMasakan } from '../../assets';
import { Button, CardImage, Footer, Header, Pagination, TextField } from '../../components';
import { urlApi } from '../../helpers/urlApi';

type Commodities = ApiResponse<Commodity[] | null>;

interface StaticProps {
  initialData: Commodities;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/culinaries');

  const initialData: Commodities = await res.json();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const KomoditasPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center font-medium text-h4 lg:text-h2 mt-48 mb-7">Komoditas</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Button customHeight className="lg:mr-11 mr-3 h-8">
            Filter
          </Button>
          <TextField inputClassName="w-full" className="w-full lg:w-auto" variant="search-right" />
        </div>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          className="grid gap-x-12 gap-y-10"
        >
          {initialData.data?.map((commodity) => (
            <CardImage
              key={commodity.id}
              src={DummyMasakan}
              width={1200}
              height={900}
              layout="responsive"
              text={commodity.name}
              hover
            />
          ))}
        </div>
      </section>
      <section className="container mx-auto mb-16 px-10">
        <div className="flex justify-center">
          <Pagination />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default KomoditasPage;
