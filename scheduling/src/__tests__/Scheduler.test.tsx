import React from 'react';
import {
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import axios from 'axios';

import '@testing-library/jest-dom';
import helpers from '../utils/helpers';
import Scheduler from '../components/scheduler/Scheduler';
import { renderWithProviders } from '../utils/testUtils';
import { setupStore } from '../app/store';
import { initializeScheduler } from '../feature/scheduler/schedulerSlice';
import {
  departmentData, peopleData, projectData, roleData, tagsData, tasksData,
} from '../constants';

describe('Schedule Component', () => {
  // Mock the Redux state
  const store = setupStore();
  store.dispatch(initializeScheduler({
    projects: projectData,
    tasks: tasksData,
    people: peopleData,
    roles: roleData,
    department: departmentData,
    tags: tagsData,
  }));
  test('renders Scheduler component with data', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();

    const { getByTestId } = renderWithProviders(
      <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />,
      { store },
    );

    // Wait for the data to be loaded
    await waitFor(() => {
      const schedulerElement = getByTestId('scheduler');
      expect(schedulerElement).toBeInTheDocument();
    });
  });
});
