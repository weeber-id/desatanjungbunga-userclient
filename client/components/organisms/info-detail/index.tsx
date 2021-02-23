import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '../../atoms';
import { CardTanya } from '../../mollecules';

const InfoDetail = () => {
  const [active, setActive] = useState<'detail' | 'tanya jawab'>('detail');

  return (
    <div className="px-5 py-4 border border-purple-light rounded-md">
      <div className="flex items-center border-b border-black relative mb-6">
        <div
          className={classNames(
            'absolute transition-all transform duration-300 -bottom-0.5 left-0 h-1 w-32 bg-red rounded-full',
            active === 'detail' ? 'translate-x-0' : 'translate-x-32'
          )}
        ></div>
        <button
          onClick={() => setActive('detail')}
          className={classNames(
            'w-32 h-9 focus:outline-none',
            active === 'detail' ? 'text-red' : 'text-purple-light'
          )}
        >
          Detail
        </button>
        <button
          onClick={() => setActive('tanya jawab')}
          className={classNames(
            'w-32 h-9 focus:outline-none',
            active === 'tanya jawab' ? 'text-red' : 'text-purple-light'
          )}
        >
          Tanya Jawab
        </button>
      </div>
      <div className="mb-16 px-4">
        {active === 'detail' ? (
          <p className="text-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi excepturi ex itaque
            quidem! Numquam, provident sequi. Obcaecati tenetur maxime fugiat quidem, iste sunt,
            alias assumenda molestias sint sed nisi ex. <br /> <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi excepturi ex itaque
            quidem! Numquam, provident sequi. Obcaecati tenetur maxime fugiat quidem, iste sunt,
            alias assumenda molestias sint sed nisi ex.
          </p>
        ) : (
          <>
            <Button className="mb-6">Ajukan Pertanyaan</Button>
            <CardTanya />
          </>
        )}
      </div>
    </div>
  );
};

export default InfoDetail;
