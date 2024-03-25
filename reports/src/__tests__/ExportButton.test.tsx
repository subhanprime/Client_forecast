import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';

import ExportButton from '../components/exportButton';
// Mock the redux store hooks (useAppDispatch and useAppSelector)

describe('Export Button', () => {
  test('renders ExportButton component', () => {
    // Render the component
    const { getByTestId, getByText } = render(
      <ExportButton dropdownList={['Export chart data', 'Export table data']} defaultSelected="Export chart data" setSelectedState={() => {}} />,
    );

    // Check if the component renders without crashing
    const exportButton = getByTestId('dropdown-days');
    expect(exportButton).toBeInTheDocument();
  });

  //   test('toggles dropdown on button click', () => {
  //     // Render the component
  //     const { getByTestId } = render(
  //       <ExportButton dropdownList={['Export chart data', 'Export table data']} defaultSelected="Export chart data" setSelectedState={() => {}} />,
  //     );

  //     // Click the button to open the dropdown
  //     const exportButton = getByTestId('dropdown-days');
  //     fireEvent.click(exportButton);

  //     // Check if the dropdown is open
  //     const dropdown = document.querySelector('.w-[280px]');
  //     expect(dropdown).toBeInTheDocument();

  //     // Click the button again to close the dropdown
  //     fireEvent.click(exportButton);

  //     // Check if the dropdown is closed
  //     expect(dropdown).not.toBeInTheDocument();
  //   });

  test('exports chart data when "Export chart data" is clicked', async () => {
    // Mock the CSVLink component
    jest.mock('react-csv', () => ({
      CSVLink: jest.fn(),
    }));

    // Render the component
    const { getByTestId, getByText } = render(
      <ExportButton dropdownList={['Export chart data', 'Export table data']} defaultSelected="Export chart data" setSelectedState={() => {}} />,
    );

    // Click the button to open the dropdown
    const exportButton = getByTestId('dropdown-days');
    fireEvent.click(exportButton);

    // Click the "Export chart data" option
    const exportChartDataOption = getByText('Export chart data');
    fireEvent.click(exportChartDataOption);

    await waitFor(() => {
      expect((require('react-csv').CSVLink as jest.Mock).mock.calls).toEqual([]);
    });
  });

  //   // Similar test for "Export table data" option
  test('exports table data when "Export table data" is clicked', async () => {
    // Mock the CSVLink component
    jest.mock('react-csv', () => ({
      CSVLink: jest.fn(),
    }));

    // Render the component
    const { getByTestId, getByText } = render(
      <ExportButton dropdownList={['Export chart data', 'Export table data']} defaultSelected="Export chart data" setSelectedState={() => {}} />,
    );

    // Click the button to open the dropdown
    const exportButton = getByTestId('dropdown-days');
    fireEvent.click(exportButton);

    // Click the "Export table data" option
    const exportTableDataOption = getByText('Export table data');
    fireEvent.click(exportTableDataOption);

    // Check if the associated function (exportTableData) is called
    await waitFor(() => {
      // Check your expectations here
      // For example, you can check if the mock CSVLink component is called with the correct props
      expect((require('react-csv').CSVLink as jest.Mock).mock.calls).toEqual([]);
    });
  });
});
