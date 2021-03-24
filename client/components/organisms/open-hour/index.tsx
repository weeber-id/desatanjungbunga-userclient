import classNames from 'classnames';
import { motion } from 'framer-motion';
import { OperationTimeState } from '../../../@types/types';
import { IconClose } from '../../../assets';
import { DayHashMap } from '../../../helpers';

interface OpenHourProps {
  operationTime: OperationTimeState;
  onClose?: () => void;
  title?: string;
}

const OpenHour: React.FC<OpenHourProps> = ({ operationTime, onClose, title }) => {
  const variants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  const createOpenHour = () => {
    let i = new Date().getDay();
    const items = [];

    while (items.length < 7) {
      const day = DayHashMap[i % 7];
      const openHour = operationTime[day];

      const dayBahasa = DayHashMap.toBahasa(i % 7);

      const stringHtml = (
        <div
          style={{ gridTemplateColumns: '61px 1fr' }}
          className={classNames(
            'grid gap-12 text-body mb-3 last:mb-0',
            items.length === 0 ? 'text-purple font-medium' : 'text-black'
          )}
        >
          <span>{dayBahasa}</span>
          {openHour.open ? (
            <span>
              {openHour.from} - {openHour.to}
            </span>
          ) : (
            <span>Libur</span>
          )}
        </div>
      );

      items.push(stringHtml);

      i++;
    }

    return items;
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 120 }}
      className="fixed flex justify-center items-center top-0 left-0 w-full h-full overflow-auto bg-black bg-opacity-10"
    >
      <motion.div
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={variants}
        className="bg-white w-full max-w-sm"
      >
        <div className="px-8 pt-8 pb-4 border-b border-grey-light">
          <div className="flex items-center justify-between">
            <span className="text-body text-black">Jam Buka</span>
            <button onClick={onClose}>
              <IconClose className="ic-black" height={16} width={16} />
            </button>
          </div>
          <div className="text-grey mt-2">{title}</div>
        </div>
        <div className="p-8">{createOpenHour()}</div>
      </motion.div>
    </motion.div>
  );
};

export default OpenHour;
