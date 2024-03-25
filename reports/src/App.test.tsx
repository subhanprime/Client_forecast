import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { getHeaderNameSection } from './constants/headerSectionName';

// jest.mock('axios');

// ********************************************People Dropdown**************************************
// test('renders PeopleDropDownFilter component', () => {
//   render(<PeopleDropDownFilter />);
//   const dropdownButton = screen.getByRole('button', { name: /people:/i });
//   expect(dropdownButton).toBeInTheDocument();
// });

// test('toggles dropdown when button is clicked', () => {
//   render(<PeopleDropDownFilter />);
//   const dropdownButton = screen.getByRole('button', { name: /people:/i });
//   fireEvent.click(dropdownButton);
// });

// test('toggles checkbox state when checkbox is clicked active', () => {
//   render(<PeopleDropDownFilter />);
//   const activeCheckbox = screen.getByLabelText(/active/i);

//   fireEvent.click(activeCheckbox);
//   expect(activeCheckbox).not.toBeChecked();
// });

// test('toggles checkbox state when checkbox is clicked Archived', () => {
//   render(<PeopleDropDownFilter />);
//   const activeCheckbox = screen.getByTestId('checkbox-item-2');

//   fireEvent.click(activeCheckbox);
//   expect(activeCheckbox).toBeChecked();
// });

// test('toggles checkbox state when checkbox is clicked contractor', () => {
//   render(<PeopleDropDownFilter />);
//   const activeCheckbox = screen.getByTestId('checkbox-item-3');

//   fireEvent.click(activeCheckbox);
//   expect(activeCheckbox).toBeChecked();
// });

// test('toggles checkbox state when checkbox is clicked Employees', () => {
//   render(<PeopleDropDownFilter />);
//   const activeCheckbox = screen.getByTestId('checkbox-item-4');

//   fireEvent.click(activeCheckbox);
//   expect(activeCheckbox).toBeChecked();
// });
// test('toggles checkbox state when checkbox is clicked Placeholders', () => {
//   render(<PeopleDropDownFilter />);
//   const activeCheckbox = screen.getByTestId('checkbox-item-5');

//   fireEvent.click(activeCheckbox);
//   expect(activeCheckbox).toBeChecked();
// });

// ***************************************Allocations Dropdown**************************************
// test('renders AllocationsDropDownFilter component', () => {
//   render(<AllocationsDropDownFilter />);
//   const dropdownButton = screen.getByRole('button', { name: /allocations:/i });
//   expect(dropdownButton).toBeInTheDocument();
// });
// test('toggles dropdown when button is clicked', () => {
//   render(<AllocationsDropDownFilter />);
//   const dropdownButton = screen.getByRole('button', { name: /allocations:/i });

//   fireEvent.click(dropdownButton);
//   const dropdownContent = screen.getByTestId('dropdownDefaultCheckbox');
//   expect(dropdownContent).toBeInTheDocument();
// });
// test('toggles checkbox state when checkbox is clicked Confirmed', () => {
//   render(<AllocationsDropDownFilter />);
//   const confirmedCheckbox = screen.getByTestId('checkbox-item-1');

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).not.toBeChecked();

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).toBeChecked();
// });

// test('toggles checkbox state when checkbox is clicked tentative', () => {
//   render(<AllocationsDropDownFilter />);
//   const confirmedCheckbox = screen.getByTestId('checkbox-item-2');

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).toBeChecked();

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).not.toBeChecked();
// });

// test('toggles checkbox state when checkbox is clicked tomeoff', () => {
//   render(<AllocationsDropDownFilter />);
//   const confirmedCheckbox = screen.getByTestId('checkbox-item-3');

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).toBeChecked();

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).not.toBeChecked();
// });

// ***************************************Time Off Dropdown**************************************
// test('renders TimeoffDropDownFilter component', () => {
//   render(<TimeoffDropDownFilter />);
//   const dropdownButton = screen.getByRole('button', { name: /time off:/i });
//   expect(dropdownButton).toBeInTheDocument();
// });
// test('toggles dropdown when button is clicked', () => {
//   render(<TimeoffDropDownFilter />);
//   const dropdownButton = screen.getByRole('button', { name: /time off:/i });

//   fireEvent.click(dropdownButton);
//   const dropdownContent = screen.getByTestId('dropdownDefaultCheckbox');
//   expect(dropdownContent).toBeInTheDocument();
// });
// test('toggles checkbox state when checkbox is clicked Approved', () => {
//   render(<TimeoffDropDownFilter />);
//   const confirmedCheckbox = screen.getByTestId('checkbox-item-1');

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).not.toBeChecked();

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).toBeChecked();
// });

// test('toggles checkbox state when checkbox is clicked tentative', () => {
//   render(<TimeoffDropDownFilter />);
//   const confirmedCheckbox = screen.getByTestId('checkbox-item-2');

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).toBeChecked();

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).not.toBeChecked();
// });
// test('toggles checkbox state when checkbox is clicked Declined', () => {
//   render(<TimeoffDropDownFilter />);
//   const confirmedCheckbox = screen.getByTestId('checkbox-item-3');

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).toBeChecked();

//   fireEvent.click(confirmedCheckbox);
//   expect(confirmedCheckbox).not.toBeChecked();
// });
// // ********************************************Metric Detail***************************************
// const mockPropsMetricDetails = {
//   name: 'Billable',
//   hour: '264',
//   percentage: '100',
//   color: '#9B8CFF',
// };

// test('renders MetricDetails component with correct content', () => {
//   // Render the component with mock props
//   render(<MetricDetails {...mockPropsMetricDetails} />);

//   // Check that the component renders the name, hour, and percentage correctly
//   expect(screen.getByText('Billable')).toBeInTheDocument();
//   expect(screen.getByText('264h')).toBeInTheDocument();
//   expect(screen.getByText('100%')).toBeInTheDocument();
// });
// // ********************************************Metric Header **************************************

// const mockPropsMetricHeader = {
//   name: 'Capacity',
//   hour: '2148',
//   percentage: '89',
// };

// test('renders MetricHeader component with correct content', () => {
//   // Render the component with mock props
//   render(<MetricHeader {...mockPropsMetricHeader} />);

//   // Check that the component renders the name, hour, and percentage correctly
//   expect(screen.getByText('Capacity')).toBeInTheDocument();
//   expect(screen.getByText('2148')).toBeInTheDocument(); // Adjust based on the actual structure
//   expect(screen.getByText('89%')).toBeInTheDocument();

//   // Check that the component renders the percentage only if it's provided
//   render(<MetricHeader name="Capacity" hour="2148" percentage="" />);
//   expect(screen.queryByText('%')).toBeNull();
// });

