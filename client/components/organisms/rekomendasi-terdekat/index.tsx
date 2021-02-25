import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DummyWisata } from '../../../assets';
import { CardImage } from '../../mollecules';

const RekomendasiTerdekat = () => {
  const [active, setActive] = useState<'penginapan' | 'kuliner'>('penginapan');

  return (
    <section className="container mx-auto px-0 lg:px-10 mb-16">
      <div className="overflow-x-auto mb-11 hidden-scrollbar">
        <div className="flex md:text-body text-body-sm items-center relative border-b border-black w-min">
          <div
            className={classNames(
              'absolute transition-all transform duration-300 -bottom-0.5 left-0 h-1 w-48 bg-red rounded-full',
              active === 'penginapan' ? 'translate-x-0' : 'translate-x-48'
            )}
          ></div>
          <button
            onClick={() => setActive('penginapan')}
            className={classNames(
              'w-48 h-9 focus:outline-none hover:text-red',
              active === 'penginapan' ? 'text-red' : 'text-purple-light'
            )}
          >
            Penginapan Terdekat
          </button>
          <button
            onClick={() => setActive('kuliner')}
            className={classNames(
              'w-48 h-9 focus:outline-none hover:text-red',
              active === 'kuliner' ? 'text-red' : 'text-purple-light'
            )}
          >
            Kuliner Terdekat
          </button>
        </div>
      </div>
      <div
        style={{ gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))', scrollPadding: '0 24px' }}
        className="lg:grid lg:gap-x-6 overflow-auto scroll-snap-x-container lg:hidden-scrollbar flex flex-nowrap"
      >
        <div className="lg:hidden">
          <div className="w-6"></div>
        </div>
        {active === 'penginapan' ? (
          <>
            {[9, 5, 6, 7].map((val, i) => (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                animate={{ y: 0, opacity: 1 }}
                key={val}
                className="min-w-72 lg:min-w-auto scroll-snap-child-start mr-4"
              >
                <CardImage
                  src={DummyWisata}
                  width={1200}
                  height={900}
                  layout="responsive"
                  text="Visit Tanjung Bunga"
                  hover
                />
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {[1, 2, 3, 4].map((val, i) => (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                animate={{ y: 0, opacity: 1 }}
                key={val}
                className="min-w-72 lg:min-w-auto scroll-snap-child-start mr-4"
              >
                <CardImage
                  src={DummyWisata}
                  width={1200}
                  height={900}
                  layout="responsive"
                  text="Ketoprak Gingseng"
                  hover
                />
              </motion.div>
            ))}
          </>
        )}
        <div className="lg:hidden">
          <div className="w-6"></div>
        </div>
      </div>
    </section>
  );
};

export default RekomendasiTerdekat;
