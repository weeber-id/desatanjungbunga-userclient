import classNames from 'classnames';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { About } from '../../@types/types';
import { CardDosenPeneliti, Footer, Header } from '../../components';
import { urlApi } from '../../helpers';
import Dosen from '../../json/dosen.json';

interface StaticProps {
  initialData: About;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const res = await fetch(urlApi + '/about');

  const data = await res.json();

  return {
    props: {
      initialData: data.data,
    },
    revalidate: 1,
  };
};

const AboutPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  const [active, setActive] = useState<number>(0);
  const [sticky, setSticky] = useState<boolean>(false);
  const sejarahRef = useRef<HTMLElement>();
  const sambutanRef = useRef<HTMLElement>();
  const dosenPenelitiRef = useRef<HTMLElement>();
  const tujuanWebsiteRef = useRef<HTMLElement>();
  const navRef = useRef<HTMLElement>();

  const handleScrollTo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ref: MutableRefObject<HTMLElement>
  ) => {
    const { value } = e.currentTarget;
    const top = ref.current.offsetTop;
    setActive(Number(value));
    window.scrollTo({ top: top - 120, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const listenToScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st + 56 === navRef.current?.offsetTop) setSticky(true);
      else setSticky(false);

      if (st + 122 > sejarahRef.current?.offsetTop && st + 122 < sambutanRef.current?.offsetTop)
        setActive(0);
      else if (
        st + 122 > sambutanRef.current?.offsetTop &&
        st + 122 < dosenPenelitiRef.current?.offsetTop
      )
        setActive(1);
      else if (
        st + 122 > dosenPenelitiRef.current?.offsetTop &&
        st + 122 < tujuanWebsiteRef.current?.offsetTop
      )
        setActive(2);
      else if (st + 122 > tujuanWebsiteRef.current?.offsetTop) setActive(3);
    };

    window.addEventListener('scroll', listenToScroll);

    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <h3 className="text-center md:text-h3 text-h5 text-black mt-28 md:mt-48 font-medium mb-11">
        Profil Desa Tanjung Bunga
      </h3>
      <nav
        ref={navRef}
        className={classNames(
          'sticky overflow-auto md:hidden-scrollbar transition-all duration-300 z-50 top-14 bg-white mb-12',
          {
            'shadow-lg': sticky,
          }
        )}
      >
        <div className={classNames('container flex mx-auto relative ', {})}>
          <div
            style={{ height: !sticky ? 0.5 : 0, bottom: 2 }}
            className="z-40 absolute left-0 w-full bg-black"
          ></div>
          <div
            style={{ minWidth: 185, maxWidth: 185, left: active * 185 }}
            className="absolute duration-500 z-50 transition-all bottom-0 rounded-full left-0 h-1 bg-red"
          ></div>
          <button
            onClick={(e) => handleScrollTo(e, sejarahRef)}
            style={{ minWidth: 185, maxWidth: 185 }}
            className={classNames(
              'md:text-body text-body-sm h-9 whitespace-nowrap hover:text-red focus:outline-none',
              active === 0 ? 'text-red' : 'text-purple'
            )}
            value="0"
          >
            Sejarah
          </button>
          <button
            onClick={(e) => handleScrollTo(e, sambutanRef)}
            style={{ minWidth: 185, maxWidth: 185 }}
            className={classNames(
              'md:text-body text-body-sm h-9 whitespace-nowrap hover:text-red focus:outline-none',
              active === 1 ? 'text-red' : 'text-purple'
            )}
            value="1"
          >
            Sambutan Desa
          </button>
          <button
            onClick={(e) => handleScrollTo(e, dosenPenelitiRef)}
            style={{ minWidth: 185, maxWidth: 185 }}
            className={classNames(
              'md:text-body text-body-sm h-9 whitespace-nowrap hover:text-red focus:outline-none',
              active === 2 ? 'text-red' : 'text-purple'
            )}
            value="2"
          >
            Dosen Peneliti
          </button>
          <button
            onClick={(e) => handleScrollTo(e, tujuanWebsiteRef)}
            style={{ minWidth: 185, maxWidth: 185 }}
            className={classNames(
              'md:text-body text-body-sm h-9 whitespace-nowrap hover:text-red focus:outline-none',
              active === 3 ? 'text-red' : 'text-purple'
            )}
            value="3"
          >
            Tujuan Website
          </button>
          <Link href="/contact">
            <a>
              <button
                style={{ minWidth: 185, maxWidth: 185 }}
                className="md:text-body text-body-sm whitespace-nowrap text-purple h-9 hover:text-red focus:outline-none"
              >
                Hubungi Kami
              </button>
            </a>
          </Link>
        </div>
      </nav>

      <section
        ref={sejarahRef}
        className="container mx-auto px-6 md:px-10 mb-10 border-b-2 border-purple pb-20"
      >
        <h4 className="md:text-h4 text-h5 md:text-purple text-black font-medium mb-4 md:mb-16 text-center">
          Sejarah
        </h4>
        <div className="max-w-xl">
          <img
            className="float-left mr-4 mb-4"
            src="/assets/images/home-2.png"
            alt="Desa Tanjung Bunga"
          />
        </div>
        <p className="md:text-body text-body-sm text-black">
          Sekitar tahun 1938, Desa Tanjung Bunga pada awalnya adalah wilayah kenegerian Pangururan
          yang dipimpin oleh Kepala Nagari (Nagari). Setelah berakhirnya masa penjajahan pada tahun
          1945, sistem Pemerintahan Kenegerian itu berubah menjadi sistem Pemerintahan Negara
          Kesatuan Republik Indonesia, di bawah Kecamatan yang disebut Pemerintahan Desa yang
          dipimpin oleh satu orang Kepala Desa. <br /> <br /> Terdapat berbagai jenis satwa khas di
          Desa Tanjung Bunga. Beragam jenis burung, dan kupu - kupu. Desa Tanjung Bunga juga
          ditemukan satwa herpetofauna. Herpetofauna merupakan hewan yang terdiri dari 2 kelompok
          besar yaitu amfibi dan reptil. <br /> <br /> Selain itu keberadaannya yang terletak di
          Kabupaten Samosir tentunya membuat desa ini menjadi dekat dengan danau vulkanik terbesar
          di Indonesia yaitu Danau Toba. Selain potensi wisata, desa ini juga terdapat berbagai
          jenis hasil bumi. Durian, aren, kelapa, jeruk, alpukat, dan nangka hanyalah sedikit dari
          banyak jenis buah-buahan yang dapat ditemui di desa ini. Tak lupa, kerajinan Ulos yang
          sangat indah juga berasal dari desa ini.
        </p>
      </section>
      <section
        ref={sambutanRef}
        className="container mx-auto px-6 md:px-10 pb-20 mb-10 border-b-2 border-purple"
      >
        <h4 className="md:text-h4 text-h5 text-black md:text-purple font-medium mb-10 text-center">
          Sambutan
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 md:w-3/4 mx-auto gap-6">
          <div className="md:col-span-2 w-3/4 md:w-full mx-auto">
            <Image
              layout="responsive"
              src={initialData.profile_picture || '/'}
              height={800}
              width={600}
            />
          </div>
          <div className="md:col-span-3">
            <h5 className="md:text-h5 text-body text-center md:text-left font-medium text-black mb-2">
              {initialData.name}
            </h5>
            <h6 className="md:text-body text-body-sm md:text-left text-center md:text-purple text-red mb-6">
              {initialData.position}
            </h6>
            <p className="text-black md:text-body text-body-sm">{initialData.body}</p>
          </div>
        </div>
      </section>
      <section
        ref={dosenPenelitiRef}
        className="container mx-auto px-6 md:px-10 pb-20 mb-10 border-b-2 border-purple"
      >
        <h4 className="md:text-h4 text-h5 md:text-purple text-black font-medium mb-10 text-center">
          Dosen Peneliti
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Dosen.map((val) => (
            <CardDosenPeneliti
              src={`/assets/images/${val.filename}`}
              name={val.name}
              title={val.title}
              description={val.description}
              key={val.name}
            />
          ))}
        </div>
      </section>
      <section ref={tujuanWebsiteRef} className="container mx-auto px-6 md:px-10 pb-20 mb-10">
        <h4 className="md:text-h4 text-h5 md:text-purple text-black font-medium mb-10 text-center">
          Tujuan Website
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-6">
          <div className="border border-purple w-full rounded-lg py-12 md:py-28 px-4 cursor-pointer hover:border-2">
            <p className="md:text-h4 text-body text-black lg:text-purple font-medium text-center">
              Meningkatkan Minat Wisatawan ke Desa Tanjung Desa
            </p>
          </div>
          <div className="border border-purple w-full rounded-lg py-12 md:py-28 px-4 cursor-pointer hover:border-2">
            <p className="md:text-h4 text-body text-black lg:text-purple font-medium text-center">
              Memberikan Informasi yang Mumpuni kepada Publik
            </p>
          </div>
          <div className="border border-purple w-full rounded-lg py-12 md:py-28 px-4 cursor-pointer hover:border-2">
            <p className="md:text-h4 text-body text-black lg:text-purple font-medium text-center">
              Mensejahterakan Warga Desa Tanjung Bunga dalam Menunjang Bisnis Wisatanya
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
