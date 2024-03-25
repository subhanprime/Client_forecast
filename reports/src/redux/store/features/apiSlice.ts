import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import People from '../../../interface/peopleListInterface';
import PeopleFilter from '../../../interface/peopleFilterInterface';
import DepartmentInterface from '../../../interface/departmentInterface';
import Roles from '../../../interface/rolesInterface';
import Task from '../../../interface/taskInterface';
import Project from '../../../interface/projectInterface';
import Client from '../../../interface/clientInterface';

interface PeopleDataInterface {
  peopleData: People[],
  projectData:Project[],
  peopleFilterData: PeopleFilter,
  departmentData:DepartmentInterface[],
  rolesData:Roles[],
  taskData:Task[],
  clientData:Client[],
}
const initialState: PeopleDataInterface = {
  peopleData: [],
  projectData: [],
  peopleFilterData: {
    datapoints: [], // Example value, you need to provide the appropriate initial value
    origin: {
      // Provide initial values for properties in the Origin interface
      billable: 0,
      capacity: 0,
      fees: { logged: 0, scheduled: 0 },
      holidays: { days: 0, hours: 0 },
      logged: { billable: 0, nonbillable: 0 },
      nonbillable: 0,
      overtime: { logged: 0, scheduled: 0 },
      tentative: { billable: 0, nonbillable: 0, timeoff: 0 },
      timeoff: { days: 0, hours: 0 },
      unassigned: { logged: 0, scheduled: 0 },
    },
    'legacy.capacity': {}, // Example value, you need to provide the appropriate initial value
    'legacy.budgets': {
      projects: {},
      phases: {},
    },
    'legacy.overtime': {}, // Example value, you need to provide the appropriate initial value
    'legacy.timeoff': [], // Example value, you need to provide the appropriate initial value
    'legacy.totals': [], // Example value, you need to provide the appropriate initial value
  },
  departmentData: [],
  rolesData: [],
  taskData: [],
  clientData: [],
};

export const APISlice = createSlice({
  name: 'peopleData',
  initialState,
  reducers: {
    addPeopleData: (state:any, action:PayloadAction<People[]>) => {
      state.peopleData.push(action.payload);
    },
    addProjectData: (state:any, action:PayloadAction<Project>) => {
      state.projectData.push(action.payload);
    },
    addPeopleFilterData: (state:any, action:PayloadAction<PeopleFilter>) => {
      state.peopleFilterData = (action.payload);
    },
    addDepartmentData: (state:any, action:PayloadAction<DepartmentInterface>) => {
      state.departmentData.push(action.payload);
    },
    addRolesData: (state:any, action:PayloadAction<Roles>) => {
      state.rolesData.push(action.payload);
    },
    addTaskData: (state:any, action:PayloadAction<Roles>) => {
      state.taskData.push(action.payload);
    },
    addClientData: (state:any, action:PayloadAction<Client>) => {
      state.clientData = (action.payload);
    },
  },
});

export const getPeopleTableDataList = (state:
{ peopleList: People[] }) => state.peopleList;
export const getProjectTableDataList = (state:
{ projectList: Project[] }) => state.projectList;
export const getPeopleFilterDataList = (state:
{ peopleFilterData: PeopleFilter }) => state.peopleFilterData;
export const getDepartmentDataList = (state:
{ departmentData: DepartmentInterface }) => state.departmentData;
export const getRolesDataList = (state:
{ rolesData: Roles }) => state.rolesData;
export const getTaskDataList = (state:
{ taskData: Roles }) => state.taskData;
export const getClientDataList = (state:
{ clientData: Client }) => state.clientData;
export default APISlice.reducer;
export const {
  addPeopleData, addPeopleFilterData, addDepartmentData, addRolesData, addTaskData, addProjectData, addClientData,
} = APISlice.actions;
