import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  project_id: number;
  name: string;
  color: string;
  tags: string[];
  budget_type: number;
  budget_per_phase: number;
  non_billable: number;
  tentative: number;
  locked_task_list: number;
  active: number;
  project_manager: number;
  all_pms_schedule: number;
  created: string;
  modified: string;
  rate_type: number;
  ext_calendar_count: number;
  people_ids: number[];
  start_date: string;
  end_date: string;
}
export interface Department {
  department_id: number;
  parent_id: number | null;
  name: string;
}
interface People {
  people_id: number,
  name: string,
  // auto_email: number,
  // employee_type:number,
  // active: number,
  // people_type_id: number,
  // tags: string[],
  // start_date: string,
  // created: string,
  // modified: string,
  // region_id: number,
  // managers: string[]
}

interface DataSlice {
  projects : Project[],
  departments: Department[],
  people : People[],
  isPeopleManager : boolean
}

const initialState : DataSlice = {
  projects: [], departments: [], people: [], isPeopleManager: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setProjects(state, action:PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setPeople(state, action:PayloadAction<People[]>) {
      state.people = action.payload;
    },
    setDepartments(state, action:PayloadAction<Department[]>) {
      state.departments = action.payload;
    },
    setPeopleManager(state, action:PayloadAction<boolean>) {
      state.isPeopleManager = action.payload;
    },

  },
});

export const {
  setProjects, setDepartments, setPeople, setPeopleManager,
} = dataSlice.actions;

export default dataSlice.reducer;
