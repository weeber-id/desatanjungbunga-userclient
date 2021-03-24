import { OperationTimeState } from '../@types/types';

export const DayHashMap = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  toBahasa(day: number) {
    switch (day) {
      case 0:
        return 'Minggu';
      case 1:
        return 'Senin';
      case 2:
        return 'Selasa';
      case 3:
        return 'Rabu';
      case 4:
        return 'Kamis';
      case 5:
        return 'Jumat';
      case 6:
        return 'Sabtu';
      default:
        return '';
    }
  },
};

export const defaultOperationTIme: OperationTimeState = {
  monday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
  tuesday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
  wednesday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
  thursday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
  friday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
  saturday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
  sunday: {
    open: false,
    from: '08:00',
    to: '20:00',
  },
};
