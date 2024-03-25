import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import BulkAssignToProject from './BulkAssignToProject';
import { store } from '../../../app/store';
import { setProjects } from '../../../features/data/dataSlice';

const closeModalMock = jest.fn();

// Mocking the console.error to avoid unnecessary error logs
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('renders BulkAssign component with default values', () => {
  render(
    <Provider store={store}>
      <BulkAssignToProject
        closeModal={closeModalMock}
        isModalOpen
      />
    </Provider>,
  );
  // Add more assertions as needed
});

test('calls closeModal when Cancel button is clicked', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BulkAssignToProject
        closeModal={closeModalMock}
        isModalOpen
      />
    </Provider>,
  );

  // Click the Cancel button
  fireEvent.click(getByText('Cancel'));

  // Ensure that closeModal is called
  expect(closeModalMock).toHaveBeenCalledTimes(1);
});
test('calls closeModal and tests edit modal', async () => {
  store.dispatch(setProjects([{
    project_id: 8852090,
    name: 'Salesbooster',
    color: '3451b2',
    tags: [],
    budget_type: 0,
    budget_per_phase: 0,
    non_billable: 0,
    tentative: 0,
    locked_task_list: 1,
    active: 1,
    project_manager: 806795,
    all_pms_schedule: 0,
    created: '2023-11-14 11:40:08',
    modified: '2023-11-14 11:40:08',
    rate_type: 1,
    ext_calendar_count: 0,
    people_ids: [
      18104410,
    ],
    start_date: '2023-11-15',
    end_date: '2023-11-22',
  }]));
  const { getByText } = render(
    <Provider store={store}>
      <BulkAssignToProject
        closeModal={closeModalMock}
        isModalOpen
      />
    </Provider>,
  );

  const edit = getByText('Select Project');
  fireEvent.click(edit);
  await waitFor(() => {
    const role = getByText('Salesbooster');
    expect(role).toBeInTheDocument();
    fireEvent.click(role);
  });
});

// Add more tests as needed
