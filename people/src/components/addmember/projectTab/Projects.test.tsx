import React from 'react';
import {
  fireEvent,
  render, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import Projects from './Projects';
import { setProjects } from '../../../features/data/dataSlice';

test('handleRemoveProject should update state correctly', () => {
  const mockProjects = [
    { project_id: 1, name: 'Project 1', color: 'FF5733' },
    { project_id: 2, name: 'Project 2', color: '00FF00' },
  ];

  // Mocking the state with projects
  jest.mock('../../../app/hooks', () => ({
    useAppSelector: () => ({ projects: mockProjects }),
  }));

  // Mocking useState
  const mockSetSelectedProjectOptions = jest.fn();
  const mockSetSelected = jest.fn();

  jest.spyOn(React, 'useState').mockReturnValueOnce([[], mockSetSelectedProjectOptions]);
  jest.spyOn(React, 'useState').mockReturnValueOnce([null, mockSetSelected]);

  // Mocking the component
  render(
    <Provider store={store}>

      <Projects />
    </Provider>,
  );
});

// test('handleRemoveProject should update state correctly', () => {
//   const mockProjects = [
//     { project_id: 1, name: 'Project 1', color: 'FF5733' },
//     { project_id: 2, name: 'Project 2', color: '00FF00' },
//   ];

//   const { getByTestId } = render(
//     <Provider store={store}>
//       <Projects />
//     </Provider>,
//   );

//   // Mocking the state with projects
//   jest.mock('../../../app/hooks', () => ({
//     useAppSelector: () => ({ projects: mockProjects }),
//   }));

//   // Mocking initial state
//   setSelectedProjectOptions([
//     {
//       id: 1, name: 'Project 1', subtext: null, symbol: null, icon: null,
//     },
//     {
//       id: 2, name: 'Project 2', subtext: null, symbol: null, icon: null,
//     },
//   ]);

//   // Get the "Remove" button element
//   const removeButton = getByTestId('remove-button-1');
// Adapt the test ID based on your actual implementation

//   // Trigger removal
//   fireEvent.click(removeButton);

//   // Assert the state after removal
//   expect(selectedProjectOptions).toHaveLength(1);
//   expect(selectedProjectOptions[0].id).toBe(2);
// });

jest.mock('../../dropdown/DynamicDropdown', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('lucide-react', () => ({
  X: jest.fn(() => null),
}));

describe('Projects component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('handles project selection and removal', async () => {
    const projects = [
      {
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
      },
      {
        project_id: 8852061,
        name: 'Krillpay',
        color: 'ecadd4',
        tags: [],
        budget_type: 0,
        budget_per_phase: 0,
        non_billable: 0,
        tentative: 0,
        locked_task_list: 1,
        active: 1,
        project_manager: 806795,
        all_pms_schedule: 0,
        created: '2023-11-14 11:28:10',
        modified: '2023-11-14 11:28:10',
        rate_type: 1,
        ext_calendar_count: 0,
        people_ids: [
          18104412,
        ],
        start_date: '2023-11-14',
        end_date: '2023-11-17',
      },
    ];

    store.dispatch(setProjects(projects));
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Projects />
      </Provider>,
    );

    // Use act to wait for asynchronous operations to complete
    // Verify that the projects are rendered in the dropdown
    await waitFor(() => {
      expect(getByTestId('mock-select')).toBeInTheDocument();
      expect(getByText('Projects')).toBeInTheDocument();
    });
    //   expect(screen.getByText('Select Projects')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Projects')).toBeInTheDocument();
      const drop = getByTestId('dropdown');
      //   console.log(drop);

      fireEvent.click(drop);
    });

    // Simulate selecting a project from the dropdown
    //   userEvent.click(screen.getByText('Project 1'));

    // Simulate removing a selected project
    //   fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    // Verify that the selected project is removed from the list
    // expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
  });
});
