import classNames from 'classnames';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TanyaJawab } from '..';
import { Discussion } from '../../../@types/types';
import { urlApi } from '../../../helpers';
import { Button } from '../../atoms';
import { CardTanya } from '../../mollecules';

interface Props {
  description?: string;
  title?: string;
  content_id?: string;
  content_name?: 'article' | 'travel' | 'culinary' | 'handcraft' | 'lodging';
}

const InfoDetail: React.FC<Props> = ({ description, title, content_name, content_id }) => {
  const [active, setActive] = useState<'detail' | 'tanya jawab'>('detail');
  const [tanyaJawab, setTanyaJawab] = useState<boolean>(false);

  const { data: questions, isLoading } = useQuery<Discussion[]>(
    'question',
    () => {
      return fetch(
        urlApi +
          `/discussion?content_name=${content_name}&content_id=${content_id}&show_answer=true`
      )
        .then((res) => res.json())
        .then((data) => data.data);
    },
    {
      keepPreviousData: false,
    }
  );

  return (
    <>
      <AnimatePresence>
        {tanyaJawab && (
          <TanyaJawab
            content_name={content_name}
            content_id={content_id}
            type="tanya"
            title={title}
            onCancel={() => setTanyaJawab(false)}
          />
        )}
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
            <div
              className="text-body-sm md:text-body"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          ) : (
            <>
              <Button onClick={() => setTanyaJawab(true)} className="mb-6">
                Ajukan Pertanyaan
              </Button>
              {isLoading
                ? [0, 1, 2, 3].map((val) => (
                    <div key={`skelton-${val}`}>
                      <Skeleton className="mb-2" height={100} />
                      <div className="flex justify-end mb-4">
                        <Skeleton width={200} height={30} />
                      </div>
                    </div>
                  ))
                : questions?.map(({ id, created_at, ...otherProps }) => (
                    <CardTanya
                      key={id}
                      created_at={dayjs(created_at).fromNow(true)}
                      title={title}
                      question_id={id}
                      {...otherProps}
                    />
                  ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoDetail;
