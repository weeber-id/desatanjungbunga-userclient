import classNames from 'classnames';
import { useRef, useState } from 'react';
import { CardJawab } from '..';
import { IconAccordionDropdown } from '../../../assets';
import { promiseTimeOut } from '../../../helpers/promiseTimeout';
import { TanyaJawab } from '../../organisms';
import style from './card-tanya.module.css';

const CardTanya = () => {
  const [status, setStatus] = useState<'show' | 'collapsing' | 'hidden'>('hidden');
  const [tanyaJawab, setTanyaJawab] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>();

  const handleCollapse = async () => {
    if (status === 'show') {
      setStatus('collapsing');
      await promiseTimeOut(0);
      setStatus('hidden');
    } else if (status === 'hidden') {
      setStatus('collapsing');
      await promiseTimeOut(300);
      setStatus('show');
    }
  };

  return (
    <>
      {tanyaJawab && <TanyaJawab onCancel={() => setTanyaJawab(false)} />}

      <div className="rounded-lg shadow-lg px-6 border-l-4 border-red py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="text-body font-bold text-red">Jane Doe</div>
          <span className="text-body-sm text-grey">1d</span>
        </div>
        <p className="body-sm text-black mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, magni alias saepe vero
          obcaecati iste voluptas nisi, ipsam nam, rerum accusamus impedit! Voluptatibus provident
          officia sunt aliquid recusandae atque incidunt?
        </p>
        <button className="text-body-sm text-purple-light underline focus:outline-none hover:text-red">
          Jawab
        </button>
      </div>
      <button
        onClick={handleCollapse}
        className={classNames(
          'flex group justify-end items-center w-full mt-2 focus:outline-none',
          style['icon-accordion']
        )}
      >
        <span className="text-body-sm text-purple-light mr-2 group-hover:text-red">
          Tampilkan Jawaban (4)
        </span>
        <IconAccordionDropdown
          className={classNames('transform transition-all icon-accordion', {
            'rotate-0': status === 'hidden',
            'rotate-180': status === 'show' || status === 'collapsing',
          })}
        />
      </button>
      <div
        style={{ height: status === 'collapsing' ? divRef.current?.offsetHeight : undefined }}
        className={classNames('pl-12 mt-4 transition-all duration-300', {
          'h-0': status === 'hidden',
          'overflow-hidden': status === 'collapsing' || status === 'hidden',
        })}
      >
        <div ref={divRef}>
          {[1, 2, 3, 4].map((val) => (
            <CardJawab key={val} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardTanya;
