import classNames from 'classnames';
import { useState } from 'react';
import { IconArrowLeft, IconArrowRight } from '../../../assets';
import styles from './pagination.module.css';

interface PaginationProps {
  maxPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({ maxPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  let element = [];

  if (maxPage >= 4 && currentPage <= maxPage - 4) {
    const el = [];
    let count = 0;
    while (count < 3) {
      const page = count + 1;
      el.push(
        <button
          id={(count + 1).toString()}
          key={`pagination-${count + 1}`}
          onClick={() => setCurrentPage(page)}
          className={classNames('mr-5 focus:outline-none', {
            'text-purple-light underline font-semibold': currentPage === count + 1,
          })}
        >
          {count + 1}
        </button>
      );
      count++;
    }
    el.push(<div className="mr-5">...</div>);
    el.push(
      <button
        onClick={() => setCurrentPage(maxPage)}
        className={classNames('mr-5 focus:outline-none', {
          'text-purple-light underline font-semibold': currentPage === maxPage,
        })}
      >
        {maxPage}
      </button>
    );
    element = el;
  }

  if (maxPage > 4 && currentPage + 4 > maxPage) {
    const el = [];
    let count = maxPage - 5;
    while (count < maxPage) {
      const page = count + 1;
      el.push(
        <button
          key={`pagination-${count + 1}`}
          onClick={() => setCurrentPage(page)}
          className={classNames('mr-5 focus:outline-none', {
            'text-purple-light underline font-semibold': currentPage === count + 1,
          })}
        >
          {count + 1}
        </button>
      );
      count++;
    }
    element = el;
  }

  if (maxPage >= 4 && currentPage <= maxPage - 4 && currentPage >= 4) {
    const el = [];
    let count = currentPage;
    while (count > currentPage - 3) {
      const page = count;
      el.unshift(
        <button
          key={`pagination-${count}`}
          onClick={() => setCurrentPage(page)}
          className={classNames('mr-5 focus:outline-none', {
            'text-purple-light underline font-semibold': currentPage === count,
          })}
        >
          {count}
        </button>
      );
      count--;
    }
    el.push(<div className="mr-5">...</div>);
    el.push(
      <button
        onClick={() => setCurrentPage(maxPage)}
        className={classNames('mr-5 focus:outline-none', {
          'text-purple-light underline font-semibold': currentPage === maxPage,
        })}
      >
        {maxPage}
      </button>
    );
    element = el;
  }

  if (maxPage <= 4) {
    const el = [];
    let count = 0;

    while (count < 4) {
      const page = count + 1;
      el.push(
        <button
          key={`pagination-${count + 1}`}
          onClick={() => setCurrentPage(page)}
          className={classNames('mr-5 focus:outline-none', {
            'text-purple-light underline font-semibold': currentPage === count + 1,
          })}
        >
          {count + 1}
        </button>
      );
      count++;
    }

    element = el;
  }

  return (
    <div className="flex items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={classNames(
          'h-8 w-8 flex items-center justify-center rounded-full focus:outline-none mr-5',
          {
            'bg-blue': currentPage === 1,
            'bg-purple-light': currentPage > 1,
          }
        )}
      >
        <IconArrowLeft
          className={classNames('mr-0.5', { [styles['ic-active']]: currentPage > 1 })}
        />
      </button>
      {element.map((val) => val)}
      <button
        disabled={currentPage === maxPage}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={classNames(
          'h-8 w-8 flex items-center justify-center rounded-full focus:outline-none',
          {
            'bg-blue-light': currentPage === maxPage,
            'bg-purple-light': currentPage < maxPage,
          }
        )}
      >
        <IconArrowRight
          fill="red"
          className={classNames('ml-0.5', { [styles['ic-disable']]: currentPage === maxPage })}
        />
      </button>
    </div>
  );
};

export default Pagination;
