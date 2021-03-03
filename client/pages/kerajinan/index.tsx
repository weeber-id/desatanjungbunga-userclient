import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
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
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<'terbaru' | 'terlama' | 'AtoZ'>();
  const [searchTrigger, setSearchTrigger] = useState<number>(1);

  const { data: handcrafts } = useQuery(
    ['handcrafts', searchTrigger, sort],
    () => {
      const queryParams = [];
      if (search) queryParams.push(`search=${search}`);

      if (sort === 'terbaru') queryParams.push('sort_date=asc');
      else if (sort === 'terlama') queryParams.push('sort_date=desc');
      else if (sort === 'AtoZ') queryParams.push('sort_title=asc');

      if (queryParams.length > 0) queryParams[0] = `?${queryParams[0]}`;

      return fetch(urlApi + `/handcrafts${queryParams.join('&')}`).then((res) => res.json());
    },
    {
      initialData,
      keepPreviousData: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTrigger(searchTrigger + 1);
  };

  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center font-medium text-h4 lg:text-h2 mt-48 mb-7">Kerajinan</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Filter onChange={(selected) => setSort(selected)} className="lg:mr-11 mr-3 ">
            Filter
          </Filter>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              inputClassName="w-full"
              className="w-full lg:w-auto"
              variant="search-right"
            />
          </form>
        </div>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div
          style={{
            gridTemplateColumns:
              handcrafts.data.data?.length > 4
                ? 'repeat(auto-fit, minmax(300px, 1fr))'
                : 'repeat(4, 1fr)',
          }}
          className="grid gap-x-12 gap-y-10"
        >
          {handcrafts.data.data?.map(({ image, id, slug, name }) => (
            <CardImage
              key={id}
              src={image}
              width={1200}
              height={900}
              layout="responsive"
              text={name}
              hover
              className="h-full"
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
