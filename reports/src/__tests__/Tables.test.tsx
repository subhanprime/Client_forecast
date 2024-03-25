import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import TableComponent from '../components/tables/tableComponent';
import { store } from '../redux/store/store';
import { getClientDataManually } from '../services/clientTableService';

// ********************************** ProjectTable  Component *****************************
jest.mock('axios');
describe('Table component Project', () => {
  const mockData = [
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
      people: [
        {
          people_id: 18104410,
          name: 'Warda Imran',
          auto_email: -1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          created: '2023-10-30 06:40:09',
          modified: '2023-10-30 08:49:06',
          region_id: 86611,
          department_id: 16913892,
          managers: [],
          hours: [
            {
              billable: true,
              hours: {
                future: 0,
                scheduled: 8,
              },
              id: 759562778,
              name: '',
              person_id: 18104410,
              phase_id: 0,
              project_id: 8852090,
              tentative: false,
              type: 'task',
              rate: 1,
            },
          ],
        },
      ],
      manager: {
        people_id: 18104387,
        name: 'Omer K',
        email: 'omer@thdinfinity.com',
        avatar_file: 'https://floatcdn.com/avatars/MTcyMzQ2MTY1ODgzNS43MTU4MjAzODA2Nzk1.png',
        auto_email: 1,
        employee_type: 1,
        active: 1,
        people_type_id: 3,
        tags: [],
        start_date: '2023-01-01',
        modified: '2023-10-30 08:42:54',
        region_id: 86611,
        account_id: 806795,
        managers: [],
      },
    }];

  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mocking axios.get calls
    mockedAxios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_BACKEND_URL}/project_table_data`) {
        return Promise.resolve({ data: mockData });
      }
      return Promise.reject(new Error('Not mocked URL'));
    });

    // jest.spyOn(axios, 'get').mockResolvedValue()
  });
  test('renders PeopleTable component with mock data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TableComponent type="project" />
      </Provider>,
    );
      // Wait for the component to fetch data and render

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/project_table_data`);
    });
    await waitFor(() => {
      expect(screen.getByText('Salesbooster')).toBeInTheDocument();
      // Add more assertions based on your component's structure and data
    });
  });
});

// ********************************** DepartmentTable  Component *****************************

describe('Table component Department', () => {
  const mockData = [
    {
      department_id: 16915534,
      parent_id: null,
      name: 'LBDN',
      capacity: 336,
      scheduled: 48,
      billable: 48,
      nonbillable: 0,
      timeoff: 0,
      overtime: 8,
      schedulepercentage: 14,
      people: [
        {
          people_id: 18121408,
          name: 'Khubaib Idrees',
          email: 'khubaibk30@gmail.com',
          job_title: 'ASE',
          role_id: 232839,
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [
            {
              name: 'Uganda',
              type: 1,
            },
          ],
          start_date: '2023-01-01',
          default_hourly_rate: '0.0100',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-30 09:40:48',
          region_id: 88306,
          account_id: 813898,
          department_id: 16915534,
          managers: [],
          capacity: 168,
          scheduled: 0,
          billable: 0,
          nonbillable: 0,
          timeoff: 0,
          overtime: 0,
          schedulepercentage: 0,
        },
        {
          people_id: 18121407,
          name: 'Abdul Moeez',
          email: 'abdulmoiz7030@gmail.com',
          job_title: 'ASE',
          role_id: 232839,
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          default_hourly_rate: '0.5000',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-30 06:12:56',
          region_id: 88306,
          account_id: 813644,
          department_id: 16915534,
          managers: [],
          capacity: 168,
          scheduled: 48,
          billable: 48,
          nonbillable: 0,
          timeoff: 0,
          overtime: 8,
          schedulepercentage: 29,
        }],
    },
  ];

  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mocking axios.get calls
    mockedAxios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_BACKEND_URL}/department_table_data`) {
        return Promise.resolve({ data: mockData });
      }
      return Promise.reject(new Error('Not mocked URL'));
    });

    // jest.spyOn(axios, 'get').mockResolvedValue()
  });
  test('renders DepartmentTable component with mock data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TableComponent type="department" />
      </Provider>,
    );
      // Wait for the component to fetch data and render

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/department_table_data`);
    });
    await waitFor(() => {
      expect(screen.getByText('LBDN')).toBeInTheDocument();
      // Add more assertions based on your component's structure and data
    });
  });
});

// ********************************** RolesTable  Component *****************************