// // ******************************************** LoggedMetric Component *****************************

// test('renders LoggedMetric component with metric details', () => {
//   // Render the component
//   render(<LoggedMetric />);

//   // Check that the metric headers are rendered
//   // expect(screen.getByText('Capacity', { exact: false })).toBeInTheDocument();
//   expect(screen.getByText('Past logged + Future scheduled')).toBeInTheDocument();
//   expect(screen.getByText('Time Off')).toBeInTheDocument();
//   expect(screen.getByText('Overtime')).toBeInTheDocument();

//   // Check that the metric details are rendered
//   expect(screen.getByText('Billable')).toBeInTheDocument();
//   expect(screen.getByText('Non-billable')).toBeInTheDocument();
// });

// // ********************************** LoggedScheduledMetric Component *****************************

// test('renders LoggedScheduledMetric component', () => {
//   render(<LoggedScheduledMetric />);
//   const loggedScheduledMetric = screen.getByText(/Logged/i);
//   expect(loggedScheduledMetric).toBeInTheDocument();
// });

// test('renders metric details and headers correctly', () => {
//   render(<LoggedScheduledMetric />);
//   const loggedHeader = screen.getByText(/Logged/i);
//   const scheduledHeader = screen.getByText(/Scheduled/i);

//   expect(loggedHeader).toBeInTheDocument();
//   expect(scheduledHeader).toBeInTheDocument();

//   // You can add more assertions based on your component's structure
//   // For example, check if MetricDetails and MetricHeader components are rendered correctly
//   // const billableDetails = screen.getByTestId('billable');
//   // expect(billableDetails).toBeInTheDocument();

//   // Add more assertions based on your component's structure
// });

// // ********************************** Past And Future Metric Component *****************************

// test('renders PassedAndFutureMetric component', () => {
//   render(<PastAndFutureMetric />);
//   const pastAndFutureMetric = screen.getByText(/Logged/i);
//   expect(pastAndFutureMetric).toBeInTheDocument();
// });

// ********************************** Scheduled Metric Component *****************************

// Set up the initial state for each test

// Test suite for the ScheduledMetric component
// describe('ScheduledMetric Component', () => {
//   it('renders component with correct data', () => {
//     render(<ScheduledMetric />);

//     // Check if the MetricHeader components are rendered with correct data
//     expect(screen.getByTestId('metric-header')).toHaveTextContent('Capacity');
//     expect(screen.getByText('Scheduled')).toHaveTextContent('11');
//     expect(screen.getByText('Unscheduled')).toHaveTextContent('89');
//     expect(screen.getByText('Time Off')).toHaveTextContent('8');
//     expect(screen.getByText('Overtime')).toHaveTextContent('3');

//     // Check if the MetricDetails components are rendered with correct data
//     expect(screen.getByText('Billable')).toHaveTextContent('10');
//     expect(screen.getByText('Non-billable')).toHaveTextContent('5');
//     expect(screen.getByText('Non-billable')).toHaveTextContent('2');
//   });
// });

// ********************************** PeopleTable  Component *****************************

// describe('Table component People', () => {
//   const mockData = [
//     {
//       people_id: 18121468,
//       name: '* New Person',
//       auto_email: 1,
//       employee_type: 1,
//       active: 1,
//       people_type_id: 1,
//       tags: [],
//       start_date: '2023-01-01',
//       created: '2023-11-29 13:25:21',
//       modified: '2023-11-29 13:25:21',
//       region_id: 88306,
//       managers: [],
//       capacity: 168,
//       projects: [
//         {
//           project_id: 8890225,
//           name: 'Hola Haiwai',
//           client_id: 18001545,
//           color: '067a6f',
//           tags: [],
//           budget_type: 0,
//           budget_per_phase: 0,
//           non_billable: 0,
//           tentative: 0,
//           locked_task_list: 1,
//           active: 1,
//           project_manager: 813637,
//           all_pms_schedule: 0,
//           created: '2023-11-29 12:17:19',
//           modified: '2023-11-30 12:34:44',
//           rate_type: 1,
//           ext_calendar_count: 0,
//           people_ids: [
//             18121405,
//             18121406,
//             18121407,
//             18121468,
//           ],
//           start_date: '2023-11-30',
//           end_date: '2023-12-29',
//           people_id: 18121468,
//           scheduled: 0,
//           billable: 0,
//           nonbillable: 0,
//         },
//       ],
//       scheduled: 0,
//       billable: 0,
//       nonbillable: 0,
//       scheduledpercent: 0,
//     },
//   ];

//   beforeEach(() => {
//     const mockedAxios = axios as jest.Mocked<typeof axios>;

//     // Mocking axios.get calls
//     mockedAxios.get.mockImplementation((url) => {
//       if (url === `${process.env.REACT_APP_BACKEND_URL}/project_table_data`) {
//         return Promise.resolve({ data: mockData });
//       }
//       return Promise.reject(new Error('Not mocked URL'));
//     });

//     // jest.spyOn(axios, 'get').mockResolvedValue()
//   });
//   test('renders PeopleTable component with mock data', async () => {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <TableComponent type="people" />
//       </Provider>,
//     );
//     // Wait for the component to fetch data and render

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people_table_data`);
//     });
//     await waitFor(() => {
//       expect(screen.getByText('* New Person')).toBeInTheDocument();
//       // Add more assertions based on your component's structure and data
//     });
//   });
// });

// // ********************************** ProjectTable  Component *****************************

// describe('Table component Project', () => {
//   const mockData = [
//     {
//       project_id: 8852090,
//       name: 'Salesbooster',
//       color: '3451b2',
//       tags: [],
//       budget_type: 0,
//       budget_per_phase: 0,
//       non_billable: 0,
//       tentative: 0,
//       locked_task_list: 1,
//       active: 1,
//       project_manager: 806795,
//       all_pms_schedule: 0,
//       created: '2023-11-14 11:40:08',
//       modified: '2023-11-14 11:40:08',
//       rate_type: 1,
//       ext_calendar_count: 0,
//       people_ids: [
//         18104410,
//       ],
//       start_date: '2023-11-15',
//       end_date: '2023-11-22',
//       people: [
//         {
//           people_id: 18104410,
//           name: 'Warda Imran',
//           auto_email: -1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           created: '2023-10-30 06:40:09',
//           modified: '2023-10-30 08:49:06',
//           region_id: 86611,
//           department_id: 16913892,
//           managers: [],
//           hours: [
//             {
//               billable: true,
//               hours: {
//                 future: 0,
//                 scheduled: 8,
//               },
//               id: 759562778,
//               name: '',
//               person_id: 18104410,
//               phase_id: 0,
//               project_id: 8852090,
//               tentative: false,
//               type: 'task',
//               rate: 1,
//             },
//           ],
//         },
//       ],
//       manager: {
//         people_id: 18104387,
//         name: 'Omer K',
//         email: 'omer@thdinfinity.com',
//         avatar_file: 'https://floatcdn.com/avatars/MTcyMzQ2MTY1ODgzNS43MTU4MjAzODA2Nzk1.png',
//         auto_email: 1,
//         employee_type: 1,
//         active: 1,
//         people_type_id: 3,
//         tags: [],
//         start_date: '2023-01-01',
//         modified: '2023-10-30 08:42:54',
//         region_id: 86611,
//         account_id: 806795,
//         managers: [],
//       },
//     }];

//   beforeEach(() => {
//     const mockedAxios = axios as jest.Mocked<typeof axios>;

//     // Mocking axios.get calls
//     mockedAxios.get.mockImplementation((url) => {
//       if (url === `${process.env.REACT_APP_BACKEND_URL}/project_table_data`) {
//         return Promise.resolve({ data: mockData });
//       }
//       return Promise.reject(new Error('Not mocked URL'));
//     });

//     // jest.spyOn(axios, 'get').mockResolvedValue()
//   });
//   test('renders PeopleTable component with mock data', async () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <TableComponent type="project" />
//       </Provider>,
//     );
//     // Wait for the component to fetch data and render

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/project_table_data`);
//     });
//     await waitFor(() => {
//       expect(screen.getByText('Salesbooster')).toBeInTheDocument();
//       // Add more assertions based on your component's structure and data
//     });
//   });
// });

