import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import AllocationForm from '../components/forms/AllocationForm';
import { renderWithProviders } from '../utils/testUtils';
import { setupStore } from '../app/store';
import { initializeScheduler } from '../feature/scheduler/schedulerSlice';
import {
  departmentData, peopleData, projectData, roleData, tagsData, tasksData,
} from '../constants';

describe('AllocationForm component', () => {
  // Mock the Redux state
  const store = setupStore();
  store.dispatch(initializeScheduler({
    projects: projectData as Project[],
    tasks: tasksData as Task[],
    people: peopleData,
    department: departmentData,
    roles: roleData,
    tags: tagsData,
  }));

  test('renders AllocationForm component', () => {
    renderWithProviders(<AllocationForm />, { store });

    // Add assertions
    expect(screen.getByText('Hours/day')).toBeInTheDocument();
    expect(screen.getByText('Total Hours')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('handles button selection', () => {
    renderWithProviders(<AllocationForm />, { store });

    const completedButton = screen.getByText('completed');
    fireEvent.click(completedButton);

    // Add assertions
    expect(screen.getByText('completed')).toHaveClass('capitalize bg-indigo-200/70 text-indigo-700 text-sm rounded p-2 cursor-pointer');
    // Add more assertions as needed
  });

  test('renders projects dropdown with correct data', async () => {
    renderWithProviders(<AllocationForm />, { store });

    // Add assertions
    expect(screen.getByText('Select Project')).toBeInTheDocument();
    const dropDown = screen.getByText('Select Project');
    fireEvent.click(dropDown);
    await waitFor(() => {
      expect(screen.getByText('ClickFuel')).toBeInTheDocument();
    });
  });
  test('renders renders all errors', async () => {
    const { getByTestId } = renderWithProviders(<AllocationForm />, { store });

    const button = getByTestId('submit-button');
    fireEvent.click(button);
    let hoursErr:any = null;
    await waitFor(() => {
      hoursErr = screen.getByText('Allocate time for the task');
      expect(hoursErr).toBeInTheDocument();
      expect(screen.getByText('A project must be selected')).toBeInTheDocument();
      expect(screen.getByText('Task must be assigned to atleast one person')).toBeInTheDocument();
    });
    const hours = getByTestId('hours');
    const totalHours = getByTestId('totalHours');
    fireEvent.change(hours, { target: { value: 8 } });
    fireEvent.change(totalHours, { target: { value: 48 } });

    expect(screen.getByText('Select Project')).toBeInTheDocument();
    const dropDown = screen.getByText('Select Project');
    fireEvent.click(dropDown);
    await waitFor(() => {
      const click = screen.getByText('ClickFuel');
      expect(click).toBeInTheDocument();
      fireEvent.click(click);
    });

    const dropDown2 = screen.getByText('Assign');
    fireEvent.click(dropDown2);

    const openTask = getByTestId('task-open');
    fireEvent.click(openTask);

    await waitFor(() => {
      const inp = getByTestId('task-name-inp');
      expect(inp).toBeInTheDocument();
      const input = getByTestId('task-name-input');
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: 'dsnfk' } });
    });

    await waitFor(() => {
      const click = screen.getByText('Test Person');

      expect(click).toBeInTheDocument();
      fireEvent.click(click);
    });
    fireEvent.click(button);
    await waitFor(() => {
      if (hoursErr) {
        expect(hoursErr).not.toBeInTheDocument();
      }
    });
  });

  test('renders Assign to dropdown with correct data', async () => {
    renderWithProviders(<AllocationForm />, { store });

    // Add assertions
    expect(screen.getByText('Assign')).toBeInTheDocument();
    const dropDown = screen.getByText('Assign');
    fireEvent.click(dropDown);
    await waitFor(() => {
      expect(screen.getByText('Abdul Hadi')).toBeInTheDocument();
    });
  });
  test('renders Assign to dropdown with correct data', async () => {
    const task = {
      id: '776695711',
      name: 'Lyneup Forecast',
      taskName: '',
      status: 'none',
      color: '68ddfd',
      x: 337,
      w: 5,
      h: 8,
      time: 8,
      startDate: '2023-12-04',
      endDate: '2023-12-08',
      modifiedBy: 0,
      modifiedDate: '2023-12-05 13:12:07.245',
      personName: 'Abdul Moeez',
      y: 0,
    };
    renderWithProviders(<AllocationForm task={task as TaskSlot} />, { store });

    // Add assertions
    expect(screen.getByText('Assign to')).toBeInTheDocument();
    await waitFor(() => {
      const dropDown = screen.getByText('Abdul Moeez');

      fireEvent.click(dropDown);
    });
  });
  test('renders Assign to dropdown with correct data and checks multiselect', async () => {
    const task = {
      id: '776695711',
      name: 'Lyneup Forecast',
      taskName: '',
      status: 'none',
      color: '68ddfd',
      x: 337,
      w: 5,
      h: 8,
      time: 8,
      startDate: '2023-12-04',
      endDate: '2023-12-08',
      modifiedBy: 0,
      modifiedDate: '2023-12-05 13:12:07.245',
      personName: 'Abdul Moeez',
      y: 0,
    };
    renderWithProviders(<AllocationForm task={task as TaskSlot} />, { store });

    // Add assertions
    expect(screen.getByText('Assign to')).toBeInTheDocument();
    await waitFor(() => {
      const dropDown = screen.getByText('Abdul Moeez');

      fireEvent.click(dropDown);
    });
    await waitFor(() => {
      const dropDown = screen.getByText('Abdul Hadi');

      fireEvent.click(dropDown);
    });
  });
  test('renders Assign to dropdown with correct data and checks multiselect and remove it', async () => {
    const task = {
      id: '776695711',
      name: 'Lyneup Forecast',
      taskName: '',
      status: 'none',
      color: '68ddfd',
      x: 337,
      w: 5,
      h: 8,
      time: 8,
      startDate: '2023-12-04',
      endDate: '2023-12-08',
      modifiedBy: 0,
      modifiedDate: '2023-12-05 13:12:07.245',
      personName: 'Abdul Moeez',
      y: 0,
    };
    renderWithProviders(<AllocationForm task={task as TaskSlot} />, { store });

    // Add assertions
    expect(screen.getByText('Assign to')).toBeInTheDocument();
    await waitFor(() => {
      const dropDown = screen.getByText('Abdul Moeez');

      fireEvent.click(dropDown);
    });
    await waitFor(() => {
      const dropDown = screen.getByText('Abdul Hadi');

      fireEvent.click(dropDown);
    });
    await waitFor(() => {
      const btm = screen.getByTestId('remove-multi-0');

      fireEvent.click(btm);
    });
  });

  // Add more tests as needed for other parts of your component
});