describe('Table component Roles', () => {
  const mockData = [
    {
      id: 232839,
      name: 'ASE',
      created: '2023-11-29 12:18:57',
      modified: '2023-11-29 12:18:57',
      created_by: 813637,
      modified_by: 813637,
      capacity: 336,
      scheduled: 48,
      billable: 48,
      nonbillable: 0,
      timeoff: 0,
      overtime: 8,
      schedulepercentage: 14,
      people: [
        {
          people_id: 18121408,
          name: 'Khubaib Idrees',
          email: 'khubaibk30@gmail.com',
          job_title: 'ASE',
          role_id: 232839,
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [
            {
              name: 'Uganda',
              type: 1,
            },
          ],
          start_date: '2023-01-01',
          default_hourly_rate: '0.0100',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-30 09:40:48',
          region_id: 88306,
          account_id: 813898,
          department_id: 16915534,
          managers: [],
          capacity: 168,
          scheduled: 0,
          billable: 0,
          nonbillable: 0,
          timeoff: 0,
          overtime: 0,
          schedulepercentage: 0,
        },
        {
          people_id: 18121407,
          name: 'Abdul Moeez',
          email: 'abdulmoiz7030@gmail.com',
          job_title: 'ASE',
          role_id: 232839,
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          default_hourly_rate: '0.5000',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-30 06:12:56',
          region_id: 88306,
          account_id: 813644,
          department_id: 16915534,
          managers: [],
          capacity: 168,
          scheduled: 48,
          billable: 48,
          nonbillable: 0,
          timeoff: 0,
          overtime: 8,
          schedulepercentage: 29,
        },
      ],
    },
  ];

  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mocking axios.get calls
    mockedAxios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_BACKEND_URL}/roles_table_data`) {
        return Promise.resolve({ data: mockData });
      }
      return Promise.reject(new Error('Not mocked URL'));
    });

    // jest.spyOn(axios, 'get').mockResolvedValue()
  });
  test('renders RoleTable component with mock data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TableComponent type="roles" />
      </Provider>,
    );
      // Wait for the component to fetch data and render

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/roles_table_data`);
    });
    await waitFor(() => {
      expect(screen.getByText('ASE')).toBeInTheDocument();
      // Add more assertions based on your component's structure and data
    });
  });
});

// ********************************** TaskTable  Component *****************************

describe('Table component Tasks', () => {
  const mockData = [
    {
      772296110: {
        personIds: [
          18121407,
        ],
        projectId: 8890225,
        phaseId: 0,
        billable: true,
        status: 3,
      },
      id: '772296110',
      name: 'hohohoh',
      projectId: 8890225,
      personId: 18121407,
      scheduled: 8,
      billable: 8,
      nonbillable: 0,
      people: [
        {
          billable: 8,
          hours: {
            future: 8,
            scheduled: 8,
          },
          id: 772296110,
          name: 'Abdul Moeez',
          person_id: 18121407,
          phase_id: 0,
          project_id: 8890225,
          tentative: false,
          type: 'task',
          rate: 1,
          nonbillable: 0,
          scheduled: 8,
          billableperct: 100,
        },
      ],
      billableperct: 100,
    },
  ];

  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mocking axios.get calls
    mockedAxios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_BACKEND_URL}/task_table_data`) {
        return Promise.resolve({ data: mockData });
      }
      return Promise.reject(new Error('Not mocked URL'));
    });

    // jest.spyOn(axios, 'get').mockResolvedValue()
  });
  test('renders TaskTable component with mock data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TableComponent type="task" />
      </Provider>,
    );
      // Wait for the component to fetch data and render

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/task_table_data`);
    });
    await waitFor(() => {
      expect(screen.getByText('hohohoh')).toBeInTheDocument();
      // Add more assertions based on your component's structure and data
    });
  });
});

// ********************************** TimeOffTable  Component *****************************