// // ********************************** DepartmentTable  Component *****************************

// describe('Table component Department', () => {
//   const mockData = [
//     {
//       department_id: 16915534,
//       parent_id: null,
//       name: 'LBDN',
//       capacity: 336,
//       scheduled: 48,
//       billable: 48,
//       nonbillable: 0,
//       timeoff: 0,
//       overtime: 8,
//       schedulepercentage: 14,
//       people: [
//         {
//           people_id: 18121408,
//           name: 'Khubaib Idrees',
//           email: 'khubaibk30@gmail.com',
//           job_title: 'ASE',
//           role_id: 232839,
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [
//             {
//               name: 'Uganda',
//               type: 1,
//             },
//           ],
//           start_date: '2023-01-01',
//           default_hourly_rate: '0.0100',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-30 09:40:48',
//           region_id: 88306,
//           account_id: 813898,
//           department_id: 16915534,
//           managers: [],
//           capacity: 168,
//           scheduled: 0,
//           billable: 0,
//           nonbillable: 0,
//           timeoff: 0,
//           overtime: 0,
//           schedulepercentage: 0,
//         },
//         {
//           people_id: 18121407,
//           name: 'Abdul Moeez',
//           email: 'abdulmoiz7030@gmail.com',
//           job_title: 'ASE',
//           role_id: 232839,
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           default_hourly_rate: '0.5000',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-30 06:12:56',
//           region_id: 88306,
//           account_id: 813644,
//           department_id: 16915534,
//           managers: [],
//           capacity: 168,
//           scheduled: 48,
//           billable: 48,
//           nonbillable: 0,
//           timeoff: 0,
//           overtime: 8,
//           schedulepercentage: 29,
//         }],
//     },
//   ];

//   beforeEach(() => {
//     const mockedAxios = axios as jest.Mocked<typeof axios>;

//     // Mocking axios.get calls
//     mockedAxios.get.mockImplementation((url) => {
//       if (url === `${process.env.REACT_APP_BACKEND_URL}/department_table_data`) {
//         return Promise.resolve({ data: mockData });
//       }
//       return Promise.reject(new Error('Not mocked URL'));
//     });

//     // jest.spyOn(axios, 'get').mockResolvedValue()
//   });
//   test('renders DepartmentTable component with mock data', async () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <TableComponent type="department" />
//       </Provider>,
//     );
//     // Wait for the component to fetch data and render

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/department_table_data`);
//     });
//     await waitFor(() => {
//       expect(screen.getByText('LBDN')).toBeInTheDocument();
//       // Add more assertions based on your component's structure and data
//     });
//   });
// });

// // ********************************** RolesTable  Component *****************************

// describe('Table component Roles', () => {
//   const mockData = [
//     {
//       id: 232839,
//       name: 'ASE',
//       created: '2023-11-29 12:18:57',
//       modified: '2023-11-29 12:18:57',
//       created_by: 813637,
//       modified_by: 813637,
//       capacity: 336,
//       scheduled: 48,
//       billable: 48,
//       nonbillable: 0,
//       timeoff: 0,
//       overtime: 8,
//       schedulepercentage: 14,
//       people: [
//         {
//           people_id: 18121408,
//           name: 'Khubaib Idrees',
//           email: 'khubaibk30@gmail.com',
//           job_title: 'ASE',
//           role_id: 232839,
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [
//             {
//               name: 'Uganda',
//               type: 1,
//             },
//           ],
//           start_date: '2023-01-01',
//           default_hourly_rate: '0.0100',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-30 09:40:48',
//           region_id: 88306,
//           account_id: 813898,
//           department_id: 16915534,
//           managers: [],
//           capacity: 168,
//           scheduled: 0,
//           billable: 0,
//           nonbillable: 0,
//           timeoff: 0,
//           overtime: 0,
//           schedulepercentage: 0,
//         },
//         {
//           people_id: 18121407,
//           name: 'Abdul Moeez',
//           email: 'abdulmoiz7030@gmail.com',
//           job_title: 'ASE',
//           role_id: 232839,
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           default_hourly_rate: '0.5000',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-30 06:12:56',
//           region_id: 88306,
//           account_id: 813644,
//           department_id: 16915534,
//           managers: [],
//           capacity: 168,
//           scheduled: 48,
//           billable: 48,
//           nonbillable: 0,
//           timeoff: 0,
//           overtime: 8,
//           schedulepercentage: 29,
//         },
//       ],
//     },
//   ];

//   beforeEach(() => {
//     const mockedAxios = axios as jest.Mocked<typeof axios>;

//     // Mocking axios.get calls
//     mockedAxios.get.mockImplementation((url) => {
//       if (url === `${process.env.REACT_APP_BACKEND_URL}/roles_table_data`) {
//         return Promise.resolve({ data: mockData });
//       }
//       return Promise.reject(new Error('Not mocked URL'));
//     });

//     // jest.spyOn(axios, 'get').mockResolvedValue()
//   });
//   test('renders RoleTable component with mock data', async () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <TableComponent type="roles" />
//       </Provider>,
//     );
//     // Wait for the component to fetch data and render

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/roles_table_data`);
//     });
//     await waitFor(() => {
//       expect(screen.getByText('ASE')).toBeInTheDocument();
//       // Add more assertions based on your component's structure and data
//     });
//   });
// });

