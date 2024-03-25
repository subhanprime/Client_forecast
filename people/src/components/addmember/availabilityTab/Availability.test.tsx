import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Availability from './Availability';

describe('Availability component', () => {
  it('renders without crashing', () => {
    render(<Availability onClose={() => {}} />);
    expect(screen.getByTestId('mock-select')).toBeInTheDocument();
  });

  //   it('updates start date on date change', () => {
  //     render(<Availability onClose={() => {}} />);
  //     const startDateInput = screen.getByLabelText('Start Date');
  //     fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
  //     expect(startDateInput).toHaveValue('01 Jan 2023');
  //   });

  //   it('updates end date on date change', () => {
  //     render(<Availability onClose={() => {}} />);
  //     const endDateInput = screen.getByLabelText('End Date');
  //     fireEvent.change(endDateInput, { target: { value: '2023-01-15' } });
  //     expect(endDateInput).toHaveValue('15 Jan 2023');
  //   });

  it('changes option on click', () => {
    render(<Availability onClose={() => {}} />);
    const partTimeButton = screen.getByText('Part-Time');
    fireEvent.click(partTimeButton);
    expect(partTimeButton).toHaveClass('bg-blue-200 text-blue-600');
  });

  //   it('displays WorkDays component when Part-Time is selected', () => {
  //     render(<Availability onClose={() => {}} />);
  //     const partTimeButton = screen.getByText('Part-Time');
  //     fireEvent.click(partTimeButton);
  //     expect(screen.getByText('Select Work Days')).toBeInTheDocument();
  //   });

  //   it('updates public holidays dropdown', () => {
  //     render(<Availability onClose={() => {}} />);
  //     const publicHolidaysDropdown = screen.getByLabelText('Public Holidays');
  //     fireEvent.change(publicHolidaysDropdown, { target: { value: 'Quaid\'s Birth' } });
  //     expect(publicHolidaysDropdown).toHaveValue('Quaid\'s Birth');
  //   });

  //   it('updates notes textarea', () => {
  //     render(<Availability onClose={() => {}} />);
  //     const notesTextarea = screen.getByLabelText('Notes');
  //     fireEvent.change(notesTextarea, { target: { value: 'Some notes here' } });
  //     expect(notesTextarea).toHaveValue('Some notes here');
  //   });

  it('calls onClose when Cancel button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Availability onClose={onCloseMock} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  // Add more tests as needed for your specific requirements
});
