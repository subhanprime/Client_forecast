import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import BulkEdit from './BulkEdit';

const closeModalMock = jest.fn();

// Mocking the console.error to avoid unnecessary error logs
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('renders BulkEdit component with default values', () => {
  render(<BulkEdit closeModal={closeModalMock} isModalOpen numberOfUsers={5} />);
  // Add more assertions as needed
});

test('calls closeModal when Cancel button is clicked', () => {
  const { getByText } = render(<BulkEdit
    closeModal={closeModalMock}
    isModalOpen
    numberOfUsers={5}
  />);

  // Click the Cancel button
  fireEvent.click(getByText('Cancel'));

  // Ensure that closeModal is called
  expect(closeModalMock).toHaveBeenCalledTimes(1);
});
test('calls closeModal and tests edit modal', async () => {
  const { getByText } = render(<BulkEdit
    closeModal={closeModalMock}
    isModalOpen
    numberOfUsers={5}
  />);

  const edit = getByText('Select Field');
  fireEvent.click(edit);
  await waitFor(() => {
    const role = getByText('Tags');
    expect(role).toBeInTheDocument();
    fireEvent.click(role);
  });
});

// Add more tests as needed
