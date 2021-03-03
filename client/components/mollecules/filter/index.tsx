import classNames from 'classnames';
import { Button } from '../../atoms';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useOutside } from '../../../hooks/useOutside';

interface FilterProps {
  className?: string;
  onChange?: (selected: 'terbaru' | 'terlama' | 'AtoZ') => void;
}

const Filter: React.FC<FilterProps> = ({ className, onChange }) => {
  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<'terbaru' | 'terlama' | 'AtoZ' | undefined>();
  const triggerRef = useRef();
  const elemRef = useRef();

  useOutside(elemRef, triggerRef, () => {
    setShow(false);
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = e.currentTarget;

    setShow(false);
    setActive(value as 'terbaru' | 'terlama' | 'AtoZ');
    if (onChange) onChange(value as 'terbaru' | 'terlama' | 'AtoZ');
  };

  return (
    <div className={classNames('relative', className)}>
      <Button ref={triggerRef} onClick={() => setShow(!show)} customHeight className="h-8">
        Filter
      </Button>
      <AnimatePresence exitBeforeEnter>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.1 }}
            ref={elemRef}
            className="absolute bg-white shadow-lg px-6 py-2 z-30 rounded-md left-0 top-9"
          >
            <button
              onClick={handleClick}
              value="terbaru"
              className={classNames(
                'md:text-body text-body-sm py-1 hover:text-red focus:outline-none',
                active === 'terbaru' ? 'text-red' : 'text-black'
              )}
            >
              Terbaru
            </button>
            <button
              onClick={handleClick}
              value="terlama"
              className={classNames(
                'md:text-body text-body-sm py-1 hover:text-red focus:outline-none',
                active === 'terlama' ? 'text-red' : 'text-black'
              )}
            >
              Terlama
            </button>
            <button
              onClick={handleClick}
              value="AtoZ"
              className={classNames(
                'md:text-body text-body-sm py-1 hover:text-red focus:outline-none',
                active === 'AtoZ' ? 'text-red' : 'text-black'
              )}
            >
              A-Z
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
