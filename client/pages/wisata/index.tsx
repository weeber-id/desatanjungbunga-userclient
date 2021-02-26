import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ApiResponse, Travel } from '../../@types';
import { CardImage, Filter, Footer, Header, Pagination, TextField } from '../../components';
import { urlApi } from '../../helpers/urlApi';

type Travels = ApiResponse<Travel[] | null>;

interface StaticProps {
  initialData: Travels;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/travels');

  const initialData: Travels = await res.json();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const WisataPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center font-medium lg:text-h2 text-h4 mt-48 mb-7">Wisata</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Filter className="lg:mr-11 mr-3 ">Filter</Filter>
          <TextField variant="search-right" className="w-full lg:w-auto" inputClassName="w-full" />
        </div>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          className="grid gap-x-12 gap-y-10"
        >
          {initialData.data?.map((travel) => (
            <CardImage
              key={travel.id}
              src={travel.image}
              width={1200}
              height={900}
              layout="responsive"
              text={travel.name}
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

export default WisataPage;
