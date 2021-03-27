import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { ApiResponse, Article } from '../../@types/types';
import { CardImage, Filter, Footer, Header, Pagination, TextField } from '../../components';
import { urlApi } from '../../helpers';
import { useMedia } from '../../hooks/useMedia';

export type Articles = ApiResponse<{ data: Article[]; max_page: number } | null>;

interface StaticProps {
  initialData: Articles;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/articles?content_per_page=12&page=1');

  const initialData: Articles = await res.json();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const ArtikelPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<'terbaru' | 'terlama' | 'AtoZ'>();
  const [searchTrigger, setSearchTrigger] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const isMedium = useMedia({ query: '(min-width: 768px)' });
  const isSmall = useMedia({ query: '(max-width: 520px)' });

  const { data: articles, isPreviousData } = useQuery(
    ['articles', searchTrigger, sort, currentPage],
    () => {
      const queryParams = [];
      if (search) queryParams.push(`search=${search}`);

      if (sort === 'terbaru') queryParams.push('sort_date=asc');
      else if (sort === 'terlama') queryParams.push('sort_date=desc');
      else if (sort === 'AtoZ') queryParams.push('sort_title=asc');

      if (queryParams.length > 0) queryParams[0] = `&${queryParams[0]}`;

      return fetch(
        urlApi + `/articles?content_per_page=12&page=${currentPage}${queryParams.join('&')}`
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

    setSearchTrigger(search);
  };

  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center text-black font-medium text-h4 lg:text-h2 mt-24 md:mt-48 mb-7">
          Artikel
        </h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Filter onChange={(selected) => setSort(selected)} className="lg:mr-11 mr-3 ">
            Filter
          </Filter>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              value={search}
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
              articles.data.data?.length < 4 && isMedium
                ? 'repeat(4, 1fr)'
                : !isMedium && !isSmall
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fit, minmax(270px, 1fr))',
          }}
          className="grid gap-x-12 gap-y-10"
        >
          {isPreviousData && (
            <>
              <Skeleton height={300} />
              <Skeleton height={300} />
              <Skeleton height={300} />
              <Skeleton height={300} />
              <Skeleton height={300} />
              <Skeleton height={300} />
              <Skeleton height={300} />
              <Skeleton height={300} />
            </>
          )}
          {!isPreviousData &&
            articles.data.data?.map(({ id, slug, title, image_cover }) => (
              <CardImage
                src={image_cover}
                width={1600}
                height={900}
                layout="responsive"
                text={title}
                hover
                key={id}
                href={`/artikel/${slug}@!@${id}`}
                className="h-full"
              />
            ))}
        </div>
      </section>
      <section className="container mx-auto mb-16 px-10">
        <div className="flex justify-center">
          <Pagination
            isDisabled={isPreviousData}
            maxPage={initialData.data.max_page}
            onChange={(currentPage) => setCurrentPage(currentPage)}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArtikelPage;
