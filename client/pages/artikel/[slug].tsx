import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { Articles } from '.';
import { ApiResponse, Article } from '../../@types/types';
import { ImgNoAvatar } from '../../assets';
import { BreadCrumb, BreadCrumbItem, Header, LoadingPage } from '../../components';
import { urlApi } from '../../helpers';

interface StaticProps {
  initialData: ApiResponse<Article>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlApi + '/articles');

  const data: Articles = await res.json();

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

  const res = await fetch(urlApi + `/article?id=${id}&slug=${slug}`);

  const initialData: ApiResponse<Article> = await res.json();

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

  const { author, created_at, body, image_cover, title } = initialData.data;

  if (Router.isFallback) return <LoadingPage />;
  return (
    <>
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/artikel">Artikel</BreadCrumbItem>
            <BreadCrumbItem isActive>Page Detail</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-10 mb-16 max-w-[800px]">
        <h1 className="text-h2 font-bold mb-3">{title}</h1>
        <div className="flex items-center mb-3">
          <img className="h-12 w-12 rounded-full mr-2.5" src={ImgNoAvatar} alt={author} />
          <div>
            <h4 className="text-body text-black">oleh {author}</h4>
            <h6 className="text-body text-red"> {dayjs(created_at).format('D MMMM YYYY')}</h6>
          </div>
        </div>
        <img src={image_cover} alt="" className="w-full h-auto mb-9" />
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </section>
    </>
  );
};

export default ArtikelDetailPage;