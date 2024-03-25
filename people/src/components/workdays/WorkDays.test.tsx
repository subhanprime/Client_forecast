import React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkDays from './WorkDays';

describe('WorkDays component', () => {
  it('renders checkboxes for each day', () => {
    render(<WorkDays />);

    // Check if checkboxes for all days are rendered
    expect(screen.getAllByRole('checkbox')).toHaveLength(7);
  });

  it('updates input field value when a day is selected', async () => {
    const { findByTestId } = render(<WorkDays />);
    const check = await findByTestId('Sunday');
    // Click on the Sunday checkbox
    await waitFor(() => {
      fireEvent.click(check);
    });
    // Wait for the input field to appear
    await waitFor(async () => {
      const input = await findByTestId('text-input');

      expect(input).toHaveValue('8              h ');
    });
  });

  it('hides input field when a day is deselected', async () => {
    const { findByTestId } = render(<WorkDays />);
    const check = await findByTestId('Sunday');
    // Click on the Sunday checkbox
    await waitFor(() => {
      fireEvent.click(check);
    });
    // Wait for the input field to appear
    await waitFor(async () => {
      const input = await findByTestId('text-input');

      expect(input).toHaveValue('8              h ');
    });

    await waitFor(() => {
      fireEvent.click(check);
    });
  });
});
