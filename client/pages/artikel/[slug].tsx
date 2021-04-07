import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Articles } from '.';
import { ApiResponse, Article } from '../../@types/types';
import { ImgNoAvatar } from '../../assets';
import { BreadCrumb, BreadCrumbItem, CardImage, Header, LoadingPage } from '../../components';
import { urlApi } from '../../helpers';
import { useMedia } from '../../hooks/useMedia';

interface StaticProps {
  initialData: ApiResponse<Article>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlApi + '/articles');

  const data: Articles = await res.json();

  const { id, slug } = !data.data?.data ? { id: '', slug: '' } : data.data.data[0];

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

  const res = await fetch(urlApi + `/article?id=${id}&slug=${slug}`);

  const initialData: ApiResponse<Article> = await res.json();

  if (initialData.meta.code === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const ArtikelDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const Router = useRouter();

  if (!initialData) {
    // eslint-disable-next-line
    // @ts-ignore
    initialData = {};
  }

  if (!initialData?.data) {
    // eslint-disable-next-line
    // @ts-ignore
    initialData.data = {};
  }

  const {
    author,
    created_at,
    body,
    image_cover,
    title,
    author_detail,
    related_details,
  } = initialData.data;

  const isMobile = useMedia({ query: '(max-width: 768px)' });

  if (Router.isFallback) return <LoadingPage />;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content="Wisata Samosir" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta
          name="keywords"
          content="Wisata Samosir, wisata ke sumatera utara, pulau samosir, danau toba, desa tanjung bunga"
        />
        <meta name="image" content={image_cover} />
        <meta name="author" content={author} />
        <meta property="article:published_time" content={created_at} />
        <meta name="description" content={body} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <section className="bg-blue-light mb-16 pt-20 md:pt-[9.5rem]">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/artikel">Artikel</BreadCrumbItem>
            <BreadCrumbItem isActive>Page Detail</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-10 mb-16 max-w-[800px]">
        <h1 className="lg:text-h2 md:text-h4 text-h5 font-bold mb-3">{title}</h1>
        <div className="flex items-center mb-3">
          <img
            className="h-12 w-12 rounded-full mr-2.5"
            src={author_detail.profile_picture || ImgNoAvatar}
            alt={author}
          />
          <div>
            <h4 className="md:text-body text-body-sm text-black">oleh {author}</h4>
            <h6 className="md:text-body text-body-sm text-red">
              {dayjs(created_at).format('D MMMM YYYY')}
            </h6>
          </div>
        </div>
        <img src={image_cover} alt={title} className="w-full h-auto mb-9" />
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </section>
      <section className="border-t border-black py-6 container mx-auto">
        <h5 className="md:text-h5 md:px-0 px-6 text-body text-black font-bold mb-8 md:mt-9 mt-6">
          Hal yang terkait dengan artikel ini
        </h5>
        {isMobile && (
          <div
            style={{ scrollPadding: '0 24px' }}
            className="flex flex-nowrap overflow-y-auto scroll-snap-x-container hidden-scrollbar"
          >
            <div className="h-full scroll-snap-child-start">
              <div className="w-6 h-4"></div>
            </div>
            {related_details?.map(({ id, slug, title, source, image_cover }) => {
              const map = {
                article: 'artikel',
                culinary: 'komoditas',
                handcraft: 'kerajinan',
                lodging: 'penginapan',
                travel: 'wisata',
              };

              return (
                <CardImage
                  key={id}
                  href={`/${map[source]}/${slug}@!@${id}`}
                  text={title}
                  alt={title}
                  width={source === 'article' ? 1600 : 1200}
                  height={900}
                  layout="responsive"
                  hover
                  src={image_cover || '/'}
                  className="min-w-72 lg:min-w-full lg:w-auto scroll-snap-child-start mr-4 h-full"
                />
              );
            })}
            <div className="h-full scroll-snap-child-start">
              <div className="w-6 h-4"></div>
            </div>
          </div>
        )}
        {!isMobile && (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {related_details?.map(({ id, slug, title, source, image_cover }) => {
              const map = {
                article: 'artikel',
                culinary: 'komoditas',
                handcraft: 'kerajinan',
                lodging: 'penginapan',
                travel: 'wisata',
              };

              return (
                <CardImage
                  key={id}
                  href={`/${map[source]}/${slug}@!@${id}`}
                  text={title}
                  alt={title}
                  width={source === 'article' ? 1600 : 1200}
                  height={900}
                  layout="responsive"
                  hover
                  src={image_cover || '/'}
                  className="h-full"
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default ArtikelDetailPage;
