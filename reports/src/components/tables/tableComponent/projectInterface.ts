interface Person {
  people_id: number;
  name: string;
  auto_email: number;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: string[];
  start_date: string;
  created: string;
  modified: string;
  region_id: number;
  department_id: number;
  managers: any[]; // You might want to define a proper interface for managers
}

export interface ProjectInterface {
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
  people: Person[];
}
export interface Hour {
  billable: boolean;
  hours: {
    future: number;
    scheduled: number;
  };
  id: number;
  name: string;
  person_id: number;
  phase_id: number;
  project_id: number;
  tentative: boolean;
  type: string;
  rate: number;
}

export interface ProjectData {
  [x: string]: any;
  manager: any;
  project_id: number;
  name: string;
  scheduled:number,
  billable:number,
  nonbillable:number,
  color: string;
  tags: any[]; // You may want to specify the type of items in the array more precisely
  budget_type: number;
  budget_per_phase: number;
  non_billable: number;
  tentative: number;
  locked_task_list: number;
  active: number;
  project_manager: number[];
  all_pms_schedule: number;
  created: string; // Assuming the date format is a string, adjust if it's a Date object
  modified: string; // Assuming the date format is a string, adjust if it's a Date object
  rate_type: number;
  ext_calendar_count: number;
  people_ids: number[];
  start_date: string; // Assuming the date format is a string, adjust if it's a Date object
  end_date: string; // Assuming the date format is a string, adjust if it's a Date object
  people?:any[]
}

// For table subrow
interface TableHour {
  billable: boolean;
  hours: {
    future: number;
    scheduled: number;
  };
  id: number;
  name: string;
  person_id: number;
  phase_id: number;
  project_id: number;
  tentative: boolean;
  type: string;
  rate: number;
}

interface TablePerson {
  people_id: number;
  name: string;
  auto_email: number;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: string[];
  start_date: string;
  created: string;
  modified: string;
  region_id: number;
  department_id: number;
  managers: any[]; // You may want to define a specific type for managers
  hours: TableHour[];
}

interface TableManager {
  people_id: number;
  name: string;
  email: string;
  avatar_file: string;
  auto_email: number;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: string[];
  start_date: string;
  modified: string;
  region_id: number;
  account_id: number;
  managers: any[]; // You may want to define a specific type for managers
}

export interface TableProject {
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
  people: TablePerson[];
  manager: TableManager;
}
