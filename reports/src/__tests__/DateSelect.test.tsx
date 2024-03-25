import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import moment from 'moment';
import { DateRange } from 'react-day-picker';
import DateSelect from '../components/dateSelect/index'; // Update the path based on your project structure
import * as metricServices from '../services/metricServices';
import { calculateCapacityTotal, calculateOvertimeTotal } from '../helper/MetricCalculations';
import PeopleFilter from '../interface/peopleFilterInterface';
import {
  moveWeeks, arrowRangeSelector, moveMonths, moveThisYear, moveQuarter, moveNext12Week,
} from '../helper/dateFilter';
// Mock the redux store hooks (useAppDispatch and useAppSelector)
const mockDispatch = jest.fn();
jest.mock('../redux/store/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

describe('DateSelect component', () => {
  it('renders DateSelect component correctly', () => {
    const initialState = {
      apiSlice: {
        taskData: [], // Mock an empty taskDataList here
      },
    };

    // Mocking useSelector to return the initial state
    require('../redux/store/store').useAppSelector.mockReturnValue(initialState);
    const { getByText, getByTestId } = render(<DateSelect />);
    const monthText = getByText('This week:');
    expect(monthText).toBeInTheDocument();
    fireEvent.click(getByTestId('dropdownDefaultCheckbox'));

    // Assert that the dropdown is visible
    expect(getByText('Date Range:')).toBeInTheDocument();
    // Add more specific assertions as needed
  });
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

// describe('getOvertimeTotalHours function', () => {

//   // it('fetches total overtime and dispatches it to Redux', async () => {
//   //   const peopleFilter = {
//   //     // Mocked people filter data
//   //     'legacy.capacity': {
//   //       18104392: 168,
//   //       // Add more data as needed for different scenarios
//   //     },
//   //     'legacy.totals': [],
//   //     'legacy.overtime': {
//   //       18104392: {
//   //         future: 0,
//   //         logged: 0,
//   //         total: 0,
//   //       },
//   //     },
//   //     'legacy.timeoff': {
//   //     },
//   //     datapoints: [],
//   //   };
//   //   const mockOvertimeData = [
//   //     { key1: { total: 0 } },
//   //     { key2: { total: 0 } },
//   //     // Add more mock data entries as needed for testing different scenarios
//   //   ];

//   //   // const getTotalOvertimeMock = jest.spyOn(metricServices, 'getTotalOvertime');
//   //   // getTotalOvertimeMock.mockResolvedValueOnce(mockOvertimeData);

//   //   const totalOvertime = await calculateOvertimeTotal(mockOvertimeData as PeopleFilter);

//   //   // expect(metricServices.getTotalOvertime).toHaveBeenCalledWith(peopleFilter); // Assuming peopleFilter is defined in scope
//   //   expect(totalOvertime).toBe(0); // Total of mock data entries

//   //   // expect(mockDispatch).toHaveBeenCalledWith(setTotalOverTime(30)); // Total of mock data entries
//   // });
// });

jest.mock('../services/metricServices', () => ({
  getTotalCapacity: jest.fn(),
  getTotalOvertime: jest.fn(),
}));
const mockPeopleFilter = {
  // Mocked people filter data
  'legacy.capacity': {
    18104392: 168,
    // Add more data as needed for different scenarios
  },
  'legacy.totals': [],
  'legacy.overtime': {
    18104392: {
      future: 0,
      logged: 0,
      total: 0,
    },
  },
  'legacy.timeoff': {
  },
  datapoints: [],
};

describe('calculateOvertimeTotal function', () => {
  it('calculates total capacity correctly', async () => {
    // Mock data and setup

    const mockCapacityData = [{ key1: 10 }, { key2: 20 }]; // Replace with your mock capacity data
    // const mockOvertimeData = [{ key1: 10 }, { key2: 20 }]; // Replace with your mock capacity data

    // Mock the resolved value of getTotalCapacity
    (metricServices.getTotalCapacity as jest.Mock).mockResolvedValueOnce(mockCapacityData);
    // (metricServices.getTotalOvertime as jest.Mock).mockResolvedValueOnce(mockOvertimeData);

    // Execute the function
    const totalCapacity = await calculateCapacityTotal(mockPeopleFilter as unknown as PeopleFilter);
    // const totalOvertime = await calculateOvertimeTotal(mockPeopleFilter as unknown as PeopleFilter);

    // Assertions
    expect(metricServices.getTotalCapacity).toHaveBeenCalledWith(mockPeopleFilter);
    expect(totalCapacity).toBe(30); // Replace with the expected total based on your mocked data
    // expect(metricServices.getTotalOvertime).toHaveBeenCalledWith(mockPeopleFilter);
    // expect(totalOvertime).toBe(50); // Replace with the expected total based on your mocked data
  });

  it('calculates total overtime correctly', async () => {
    // Mock data and setup
    const mockOvertimeData = [{ key1: 10 }, { key2: 20 }]; // Replace with your mock capacity data
    // const mockOvertimeData = [{ key1: 10 }, { key2: 20 }]; // Replace with your mock capacity data

    // Mock the resolved value of getTotalCapacity
    (metricServices.getTotalOvertime as jest.Mock).mockResolvedValueOnce(mockOvertimeData);
    // (metricServices.getTotalOvertime as jest.Mock).mockResolvedValueOnce(mockOvertimeData);

    // Execute the function
    const totalOvertime = await calculateOvertimeTotal(mockPeopleFilter as unknown as PeopleFilter);
    // const totalOvertime = await calculateOvertimeTotal(mockPeopleFilter as unknown as PeopleFilter);
    // Assertions
    expect(metricServices.getTotalOvertime).toHaveBeenCalledWith(mockPeopleFilter);
    // expect(totalOvertime).toBe(30); // Replace with the expected total based on your mocked data
    // expect(metricServices.getTotalOvertime).toHaveBeenCalledWith(mockPeopleFilter);
    // expect(totalOvertime).toBe(50); // Replace with the expected total based on your mocked data
  });

  // jest.mock('../services/metricServices', () => ({
  //   ...jest.requireActual('../services/metricServices'),
  //   getTotalCapacity: jest.fn(),
  // }));
  // jest.mock('../helper/MetricCalculations', () => ({
  //   ...jest.requireActual('../helper/MetricCalculations'),
  //   calculateCapacityTotal: jest.fn().mockResolvedValue(168),
  // }));

  // it('calculates total capacity correctly', async () => {
  //   // Mocked data and setup
  //   const mockCapacityData = {
  //     'legacy.capacity': {
  //       18104392: 168,
  //     },
  //   };
  //   (getTotalCapacity as jest.Mock).mockResolvedValueOnce(mockCapacityData);
  //   // (calculateCapacityTotal as jest.Mock).mockResolvedValueOnce(168); // Replace with your expected total capacity

  //   // Render DateSelect component within Provider for Redux integration
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <DateSelect />
  //     </Provider>,
  //   );

  //   // Simulate component interactions that trigger the function
  //   fireEvent.change(getByTestId('dayPickerTestid'));

  //   // Wait for the asynchronous dispatch to complete
  //   await waitFor(() => {
  //     // Retrieve dispatched actions from your Redux store
  //     const actions = store.getState();

  //     // Check if the 'setTotalCapacity' action is dispatched with the expected payload
  //     expect(actions.metrics.totalCapacity).toContainEqual({ payload: 30 });
  //     // Modify the action type and payload according to your actual setup

  //     // Add assertions for expected behaviors or states based on dispatched actions or state updates
  //   });
  // });
});

// Moves Arrows Functionality
describe('Date Range Functions', () => {
  const setRangeMock = jest.fn();

  jest.mock('../helper/dateFilter', () => ({
    ...jest.requireActual('../helper/dateFilter'),
    arrowRangeSelector: jest.fn(),
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('moves weeks forward', () => {
    const range = {
      from: moment('2022-01-02').toDate(),
      to: moment('2022-01-07').toDate(),
    };
    moveWeeks(range, setRangeMock, true);
    const expectedFrom = moment('2022-01-02').toDate();
    const expectedTo = moment('2022-01-07').endOf('isoWeek').toDate();
    const differenceInDays = moment(expectedTo).diff(moment(expectedFrom), 'days');
    expect(differenceInDays).toBe(7);
  });
  test('moves month forward', () => {
    const range = {
      from: moment('2022-01-02').toDate(),
      to: moment('2022-02-07').toDate(),
    };
    moveMonths(range, setRangeMock, true);
    const expectedFrom = moment('2022-01-02').toDate();
    const expectedTo = moment('2022-02-07').endOf('month').toDate();
    const differenceInDays = moment(expectedTo).diff(moment(expectedFrom), 'month');
    expect(differenceInDays).toBe(1);
  });
  test('moves year forward', () => {
    const range = {
      from: moment('2022-01-01').toDate(),
      to: moment('2022-12-31').toDate(),
    };
    moveThisYear(range, setRangeMock, true);
    const expectedFrom = moment('2022-01-01').toDate();
    const expectedTo = moment('2022-12-31').startOf('days').toDate();
    const differenceInDays = moment(expectedTo).diff(moment(expectedFrom), 'days');
    expect(differenceInDays).toBe(364);
  });
  test('moves Quarter forward', () => {
    const range = {
      from: moment('2022-01-01').toDate(),
      to: moment('2022-04-01').toDate(),
    };
    moveQuarter(range, setRangeMock, true);
    const expectedFrom = moment('2022-01-01').toDate();
    const expectedTo = moment('2022-04-01').endOf('month').toDate();
    const differenceInDays = moment(expectedTo).diff(moment(expectedFrom), 'month');
    expect(differenceInDays).toBe(3);
  });
  test('moves 12 weeks forward', () => {
    const range = {
      from: moment('2023-12-18').toDate(),
      to: moment('2024-03-11').toDate(),
    };
    moveNext12Week(range, setRangeMock, true);
    const expectedFrom = moment('2023-12-18').toDate();
    const expectedTo = moment('2024-03-11').endOf('weeks').toDate();
    const differenceInDays = moment(expectedTo).diff(moment(expectedFrom), 'weeks');
    expect(differenceInDays).toBe(12);
  });
});

jest.mock('../helper/dateFilter', () => ({
  ...jest.requireActual('../helper/dateFilter'),
  moveMonths: jest.fn(),
  moveWeeks: jest.fn(),
  moveThisYear: jest.fn(),
  moveQuarter: jest.fn(),
  moveNext12Week: jest.fn(),
  moveCustom: jest.fn(),
}));

describe('arrowRangeSelector function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const callableAction = (range: DateRange | undefined, setRangeMock: { (value: React.SetStateAction<DateRange | undefined>): void; (value: React.SetStateAction<DateRange | undefined>): void; (arg0: { from: any; to: Date; }): void; }, daysSelected: string) => (
    <div>
      <div data-testid="left-arrow" onKeyDown={() => {}} onClick={() => arrowRangeSelector(range, setRangeMock, false, daysSelected)}>
        Left
      </div>
    </div>
  );

  test('calls moveMonths for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-01-01'), to: new Date('2022-01-07') };
    const daysSelected = 'This month';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls moveMonths for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-01-01'), to: new Date('2022-01-07') };
    const daysSelected = 'This week';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls moveThisYear for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-12-31'), to: new Date('2022-01-01') };
    const daysSelected = 'This year';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls moveThisQuarter for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'This quarter';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls moveNext12Weeks for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'Next 12 weeks';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls lastWeek for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'Last week';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls LastMonth for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'Last month';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls Last Quarter for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'Last quarter';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls Last year for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'Last year';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
  test('calls Custom for "Left" click', () => {
    const setRangeMock = jest.fn();
    const range = { from: new Date('2022-04-01'), to: new Date('2022-01-01') };
    const daysSelected = 'Custom';
    const { getByTestId } = render(
      callableAction(range, setRangeMock, daysSelected),
    );

    fireEvent.click(getByTestId('left-arrow'));
  });
});