// // ********************************** TaskTable  Component *****************************

// describe('Table component Tasks', () => {
//   const mockData = [
//     {
//       772296110: {
//         personIds: [
//           18121407,
//         ],
//         projectId: 8890225,
//         phaseId: 0,
//         billable: true,
//         status: 3,
//       },
//       id: '772296110',
//       name: 'hohohoh',
//       projectId: 8890225,
//       personId: 18121407,
//       scheduled: 8,
//       billable: 8,
//       nonbillable: 0,
//       people: [
//         {
//           billable: 8,
//           hours: {
//             future: 8,
//             scheduled: 8,
//           },
//           id: 772296110,
//           name: 'Abdul Moeez',
//           person_id: 18121407,
//           phase_id: 0,
//           project_id: 8890225,
//           tentative: false,
//           type: 'task',
//           rate: 1,
//           nonbillable: 0,
//           scheduled: 8,
//           billableperct: 100,
//         },
//       ],
//       billableperct: 100,
//     },
//   ];

//   beforeEach(() => {
//     const mockedAxios = axios as jest.Mocked<typeof axios>;

//     // Mocking axios.get calls
//     mockedAxios.get.mockImplementation((url) => {
//       if (url === `${process.env.REACT_APP_BACKEND_URL}/task_table_data`) {
//         return Promise.resolve({ data: mockData });
//       }
//       return Promise.reject(new Error('Not mocked URL'));
//     });

//     // jest.spyOn(axios, 'get').mockResolvedValue()
//   });
//   test('renders TaskTable component with mock data', async () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <TableComponent type="task" />
//       </Provider>,
//     );
//     // Wait for the component to fetch data and render

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/task_table_data`);
//     });
//     await waitFor(() => {
//       expect(screen.getByText('hohohoh')).toBeInTheDocument();
//       // Add more assertions based on your component's structure and data
//     });
//   });
// });

// // ********************************** TimeOffTable  Component *****************************

// describe('Table component TimeOff', () => {
//   const mockData = [
//     {
//       id: 29668,
//       holiday: true,
//       name: 'Iqbal Day (Punjab)',
//       people: [
//         {
//           people_id: 18121468,
//           name: '* New Person',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           created: '2023-11-29 13:25:21',
//           modified: '2023-11-29 13:25:21',
//           region_id: 88306,
//           managers: [],
//           hours: 8,
//           days: 1,
//         },
//         {
//           people_id: 18121408,
//           name: 'Khubaib Idrees',
//           email: 'khubaibk30@gmail.com',
//           job_title: 'ASE',
//           role_id: 232839,
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [
//             {
//               name: 'Uganda',
//               type: 1,
//             },
//           ],
//           start_date: '2023-01-01',
//           default_hourly_rate: '0.0100',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-30 09:40:48',
//           region_id: 88306,
//           account_id: 813898,
//           department_id: 16915534,
//           managers: [],
//           hours: 8,
//           days: 1,
//         },
//         {
//           people_id: 18121407,
//           name: 'Abdul Moeez',
//           email: 'abdulmoiz7030@gmail.com',
//           job_title: 'ASE',
//           role_id: 232839,
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           default_hourly_rate: '0.5000',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-30 06:12:56',
//           region_id: 88306,
//           account_id: 813644,
//           department_id: 16915534,
//           managers: [],
//           hours: 8,
//           days: 1,
//         },
//         {
//           people_id: 18121406,
//           name: 'Muhammad Subhan',
//           auto_email: -1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           created: '2023-11-29 12:17:54',
//           modified: '2023-11-29 12:17:54',
//           region_id: 88306,
//           managers: [],
//           hours: 8,
//           days: 1,
//         },
//         {
//           people_id: 18121405,
//           name: 'Sameed Atta',
//           email: 'sameed.atta.khan99@gmail.com',
//           avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTM4Ni45MjI4NTE2ODEzNjM3.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           modified: '2023-11-29 12:16:50',
//           region_id: 88306,
//           account_id: 813637,
//           managers: [],
//           hours: 8,
//           days: 1,
//         },
//       ],
//       hours: 40,
//       day: 0,
//       days: 5,
//     },
//   ];

//   beforeEach(() => {
//     const mockedAxios = axios as jest.Mocked<typeof axios>;

//     // Mocking axios.get calls
//     mockedAxios.get.mockImplementation((url) => {
//       if (url === `${process.env.REACT_APP_BACKEND_URL}/timeoff_table_data`) {
//         return Promise.resolve({ data: mockData });
//       }
//       return Promise.reject(new Error('Not mocked URL'));
//     });

//     // jest.spyOn(axios, 'get').mockResolvedValue()
//   });
//   test('renders TimeOffTable component with mock data', async () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <TableComponent type="timeoff" />
//       </Provider>,
//     );
//     // Wait for the component to fetch data and render

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/timeoff_table_data`);
//     });
//     await waitFor(() => {
//       expect(screen.getByText('Iqbal Day (Punjab)')).toBeInTheDocument();
//       // Add more assertions based on your component's structure and data
//     });
//   });
// });

// ********************************** DROPDOWN  Component *****************************

// describe('Dropdown Component', () => {
//   const dropdownListDays = ['Days', 'Weeks', 'Month'];
//   const defaultSelectedDays = 'Days';
//   const setSelectedStateDays = jest.fn();

//   it('handles dropdown click days', async () => {
//     render(<Dropdown
//       width="w-64"
//       dropdownList={dropdownListDays}
//       defaultSelected={defaultSelectedDays}
//       setSelectedState={setSelectedStateDays}
//     />);
//     const dropdwonBtn = screen.getByTestId('dropdown-days');
//     fireEvent.click(dropdwonBtn);
//     expect(dropdwonBtn).toBeInTheDocument();
//   });

//   it('toggles dropdown visibility when button is clicked', () => {
//     render(<Dropdown
//       width="w-64"
//       dropdownList={dropdownListDays}
//       defaultSelected={defaultSelectedDays}
//       setSelectedState={setSelectedStateDays}
//     />);
//     const dropdownButton = screen.getByTestId('dropdown-days');
//     fireEvent.click(dropdownButton);
//     const dropdownContent = screen.getByRole('menu');
//     expect(dropdownContent).toBeInTheDocument();
//   });

//   it('closes dropdown when an option is clicked', () => {
//     render(
//       <Dropdown
//         width="w-64"
//         dropdownList={dropdownListDays}
//         defaultSelected={defaultSelectedDays}
//         setSelectedState={setSelectedStateDays}
//       />,
//     );

