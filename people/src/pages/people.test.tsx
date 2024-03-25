import React from 'react';
import axios from 'axios'; // You may need to mock this module
import {
  act,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom'; // Make sure you import `waitFor` from '@testing-library/react'
import { Provider } from 'react-redux';
import People from './people';
import { store } from '../app/store';

jest.setTimeout(10000);
jest.mock('axios');
// const mockDispatch = jest.fn();
// jest.mock('../app/hooks', () => ({
//   useAppDispatch: () => mockDispatch,
// }));

describe('People component', () => {
  // Mock response for axios.get('http://localhost:3009/people')
  const peopleMockData = [
    {
      people_id: 18104451,
      name: 'Sameed Atta Khan',
      email: 'sameed.atta@txend.com',
      avatar_file: 'https://floatcdn.com/avatars/MTcyMzQ2MTY2MDExOS41NzQyMTg4ODEwNjU2.png',
      auto_email: 1,
      employee_type: 1,
      active: 1,
      people_type_id: 1,
      tags: [],
      start_date: '2023-01-01',
      created: '2023-10-30 08:23:56',
      modified: '2023-11-14 11:47:24',
      region_id: 86611,
      account_id: 810656,
      department_id: 16913892,
      managers: [],
    },
    {
      people_id: 18104430,
      name: 'Husnain Haider',
      email: 'husnain.haider@txend.com',
      auto_email: 1,
      employee_type: 1,
      active: 1,
      people_type_id: 1,
      tags: [],
      start_date: '2023-01-01',
      created: '2023-10-30 07:45:00',
      modified: '2023-11-17 12:56:09',
      region_id: 86611,
      department_id: 16913892,
      managers: [],
    },
  ];

  // Mock response for axios.get('http://localhost:3009/projects')
  const projectsMockData = [
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

  // Mock response for axios.get('http://localhost:3009/manager')
  const managerMockData = [
    {
      account_id: 810995,
      name: 'Khubaib Idrees',
      email: 'khubaib.idrees@txend.com',
      timezone: null,
      avatar: 'https://floatcdn.com/icons/avatar1-80.png',
      account_type: 7,
      access: 0,
      department_filter: [
        16913892,
      ],
      department_filter_id: 16913892,
      view_rights: 1,
      edit_rights: 0,
      budget_rights: 0,
      active: 1,
      created: '2023-11-16 06:29:53',
      modified: '2023-11-17 17:40:49',
      management_group: null,
      accepted: 1,
    },
    {
      account_id: 810890,
      name: 'Abdul Moeez',
      email: 'abdul.moeez@txend.com',
      timezone: null,
      avatar: 'https://floatcdn.com/icons/avatar1-80.png',
      account_type: 7,
      access: 0,
      department_filter: [
        16913892,
      ],
      department_filter_id: 16913892,
      view_rights: 1,
      edit_rights: 0,
      budget_rights: 0,
      active: 1,
      created: '2023-11-15 08:21:01',
      modified: '2023-11-15 12:04:50',
      management_group: null,
      accepted: 1,
    },
  ];
  const departmentMockData = [
    {
      department_id: 16915534,
      parent_id: null,
      name: 'LBDN',
    },
  ];
  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mocking axios.get calls
    mockedAxios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_BASE_URL_POEPLE}/people`) {
        return Promise.resolve({ data: peopleMockData });
      } if (url === `${process.env.REACT_APP_BASE_URL_POEPLE}/projects`) {
        return Promise.resolve({ data: projectsMockData });
      } if (url === `${process.env.REACT_APP_BASE_URL_POEPLE}/manager`) {
        return Promise.resolve({ data: managerMockData });
      } if (url === `${process.env.REACT_APP_BASE_URL_POEPLE}/department`) {
        return Promise.resolve({ data: departmentMockData });
      }
      return Promise.reject(new Error('Not mocked URL'));
    });

    // jest.spyOn(axios, 'get').mockResolvedValue()
  });
  // it('renders People component correctly', async () => {
  //   render(<People />);
  it('renders People component correctly', async () => {
    await act(async () => render(
      // Wrap your component with the Provider and pass the store
      <Provider store={store}>
        <People />
      </Provider>,
    ));

    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      // Add more expectations based on your actual UI
    });
  });
  it('renders People component Data correctly', async () => {
    const { getByTestId } = render(
      // Wrap your component with the Provider and pass the store
      <Provider store={store}>
        <People />
      </Provider>,
    );

    // await waitFor(() => {
    //   expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/people`);
    //   expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/manager`);
    //   expect(axios.get).toHaveBeenCalledWith(`$
    // {process.env.REACT_APP_BASE_URL_POEPLE}/projects`);
    //   expect(axios.get).toHaveBeenCalledWith(`$
    // {process.env.REACT_APP_BASE_URL_POEPLE}/department`);
    // });

    await waitFor(() => {
      expect(getByTestId('table')).toBeInTheDocument();
    });
    // Wait for data to be loaded
  });
  it('renders People and checks the dropdown', async () => {
    render(
      <Provider store={store}>
        <People />
      </Provider>,
    );

    // await waitFor(() => {
    //   expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/people`);
    //   expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/manager`);
    //   expect(axios.get).toHaveBeenCalledWith(`$
    // {process.env.REACT_APP_BASE_URL_POEPLE}/projects`);
    //   expect(axios.get).toHaveBeenCalledWith(`$
    // {process.env.REACT_APP_BASE_URL_POEPLE}/department`);
    // });
    // Wait for data to be loaded
    const dropdown = screen.getByTestId('dropdown');
    // Add more expectations based on your actual UI
    expect(dropdown).toHaveClass('hidden');
    const button1 = screen.getByTestId('active');
    expect(button1).toBeChecked();
    await waitFor(() => {
      // console.log(people.innerHTML);

      fireEvent.click(button1);
    });
    const button2 = screen.getByTestId('archive');
    expect(button2).not.toBeChecked();
    await waitFor(() => {
      // console.log(people.innerHTML);

      fireEvent.click(button2);
    });
    const button3 = screen.getByTestId('access');
    expect(button3).not.toBeChecked();
    expect(button2).toBeChecked();
    await waitFor(() => {
      // console.log(people.innerHTML);

      fireEvent.click(button3);
    });
  });
  // it('renders People and checks people', async () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <People />
  //     </Provider>,
  //   );

  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/people`);
  //     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/manager`);
  //    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/projects`);
  // expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/department`);
  //   });
  //   // Wait for data to be loaded

  //   await waitFor(() => {
  //     // console.log(people.innerHTML);

  //     const table = getByTestId('table');
  //     expect(table).toBeDefined();
  //     expect(screen.getByText('Husnain Haider')).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     const row = screen.getByTestId('table-row-Husnain');
  //     fireEvent.click(row);
  //   });
  //   await waitFor(() => {
  //     const calender = screen.getByTestId('table-calender-Husnain');
  //     fireEvent.click(calender);
  //   });
  //   await waitFor(() => {
  //     const scroll = screen.getByTestId('table-scroll-Husnain');
  //     fireEvent.click(scroll);
  //   });
  // });

  // it('renders People and checks the dropdown', async () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <People />
  //     </Provider>,
  //   );

  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/people`);
  //     expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/manager`);
  //   expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL_POEPLE}/projects`);
  //   });
  //   // Wait for data to be loaded
  //   await waitFor(() => {
  //     const addButton = getByTestId('user-create');

  //     fireEvent.click(addButton);
  //   });
  // });
});

