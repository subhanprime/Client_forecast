import { DateRangeEnum } from './enums';

export interface GetDateRangeParams { skipNum: number, totalNum: number, unit:'days' | 'weeks' | 'months' | 'years' | 'quarter', isPrev:boolean }

export const calenderViewConstants = {
  Days: 150,
  Weeks: 100,
  Months: 40,
};

export const rowsViewConstants = {
  Compact: { single: 10, full: 80 },
  Comfortable: { single: 20, full: 160 },
  Spacious: { single: 40, full: 320 },
};

export const CursorTypes = {
  add: 'cursor-cell',
  delete: 'cursor-no-drop',
  view: 'cursor-context-menu',
};

// skipNum, totalNum, unit, isPrev,
export const DateRangeVars:{ [DateRangeEnum:string]:GetDateRangeParams } = {
  [DateRangeEnum.Week]: {
    skipNum: 0,
    totalNum: 1,
    unit: 'weeks',
    isPrev: false,
  },
  [DateRangeEnum.Month]: {
    skipNum: 0,
    totalNum: 1,
    unit: 'months',
    isPrev: false,
  },
  [DateRangeEnum.Quarter]: {
    skipNum: 0,
    totalNum: 1,
    unit: 'quarter',
    isPrev: false,
  },
  [DateRangeEnum.Year]: {
    skipNum: 0,
    totalNum: 1,
    unit: 'years',
    isPrev: false,
  },
  [DateRangeEnum.LWeek]: {
    skipNum: 1,
    totalNum: 1,
    unit: 'weeks',
    isPrev: true,
  },
  [DateRangeEnum.LMonth]: {
    skipNum: 1,
    totalNum: 1,
    unit: 'months',
    isPrev: true,
  },
  [DateRangeEnum.LQuarter]: {
    skipNum: 1,
    totalNum: 1,
    unit: 'quarter',
    isPrev: true,
  },
  [DateRangeEnum.LYear]: {
    skipNum: 1,
    totalNum: 1,
    unit: 'years',
    isPrev: true,
  },
  [DateRangeEnum.Next]: {
    skipNum: 1,
    totalNum: 1,
    unit: 'weeks',
    isPrev: false,
  },
  [DateRangeEnum.Next2]: {
    skipNum: 1,
    totalNum: 2,
    unit: 'weeks',
    isPrev: false,
  },
  [DateRangeEnum.Next12]: {
    skipNum: 1,
    totalNum: 12,
    unit: 'weeks',
    isPrev: false,
  },

};
