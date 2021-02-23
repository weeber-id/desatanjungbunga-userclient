import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DummyWisata } from '../../../assets';
import { CardImage } from '../../mollecules';

const RekomendasiTerdekat = () => {
  const [active, setActive] = useState<'penginapan' | 'kuliner'>('penginapan');

  return (
    <section className="container mx-auto px-10 mb-16">
      <div className="flex items-center relative border-b border-black w-min mb-11">
        <div
          className={classNames(
            'absolute transition-all transform duration-300 -bottom-0.5 left-0 h-1 w-48 bg-red rounded-full',
            active === 'penginapan' ? 'translate-x-0' : 'translate-x-48'
          )}
        ></div>
        <button
          onClick={() => setActive('penginapan')}
          className={classNames(
            'w-48 h-9 focus:outline-none',
            active === 'penginapan' ? 'text-red' : 'text-purple-light'
          )}
        >
          Penginapan Terdekat
        </button>
        <button
          onClick={() => setActive('kuliner')}
          className={classNames(
            'w-48 h-9 focus:outline-none',
            active === 'kuliner' ? 'text-red' : 'text-purple-light'
          )}
        >
          Kuliner Terdekat
        </button>
      </div>
      <div
        style={{ gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))' }}
        className="grid gap-x-6"
      >
        {active === 'penginapan' ? (
          <>
            {[9, 5, 6, 7].map((val, i) => (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                animate={{ y: 0, opacity: 1 }}
                key={val}
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
      </div>
    </section>
  );
};

export default RekomendasiTerdekat;
