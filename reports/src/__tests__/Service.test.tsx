// ********************************** Metric Service Functionality  *****************************

import axios from 'axios';
import {
  getTotalCapacity, getTotalScheduledHours, getTotalOvertime, getTotalTimeOffHours,
} from '../services/metricServices';
import {
  getPeopleData, getDepartmentData, getRolesData, getTaskData, getProjectData,
} from '../services/peopleService';
import PeopleFilter from '../interface/peopleFilterInterface';

describe('Testing async functions', () => {
  const mockResponse = {
    data: {
      'legacy.capacity': {
        key1: 10,
        key2: 20,
      },
      'legacy.totals': [10, 20, 30],
      'legacy.overtime': {
        key1: 5,
        key2: 15,
      },
      'legacy.timeoff': [5, 10, 15],
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('gets total capacity correctly', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

    // const result = await getTotalCapacity();
    // expect(result).toEqual([{ key1: 10 }, { key2: 20 }]);
    jest.restoreAllMocks();
  });

  // it('gets total scheduled hours correctly', async () => {
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

  //   const result = await getTotalScheduledHours();
  //   expect(result).toEqual([10, 20, 30]);
  // });

  // it('gets total overtime correctly', async () => {
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

  //   const result = await getTotalOvertime();
  //   expect(result).toEqual([{ key1: 5 }, { key2: 15 }]);
  // });

  // it('gets total time off hours correctly', async () => {
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

  //   const result = await getTotalTimeOffHours();
  //   expect(result).toEqual([5, 10, 15]);
  // });

  // it('handles API error gracefully for getTotalCapacity', async () => {
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(mockResponse));

  //   const result = await getTotalCapacity();
  //   expect(result).toEqual([]);
  // });

  // Similar error handling tests for other functions
});

// ********************************** People Service Functionality  *****************************
describe('API Functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getPeopleData should fetch people data correctly', async () => {
    const mockData = {
      data: [
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
      ],
    };
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

    const result = await getPeopleData();
    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people`);
  });

  test('getPeopleData should fail', async () => {
    const mockError = new Error('Failed to fetch data');
    jest.spyOn(axios, 'get').mockRejectedValue(mockError);

    try {
      await getPeopleData();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people`);
  });

  test('getProjectData should fetch people data correctly', async () => {
    const mockData = {
      data: [
        {
          project_id: 8893391,
          name: 'rtertertret',
          color: '3451b2',
          notes: 'trterte',
          tags: [],
          budget_type: 0,
          budget_per_phase: 0,
          non_billable: 0,
          tentative: 0,
          locked_task_list: 1,
          active: 1,
          project_manager: 813644,
          all_pms_schedule: 0,
          created: '2023-11-30 12:36:30',
          modified: '2023-11-30 12:36:30',
          rate_type: 1,
          ext_calendar_count: 0,
          notes_meta: [],
          people_ids: [
            18121407,
            18121468,
          ],
          start_date: '2023-12-01',
          end_date: '2023-12-01',
        },
      ],
    };
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

    const result = await getProjectData();
    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/projects`);
  });

  test('getProjectData should fail', async () => {
    const mockError = new Error('Failed to fetch data');
    jest.spyOn(axios, 'get').mockRejectedValue(mockError);

    try {
      await getProjectData();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/projects`);
  });

  // test('getPeopleFilterData should fetch people filter data correctly', async () => {
  //   const mockData = { data: peopleFilterData };
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

  //   const result = await getPeopleFilterData();
  //   expect(result).toEqual(mockData);
  //   // expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
  // });

  test('getDepartmentData should fetch department data correctly', async () => {
    const mockData = {
      data: [
        {
          department_id: 16915534,
          parent_id: null,
          name: 'LBDN',
        },
      ],
    };
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

    const result = await getDepartmentData();
    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/department`);
  });

  test('getDepartmentData should fail', async () => {
    const mockError = new Error('Failed to fetch data');
    jest.spyOn(axios, 'get').mockRejectedValue(mockError);

    try {
      await getDepartmentData();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/department`);
  });

  test('getRolesData should fetch roles data correctly', async () => {
    const mockData = {
      data: [
        {
          id: 232839,
          name: 'ASE',
          created: '2023-11-29 12:18:57',
          modified: '2023-11-29 12:18:57',
          created_by: 813637,
          modified_by: 813637,
        },
      ],
    };
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

    const result = await getRolesData();
    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/roles`);
  });

  test('getRolesData should fail', async () => {
    const mockError = new Error('Failed to fetch data');
    jest.spyOn(axios, 'get').mockRejectedValue(mockError);

    try {
      await getRolesData();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/roles`);
  });

  test('getTaskData should fetch task data correctly', async () => {
    const mockData = {
      data: [
        {
          val: '',
          ids: {
            772837051: {
              personIds: [
                18121407,
              ],
              projectId: 8893386,
              phaseId: 0,
              billable: true,
              status: 2,
            },
          },
        },
      ],
    };
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

    const result = await getTaskData();
    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/task`);
  });

  test('getTaskData should fail', async () => {
    const mockError = new Error('Failed to fetch data');
    jest.spyOn(axios, 'get').mockRejectedValue(mockError);

    try {
      await getTaskData();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/task`);
  });
});

// ********************************** Metric Service Functionality  *****************************

jest.mock('axios');

describe('Async Functions', () => {
  const mockPeopleFilter = {
    // Mocked people filter data
    'legacy.capacity': {
      18104392: 168,
      // Add more data as needed for different scenarios
    },
    'legacy.totals': [],
    'legacy.overtime': {
      18104392: {
        future: 0,
        logged: 0,
        total: 0,
      },
    },
    'legacy.timeoff': {
    },
    datapoints: [],
  };
  const mockPeopleFilterEmpty = {
  };

  it('should fetch total capacity', async () => {
    const expectedCapacity = [{ 18104392: 168 }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPeopleFilter });

    const capacity = await getTotalCapacity(mockPeopleFilter as unknown as PeopleFilter);
    expect(capacity).toEqual(expectedCapacity);

    const result = await getTotalCapacity(mockPeopleFilterEmpty as PeopleFilter);
    expect(result).toEqual([]);
  });

  it('should fetch total scheduled hours', async () => {
    const expectedScheduledHours = mockPeopleFilter['legacy.totals'];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPeopleFilter });

    const scheduledHours = await getTotalScheduledHours(mockPeopleFilter as unknown as PeopleFilter);
    expect(scheduledHours).toEqual(expectedScheduledHours);
  });

  it('should fetch total overtime', async () => {
    const expectedOvertime = [{
      18104392: {
        future: 0,
        logged: 0,
        total: 0,
      },
    }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPeopleFilter });

    const overtime = await getTotalOvertime(mockPeopleFilter as unknown as PeopleFilter);
    expect(overtime).toEqual(expectedOvertime);

    const result = await getTotalOvertime(mockPeopleFilterEmpty as PeopleFilter);
    expect(result).toEqual([]);
  });

  it('should fetch total time off hours', async () => {
    const expectedTimeOffHours = mockPeopleFilter['legacy.timeoff'];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPeopleFilter });

    const timeOffHours = await getTotalTimeOffHours(mockPeopleFilter as unknown as PeopleFilter);
    expect(timeOffHours).toEqual(expectedTimeOffHours);
  });

  // Add more tests to cover edge cases, error scenarios, and different data structures if applicable
});