describe('Table component TimeOff', () => {
  const mockData = [
    {
      id: 29668,
      holiday: true,
      name: 'Iqbal Day (Punjab)',
      people: [
        {
          people_id: 18121468,
          name: '* New Person',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          created: '2023-11-29 13:25:21',
          modified: '2023-11-29 13:25:21',
          region_id: 88306,
          managers: [],
          hours: 8,
          days: 1,
        },
        {
          people_id: 18121408,
          name: 'Khubaib Idrees',
          email: 'khubaibk30@gmail.com',
          job_title: 'ASE',
          role_id: 232839,
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [
            {
              name: 'Uganda',
              type: 1,
            },
          ],
          start_date: '2023-01-01',
          default_hourly_rate: '0.0100',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-30 09:40:48',
          region_id: 88306,
          account_id: 813898,
          department_id: 16915534,
          managers: [],
          hours: 8,
          days: 1,
        },
        {
          people_id: 18121407,
          name: 'Abdul Moeez',
          email: 'abdulmoiz7030@gmail.com',
          job_title: 'ASE',
          role_id: 232839,
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          default_hourly_rate: '0.5000',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-30 06:12:56',
          region_id: 88306,
          account_id: 813644,
          department_id: 16915534,
          managers: [],
          hours: 8,
          days: 1,
        },
        {
          people_id: 18121406,
          name: 'Muhammad Subhan',
          auto_email: -1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          created: '2023-11-29 12:17:54',
          modified: '2023-11-29 12:17:54',
          region_id: 88306,
          managers: [],
          hours: 8,
          days: 1,
        },
        {
          people_id: 18121405,
          name: 'Sameed Atta',
          email: 'sameed.atta.khan99@gmail.com',
          avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTM4Ni45MjI4NTE2ODEzNjM3.png',
          auto_email: 1,
          employee_type: 1,
          active: 1,
          people_type_id: 1,
          tags: [],
          start_date: '2023-01-01',
          modified: '2023-11-29 12:16:50',
          region_id: 88306,
          account_id: 813637,
          managers: [],
          hours: 8,
          days: 1,
        },
      ],
      hours: 40,
      day: 0,
      days: 5,
    },
  ];

  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mocking axios.get calls
    mockedAxios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_BACKEND_URL}/timeoff_table_data`) {
        return Promise.resolve({ data: mockData });
      }
      return Promise.reject(new Error('Not mocked URL'));
    });

    // jest.spyOn(axios, 'get').mockResolvedValue()
  });
  test('renders TimeOffTable component with mock data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TableComponent type="timeoff" />
      </Provider>,
    );
      // Wait for the component to fetch data and render

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/timeoff_table_data`);
    });
    await waitFor(() => {
      expect(screen.getByText('Iqbal Day (Punjab)')).toBeInTheDocument();
      // Add more assertions based on your component's structure and data
    });
  });
});

// ********************************** CLIENTTable  Component *****************************

// describe('getClientDataManually', () => {
//   test('returns the correct result', async () => {
//     // Mock your input data
//     const peopleFilterData = {
//       chart: {},
//       'legacy.capacity': {
//         18123900: 160,
//       },
//       'legacy.budgets': {
//         projects: {
//           8903646: {
//             type: 0,
//             budget: 1000,
//           },
//         },
//         phases: {},
//       },
//       'legacy.overtime': {
//         18123910: {
//           future: 0,
//           logged: 0,
//           total: 0,
//         },
//       },
//       'legacy.timeoff': [
//         {
//           id: 19545336,
//           holiday: false,
//           name: 'Compassionate Leave',
//           people: {
//             18123928: {
//               hours: 8,
//               days: 1,
//             },
//           },
//         },
//       ],
//       'legacy.totals': [
//         {
//           billable: true,
//           hours: {
//             future: 0,
//             scheduled: 40,
//           },
//           id: 776706529,
//           name: '',
//           person_id: 18123942,
//           phase_id: 0,
//           project_id: 8903563,
//           tentative: false,
//           type: 'task',
//           rate: 1,
//         },
//         {
//           billable: true,
//           hours: {
//             future: 0,
//             scheduled: 40,
//           },
//           id: 776706529,
//           name: '',
//           person_id: 18123946,
//           phase_id: 0,
//           project_id: 8903563,
//           tentative: false,
//           type: 'task',
//           rate: 1,
//         },
//       ],
//     };

//     const projectData = [
//       {
//         project_id: 8903642,
//         name: 'Child Radar',
//         client_id: 18010171,
//         color: '34c754',
//         tags: [],
//         budget_type: 0,
//         budget_per_phase: 0,
//         non_billable: 0,
//         tentative: 0,
//         locked_task_list: 0,
//         active: 1,
//         project_manager: 806829,
//         all_pms_schedule: 0,
//         modified: '2024-01-02 09:52:51',
//         rate_type: 1,
//         ext_calendar_count: 0,
//         people_ids: [
//           18123910,
//         ],
//         start_date: '2023-12-11',
//         end_date: '2023-12-14',
//       },
//     ];

//     const clientData = [
//       {
//         val: 'Kira',
//         id: 18010171,
//         projectIds: [],
//       },
//     ];

//     const result = await getClientDataManually(peopleFilterData, projectData, clientData);

//     // Your assertions go here based on the expected result
//     // For example, if you know the expected result based on your mock data:
//     expect(result).toEqual([
//       {
//         name: 'ClientName1',
//         budget: 1000,
//         scheduled: 200,
//         logged: 0,
//         projects: [
//           {
//             name: 'Project1',
//             budget: 1000,
//             scheduled: 100,
//             logged: 0,
//           },
//           // Add more projects as needed
//         ],
//       },
//       // Add more client results as needed
//     ]);
//   });
// });
