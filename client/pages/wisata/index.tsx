import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiResponse, Travel } from '../../@types/types';
import { CardImage, Filter, Footer, Header, Pagination, TextField } from '../../components';
import { urlApi } from '../../helpers/urlApi';
import { useMedia } from '../../hooks/useMedia';

export type Travels = ApiResponse<{ data: Travel[]; max_page: number } | null>;

interface StaticProps {
  initialData: Travels;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/travels?content_per_page=12&page=1');

  const initialData: Travels = await res.json();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const WisataPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<'terbaru' | 'terlama' | 'AtoZ'>();
  const [searchTrigger, setSearchTrigger] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isMedium = useMedia({ query: '(min-width: 768px)' });
  const isSmall = useMedia({ query: '(max-width: 520px)' });

  const { data: travels, isLoading } = useQuery(
    ['travels', searchTrigger, sort, currentPage],
    () => {
      const queryParams = [];
      if (search) queryParams.push(`search=${search}`);

      if (sort === 'terbaru') queryParams.push('sort_date=asc');
      else if (sort === 'terlama') queryParams.push('sort_date=desc');
      else if (sort === 'AtoZ') queryParams.push('sort_title=asc');

      if (queryParams.length > 0) queryParams[0] = `&${queryParams[0]}`;

      return fetch(
        urlApi + `/travels?content_per_page=12&page=${currentPage}${queryParams.join('&')}`
      ).then((res) => res.json());
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
        <h2 className="text-center font-medium lg:text-h2 text-h4 mt-48 mb-7">Wisata</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Filter onChange={(selected) => setSort(selected)} className="lg:mr-11 mr-3 ">
            Filter
          </Filter>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              variant="search-right"
              className="w-full lg:w-auto"
              inputClassName="w-full"
            />
          </form>
        </div>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div
          style={{
            gridTemplateColumns:
              travels.data.data?.length < 4 && isMedium
                ? 'repeat(4, 1fr)'
                : !isMedium && !isSmall
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fit, minmax(258px, 1fr))',
          }}
          className="grid gap-x-4 lg:gap-x-8 gap-y-10"
        >
          {travels.data.data?.map((travel) => (
            <CardImage
              key={travel.id}
              src={travel.image || '/'}
              width={1200}
              height={900}
              layout="responsive"
              text={travel.name}
              hover
              className="h-full"
              href={'/wisata/' + travel.slug + '@!@' + travel.id}
            />
          ))}
        </div>
      </section>
      <section className="container mx-auto mb-16 px-10">
        <div className="flex justify-center">
          <Pagination
            isDisabled={isLoading}
            onChange={(currentPage) => setCurrentPage(currentPage)}
            maxPage={travels.data.max_page}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WisataPage;
