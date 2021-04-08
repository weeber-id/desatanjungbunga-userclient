import Link from 'next/link';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconClose, IconHamburger, IconSearch, IconTanjungBunga } from '../../../assets';
// import { TextField } from '../../atoms';
import { useRouter } from 'next/router';

const Header = () => {
  const [isScroll, setScroll] = useState<boolean>(false);
  const [isCollapse, setCollapse] = useState<boolean>(true);
  const { asPath } = useRouter();

  useEffect(() => {
    const listenToScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', listenToScroll);

    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  return (
    <header>
      <nav className="shadow-lg bg-white fixed top-0 left-0 z-40 w-full md:hidden flex justify-between h-14 px-6 items-center">
        <button className="focus:outline-none" onClick={() => setCollapse(!isCollapse)}>
          {isCollapse ? (
            <IconHamburger />
          ) : (
            <IconClose height={20} width={24} viewBox="0 0 12 12" />
          )}
        </button>
        <IconTanjungBunga viewBox="0 0 174 64" width={107} height={36} />
        <IconSearch />
      </nav>
      <AnimatePresence exitBeforeEnter>
        {!isCollapse && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ x: -200 }}
            style={{ zIndex: 100 }}
            className="fixed bg-blue-light flex flex-col top-14 z-50 border-r-2 py-14 pl-8 border-purple left-0 w-52 h-full"
          >
            <Link href="/">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/',
                  'text-purple': asPath !== '/',
                })}
              >
                Home
              </a>
            </Link>
            <Link href="/about">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/about',
                  'text-purple': asPath !== '/about',
                })}
              >
                Tentang Desa
              </a>
            </Link>
            <Link href="/wisata">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/wisata',
                  'text-purple': asPath !== '/wisata',
                })}
              >
                Wisata
              </a>
            </Link>
            <Link href="/penginapan">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/penginapan',
                  'text-purple': asPath !== '/penginapan',
                })}
              >
                Penginapan
              </a>
            </Link>
            <Link href="/komoditas">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/komoditas',
                  'text-purple': asPath !== '/komoditas',
                })}
              >
                Produk & Kuliner
              </a>
            </Link>
            <Link href="/kerajinan">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/kerajinan',
                  'text-purple': asPath !== '/kerajinan',
                })}
              >
                Kerajinan
              </a>
            </Link>
            <Link href="/artikel">
              <a
                className={classNames('text-body font-medium py-3', {
                  'text-red': asPath === '/artikel',
                  'text-purple': asPath !== '/artikel',
                })}
              >
                Artikel
              </a>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="shadow-lg hidden md:block fixed top-0 left-0 w-full z-40 bg-white">
        <div
          className={classNames(
            'flex transition-all duration-500 items-center justify-center px-10 container mx-auto',
            {
              'h-0': isScroll,
              'h-20': !isScroll,
            }
          )}
        >
          <IconTanjungBunga
            className={classNames('transition-all duration-500 transform', {
              'z-0 -translate-y-10': isScroll,
              'translate-y-0': !isScroll,
            })}
          />
          {/* <TextField
            className={classNames('transition-all duration-500 transform', {
              'z-0 -translate-y-10': isScroll,
              'translate-y-0': !isScroll,
            })}
            variant="search"
            placeholder="Ketik untuk mencari"
          /> */}
        </div>
        <div className="flex items-center justify-center h-14 text-purple font-medium text-body relative z-10">
          <Link href="/">
            <a className={classNames('hover:text-red mr-8', { 'text-red': asPath === '/' })}>
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className={classNames('hover:text-red mr-8', { 'text-red': asPath === '/about' })}>
              Tentang Desa
            </a>
          </Link>
          <Link href="/wisata">
            <a className={classNames('hover:text-red mr-8', { 'text-red': asPath === '/wisata' })}>
              Wisata
            </a>
          </Link>
          <Link href="/penginapan">
            <a
              className={classNames('hover:text-red mr-8', {
                'text-red': asPath === '/penginapan',
              })}
            >
              Penginapan
            </a>
          </Link>
          <Link href="/komoditas">
            <a
              className={classNames('hover:text-red mr-8', { 'text-red': asPath === '/komoditas' })}
            >
              Produk & Kuliner
            </a>
          </Link>
          <Link href="/kerajinan">
            <a
              className={classNames('hover:text-red mr-8', { 'text-red': asPath === '/kerajinan' })}
            >
              Kerajinan
            </a>
          </Link>
          <Link href="/artikel">
            <a className={classNames('hover:text-red', { 'text-red': asPath === '/artikel' })}>
              Artikel
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
