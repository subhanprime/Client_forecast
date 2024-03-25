import moment from 'moment';
import { getBillableHours, getNonBillableHours, getScheduledHours } from '../helper/utils';

// ********************************** Date DropDown Function  *****************************
import {
  dateRangeFilter,
  getThisMonth,
  getThisYear,
  getThisQuarter,
  getNext12Weeks,
  getLastWeek,
  getLastQuarter,
  getLastMonth,
  getLastYear,
  arrowRangeSelector,
} from '../helper/dateFilter/index';
import { getRoundedValue, prepareChartCSV } from '../helper/peopleCSVPreperation';

// ********************************** Helper Function  *****************************
describe('Testing getNonBillableHours function', () => {
  it('calculates non-billable hours correctly', () => {
    const originalProp = {
      getValue: () => [
        {
          hours: [
            { hours: { scheduled: 5 }, billable: true },
            { hours: { scheduled: 10 }, billable: false },
          ],
        },
        {
          hours: [
            { hours: { scheduled: 8 }, billable: false },
            { hours: { scheduled: 12 }, billable: false },
          ],
        },
      ],
    };

    const result = getNonBillableHours(originalProp);
    expect(result).toBe(30); // Total non-billable hours: 10 + 8 + 12 = 30
  });
});

describe('Utils Tests', () => {
  it('calculates scheduled hours correctly', () => {
    const mockData = [
      {
        hours: [
          { hours: { scheduled: 5 } },
          { hours: { scheduled: 3 } },
        ],
      },
      {
        hours: [
          { hours: { scheduled: 8 } },
          { hours: { scheduled: 4 } },
        ],
      },
    ];

    const mockProp = {
      getValue: jest.fn(() => mockData),
    };

    const result = getScheduledHours(mockProp);

    // The expected result is the sum of all scheduled hours in the mock data
    expect(result).toBe(5 + 3 + 8 + 4);
  });

  it('handles undefined or empty data gracefully', () => {
    // Test with undefined data
    const undefinedProp = { getValue: jest.fn(() => undefined) };
    expect(getScheduledHours(undefinedProp)).toBe(0);

    // Test with empty array
    const emptyArrayProp = { getValue: jest.fn(() => []) };
    expect(getScheduledHours(emptyArrayProp)).toBe(0);

    // Test with data where hours is not an array
    const nonArrayProp = { getValue: jest.fn(() => [{ hours: 'not an array' }]) };
    expect(getScheduledHours(nonArrayProp)).toBe(0);
  });

  it('calculates billable hours correctly', () => {
    const mockData = [
      {
        hours: [
          { hours: { scheduled: 5 }, billable: true },
          { hours: { scheduled: 3 }, billable: false },
        ],
      },
      {
        hours: [
          { hours: { scheduled: 8 }, billable: true },
          { hours: { scheduled: 4 }, billable: true },
        ],
      },
    ];

    const mockProp = {
      getValue: jest.fn(() => mockData),
    };

    const result = getBillableHours(mockProp);

    // The expected result is the sum of all billable hours in the mock data
    expect(result).toBe(5 + 8 + 4);
  });
});

describe('dateRangeFilter', () => {
  test('should call the corresponding function for "This month"', () => {
    const setRangeMock = jest.fn();
    dateRangeFilter('This month', setRangeMock);
    expect(setRangeMock).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date),
    });
  });

  // Add similar tests for other date ranges...

  test('should not call any function for an unknown date range', () => {
    const setRangeMock = jest.fn();
    dateRangeFilter('Unknown Range', setRangeMock);
    expect(setRangeMock).not.toHaveBeenCalled();
  });
});

