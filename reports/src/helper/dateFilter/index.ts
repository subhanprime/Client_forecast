import moment from 'moment';
import { DateRange } from 'react-day-picker';

export const dateRangeList = [
  'Next 12 weeks',
  'This week',
  'This month',
  'This quarter',
  'This year',
  'Last week',
  'Last month',
  'Last quarter',
  'Last year',
];
export const dateOptions = {
  weekday: 'short' as const,
  year: 'numeric' as const,
  month: 'short' as const,
  day: '2-digit' as const,
  hour: '2-digit' as const,
  minute: '2-digit' as const,
  second: '2-digit' as const,
  timeZoneName: 'short' as const,
  timeZone: 'Asia/Karachi', // Adjust this to your specific time zone
};

interface SetRangeInterface {
  (arg0: { from: Date; to: Date; }): void;
}
const formatAndSetDate = (startOfYear: string | number | Date, endOfYear: string | number | Date, setRange: (arg0: { from: Date; to: Date; }) => void) => {
  const startDate = new Date(startOfYear);
  const endDate = new Date(endOfYear);
  if (dateRangeList.includes('Custom')) dateRangeList.splice(0, 1);
  setRange({ from: startDate, to: endDate });
};

const setDateWithDirection = (
  nextDateFrom: moment.Moment,
  nextDateFromRemove: moment.Moment,
  nextDateTo: moment.Moment,
  nextDateToRemove: moment.Moment,
  setRange: { (arg0: { from: any; to: Date; }): void; (arg0: { from: any; to: any; }): void; },
  up: boolean,
) => {
  setRange({
    from: up ? nextDateFrom.toDate() : nextDateFromRemove.toDate(),
    to: up ? nextDateTo.toDate() : nextDateToRemove.toDate(),
  });
};

export const getThisMonth = (setRange: SetRangeInterface) => {
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
  const endOfMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(startOfMonth, endOfMonth, setRange);
};
export const getThisWeek = (setRange: SetRangeInterface) => {
  const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD hh:mm');
  const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(startOfWeek, endOfWeek, setRange);
};
export const getThisYear = (setRange: SetRangeInterface) => {
  const startOfYear = moment().startOf('year').format('YYYY-MM-DD hh:mm');
  const endOfYear = moment().endOf('year').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(startOfYear, endOfYear, setRange);
};
export const getThisQuarter = (setRange: SetRangeInterface) => {
  const currentQuarter = moment().quarter();
  const startQuarter = moment().quarter(currentQuarter).startOf('quarter').format('YYYY-MM-DD hh:mm');
  const endQuarter = moment().quarter(currentQuarter).endOf('quarter').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(startQuarter, endQuarter, setRange);
};
export const getNext12Weeks = (setRange: SetRangeInterface) => {
  const currentWeek = moment().startOf('isoWeek').add(0, 'week').format('YYYY-MM-DD hh:mm');
  const next12Weeks = moment().startOf('isoWeek').add(12, 'week').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(currentWeek, next12Weeks, setRange);
};
export const getLastWeek = (setRange: SetRangeInterface) => {
  const lastweekStart = moment().startOf('isoWeek').add(-1, 'week').format('YYYY-MM-DD hh:mm');
  const lastweekEnd = moment().endOf('isoWeek').add(-1, 'week').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(lastweekStart, lastweekEnd, setRange);
};
export const getLastMonth = (setRange: SetRangeInterface) => {
  const prevMonthFirstDay = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD hh:mm');
  const nextMonthLastDay = moment().add(-1, 'months').endOf('month').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(prevMonthFirstDay, nextMonthLastDay, setRange);
};
export const getLastQuarter = (setRange: SetRangeInterface) => {
  const currentQuarter = moment().quarter();
  const startQuarter = moment().quarter(currentQuarter - 1).startOf('quarter').format('YYYY-MM-DD hh:mm');
  const endQuarter = moment().quarter(currentQuarter - 1).endOf('quarter').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(startQuarter, endQuarter, setRange);
};
export const getLastYear = (setRange: SetRangeInterface) => {
  const startOfYear = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD hh:mm');
  const endOfYear = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD hh:mm');
  formatAndSetDate(startOfYear, endOfYear, setRange);
};
export const dateRangeFilter = (daysSelected: string, setRange: (arg0: { from: Date; to: Date; }) => void) => {
  if (daysSelected === 'This month') getThisMonth(setRange);
  if (daysSelected === 'This week') getThisWeek(setRange);
  if (daysSelected === 'This year') getThisYear(setRange);
  if (daysSelected === 'This quarter') getThisQuarter(setRange);
  if (daysSelected === 'Next 12 weeks') getNext12Weeks(setRange);
  if (daysSelected === 'Last week') getLastWeek(setRange);
  if (daysSelected === 'Last month') getLastMonth(setRange);
  if (daysSelected === 'Last quarter') getLastQuarter(setRange);
  if (daysSelected === 'Last year') getLastYear(setRange);
};

