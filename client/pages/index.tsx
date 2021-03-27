import classNames from 'classnames';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Travel } from '../@types/types';
import { Button, CardImage, Footer, Header } from '../components';
import { urlApi } from '../helpers/urlApi';
import { Articles } from './artikel';
import { HandCrafts } from './kerajinan';
import { Commodities } from './komoditas';
import { Travels } from './wisata';

interface StaticProps {
  travels: Travels;
  commodities: Commodities;
  handcrafts: HandCrafts;
  articles: Articles;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const resTravels = await fetch(urlApi + '/travels?content_per_page=4&page=1');
  const resCommodities = await fetch(urlApi + '/culinaries?content_per_page=3&page=1');
  const resHandcrafts = await fetch(urlApi + '/handcrafts?content_per_page=4&page=1');
  const resArticles = await fetch(urlApi + '/articles?content_per_page=4&page=1');

  const travels: Travels = await resTravels.json();
  const commodities: Commodities = await resCommodities.json();
  const handcrafts: HandCrafts = await resHandcrafts.json();
  const articles: Articles = await resArticles.json();

  return {
    props: {
      travels,
      commodities,
      handcrafts,
      articles,
    },
    revalidate: 1,
  };
};

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  travels,
  commodities,
  handcrafts,
  articles,
}) => {
  const [activeTravel, setActiveTravel] = useState<Travel>(travels.data.data[0]);

  return (
    <>
      <Head>
        <title>Desa Tanjung Bunga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="container mx-auto mt-20 md:mt-36">
        <div className="grid lg:grid-cols-2 gap-y-6 items-center md:px-10 px-6 py-8">
          <div>
            <h1 className="text-purple-light text-center lg:text-left md:text-h4 text-h5 font-medium">
              Selamat Datang
            </h1>
            <h2 className="text-purple-light text-center lg:text-left md:text-h2 text-h4 font-medium">
              di Desa Tanjung Bunga
            </h2>
            <div className="flex items-center justify-center lg:justify-start mt-8">
              <Button bold className="mr-6 h-12 w-36">
                Jelajahi
              </Button>
              <Button href="/artikel" bold className="h-12 w-36" variant="outlined" color="red">
                Artikel
              </Button>
            </div>
          </div>
          <div className="relative row-start-1 lg:row-start-auto transform scale-75">
            <div className="w-24 h-8 bg-purple-light opacity-40 transform rotate-12 absolute right-0 -top-8 z-10"></div>
            <div className="w-24 h-8 bg-purple-light opacity-40 transform rotate-12 absolute left-0 -bottom-8 z-10"></div>
            <CardImage
              alt="Visit Desa Tanjung Bunga"
              src="/assets/images/hero-1.png"
              layout="responsive"
              width={510}
              height={327}
              text="Visit Tanjung Bunga"
              italic
              textColor="red"
              textPosition="end"
              className="transform -rotate-6"
            />
          </div>
        </div>
      </section>
      <section className="bg-blue-light py-16">
        <div className="container md:px-10 px-6 mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-3">
          <h3 className="md:text-h3 text-h5 lg:hidden text-center font-medium">
            Wisata di Desa Tanjung Bunga
          </h3>
          <CardImage
            src="/assets/images/home-2.png"
            width={571}
            height={320}
            layout="responsive"
            text="Visit Tanjung Bunga"
            textColor="red"
            italic
            alt="Visit Desa Tanjung Bunga"
            textPosition="end"
          />
          <div className="text-black">
            <h3 className="text-h3 hidden lg:block font-medium mb-8">
              Wisata di Desa Tanjung Bunga
            </h3>
            <p className="text-body-sm md:text-body text-justify">
              Terdapat banyak potensi wisata yang belum terkuak oleh khalayak umum dari Desa Tanjung
              Bunga, Kabupaten Samosir. Menikmati indahnya tepian danau, berpetualang di kawasan
              pegunungan, merasakan salah satu kultur asli dari Sumatera Utara, hingga merasakan
              kuliner khas, dan membawa cinderamata sebagai buah tangan dapat dilakukan di sini.
              Sehingga, mengunjungi Desa Tanjung Bunga akan menjadi suatu agenda wisata yang tidak
              pernah dirasakan sebelumnya!
            </p>
          </div>
        </div>
      </section>
      <section className="container px-0 lg:px-10 mx-auto py-20">
        <div className="flex flex-col lg:flex-row items-center mb-5">
          <h2 className="lg:text-h2 md:text-h3 text-h4 mb-3 lg:mb-0 text-black font-medium mr-0 lg:mr-14">
            Wisata
          </h2>
          <Button href="/wisata" variant="outlined" color="red">
            Lihat lebih lengkap
          </Button>
        </div>
        <div className="grid grid-cols-1 px-6 lg:px-0 lg:grid-cols-2 gap-16 mb-10">
          <div>
            <Image
              objectPosition="center"
              objectFit="cover"
              layout="responsive"
              width={1200}
              height={900}
              src={activeTravel.image}
              alt={activeTravel.name}
            />
          </div>
          <div className="text-black">
            <h4 className="text-h4 font-medium mb-4 lg:mb-10">{activeTravel.name}</h4>
            <p className="text-body-sm md:text-body text-justify mb-5">
              {activeTravel.short_description}
            </p>
            <Button
              href={`/wisata/${activeTravel.slug}@!@${activeTravel.id}`}
              className="mx-auto md:m-0"
            >
              Lihat Detail
            </Button>
          </div>
        </div>
        <div
          style={{ gridTemplateColumns: 'repeat(4, minmax(258px, 1fr))', scrollPadding: '0 24px' }}
          className="lg:grid flex flex-nowrap scroll-snap-x-container lg:hidden-scrollbar lg:gap-4 overflow-auto"
        >
          <div className="lg:hidden">
            <div className="w-6"></div>
          </div>
          {travels.data.data?.map((travel) => (
            <div
              onMouseOver={() => setActiveTravel(travel)}
              onFocus={() => console.log('focus')}
              key={travel.id}
              className="scroll-snap-child-start mr-4"
            >
              <CardImage
                src={travel.image || '/'}
                width={1200}
                height={900}
                layout="responsive"
                text={travel.name}
                hover
                className={classNames('min-w-72 lg:min-w-full h-full')}
                active={travel.id === activeTravel.id}
                alt={travel.name}
              />
            </div>
          ))}
          <div className="lg:hidden">
            <div className="w-6"></div>
          </div>
        </div>
      </section>
      <section className="bg-blue-light py-16">
        <div className="container lg:px-10 mx-auto">
          <div className="flex flex-col lg:flex-row items-center mb-5">
            <h2 className="text-h4 md:text-h2 mb-3 lg:mb-0 text-black font-medium mr-0 lg:mr-14">
              Komoditas
            </h2>
            <Button href="/komoditas" variant="outlined" color="red">
              Lihat lebih lengkap
            </Button>
          </div>
          <div className="flex xl:flex-row items-start flex-col">
            <div className="w-full flex flex-nowrap order-10 xl:mr-12 md:mr-0">
              <div
                style={{
                  gridTemplateColumns: 'repeat(3, minmax(258px, 1fr))',
                  scrollPadding: '0 24px',
                }}
                className="lg:grid lg:gap-4 flex flex-nowrap scroll-snap-x-container overflow-auto lg:hidden-scrollbar"
              >
                <div className="lg:hidden">
                  <div className="w-6"></div>
                </div>
                {commodities.data.data.map(({ id, slug, name, image }) => (
                  <div key={id} className="scroll-snap-child-start mr-4">
                    <CardImage
                      src={image || '/'}
                      width={1200}
                      height={900}
                      layout="responsive"
                      text={name}
                      hover
                      className="min-w-72 h-full lg:min-w-full"
                      href={`/komoditas/${slug}@!@${id}`}
                      alt={name}
                    />
                  </div>
                ))}
                <div className="lg:hidden">
                  <div className="w-6"></div>
                </div>
              </div>
            </div>
            <p className="text-body-sm md:text-body xl:w-96 px-6 lg:px-0 mb-6 text-black text-justify xl:order-11 order-1">
              Berbagai jenis masakan dan minuman khas Sumatera Utara seperti Ikan Arsik hingga Babi
              Panggang Krispi hadir di Desa Tanjung Bunga.
            </p>
          </div>
        </div>
      </section>
      <section className="container px-6 lg:px-10 mx-auto py-11 border-b-2 border-purple">
        <div className="flex flex-col lg:flex-row items-center mb-5">
          <h2 className="md:text-h2 text-h4 mb-3 lg:mb-0 text-black font-medium lg:mr-14">
            Belanja
          </h2>
          <Button href="/kerajinan" variant="outlined" color="red">
            Lihat lebih lengkap
          </Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-x-16 grid-cols-1">
          <p className="text-body-sm lg:text-body text-black text-justify mb-5">
            Terdapat berbagai jenis kerajinan dan souvenir khas Kabupaten Samosir dan juga Sumatera
            Utara banyak tersedia di Desa Tanjung Bunga. Kini tersedia di berbagai marketplace
            pilihan anda.
          </p>
          <div className="grid grid-cols-2 gap-3 lg:gap-6">
            {handcrafts.data.data.map(({ id, slug, name, image }) => (
              <CardImage
                key={id}
                src={image || '/'}
                width={1200}
                height={900}
                layout="responsive"
                text={name}
                hover
                href={`/kerajinan/${slug}@!@${id}`}
                alt={name}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="container lg:px-10 mx-auto py-11">
        <h2 className="lg:text-h2 text-h4 text-center text-black font-medium mb-3">Artikel</h2>
        <div className="flex justify-center">
          <Button href="/artikel" variant="outlined" color="red">
            Lihat lebih lengkap
          </Button>
        </div>
        <div
          style={{ gridTemplateColumns: 'repeat(4, minmax(258px, 1fr))', scrollPadding: '0 24px' }}
          className="lg:grid scroll-snap-x-container flex flex-nowrap lg:gap-4 mt-12 lg:hidden-scrollbar overflow-auto"
        >
          <div className="h-full lg:hidden scroll-snap-child-start">
            <div className="w-6 lg:w-0 h-4"></div>
          </div>
          {articles.data.data.map(({ id, title, image_cover, slug }) => (
            <CardImage
              key={id}
              src={image_cover}
              width={1600}
              height={900}
              layout="responsive"
              text={title}
              hover
              className="min-w-72 lg:min-w-full lg:w-auto scroll-snap-child-start mr-4 h-full"
              href={`/artikel/${slug}@!@${id}`}
              alt={title}
            />
          ))}
          <div className="h-full lg:hidden scroll-snap-child-start">
            <div className="w-6 lg:w-0 h-4"></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