describe('getThisMonth', () => {
  test('should call setRange with the correct date range for this month', () => {
    const setRangeMock = jest.fn();
    getThisMonth(setRangeMock);

    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm');

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(startOfMonth),
      to: new Date(endOfMonth),
    });
  });
  test('should call setRange with the correct date range for this Year', () => {
    const setRangeMock = jest.fn();
    getThisYear(setRangeMock);

    const startOfYear = moment().startOf('year').format('YYYY-MM-DD hh:mm');
    const endOfYear = moment().endOf('year').format('YYYY-MM-DD hh:mm');

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(startOfYear),
      to: new Date(endOfYear),
    });
  });
  test('should call setRange with the correct date range for this YearQuarter', () => {
    const setRangeMock = jest.fn();
    getThisQuarter(setRangeMock);

    const currentQuarter = moment().quarter();
    const startQuarter = moment().quarter(currentQuarter).startOf('quarter').format('YYYY-MM-DD hh:mm');
    const endQuarter = moment().quarter(currentQuarter).endOf('quarter').format('YYYY-MM-DD hh:mm');

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(startQuarter),
      to: new Date(endQuarter),
    });
  });
  test('should call setRange with the correct date range for this getNext12Weekss', () => {
    const setRangeMock = jest.fn();
    getNext12Weeks(setRangeMock);

    const currentWeek = moment().startOf('isoWeek').add(0, 'week').format('YYYY-MM-DD hh:mm');
    const next12Weeks = moment().startOf('isoWeek').add(12, 'week').format('YYYY-MM-DD hh:mm');

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(currentWeek),
      to: new Date(next12Weeks),
    });
  });
  test('should call setRange with the correct date range for this getLastWeek', () => {
    const setRangeMock = jest.fn();
    getLastWeek(setRangeMock);
    const lastweekStart = moment().startOf('isoWeek').add(-1, 'week').format('YYYY-MM-DD hh:mm');
    const lastweekEnd = moment().endOf('isoWeek').add(-1, 'week').format('YYYY-MM-DD hh:mm');

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(lastweekStart),
      to: new Date(lastweekEnd),
    });
  });
  test('should call setRange with the correct date range for this getLastQuarter', () => {
    const setRangeMock = jest.fn();
    getLastQuarter(setRangeMock);
    const currentQuarter = moment().quarter();
    const startQuarter = moment().quarter(currentQuarter - 1).startOf('quarter').format('YYYY-MM-DD hh:mm');
    const endQuarter = moment().quarter(currentQuarter - 1).endOf('quarter').format('YYYY-MM-DD hh:mm');

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(startQuarter),
      to: new Date(endQuarter),
    });
  });
  test('should call setRange with the correct date range for this getLastMonth', () => {
    const setRangeMock = jest.fn();
    getLastMonth(setRangeMock);
    const prevMonthFirstDay = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD hh:mm');
    const nextMonthLastDay = moment().add(-1, 'months').endOf('month').format('YYYY-MM-DD hh:mm');
    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(prevMonthFirstDay),
      to: new Date(nextMonthLastDay),
    });
  });
  test('should call setRange with the correct date range for this getLastYear', () => {
    const setRangeMock = jest.fn();
    getLastYear(setRangeMock);
    const startOfYear = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD hh:mm');
    const endOfYear = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD hh:mm');
    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(startOfYear),
      to: new Date(endOfYear),
    });
  });
});

// Describe the test suite
describe('prepareChartCSV', () => {
  it('rounds positive numbers correctly', () => {
    const inputValue = 12.345;
    const result = getRoundedValue(inputValue);
    expect(result).toBe(12);
  });
  it('sets chart CSV correctly', async () => {
    // Arrange: Set up any necessary mocks or test data
    const setChartCSVMock = jest.fn();
    await prepareChartCSV(setChartCSVMock);
    expect(setChartCSVMock.mock.calls[0][0][0]).toEqual(
      {
        Date: '2023-12-01',
        Capacity_hrs: 224,
        Schedued_hrs: 0,
        Schedued_perc: 0,
        Schedued_bilable_hrs: 0,
        Schedued_bilable_perct: 0,
        Schedued_non_bilable_hrs: 0,
        Schedued_non_bilable_perct: 0,
        Schedued_tentative_all_hrs: 0,
        Schedued_tentative_all_perct: 0,
        Unschedued_hrs: 224,
        Logged_hrs: 0,
        Logged_perct: 0,
        Logged_billable_hrs: 0,
        Logged_billable_perct: 0,
        Logged_non_billable_hrs: 0,
        Logged_non_billable_perct: 0,
        Scheduled_overtime_hrs: 0,
        Logged_overtime_hrs: 0,
        Timeoff_Holiday_hrs: 0,
        Timeoff_Holiday_days: 0,
      },
    );
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
