import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import PeopleTableInterface from '../../../components/tables/tableComponent/propleInterface';
import { ProjectData } from '../../../components/tables/projectTable/interface';
import Roles from '../../../interface/rolesInterface';
import { RolesTable } from '../../../interface/rolesTableInterface';
import DepartmentInterface from '../../../interface/departmentInterface';
import { TaskTableData } from '../../../components/tables/tableComponent/taskTableInterface';

interface TableState {
  peopleTableDataList: PeopleTableInterface[];
  projectTableDataList: ProjectData[];
  rolesTableDataList:RolesTable[];
  departmentTableDataList:DepartmentInterface[];
  taskTableDataList:TaskTableData[];
  filterSelectedType: { type: string;
    selectedEntry: Record<string, any>; };
}
const initialState: TableState = {
  peopleTableDataList: [],
  projectTableDataList: [],
  rolesTableDataList: [],
  departmentTableDataList: [],
  taskTableDataList: [],
  filterSelectedType: { type: '', selectedEntry: {} },
};

export const TableSlice = createSlice({
  name: 'tableState',
  initialState,
  reducers: {
    addPeopleTableDataList: (state:any, action:PayloadAction<PeopleTableInterface[]>) => {
      state.peopleTableDataList = (action.payload);
    },
    addProjectTableDataList: (state:any, action:PayloadAction<ProjectData[]>) => {
      state.projectTableDataList = (action.payload);
    },
    addRolesTableDataList: (state:any, action:PayloadAction<RolesTable[]>) => {
      state.rolesTableDataList = (action.payload);
    },
    addDepartmentTableDataList: (state:any, action:PayloadAction<DepartmentInterface[]>) => {
      state.departmentTableDataList = (action.payload);
    },
    addTaskTableDataList: (state:any, action:PayloadAction<TaskTableData[]>) => {
      state.taskTableDataList = (action.payload);
    },
    setFilterSelectedType: (state:any, action:PayloadAction<{ type: string;
      selectedEntry: Record<string, any>; }>) => {
      state.filterSelectedType = (action.payload);
    },
  },
});

export const getPeopleTableDataList = (state:
{ peopleTableDataList: PeopleTableInterface[] }) => state.peopleTableDataList;
export const getProjectTableDataList = (state:
{ projectTableDataList: ProjectData[] }) => state.projectTableDataList;
export const getRolesTableDataList = (state:
{ rolesTableDataList: RolesTable[] }) => state.rolesTableDataList;
export const getDepartmentTableDataList = (state:
{ departmentTableDataList: DepartmentInterface[] }) => state.departmentTableDataList;
export const getTaskTableDataList = (state:
{ taskTableDataList: TaskTableData[] }) => state.taskTableDataList;
export const getFilterSelectedType = (state:
{ filterSelectedType: string }) => state.filterSelectedType;
export default TableSlice.reducer;
export const {
  addPeopleTableDataList, addProjectTableDataList, addRolesTableDataList, addDepartmentTableDataList, addTaskTableDataList, setFilterSelectedType,
} = TableSlice.actions;