//     const button = screen.getByTestId('dropdown-days');
//     fireEvent.click(button);

//     const option = screen.getByText('Weeks');
//     fireEvent.click(option);

//     const dropdownContent = screen.queryByRole('menu');
//     expect(dropdownContent).not.toBeInTheDocument();
//   });

//   it('selects an option when clicked', () => {
//     render(
//       <Dropdown
//         width="w-64"
//         dropdownList={dropdownListDays}
//         defaultSelected={defaultSelectedDays}
//         setSelectedState={setSelectedStateDays}
//       />,
//     );

//     const button = screen.getByTestId('dropdown-days');
//     fireEvent.click(button);

//     const option = screen.getByText('Weeks');
//     fireEvent.click(option);

//     expect(setSelectedStateDays).toHaveBeenCalledWith('Weeks');
//   });

//   const dropdownListSchedule = ['Logged vs Scheduled', 'Past logged + Future scheduled', 'Logged', 'Scheduled'];
//   const defaultSelectedSchedule = 'Logged vs Scheduled';
//   const setSelectedStateSchedule = jest.fn();

//   it('handles dropdown click schedule', async () => {
//     render(<Dropdown
//       width="w-64"
//       dropdownList={dropdownListSchedule}
//       defaultSelected={defaultSelectedSchedule}
//       setSelectedState={setSelectedStateSchedule}
//     />);
//     const dropdwonBtn = screen.getByTestId('dropdown-days');
//     fireEvent.click(dropdwonBtn);
//     expect(dropdwonBtn).toBeInTheDocument();
//   });

//   // it('initially renders with default selected value', () => {
//   //   const wrapper = mount(
//   //     <Dropdown dropdownList={dropdownList} defaultSelected={defaultSelected}
//   // setSelectedState={setSelectedState} />,
//   //   );
//   //   expect(wrapper.find('span').text()).toBe(defaultSelected);
//   // });

//   // it('toggles dropdown when button is clicked', () => {
//   //   const wrapper = mount(
//   //     <Dropdown dropdownList={dropdownList} defaultSelected={defaultSelected}
//   // setSelectedState={setSelectedState} />,
//   //   );

//   //   wrapper.find('button').simulate('click');
//   //   expect(wrapper.state('isOpen')).toBe(true);

//   //   wrapper.find('button').simulate('click');
//   //   expect(wrapper.state('isOpen')).toBe(false);
//   // });

//   // it('closes dropdown when an option is clicked', () => {
//   //   const wrapper = mount(
//   //     <Dropdown dropdownList={dropdownList}
//   // defaultSelected={defaultSelected} setSelectedState={setSelectedState} />,
//   //   );

//   //   wrapper.find('button').simulate('click');
//   //   wrapper.find('li button').at(0).simulate('click');
//   //   expect(wrapper.state('isOpen')).toBe(false);
//   // });

//   // it('calls setSelectedState when an option is clicked', () => {
//   //   const wrapper = mount(
//   //     <Dropdown dropdownList={dropdownList}
//   // defaultSelected={defaultSelected} setSelectedState={setSelectedState} />,
//   //   );

//   //   wrapper.find('button').simulate('click');
//   //   wrapper.find('li button').at(0).simulate('click');
//   //   expect(setSelectedState).toHaveBeenCalledWith('Option 1');
//   // });

//   // it('closes dropdown when clicking outside the dropdown', () => {
//   //   const wrapper = mount(
//   //     <Dropdown dropdownList={dropdownList}
//   // defaultSelected={defaultSelected} setSelectedState={setSelectedState} />,
//   //   );

//   //   wrapper.find('button').simulate('click');
//   //   document.dispatchEvent(new MouseEvent('click'));
//   //   expect(wrapper.state('isOpen')).toBe(false);
//   // });
// });

// // ********************************** UnderLine TABS Component *****************************

// describe('tabIndexes', () => {
//   it('contains the correct number of tabs', () => {
//     expect(tabIndexes).toHaveLength(7); // Modify the number based on the actual number of tabs
//   });

//   it('has the expected structure for each tab', () => {
//     tabIndexes.forEach((tab) => {
//       expect(tab).toHaveProperty('label');
//       expect(tab).toHaveProperty('value');
//       expect(tab).toHaveProperty('component');
//     });
//   });

//   // it('contains specific tabs with correct properties', () => {
//   //   // Replace the values below with your expected label, value, and component
//   //   const expectedTabs = [
//   //     { label: 'People', value: 'people', component: expect.any(Object) },
//   //     { label: 'Roles', value: 'roles', component: expect.any(Object) },
//   //     { label: 'Department', value: 'department', component: expect.any(Object) },
//   //     // Add other tabs as needed
//   //   ];

//   //   expectedTabs.forEach((expectedTab) => {
//   //     expect(tabIndexes).toContainEqual(expectedTab);
//   //   });
//   // });

//   // Add more specific tests as needed for your use case
// });

// ********************************** People Component *****************************

// it('handles errors appropriately people mockoon', async () => {
//   // Arrange
//   const errorMessage = 'Error fetching data';
//   (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

//   // Act and Assert
//   await expect(getPeopleDataMockoon()).rejects.toThrow(errorMessage);
// });

// it('handles errors appropriately project mockoon', async () => {
//   // Arrange
//   const errorMessage = 'Error fetching data';
//   (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

//   // Act and Assert
//   await expect(getProjectDataMockoon()).rejects.toThrow(errorMessage);
// });

// ********************************** TABLE CONFIGRATION Component *****************************

// describe('tableConfiguration function', () => {
//   const table = createTable();
//   it('creates the correct number of columns', () => {
//     const columns = tableConfiguration(table);
//     expect(columns).toHaveLength(9); // Update this number to match the received array's length
//   });

//   it('creates columns with expected properties', () => {
//     const columns = tableConfiguration(table);
//     columns.forEach((column) => {
//       expect(column).toHaveProperty('id');
//       expect(column).toHaveProperty('header');
//     });
//   });

//   it('has specific IDs for expected columns', () => {
//     const columns = tableConfiguration(table);
//     const expectedIds = ['Person', 'Department', 'Capacity', 'Scheduled', 'Billable', 'Non-Billable', 'Time Off', 'OverTime', 'Sched. %'];
//     columns.forEach((column) => {
//       expect(expectedIds).toContain(column.id);
//     });
//   });
// });

// describe('tableConfiguration function PROJECT', () => {
//   const table = createTable();
//   it('creates the correct number of columns', () => {
//     const columns = ProjectTableConfiguration(table);
//     expect(columns).toHaveLength(7); // Update this number to match the received array's length
//   });

