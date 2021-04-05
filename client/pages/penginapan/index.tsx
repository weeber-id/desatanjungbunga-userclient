import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { ApiResponse, Lodging } from '../../@types/types';
import { CardImage, Filter, Footer, Header, Pagination, TextField } from '../../components';
import { urlApi } from '../../helpers/urlApi';
import { useMedia } from '../../hooks/useMedia';

export type Lodgings = ApiResponse<{ data: Lodging[]; max_page: number } | null>;

interface StaticProps {
  initialData: Lodgings;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/lodgings?content_per_page=12&page=1');

  const initialData: Lodgings = await res.json();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const PenginapanPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<'terbaru' | 'terlama' | 'AtoZ'>();
  const [searchTrigger, setSearchTrigger] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isMedium = useMedia({ query: '(min-width: 768px)' });
  const isSmall = useMedia({ query: '(max-width: 520px)' });

  const { data: lodgings, isPreviousData } = useQuery(
    ['lodgings', searchTrigger, sort, currentPage],
    () => {
      const queryParams = [];
      if (search) queryParams.push(`search=${search}`);

      if (sort === 'terbaru') queryParams.push('sort_date=asc');
      else if (sort === 'terlama') queryParams.push('sort_date=desc');
      else if (sort === 'AtoZ') queryParams.push('sort_title=asc');

      if (queryParams.length > 0) queryParams[0] = `&${queryParams[0]}`;

      return fetch(
        urlApi + `/lodgings?content_per_page=12&page=${currentPage}${queryParams.join('&')}`
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
      <Head>
        <title>Penginapan | Wisata Samosir</title>
        <meta
          name="description"
          content="Mari memesan penginapan terbaik di kawasan wisata Pulau Samosir Desa Wisata Tanjung Bunga. Temukan penginapan dari harga termurah dan ternyaman."
        />
      </Head>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center text-black font-medium text-h4 lg:text-h2 mt-24 md:mt-48 mb-7">
          Penginapan
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
              lodgings.data.data?.length < 4 && isMedium
                ? 'repeat(4, 1fr)'
                : !isMedium && !isSmall
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fit, minmax(270px, 1fr))',
          }}
          className="grid gap-x-4 lg:gap-x-8 gap-y-10"
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
            lodgings.data.data?.map(({ id, image, name, slug }) => (
              <CardImage
                key={id}
                src={image || '/'}
                width={1200}
                height={900}
                layout="responsive"
                text={name}
                hover
                className="h-full"
                href={`/penginapan/${slug}@!@${id}`}
              />
            ))}
        </div>
      </section>
      <section className="container mx-auto mb-16 px-10">
        <div className="flex justify-center">
          <Pagination
            isDisabled={isPreviousData}
            onChange={(cp) => setCurrentPage(cp)}
            maxPage={lodgings.data.max_page}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PenginapanPage;