// describe('People Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('sorts data by name when sortByName is called', () => {
//     const mockedData = [
//       { people_id: 1, name: 'Alice' },
//       { people_id: 2, name: 'Bob' },
//       { people_id: 3, name: 'Charlie' },
//     ];

//     // Mock axios.get to return mocked data

//     const axiosMock = jest.spyOn(axios, 'get');
//     axiosMock.mockResolvedValue({ data: mockedData });

//     render(
//       <Provider store={store}>
//         <People />
//       </Provider>,
//     );

//     // Click on the sort button
//     fireEvent.click(screen.getByTestId('sort-button'));

//     // Check if the data is sorted in ascending order
//     expect(screen.getByTestId('table').children[0]).toHaveTextContent('Alice');
//     expect(screen.getByTestId('table').children[1]).toHaveTextContent('Bob');
//     expect(screen.getByTestId('table').children[2]).toHaveTextContent('Charlie');
//   });

//   it('sorts data by name when sortByName', async () => {
//     const mockedData = [
//       { people_id: 1, name: 'Bob' },
//       { people_id: 2, name: 'Alice' },
//       { people_id: 3, name: 'Charlie' },
//     ];

//     // Mock axios.get to return mocked data
//     const axiosMock = jest.spyOn(axios, 'get');
//     axiosMock.mockResolvedValue({ data: mockedData });