//   it('creates columns with expected properties', () => {
//     const columns = ProjectTableConfiguration(table);
//     columns.forEach((column) => {
//       expect(column).toHaveProperty('id');
//       expect(column).toHaveProperty('header');
//     });
//   });

//   it('has specific IDs for expected columns', () => {
//     const columns = ProjectTableConfiguration(table);
//     const expectedIds = ['Project', 'Client', 'Managed By', 'Scheduled', 'Billable', 'Non-Billable', 'Billable. %'];
//     columns.forEach((column) => {
//       expect(expectedIds).toContain(column.id);
//     });
//   });
// });

// // ********************************** Metric Slice *****************************

// describe('Metric state reducer', () => {
//   const initialState = {
//     totalCapacity: 0,
//     totalBillable: 0,
//     totalNonBillable: 0,
//     totalScheduled: 0,
//     totalOvertime: 0,
//     totalTimeOff: 0,
//     totalTentative: 0,
//   };
//   it('should set total capacity correctly', () => {
//     const action = setTotalCapacity(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalCapacity).toEqual(100);
//   });

//   // Write similar tests for other action creators
//   it('should set total billable correctly', () => {
//     const action = setTotalBillable(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalBillable).toEqual(100);
//   });

//   it('should set total non-billable correctly', () => {
//     const action = setTotalNonBillable(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalNonBillable).toEqual(100);
//   });

//   it('should set total scheduled correctly', () => {
//     const action = setTotalScheduled(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalScheduled).toEqual(100);
//   });

//   it('should set total timeoff correctly', () => {
//     const action = setTotalTimeOff(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalTimeOff).toEqual(100);
//   });

//   it('should set total overtime correctly', () => {
//     const action = setTotalOverTime(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalOvertime).toEqual(100);
//   });
//   it('should set total tentative correctly', () => {
//     const action = setTotalTentative(100);
//     const newState = metricSlice(initialState, action);
//     expect(newState.totalTentative).toEqual(100);
//   });
//   // Other test cases for each action creator...
// });

// // ********************************** Person Slice Reducer *****************************

// // Test for the reducer
// describe('peopleTable reducer', () => {
//   it('should handle adding peopleTable data correctly', () => {
//     const initialState = { peopleTableData: [] };
//     const mockData:PeopleTableInterface[] = [
//       {
//         people_id: 18121408,
//         name: 'Khubaib Idrees',
//         email: 'khubaibk30@gmail.com',
//         job_title: 'ASE',
//         role_id: 232839,
//         avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
//         auto_email: 1,
//         employee_type: 1,
//         active: 1,
//         people_type_id: 1,
//         tags: [
//           {
//             name: 'Uganda',
//             type: 1,
//           },
//         ],
//         start_date: '2023-01-01',
//         default_hourly_rate: '0.0100',
//         created: '2023-11-29 12:17:54',
//         modified: '2023-11-30 09:40:48',
//         region_id: 88306,
//         account_id: 813898,
//         department_id: 16915534,
//         managers: [],
//         department: 'LBDN',
//         capacity: 168,
//         projects: [],
//         scheduled: 0,
//         billable: 0,
//         nonbillable: 0,
//         scheduledpercent: 0,
//       },
//     ];

//     const action = addPeopleTableData(mockData);
//     const newState = PersonTableSlice.reducer(initialState, action);
//     expect(newState.peopleTableData[0]).toEqual(mockData);
//   });

//   // Add more test cases to handle other scenarios if needed
// });

// describe('getPeopleTableDataList selector', () => {
//   it('should return the correct people list from the state', () => {
//     const mockData:PeopleTableInterface[] = [
//       {
//         people_id: 18121408,
//         name: 'Khubaib Idrees',
//         email: 'khubaibk30@gmail.com',
//         job_title: 'ASE',
//         role_id: 232839,
//         avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ2Mi4xNTUyNzM0ODEzODk4.png',
//         auto_email: 1,
//         employee_type: 1,
//         active: 1,
//         people_type_id: 1,
//         tags: [
//           {
//             name: 'Uganda',
//             type: 1,
//           },
//         ],
//         start_date: '2023-01-01',
//         default_hourly_rate: '0.0100',
//         created: '2023-11-29 12:17:54',
//         modified: '2023-11-30 09:40:48',
//         region_id: 88306,
//         account_id: 813898,
//         department_id: 16915534,
//         managers: [],
//         department: 'LBDN',
//         capacity: 168,
//         projects: [],
//         scheduled: 0,
//         billable: 0,
//         nonbillable: 0,
//         scheduledpercent: 0,
//       },
//     ];
//     const selectedData = getPeopleTableDataList({ peopleTableList: mockData });
//     expect(selectedData).toEqual(mockData);
//   });

//   // Add more test cases to handle other scenarios if needed
// });

// // ********************************** API Slice Reducer *****************************

// describe('API Slice', () => {
//   const departmentData = {
//     department_id: 16915534,
//     parent_id: null,
//     name: 'LBDN',
//     map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
//       throw new Error('Function not implemented.');
//     },
//   };
//   const rolesData = {
//     id: 232839,
//     name: 'ASE',
//     created: '2023-11-29 12:18:57',
//     modified: '2023-11-29 12:18:57',
//     created_by: 813637,
//     modified_by: 813637,
//     map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
//       throw new Error('Function not implemented.');
//     },
//   };
//   const taskData = {
//     val: 'xsxs',
//     ids: {
//       772663721: {
//         personIds: [
//           18121407,
//         ],
//         projectId: 8890225,
//         phaseId: 0,
//         billable: true,
//         status: 3,
//       },
//     },
//     id: 0,
//     name: '',
//     created: '',
//     modified: '',
//     created_by: 0,
//     modified_by: 0,
//   };
//   const peopleDataa = [{
//     people_id: 18121407,
//     name: 'Abdul Moeez',
//     email: 'abdulmoiz7030@gmail.com',
//     job_title: 'ASE',
//     role_id: 232839,
//     avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
//     auto_email: 1,
//     employee_type: 1,
//     active: 1,
//     people_type_id: 1,
//     tags: [],
//     start_date: '2023-01-01',
//     default_hourly_rate: '0.5000',
//     created: '2023-11-29 12:17:54',
//     modified: '2023-11-30 06:12:56',
//     region_id: 88306,
//     account_id: 813644,
//     department_id: 16915534,
//     managers: [],
//   }];
//   it('should add data', () => {
//     const initialState = {
//       peopleData: [],
//       projectData: [],
//       peopleFilterData: [],
//       departmentData: [],
//       rolesData: [],
//       taskData: [],
//     };
//     const peopleData = [[{
//       people_id: 18121407,
//       name: 'Abdul Moeez',
//       email: 'abdulmoiz7030@gmail.com',
//       job_title: 'ASE',
//       role_id: 232839,
//       avatar_file: 'https://floatcdn.com/avatars/MTczOTM2MTY2MTQ0OS45NzU1ODU5ODEzNjQ0.png',
//       auto_email: 1,
//       employee_type: 1,
//       active: 1,
//       people_type_id: 1,
//       tags: [],
//       start_date: '2023-01-01',
//       default_hourly_rate: '0.5000',
//       created: '2023-11-29 12:17:54',
//       modified: '2023-11-30 06:12:56',
//       region_id: 88306,
//       account_id: 813644,
//       department_id: 16915534,
//       managers: [],
//     }]];
//     // PeopleData
//     const action = addPeopleData(peopleData[0]);
//     const newState = APISlice.reducer(initialState, action);

