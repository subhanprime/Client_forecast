import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import Datepicker from '../components/datapicker/Datepicker';
import DateRangePicker from '../components/datapicker/DateRangePicker';
import { DateRangeExportDrop } from '../constants';

describe('Datepicker component', () => {
  test('renders Datepicker component with default date', () => {
    render(<Datepicker />);

    // Assert default date format
    expect(screen.getByText(/(\w{3} \d{2} \d{4})/)).toBeInTheDocument();
  });

  test('opens and closes the date picker', async () => {
    render(<Datepicker date="2023-06-06" />);

    // Check if the date picker is closed initially
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();

    // Click to open the date picker
    fireEvent.click(screen.getByText(/(\w{3} \d{2} \d{4})/));

    // Wait for the date picker to be rendered
    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    // Check if the date picker is open
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  test('selects a date in the date picker', async () => {
    const { getByTestId } = render(
      <div data-testid="test-date">
        <Datepicker />

      </div>,
    );
    const div = getByTestId('test-date');
    // Click to open the date picker
    fireEvent.click(screen.getByText(/(\w{3} \d{2} \d{4})/));

    // Wait for the date picker to be rendered
    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    // Find a date in the date picker and click it
    const dateToSelect = screen.getByText('15');
    fireEvent.click(dateToSelect);

    // Check if the selected date is displayed in the main input
    expect(screen.getByText(/(\w{3} 15 \d{4})/)).toBeInTheDocument();

    fireEvent.click(div);
  });
});
describe('DateRangePicker component', () => {
  test('renders DateRangepicker component with default date', () => {
    const { getByTestId } = render(<DateRangePicker DateRangeDrop={DateRangeExportDrop} />);

    const dateRange = getByTestId('date-range-picker');
    expect(dateRange).toBeInTheDocument();
    // Assert default date format
  });
  test('renders DateRangepicker component and open it and select date', async () => {
    const { getByTestId } = render(<DateRangePicker DateRangeDrop={DateRangeExportDrop} />);

    const dateRange = getByTestId('date-range-picker');
    const dateRangeBtn = getByTestId('date-range-button');
    expect(dateRange).toBeInTheDocument();
    fireEvent.click(dateRangeBtn);
    // Assert default date format

    await waitFor(() => {
      // Find a date in the date picker and click it
      const dateToSelect = screen.getAllByText('15')[0];
      fireEvent.click(dateToSelect);
    });
  });
  test('renders DateRangepicker component and open it', async () => {
    const { getByTestId } = render(<DateRangePicker DateRangeDrop={DateRangeExportDrop} />);

    const dateRange = getByTestId('date-range-picker');
    const dateRangeBtn = getByTestId('date-range-button');
    expect(dateRange).toBeInTheDocument();
    fireEvent.click(dateRangeBtn);
    // Assert default date format

    await waitFor(() => {
      // Find a date in the date picker and click it
      const dd = getByTestId('dropdown');
      expect(dd).toBeInTheDocument();
      fireEvent.click(dd);
    });
    await waitFor(() => {
      // Find a date in the date picker and click it
      const last = screen.getByText('Last week');
      fireEvent.click(last);
    });
  });
});
