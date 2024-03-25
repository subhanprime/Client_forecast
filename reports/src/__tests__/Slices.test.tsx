import PeopleTableInterface from '../components/tables/tableComponent/propleInterface';
import tabIndexes from '../constants/tabIndex';
import {
  addPeopleData, APISlice, addDepartmentData, addRolesData, addTaskData, getDepartmentDataList, getRolesDataList, getTaskDataList,
  getPeopleTableDataList as getPeopleDataList,
  addProjectData,
  getProjectTableDataList,
} from '../redux/store/features/apiSlice';
import metricSlice, {
  setTotalBillable, setTotalCapacity, setTotalNonBillable, setTotalOverTime, setTotalScheduled, setTotalTentative, setTotalTimeOff,
} from '../redux/store/features/metricSlice';
import { addPeopleTableData, PersonTableSlice, getPeopleTableDataList } from '../redux/store/features/personSlice';
// ********************************** Metric Slice *****************************

describe('Metric state reducer', () => {
  const initialState = {
    totalCapacity: 0,
    totalBillable: 0,
    totalNonBillable: 0,
    totalScheduled: 0,
    totalOvertime: 0,
    totalTimeOff: 0,
    totalTentative: 0,
  };
  it('should set total capacity correctly', () => {
    const action = setTotalCapacity(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalCapacity).toEqual(100);
  });

  // Write similar tests for other action creators
  it('should set total billable correctly', () => {
    const action = setTotalBillable(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalBillable).toEqual(100);
  });

  it('should set total non-billable correctly', () => {
    const action = setTotalNonBillable(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalNonBillable).toEqual(100);
  });

  it('should set total scheduled correctly', () => {
    const action = setTotalScheduled(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalScheduled).toEqual(100);
  });

  it('should set total timeoff correctly', () => {
    const action = setTotalTimeOff(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalTimeOff).toEqual(100);
  });

  it('should set total overtime correctly', () => {
    const action = setTotalOverTime(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalOvertime).toEqual(100);
  });
  it('should set total tentative correctly', () => {
    const action = setTotalTentative(100);
    const newState = metricSlice(initialState, action);
    expect(newState.totalTentative).toEqual(100);
  });
  // Other test cases for each action creator...
});

// ********************************** Person Slice Reducer *****************************

// Test for the reducer
describe('peopleTable reducer', () => {
  it('should handle adding peopleTable data correctly', () => {
    const initialState = { peopleTableData: [] };
    const mockData:PeopleTableInterface[] = [
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
        department: 'LBDN',
        capacity: 168,
        projects: [],
        scheduled: 0,
        billable: 0,
        nonbillable: 0,
        scheduledpercent: 0,
      },
    ];

    const action = addPeopleTableData(mockData);
    const newState = PersonTableSlice.reducer(initialState, action);
    expect(newState.peopleTableData[0]).toEqual(mockData);
  });

  // Add more test cases to handle other scenarios if needed
});

describe('getPeopleTableDataList selector', () => {
  it('should return the correct people list from the state', () => {
    const mockData:PeopleTableInterface[] = [
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
        department: 'LBDN',
        capacity: 168,
        projects: [],
        scheduled: 0,
        billable: 0,
        nonbillable: 0,
        scheduledpercent: 0,
      },
    ];
    const selectedData = getPeopleTableDataList({ peopleTableList: mockData });
    expect(selectedData).toEqual(mockData);
  });

  // Add more test cases to handle other scenarios if needed
});

// ********************************** API Slice Reducer *****************************

describe('API Slice', () => {
  const departmentData = {
    department_id: 16915534,
    parent_id: null,
    name: 'LBDN',
    map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
      throw new Error('Function not implemented.');
    },
  };
  const rolesData = {
    id: 232839,
    name: 'ASE',
    created: '2023-11-29 12:18:57',
    modified: '2023-11-29 12:18:57',
    created_by: 813637,
    modified_by: 813637,
    map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
      throw new Error('Function not implemented.');
    },
  };
  const projectData = [
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
      client_id: 0,
    },
  ];
  const taskData = {
    val: 'xsxs',
    ids: {
      772663721: {
        personIds: [
          18121407,
        ],
        projectId: 8890225,
        phaseId: 0,
        billable: true,
        status: 3,
      },
    },
    id: 0,
    name: '',
    created: '',
    modified: '',
    created_by: 0,
    modified_by: 0,
  };
  const peopleDataa = [{
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
  }];
  it('should add data', () => {
    const initialState = {
      peopleData: [],
      projectData: [],
      peopleFilterData: [],
      departmentData: [],
      rolesData: [],
      taskData: [],
    };
    const peopleData = [[{
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
    }]];
    // PeopleData
    const action = addPeopleData(peopleData[0]);
    const newState = APISlice.reducer(initialState, action);

    // PeopleFilterData
    // const actionPeopleFilter = addPeopleFilterData(peopleFilterData);
    // const newStatePeopleFilter = APISlice.reducer(initialState, actionPeopleFilter);

    // DepartmentData
    const actionDepartment = addDepartmentData({
      department_id: 16915534,
      parent_id: null,
      name: 'LBDN',
      map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
        throw new Error('Function not implemented.');
      },
    });
    const newStateDepartment = APISlice.reducer(initialState, actionDepartment);

    // RolesData
    const actionRoles = addRolesData({
      id: 232839,
      name: 'ASE',
      created: '2023-11-29 12:18:57',
      modified: '2023-11-29 12:18:57',
      created_by: 813637,
      modified_by: 813637,
      map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[] {
        throw new Error('Function not implemented.');
      },
    });
    const newStateRoles = APISlice.reducer(initialState, actionRoles);

    // TaskData
    const actionTask = addTaskData({
      val: 'xsxs',
      ids: {
        772663721: {
          personIds: [
            18121407,
          ],
          projectId: 8890225,
          phaseId: 0,
          billable: true,
          status: 3,
        },
      },
      id: 0,
      name: '',
      created: '',
      modified: '',
      created_by: 0,
      modified_by: 0,
    });
    const newStateTask = APISlice.reducer(initialState, actionTask);

    const actionProject = addProjectData({
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
      client_id: 0,
    });
    const newStateProject = APISlice.reducer(initialState, actionProject);

    // Modify the expectation to match the structure of your state
    expect(newState.peopleData[0]).toEqual(peopleData[0]);
    expect(newStateDepartment.departmentData[0].name).toContain('LBDN');
    expect(newStateRoles.rolesData[0].name).toContain('ASE');
    expect(newStateTask.taskData[0].val).toContain('xsxs');
    expect(newStateProject.projectData[0].name).toContain('rtertertret');
  });

  it('should get data', () => {
    const selectedDataDepartment = getDepartmentDataList({ departmentData });
    expect(selectedDataDepartment).toEqual(departmentData);

    const selectedDataRoles = getRolesDataList({ rolesData });
    expect(selectedDataRoles).toEqual(rolesData);

    const selectedDataTask = getTaskDataList({ taskData });
    expect(selectedDataTask).toEqual(taskData);

    const selectedDataPeople = getPeopleDataList({ peopleList: peopleDataa });
    expect(selectedDataPeople).toEqual(peopleDataa);

    const selectedDataProject = getProjectTableDataList({ projectList: projectData });
    expect(selectedDataProject).toEqual(projectData);
  });
});