//     // PeopleFilterData
//     // const actionPeopleFilter = addPeopleFilterData(peopleFilterData);
//     // const newStatePeopleFilter = APISlice.reducer(initialState, actionPeopleFilter);

//     // DepartmentData
//     const actionDepartment = addDepartmentData({
//       department_id: 16915534,
//       parent_id: null,
//       name: 'LBDN',
//       map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
//         throw new Error('Function not implemented.');
//       },
//     });
//     const newStateDepartment = APISlice.reducer(initialState, actionDepartment);

//     // RolesData
//     const actionRoles = addRolesData({
//       id: 232839,
//       name: 'ASE',
//       created: '2023-11-29 12:18:57',
//       modified: '2023-11-29 12:18:57',
//       created_by: 813637,
//       modified_by: 813637,
//       map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
//         throw new Error('Function not implemented.');
//       },
//     });
//     const newStateRoles = APISlice.reducer(initialState, actionRoles);

//     // TaskData
//     const actionTask = addTaskData({
//       val: 'xsxs',
//       ids: {
//         772663721: {
//           personIds: [
//             18121407,
//           ],
//           projectId: 8890225,
//           phaseId: 0,
//           billable: true,
//           status: 3,
//         },
//       },
//       id: 0,
//       name: '',
//       created: '',
//       modified: '',
//       created_by: 0,
//       modified_by: 0,
//     });
//     const newStateTask = APISlice.reducer(initialState, actionTask);

//     // Modify the expectation to match the structure of your state
//     expect(newState.peopleData[0]).toEqual(peopleData[0]);
//     expect(newStateDepartment.departmentData[0].name).toContain('LBDN');
//     expect(newStateRoles.rolesData[0].name).toContain('ASE');
//     expect(newStateTask.taskData[0].val).toContain('xsxs');
//   });

//   it('should get data', () => {
//     const selectedDataDepartment = getDepartmentDataList({ departmentData });
//     expect(selectedDataDepartment).toEqual(departmentData);

//     const selectedDataRoles = getRolesDataList({ rolesData });
//     expect(selectedDataRoles).toEqual(rolesData);

//     const selectedDataTask = getTaskDataList({ taskData });
//     expect(selectedDataTask).toEqual(taskData);

//     const selectedDataPeople = getPeopleDataList({ peopleList: peopleDataa });
//     expect(selectedDataPeople).toEqual(peopleDataa);
//   });
// });

// ********************************** ScheduledMetric component *****************************

// describe('ScheduledMetric component', () => {
//   it('renders with mock data', () => {
//     // Mock data
//     const mockData = {
//       metrics: {
//         totalCapacity: 100,
//         totalScheduled: 50,
//         totalBillable: 30,
//         totalNonBillable: 20,
//         totalTimeOff: 10,
//         totalOvertime: 5,
//         totalTentative: 5,
//       },
//     };

//     render(
//       <Provider store={store}>
//         <ScheduledMetric />
//       </Provider>,
//     );

//     const capacityHeader = screen.getByText('Capacity');
//     expect(capacityHeader).toBeInTheDocument();
//   });
// });

// ********************************** Tabs component *****************************
// describe('Tabs component', () => {
//   test('renders tab labels', () => {
//     const { getByText } = render(
//       <Provider store={store}>
//         <UnderlineTabs />
//       </Provider>,
//     );

//     const peopleTab = getByText('People');
//     expect(peopleTab).toBeInTheDocument();
//   });
//   test('changes active tab on click', () => {
//     const { getByText, getByTestId } = render(
//       <Provider store={store}>
//         <UnderlineTabs />
//       </Provider>,
//     );

//     const initialTabContent = getByTestId('tab-panel-people');
//     expect(initialTabContent).toBeInTheDocument();

//     const otherTab = getByText('People'); // Replace 'AnotherTabLabel' with the actual label
//     fireEvent.click(otherTab);
//   });
// });

// // ********************************** Helper Function  *****************************
// describe('Testing getNonBillableHours function', () => {
//   it('calculates non-billable hours correctly', () => {
//     const originalProp = {
//       getValue: () => [
//         {
//           hours: [
//             { hours: { scheduled: 5 }, billable: true },
//             { hours: { scheduled: 10 }, billable: false },
//           ],
//         },
//         {
//           hours: [
//             { hours: { scheduled: 8 }, billable: false },
//             { hours: { scheduled: 12 }, billable: false },
//           ],
//         },
//       ],
//     };

//     const result = getNonBillableHours(originalProp);
//     expect(result).toBe(30); // Total non-billable hours: 10 + 8 + 12 = 30
//   });
// });

// // ********************************** Metric Service Functionality  *****************************