//     render(
//       <Provider store={store}>
//         <People />
//       </Provider>,
//     );

//     // Click on the sort button using the data-testid
//     fireEvent.click(screen.getByTestId('sort-button'));

//     // Check if the data is sorted in ascending order
//     expect(screen.getByTestId('table').children[0]).toHaveTextContent('Alice');
//     expect(screen.getByTestId('table').children[1]).toHaveTextContent('Bob');
//     expect(screen.getByTestId('table').children[2]).toHaveTextContent('Charlie');

//     // Click on the sort button again to change the sorting order
//     fireEvent.click(screen.getByTestId('sort-button'));

//     // Check if the data is sorted in descending order
//     expect(screen.getByTestId('table').children[0]).toHaveTextContent('Charlie');
//     expect(screen.getByTestId('table').children[1]).toHaveTextContent('Bob');
//     expect(screen.getByTestId('table').children[2]).toHaveTextContent('Alice');
//   });

//   // it('closes member modal when onCloseMemberModal is called', async () => {
//   //   // Mock setIsMemberModalOpen and setSelectedPerson functions
//   //   const setIsMemberModalOpenMock = jest.fn();
//   //   const setSelectedPersonMock = jest.fn();

//   //   render(
//   //     <Provider store={store}>
//   //       <People
//   //         isModalOpen={false}
//   //         setIsMemberModalOpen={setIsMemberModalOpenMock}
//   //         setSelectedPerson={setSelectedPersonMock}
//   //       />
//   //     </Provider>,
//   //   );

//   //   // Call onCloseMemberModal function
//   //   await screen.findByTestId('user-create'); // Wait for the component to render
//   //   fireEvent.click(screen.getByTestId('user-create'));

//   //   expect(setIsMemberModalOpenMock).toHaveBeenCalledWith(false);
//   //   expect(setSelectedPersonMock).toHaveBeenCalledWith(null);
//   // });

//   it('opens and closes member modal when user-create button is clicked', async () => {
//     // Mock the axios.get function

//     const axiosMock = jest.spyOn(axios, 'get');
//     axiosMock.mockResolvedValue({ data: [] });
//     render(
//       <Provider store={store}>

//         <People />
//       </Provider>,
//     );

//     // Simulate clicking on the "Add Member" button
//     fireEvent.click(screen.getByTestId('user-create'));

//     // Check if setIsMemberModalOpen is called with the expected argument to open the modal
//     expect(screen.getByTestId('all-people')).toHaveClass('px-4');

//     // Close the member modal by clicking on
//     // the modal background (you may need to adjust the selector)
//     fireEvent.click(screen.getByTestId('default-modal'));

//     // Check if setIsMemberModalOpen is called with the expected argument to close the modal
//     expect(screen.getByTestId('all-people')).not.toHaveClass('fixed');
//   });
// });
