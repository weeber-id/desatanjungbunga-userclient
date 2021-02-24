import Link from 'next/link';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { IconTanjungBunga } from '../../../assets';
import { TextField } from '../../atoms';
import { useRouter } from 'next/router';

const Header = () => {
  const [isScroll, setScroll] = useState<boolean>(false);
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
      <nav className="shadow-lg fixed top-0 left-0 w-full z-40 bg-white">
        <div
          className={classNames(
            'flex transition-all duration-500 items-center justify-between px-10 container mx-auto',
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
          <TextField
            className={classNames('transition-all duration-500 transform', {
              'z-0 -translate-y-10': isScroll,
              'translate-y-0': !isScroll,
            })}
            variant="search"
            placeholder="Ketik untuk mencari"
          />
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
              Komoditas
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
