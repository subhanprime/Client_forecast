import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Chart from '../components/charts';
import { store } from '../redux/store/store';
import * as CalculationsChart from '../helper/CalculationsChart';

// ********************************** CHART TESTS  *****************************
// Mock useAppSelector
// jest.mock('../../redux/store/store', () => ({
//   useAppSelector: jest.fn(),
// }));

jest.mock('../redux/store/store', () => ({
  useAppSelector: jest.fn(),
}));

// Mock the react-chartjs-2 library
jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(({ data }) => (
    <div data-testid="mock-chart">{JSON.stringify(data)}</div>
  )),
}));

describe('Chart Component', () => {
  // beforeEach(() => {
  //   // Mock the useAppSelector hook
  //   jest.mock('../redux/store/store', () => ({
  //     useAppSelector: jest.fn(),
  //   }));
  // });

  // it('renders chart when data is available Day', () => {
  //   const mockData = {
  //     'legacy.capacity': {
  //       // Add relevant data as needed for your test scenarios
  //       18104392: 168,
  //       // Add more properties as needed
  //     },
  //     chart: {
  //       datapoints: [
  //         // Provide relevant mock datapoints for your test scenario
  //         { date: '2023-01-01', billable: 10, capacity: 20 },
  //         // Add more datapoints as needed for testing different scenarios
  //       ],
  //     },
  //   };

  //   // Mock the useSelector hook to return the mock data
  //   require('../redux/store/store').useAppSelector.mockReturnValue(mockData);

  //   const { getByTestId, queryByText } = render(<Chart selectedType="Days" />);
  //   const chartElement = getByTestId('mock-chart');
  //   expect(chartElement).toBeInTheDocument();
  //   expect(queryByText('No data available')).toBeNull();
  //   // Add more specific assertions based on your requirements
  // });

  // it('renders chart when data is available Month', () => {
  //   const mockData = {
  //     'legacy.capacity': {
  //       // Add relevant data as needed for your test scenarios
  //       18104392: 168,
  //       // Add more properties as needed
  //     },
  //     chart: {
  //       datapoints: [
  //         // Provide relevant mock datapoints for your test scenario
  //         { date: '2023-01-01', billable: 10, capacity: 20 },
  //         // Add more datapoints as needed for testing different scenarios
  //       ],
  //     },
  //   };

  //   // Mock the useSelector hook to return the mock data
  //   require('../redux/store/store').useAppSelector.mockReturnValue(mockData);

  //   const { getByTestId, queryByText } = render(<Chart selectedType="Month" />);
  //   const chartElement = getByTestId('mock-chart');
  //   expect(chartElement).toBeInTheDocument();
  //   expect(queryByText('No data available')).toBeNull();
  //   // Add more specific assertions based on your requirements
  // });

  it('renders chart when data is available Weeks', () => {
    const mockData = {
      'legacy.capacity': {
        // Add relevant data as needed for your test scenarios
        18104392: 168,
        // Add more properties as needed
      },
      chart: {
        datapoints: [
          // Provide relevant mock datapoints for your test scenario
          { date: '2023-01-01', billable: 10, capacity: 20 },
          // Add more datapoints as needed for testing different scenarios
        ],
      },
    };

    // // Mock the useSelector hook to return the mock data
    // require('../redux/store/store').useAppSelector.mockReturnValue(mockData);

    // const { getByTestId, queryByText } = render(
    //   <Provider store={store}>
    //     <Chart selectedType="Weeks" />
    //   </Provider>,
    // );
    // const chartElement = getByTestId('mock-chart');
    // expect(chartElement).toBeInTheDocument();
    // expect(queryByText('No data available')).toBeNull();
    // Add more specific assertions based on your requirements
  });
});
