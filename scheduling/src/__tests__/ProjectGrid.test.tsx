import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ProjectGridRow from '../components/grid/ProjectGridRow';
import { projectData } from '../constants';
import helpers from '../utils/helpers';
import { renderWithProviders } from '../utils/testUtils';

const { daysArray } = helpers.getDaysInCurrentYear();
const mockProject = {
  project_id: 8806052,
  name: 'WealthManagement',
  color: '067a6f',
  tags: [],
  budget_type: 0,
  budget_per_phase: 0,
  non_billable: 0,
  tentative: 0,
  locked_task_list: 1,
  active: 1,
  project_manager: 806795,
  all_pms_schedule: 0,
  created: '2023-10-30 07:32:27',
  modified: '2023-10-30 07:36:06',
  rate_type: 1,
  ext_calendar_count: 0,
  people_ids: [18104414],
  start_date: '2023-11-01',
  end_date: '2023-11-06',
  people: [
    {
      people_id: 18104414,
      name: 'Husnain Ali',
      auto_email: -1,
      employee_type: 1,
      active: 1,
      people_type_id: 1,
      tags: [],
      start_date: '2023-01-01',
      created: '2023-10-30 06:40:10',
      modified: '2023-10-30 06:42:11',
      region_id: 86611,
      department_id: 16913892,
      managers: [],
      tasks: [],
      default_hourly_rate: '0.0000', // Add default_hourly_rate property
    },
  ],
};

const mockProjects = new Map();
mockProjects.set(projectData[0].project_id, { ...projectData[0] });

const mockScrollPosition = { top: 0, left: 0 };

describe('ProjectGridRow component', () => {
  test('renders ProjectGridRow component', () => {
    renderWithProviders(
      <ProjectGridRow
        scrollPosition={mockScrollPosition}
        scrolled={false}
        project={mockProject}
        daysArray={daysArray}
        projects={mockProjects}
      />,
    );

    // Assert that project name is rendered
    expect(screen.getByText('WealthManagement')).toBeInTheDocument();
  });

  test('toggles isOpen state when clicking the toggle button', () => {
    renderWithProviders(
      <ProjectGridRow
        scrollPosition={mockScrollPosition}
        scrolled={false}
        project={mockProject}
        daysArray={daysArray}
        projects={mockProjects}
      />,
    );

    // Assert that isOpen is initially true
    expect(screen.getByText(/People/)).toBeInTheDocument();

    // Click the toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
  });

  test('renders GridRow components for each person when isOpen is true', () => {
    renderWithProviders(
      <ProjectGridRow
        scrollPosition={mockScrollPosition}
        scrolled={false}
        project={mockProject}
        daysArray={daysArray}
        projects={mockProjects}
      />,
    );

    // Assert that GridRow components are rendered for each person
    expect(screen.getByText('Husnain Ali')).toBeInTheDocument();
  });

  test('does not render GridRow components when isOpen is false', () => {
    renderWithProviders(
      <ProjectGridRow
        scrollPosition={mockScrollPosition}
        scrolled={false}
        project={{ ...mockProject, people: [] }}
        daysArray={daysArray}
        projects={mockProjects}
      />,
    );

    // Assert that GridRow components are not rendered
    expect(screen.queryByText('Husnain Ali')).not.toBeInTheDocument();
  });

  // Add more tests as needed for other functionalities or edge cases
});
