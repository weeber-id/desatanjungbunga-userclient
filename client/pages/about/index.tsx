import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { DummyOrang } from '../../assets';
import { CardDosenPeneliti, Footer, Header } from '../../components';

const AboutPage = () => {
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

      if (st + 122 > sejarahRef.current.offsetTop && st + 122 < sambutanRef.current.offsetTop)
        setActive(0);
      else if (
        st + 122 > sambutanRef.current.offsetTop &&
        st + 122 < dosenPenelitiRef.current.offsetTop
      )
        setActive(1);
      else if (
        st + 122 > dosenPenelitiRef.current.offsetTop &&
        st + 122 < tujuanWebsiteRef.current.offsetTop
      )
        setActive(2);
      else if (st + 122 > tujuanWebsiteRef.current.offsetTop) setActive(3);
    };

    window.addEventListener('scroll', listenToScroll);

    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <h3 className="text-center text-h3 text-black mt-48 font-medium mb-11">
        Profil Desa Tanjung Bunga
      </h3>
      <nav
        ref={navRef}
        className={classNames('sticky transition-all duration-300 z-50 top-14 bg-white mb-12', {
          'shadow-lg': sticky,
        })}
      >
        <div
          className={classNames('container mx-auto relative border-black', { 'border-b': !sticky })}
        >
          <div
            style={{ width: 185, left: active * 185 }}
            className="absolute duration-500 transition-all -bottom-0.5 rounded-full left-0 h-1 bg-red"
          ></div>
          <button
            onClick={(e) => handleScrollTo(e, sejarahRef)}
            style={{ width: 185 }}
            className={classNames(
              'text-body h-9 hover:text-red focus:outline-none',
              active === 0 ? 'text-red' : 'text-purple'
            )}
            value="0"
          >
            Sejarah
          </button>
          <button
            onClick={(e) => handleScrollTo(e, sambutanRef)}
            style={{ width: 185 }}
            className={classNames(
              'text-body h-9 hover:text-red focus:outline-none',
              active === 1 ? 'text-red' : 'text-purple'
            )}
            value="1"
          >
            Sambutan Desa
          </button>
          <button
            onClick={(e) => handleScrollTo(e, dosenPenelitiRef)}
            style={{ width: 185 }}
            className={classNames(
              'text-body h-9 hover:text-red focus:outline-none',
              active === 2 ? 'text-red' : 'text-purple'
            )}
            value="2"
          >
            Dosen Peneliti
          </button>
          <button
            onClick={(e) => handleScrollTo(e, tujuanWebsiteRef)}
            style={{ width: 185 }}
            className={classNames(
              'text-body h-9 hover:text-red focus:outline-none',
              active === 3 ? 'text-red' : 'text-purple'
            )}
            value="3"
          >
            Tujuan Website
          </button>
          <Link href="/contact">
            <a>
              <button
                style={{ width: 185 }}
                className="text-body text-purple h-9 hover:text-red focus:outline-none"
              >
                Hubungi Kami
              </button>
            </a>
          </Link>
        </div>
      </nav>
      <section
        ref={sejarahRef}
        className="container mx-auto px-10 mb-10 border-b-2 border-purple pb-20"
      >
        <h4 className="text-h4 text-purple font-medium mb-16 text-center">Sejarah</h4>
        <div className="max-w-xl">
          <img
            className="float-left mr-4"
            src="/assets/images/home-2.png"
            alt="Desa Tanjung Bunga"
          />
        </div>
        <p className="text-body text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at sagittis
          iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed dapibus eros
          at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor velit quis
          vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat nulla. Etiam
          porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed sem dignissim
          varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra turpis, id
          eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Enim libero pharetra turpis. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Mauris lacinia odio at sagittis iaculis. Nullam tortor
          nibh, vestibulum at aliquam in, volutpat ac erat. Sed dapibus eros at nisi pretium, non
          gravida odio porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit
          amet eros ipsum. Morbi malesuada auctor velit quis vulputate. Mauris vel eros tincidunt,
          tincidunt libero vitae, consequat nulla. Etiam porttitor auctor diam, porta congue mi
          rutrum tristique. Sed nec nisl sed sem dignissim varius. Nunc venenatis, purus vel
          volutpat laoreet, enim libero pharetra turpis, id eleifend metus quam vel libero. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at sagittis
          iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed dapibus eros
          at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor velit quis
          vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat nulla. Etiam
          porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed sem dignissim
          varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra turpis, id
          eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
      </section>
      <section
        ref={sambutanRef}
        className="container mx-auto px-10 pb-20 mb-10 border-b-2 border-purple"
      >
        <h4 className="text-h4 text-purple font-medium mb-10 text-center">Sambutan</h4>
        <div className="grid grid-cols-5 w-3/4 mx-auto gap-6">
          <div className="col-span-2">
            <Image layout="responsive" src={DummyOrang} height={1200} width={900} />
          </div>
          <div className="col-span-3">
            <h5 className="text-h5 font-medium text-black mb-2">Dr. Suparman</h5>
            <h6 className="text-body text-purple mb-6">Ketua Desa Tanjung Bunga</h6>
            <p className="text-black text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at
              sagittis iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed
              dapibus eros at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor
              velit quis vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat
              nulla. Etiam porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed
              sem dignissim varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra
              turpis, id eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.
            </p>
          </div>
        </div>
      </section>
      <section
        ref={dosenPenelitiRef}
        className="container mx-auto px-10 pb-20 mb-10 border-b-2 border-purple"
      >
        <h4 className="text-h4 text-purple font-medium mb-10 text-center">Dosen Peneliti</h4>
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <CardDosenPeneliti
              src={DummyOrang}
              name="Mahito Genkai"
              title="Dosen Universitas Indonesia"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at
            sagittis iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed
            dapibus eros at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor
            velit quis vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat
            nulla. Etiam porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed
            sem dignissim varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra
            turpis, id eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos."
              key={val}
            />
          ))}
        </div>
      </section>
      <section ref={tujuanWebsiteRef} className="container mx-auto px-10 pb-20 mb-10">
        <h4 className="text-h4 text-purple font-medium mb-10 text-center">Tujuan Website</h4>
        <div className="grid grid-cols-3 justify-items-center gap-6">
          <div className="border border-purple rounded-lg py-28 px-4 cursor-pointer hover:border-2">
            <p className="text-h4 text-purple font-medium text-center">
              Meningkatkan Minat Wisatawan ke Desa Tanjung Desa
            </p>
          </div>
          <div className="border border-purple rounded-lg py-28 px-4 cursor-pointer hover:border-2">
            <p className="text-h4 text-purple font-medium text-center">
              Memberikan Informasi yang Mumpuni kepada Publik
            </p>
          </div>
          <div className="border border-purple rounded-lg py-28 px-4 cursor-pointer hover:border-2">
            <p className="text-h4 text-purple font-medium text-center">
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
