// interface SubRow {
//   id: number;
//   timeoff: string | number;
//   billable: number;
//   nonbillable: number;
//   scheduled: number;
//   person: string;
//   department: string;
//   overtime: string;
//   capacity: string;
//   scheduledpercent: string;
// }

// interface PeopleTableInterface {
//   id: number;
//   timeoff: number;
//   billable: number;
//   nonbillable: number;
//   overtime?: number;
//   scheduled: number;
//   person: string;
//   department: string;
//   capacity: string;
//   scheduledpercent: number;
//   chart: number;
//   subRows: SubRow[];
// }
// export default PeopleTableInterface;

interface Project {
  project_id: number;
  name: string;
  color: string;
  notes?: string;
  tags: any[]; // You can replace 'any' with the actual type of tags if needed
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
  notes_meta?: any[]; // You can replace 'any' with the actual type if needed
  people_ids: number[];
  start_date: string;
  end_date: string;
  people_id: number;
  scheduled: number;
  billable: number;
  nonbillable: number;
}

interface PeopleTableInterface {
  people_id: number;
  name: string;
  email: string;
  auto_email: number;
  job_title?: string;
  role_id?:number;
  avatar_file?:string;
  default_hourly_rate?:string;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: any[]; // You can replace 'any' with the actual type of tags if needed
  start_date: string;
  created: string;
  modified: string;
  region_id: number;
  account_id: number;
  department_id: number;
  managers: any[]; // You can replace 'any' with the actual type if needed
  department: string;
  capacity: number;
  overtime?: number;
  projects: Project[];
  scheduled: number;
  billable: number;
  nonbillable: number;
  scheduledpercent: number;
}
export default PeopleTableInterface;