// describe('Testing async functions', () => {
//   const mockResponse = {
//     data: {
//       'legacy.capacity': {
//         key1: 10,
//         key2: 20,
//       },
//       'legacy.totals': [10, 20, 30],
//       'legacy.overtime': {
//         key1: 5,
//         key2: 15,
//       },
//       'legacy.timeoff': [5, 10, 15],
//     },
//   };

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('gets total capacity correctly', async () => {
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

//     const result = await getTotalCapacity();
//     expect(result).toEqual([{ key1: 10 }, { key2: 20 }]);
//     jest.restoreAllMocks();
//   });

//   it('gets total scheduled hours correctly', async () => {
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

//     const result = await getTotalScheduledHours();
//     expect(result).toEqual([10, 20, 30]);
//   });

//   it('gets total overtime correctly', async () => {
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

//     const result = await getTotalOvertime();
//     expect(result).toEqual([{ key1: 5 }, { key2: 15 }]);
//   });

//   it('gets total time off hours correctly', async () => {
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

//     const result = await getTotalTimeOffHours();
//     expect(result).toEqual([5, 10, 15]);
//   });

//   it('handles API error gracefully for getTotalCapacity', async () => {
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(mockResponse));

//     const result = await getTotalCapacity();
//     expect(result).toEqual([]);
//   });

//   // Similar error handling tests for other functions
// });

// // ********************************** People Service Functionality  *****************************
// describe('API Functions', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('getPeopleData should fetch people data correctly', async () => {
//     const mockData = {
//       data: [
//         {
//           people_id: 18104451,
//           name: 'Sameed Atta Khan',
//           email: 'sameed.atta@txend.com',
//           avatar_file: 'https://floatcdn.com/avatars/MTcyMzQ2MTY2MDExOS41NzQyMTg4ODEwNjU2.png',
//           auto_email: 1,
//           employee_type: 1,
//           active: 1,
//           people_type_id: 1,
//           tags: [],
//           start_date: '2023-01-01',
//           created: '2023-10-30 08:23:56',
//           modified: '2023-11-14 11:47:24',
//           region_id: 86611,
//           account_id: 810656,
//           department_id: 16913892,
//           managers: [],
//         },
//       ],
//     };
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

//     const result = await getPeopleData();
//     expect(result).toEqual(mockData.data);
//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people`);
//   });

//   test('getPeopleData should fail', async () => {
//     const mockError = new Error('Failed to fetch data');
//     jest.spyOn(axios, 'get').mockRejectedValue(mockError);

//     try {
//       await getPeopleData();
//     } catch (error) {
//       expect(error).toBe(mockError);
//     }

//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people`);
//   });

//   // test('getPeopleFilterData should fetch people filter data correctly', async () => {
//   //   const mockData = { data: peopleFilterData };
//   //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

//   //   const result = await getPeopleFilterData();
//   //   expect(result).toEqual(mockData);
//   //   // expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
//   // });

//   test('getDepartmentData should fetch department data correctly', async () => {
//     const mockData = {
//       data: [
//         {
//           department_id: 16915534,
//           parent_id: null,
//           name: 'LBDN',
//         },
//       ],
//     };
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

//     const result = await getDepartmentData();
//     expect(result).toEqual(mockData.data);
//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/department`);
//   });

//   test('getDepartmentData should fail', async () => {
//     const mockError = new Error('Failed to fetch data');
//     jest.spyOn(axios, 'get').mockRejectedValue(mockError);

//     try {
//       await getDepartmentData();
//     } catch (error) {
//       expect(error).toBe(mockError);
//     }

//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/department`);
//   });

//   test('getRolesData should fetch roles data correctly', async () => {
//     const mockData = {
//       data: [
//         {
//           id: 232839,
//           name: 'ASE',
//           created: '2023-11-29 12:18:57',
//           modified: '2023-11-29 12:18:57',
//           created_by: 813637,
//           modified_by: 813637,
//         },
//       ],
//     };
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

//     const result = await getRolesData();
//     expect(result).toEqual(mockData.data);
//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/roles`);
//   });

//   test('getRolesData should fail', async () => {
//     const mockError = new Error('Failed to fetch data');
//     jest.spyOn(axios, 'get').mockRejectedValue(mockError);

//     try {
//       await getRolesData();
//     } catch (error) {
//       expect(error).toBe(mockError);
//     }

//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/roles`);
//   });

//   test('getTaskData should fetch task data correctly', async () => {
//     const mockData = {
//       data: [
//         {
//           val: '',
//           ids: {
//             772837051: {
//               personIds: [
//                 18121407,
//               ],
//               projectId: 8893386,
//               phaseId: 0,
//               billable: true,
//               status: 2,
//             },
//           },
//         },
//       ],
//     };
//     jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

//     const result = await getTaskData();
//     expect(result).toEqual(mockData.data);
//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/task`);
//   });

//   test('getTaskData should fail', async () => {
//     const mockError = new Error('Failed to fetch data');
//     jest.spyOn(axios, 'get').mockRejectedValue(mockError);

//     try {
//       await getTaskData();
//     } catch (error) {
//       expect(error).toBe(mockError);
//     }

//     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/task`);
//   });
// });

// // ********************************** Heaer Table Configration  *****************************
describe('getHeaderNameSection', () => {
  it('calls the toggle sorting handler on Enter key press', () => {
    const mockGetToggleSortingHandler = jest.fn();

    // Mock header properties
    const headerProps = {
      header: {
        column: {
          getCanSort: () => true,
          getToggleSortingHandler: mockGetToggleSortingHandler,
        },
      },
    };

    // Render the component
    const { getByRole } = render(getHeaderNameSection(headerProps, 'Name'));

    // Find the div element
    const nameSection = getByRole('button', { name: 'Name' });

    // Trigger the key press event for 'Enter' on the div
    fireEvent.keyPress(nameSection, { key: 'Enter', code: 'Enter' });

    // Check if the toggle sorting handler is called
    expect(mockGetToggleSortingHandler).toHaveBeenCalled();
  });

  // it('does not call the toggle sorting handler on Enter key press when cannot sort', () => {
  //   const mockGetToggleSortingHandler = jest.fn();

  //   // Mock header properties
  //   const headerProps = {
  //     header: {
  //       column: {
  //         getCanSort: () => false,
  //         getToggleSortingHandler: mockGetToggleSortingHandler,
  //       },
  //     },
  //   };

  //   // Render the component
  //   const { getByRole } = render(getHeaderNameSection(headerProps));

  //   // Find the div element
  //   const nameSection = getByRole('button', { name: 'Name' });

  //   // Trigger the key press event for 'Enter' on the div
  //   fireEvent.keyPress(nameSection, { key: 'Enter', code: 'Enter' });

  //   // Check if the toggle sorting handler is NOT called
  //   expect(mockGetToggleSortingHandler).not.toHaveBeenCalled();
  // });
});

describe('getHeaderNameSection', () => {
  it('calls the toggle sorting handler on Enter key press', () => {
    const mockGetToggleSortingHandler = jest.fn();

    // Mock header properties
    const headerProps = {
      header: {
        column: {
          getCanSort: () => true,
          getToggleSortingHandler: mockGetToggleSortingHandler,
        },
      },
    };

    const testName = 'Name'; // Change this to the expected name

    // Render the component
    const { getByRole } = render(getHeaderNameSection(headerProps, testName));

    // Find the div element
    const nameSection = getByRole('button', { name: testName });

    // Trigger the key press event for 'Enter' on the div
    fireEvent.keyPress(nameSection, { key: 'Enter', code: 'Enter' });

    // Check if the toggle sorting handler is called
    expect(mockGetToggleSortingHandler).toHaveBeenCalled();
  });
});
