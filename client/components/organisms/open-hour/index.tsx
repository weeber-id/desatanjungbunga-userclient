import classNames from 'classnames';
import { OperationTimeState } from '../../../@types/types';
import { IconClose } from '../../../assets';
import { DayHashMap } from '../../../helpers';

interface OpenHourProps {
  operationTime: OperationTimeState;
  onClose?: () => void;
  title?: string;
}

const OpenHour: React.FC<OpenHourProps> = ({ operationTime, onClose, title }) => {
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
    <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-sm">
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
      </div>
    </div>
  );
};

export default OpenHour;
