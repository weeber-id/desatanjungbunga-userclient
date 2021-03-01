import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ApiResponse, HandCraft } from '../../@types';
import { CardImage, Filter, Footer, Header, Pagination, TextField } from '../../components';
import { urlApi } from '../../helpers/urlApi';

export type HandCrafts = ApiResponse<{ data: HandCraft[]; maxPage: number } | null>;

interface StaticProps {
  initialData: HandCrafts;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/handcrafts');

  const initialData: HandCrafts = await res.json();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const KerajinanPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center font-medium text-h4 lg:text-h2 mt-48 mb-7">Kerajinan</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Filter className="lg:mr-11 mr-3 ">Filter</Filter>
          <TextField inputClassName="w-full" className="w-full lg:w-auto" variant="search-right" />
        </div>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          className="grid gap-x-12 gap-y-10"
        >
          {initialData.data.data?.map(({ image, id, slug, name }) => (
            <CardImage
              key={id}
              src={image}
              width={1200}
              height={900}
              layout="responsive"
              text={name}
              hover
              href={`/kerajinan/${slug}@!@${id}`}
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

export default KerajinanPage;