export const moveWeeks = (
  range: DateRange | undefined,
  setRange: (arg0: { from: any; to: Date; }) => void,
  up:boolean,
) => {
  if (range?.from && range.to) {
    const momentDateFrom = moment(range?.from).startOf('isoWeek');
    const momentDateTo = moment(range.to);
    const addMoreWeeks = momentDateTo.clone().add(1, 'week').startOf('isoWeek');
    const weekDifference = addMoreWeeks.diff(momentDateFrom, 'weeks');
    const nextDateTo = momentDateTo.clone().add(weekDifference, 'weeks').endOf('isoWeek');
    const nextDateFrom = nextDateTo.clone().startOf('isoWeek');

    const removeWeeks = momentDateTo.clone().add(-1, 'week').startOf('isoWeek');
    const weekDifferenceRemove = removeWeeks.diff(momentDateFrom, 'weeks');
    const nextDateToRemove = momentDateTo.clone().add(weekDifferenceRemove, 'weeks').endOf('isoWeek');
    const nextDateFromRemove = nextDateToRemove.clone().startOf('isoWeek');
    setDateWithDirection(nextDateFrom, nextDateFromRemove, nextDateTo, nextDateToRemove, setRange, up);
  }
};

export const moveMonths = (
  range: DateRange | undefined,
  setRange: (arg0: { from: any; to: Date; }) => void,
  up:boolean,
) => {
  if (range?.from && range.to) {
    const momentDateFrom = moment(range.from).startOf('month');
    const momentDateTo = moment(range.to).startOf('month');

    const addMoreMonth = momentDateTo.clone().add(1, 'month').startOf('month');
    const monthDifference = addMoreMonth.diff(momentDateFrom, 'months');
    const nextDateTo = momentDateTo.clone().add(1 * monthDifference, 'months').endOf('month');
    const nextDateFrom = nextDateTo.clone().startOf('month');

    const addMoreMonthRemove = momentDateTo.clone().add(-1, 'month').startOf('month');
    const monthDifferenceRemove = addMoreMonthRemove.diff(momentDateFrom, 'months');
    const nextDateToRemove = momentDateTo.clone().add(monthDifferenceRemove, 'month').endOf('month');
    const nextDateFromRemove = nextDateToRemove.clone().startOf('month');

    setDateWithDirection(nextDateFrom, nextDateFromRemove, nextDateTo, nextDateToRemove, setRange, up);
  }
};

export const moveNext12Week = (
  range: DateRange | undefined,
  setRange: (arg0: { from: any; to: Date; }) => void,
  up:boolean,
) => {
  if (range?.from && range.to) {
    const momentDateFrom = moment(range?.from).startOf('isoWeek');
    const momentDateTo = moment(range.to);

    const addMoreWeeks = momentDateTo.clone().add(12, 'weeks').startOf('isoWeek');
    const nextDateTo = momentDateTo.clone().add(12, 'weeks').startOf('isoWeek');
    const nextDateFrom = nextDateTo.clone().subtract(12, 'weeks').startOf('isoWeek');

    const addMoreWeeksRemove = momentDateFrom.clone().add(-12, 'weeks').startOf('isoWeek');
    const nextDateToRemove = momentDateTo.clone().add(-12, 'weeks');
    const nextDateFromRemove = momentDateFrom.clone().subtract(12, 'weeks');

    setDateWithDirection(nextDateFrom, nextDateFromRemove, nextDateTo, nextDateToRemove, setRange, up);
  }
};

export const moveThisYear = (
  range: DateRange | undefined,
  setRange: (arg0: { from: any; to: Date; }) => void,
  up:boolean,
) => {
  if (range?.from && range.to) {
    const momentDateFrom = moment(range?.from);
    const momentDateTo = moment(range.to);
    const addMoreYearFrom = momentDateFrom.clone().add(1, 'year');
    const addMoreYearTo = momentDateTo.clone().add(1, 'year');

    const nextDateFrom = addMoreYearFrom.clone().startOf('year');
    const nextDateTo = addMoreYearTo.clone().endOf('year');

    const removeMoreYearFrom = momentDateFrom.clone().add(-1, 'year');
    const removeMoreYearTo = momentDateTo.clone().add(-1, 'year');

    const nextDateFromRemove = removeMoreYearFrom.clone().startOf('year');
    const nextDateToRemove = removeMoreYearTo.clone().endOf('year');
    setDateWithDirection(nextDateFrom, nextDateFromRemove, nextDateTo, nextDateToRemove, setRange, up);
  }
};

