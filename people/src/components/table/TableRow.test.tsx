import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertion messages
import { Provider } from 'react-redux';
import TableRow from './TableRow'; // adjust the import path based on your project structure
import { store } from '../../app/store';

// Mock the necessary props
const mockPerson = {
  people_id: 1,
  name: 'John Doe',
  avatar_file: null,
  job_title: 'Developer',
  department_id: 16913892,
  department: 'Engineering',
  account_type: 'Regular',
  manager: 'Jane Smith',
  tags: [{ name: 'React' }, { name: 'JavaScript' }],
  type: 'Full-time',
};

test('renders TableRow component with person data', () => {
  const setSelectedPerson = jest.fn();
  const setIsModalOpen = jest.fn();

  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <table>
        <tbody>

          <TableRow
            person={mockPerson}
            setSelectedPerson={setSelectedPerson}
            setIsModalOpen={setIsModalOpen}
          />
        </tbody>
      </table>

    </Provider>,
  );

  // Check if the component renders correctly
  expect(getByTestId('table-row-John')).toBeInTheDocument();

  // Check if the person's name is displayed
  expect(getByText('John Doe')).toBeInTheDocument();

  // Check if the role, department, account type, manager, tags, and type are displayed
  expect(getByText('Developer')).toBeInTheDocument();
  expect(getByText('Engineering')).toBeInTheDocument(); // assuming department_id === 16913892
  //   expect(getByText('Regular')).toBeInTheDocument();
  expect(getByText('Jane Smith')).toBeInTheDocument();
  expect(getByText('React')).toBeInTheDocument();
  expect(getByText('JavaScript')).toBeInTheDocument();
  expect(getByText('Full-time')).toBeInTheDocument();
});

test('triggers onClick event when row is clicked', () => {
  const setSelectedPerson = jest.fn();
  const setIsModalOpen = jest.fn();

  const { getByTestId } = render(
    <Provider store={store}>
      <table>
        <tbody>

          <TableRow
            person={mockPerson}
            setSelectedPerson={setSelectedPerson}
            setIsModalOpen={setIsModalOpen}
            onCheckboxChange={() => {}}
          />
        </tbody>
      </table>

    </Provider>,
  );

  // Trigger a click event on the table row
  fireEvent.click(getByTestId('table-row-John'));

  // Check if the onClick handler has been called with the correct arguments
  expect(setSelectedPerson).toHaveBeenCalledWith(mockPerson);
  expect(setIsModalOpen).toHaveBeenCalledWith(true);
});

// Add more tests based on your component's functionality
// For example, you can test the rendering of different data or additional UI interactions.
