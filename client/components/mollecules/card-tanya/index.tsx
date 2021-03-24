import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { CardJawab } from '..';
import { Discussion } from '../../../@types/types';
import { IconAccordionDropdown } from '../../../assets';
import { promiseTimeOut } from '../../../helpers/promiseTimeout';
import { TanyaJawab } from '../../organisms';
import style from './card-tanya.module.css';

interface CardTanyaProps {
  content_id?: string;
  name?: string;
  body?: string;
  created_at?: string;
  title?: string;
  content_name?: 'article' | 'travel' | 'culinary' | 'handcraft' | 'lodging';
  question_id?: string;
  questions?: Discussion[];
}

const CardTanya: React.FC<CardTanyaProps> = ({
  body,
  created_at,
  name,
  title,
  content_name,
  content_id,
  question_id,
  questions,
}) => {
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
      {tanyaJawab && (
        <TanyaJawab
          content_name={content_name}
          title={title}
          content_id={content_id}
          type="jawab"
          onCancel={() => setTanyaJawab(false)}
          question_id={question_id}
          body={body}
          created_at={created_at}
          name={name}
        />
      )}

      <div className="rounded-lg shadow-lg px-6 border-l-4 border-red py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="text-body-sm md:text-body font-bold text-red">{name}</div>
          <span className="md:text-body-sm text-body-xs text-grey">{created_at}</span>
        </div>
        <p className="md:text-body-sm text-body-xs text-black mb-4">{body}</p>
        <button
          onClick={() => setTanyaJawab(true)}
          className="text-body-sm text-purple-light underline focus:outline-none hover:text-red"
        >
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
          Tampilkan Jawaban ({questions?.length || 0})
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
          {questions?.map(({ id, created_at, ...otherProps }) => (
            <CardJawab key={id} {...otherProps} created_at={dayjs(created_at).fromNow(true)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardTanya;