export const moveQuarter = (
  range: DateRange | undefined,
  setRange: (arg0: { from: any; to: Date; }) => void,
  up:boolean,
) => {
  if (range?.from && range.to) {
    const momentDateFrom = moment(range.from).startOf('month');
    const momentDateTo = moment(range.to).startOf('month');

    const addMoreMonths = momentDateTo.clone().add(3, 'months');
    const nextDateTo = momentDateTo.clone().add(3, 'months').endOf('month');
    const nextDateFrom = nextDateTo.clone().subtract(2, 'months').startOf('month');

    const removeMoreMonths = momentDateFrom.clone().subtract(2, 'months').startOf('month');
    const monthDifference = momentDateTo.diff(removeMoreMonths, 'months');
    const nextDateFromRemove = momentDateFrom.clone().subtract(3, 'months').startOf('month');
    const nextDateToRemove = nextDateFrom.clone().add(-monthDifference, 'months').endOf('month');
    setDateWithDirection(nextDateFrom, nextDateFromRemove, nextDateTo, nextDateToRemove, setRange, up);
  }
};

export const moveCustom = (
  range: DateRange | undefined,
  setRange: (arg0: { from: any; to: Date; }) => void,
  up:boolean,
) => {
  if (range && range.from && range.to) {
    const rangeFrom = range?.from;
    const rangeTo = range?.to;
    const momentDateFrom = moment(rangeFrom);
    const momentDateTo = moment(rangeTo);
    const differenceDays = moment.duration(momentDateTo.diff(momentDateFrom)).asDays().toFixed();
    const parseIntDays = Math.round(parseInt(differenceDays, 10));
    const addMoreDays = up === true ? momentDateTo.add(parseIntDays, 'day') : momentDateFrom.subtract(parseIntDays, 'day');
    const parsedDate = moment(addMoreDays, 'DD/MM/YYYY');
    const formattedDate = parsedDate.format('ddd MMM DD YYYY HH:mm:ss');
    const nextDate = new Date(formattedDate);

    setRange({
      from: up ? rangeTo : nextDate,
      to: up ? nextDate : rangeFrom,
    });
  }
  if (range?.to === undefined || range?.from === undefined || moment(range?.from).format('DD/MM/YYYY') === moment(range?.to).format('DD/MM/YYYY')) {
    const momentDateFrom = moment(range?.from);
    let momentDateTo = moment(range?.to);
    if (range?.to === undefined) {
      momentDateTo = momentDateFrom;
    }

    const differenceDays = up ? moment.duration(momentDateTo.diff(momentDateFrom)).asDays().toFixed() : moment.duration(momentDateFrom.diff(momentDateTo)).asDays().toFixed();
    const parseIntDays = Math.round(parseInt(differenceDays, 10) + 1);

    const nextDate = up ? momentDateFrom.add(parseIntDays, 'day') : momentDateFrom.subtract(parseIntDays, 'day');

    setRange({
      from: undefined,
      to: nextDate.toDate(),
    });
  }
};

export const arrowRangeSelector = (
  givenRange: DateRange | undefined,
  setGivenRange: { (value: React.SetStateAction<DateRange | undefined>): void;
    (value: React.SetStateAction<DateRange | undefined>): void; (arg0: { from: any; to: Date; }): void; },
  direction: boolean,
  daysSelected:string,
) => {
  if (daysSelected === 'This month') moveMonths(givenRange, setGivenRange, direction);
  if (daysSelected === 'This week') moveWeeks(givenRange, setGivenRange, direction);
  if (daysSelected === 'This year') moveThisYear(givenRange, setGivenRange, direction);
  if (daysSelected === 'This quarter') moveQuarter(givenRange, setGivenRange, direction);
  if (daysSelected === 'Next 12 weeks') moveNext12Week(givenRange, setGivenRange, direction);
  if (daysSelected === 'Last week') moveWeeks(givenRange, setGivenRange, direction);
  if (daysSelected === 'Last month') moveMonths(givenRange, setGivenRange, direction);
  if (daysSelected === 'Last quarter') moveQuarter(givenRange, setGivenRange, direction);
  if (daysSelected === 'Last year') moveThisYear(givenRange, setGivenRange, direction);
  if (daysSelected === 'Custom') moveCustom(givenRange, setGivenRange, direction);
};
