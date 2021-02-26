import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TanyaJawab } from '..';
import { Button } from '../../atoms';
import { CardTanya } from '../../mollecules';

interface Props {
  description: string;
}

const InfoDetail: React.FC<Props> = ({ description }) => {
  const [active, setActive] = useState<'detail' | 'tanya jawab'>('detail');
  const [tanyaJawab, setTanyaJawab] = useState<boolean>(false);

  return (
    <>
      <AnimatePresence>
        {tanyaJawab && <TanyaJawab onCancel={() => setTanyaJawab(false)} />}
      </AnimatePresence>
      <div className="md:px-5 p-2 md:py-4  border border-purple-light rounded-md">
        <div className="flex items-center text-body-sm md:text-body border-b border-black relative mb-6">
          <div
            className={classNames(
              'absolute transition-all transform duration-300 -bottom-0.5 left-0 h-1 w-32 bg-red rounded-full',
              active === 'detail' ? 'translate-x-0' : 'translate-x-32'
            )}
          ></div>
          <button
            onClick={() => setActive('detail')}
            className={classNames(
              'w-32 h-9 focus:outline-none hover:text-red',
              active === 'detail' ? 'text-red' : 'text-purple-light'
            )}
          >
            Detail
          </button>
          <button
            onClick={() => setActive('tanya jawab')}
            className={classNames(
              'w-32 h-9 focus:outline-none hover:text-red',
              active === 'tanya jawab' ? 'text-red' : 'text-purple-light'
            )}
          >
            Tanya Jawab
          </button>
        </div>
        <div className="mb-16 px-4">
          {active === 'detail' ? (
            <p className="text-body-sm md:text-body">{description}</p>
          ) : (
            <>
              <Button onClick={() => setTanyaJawab(true)} className="mb-6">
                Ajukan Pertanyaan
              </Button>
              <CardTanya />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoDetail;
