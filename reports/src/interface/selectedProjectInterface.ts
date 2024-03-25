export interface SelectedProject {
  project_id: number;
  name: string;
  color: string;
  tags: string[]; // or any other appropriate type
  budget_type: number;
  budget_per_phase: number;
  non_billable: number;
  tentative: number;
  locked_task_list: number;
  active: number;
  project_manager: number;
  all_pms_schedule: number;
  created: string; // or Date if you prefer
  modified: string; // or Date if you prefer
  rate_type: number;
  ext_calendar_count: number;
  people_ids: number[];
  start_date: string; // or Date if you prefer
  end_date: string; // or Date if you prefer
  manager: {
    people_id: number;
    name: string;
    email: string;
    job_title: string;
    role_id: number;
    auto_email: number;
    employee_type: number;
    active: number;
    people_type_id: number;
    tags: string[]; // or any other appropriate type
    start_date: string; // or Date if you prefer
    modified: string; // or Date if you prefer
    region_id: number;
    account_id: number;
    department_id: number;
    managers: any[]; // or define a manager interface if needed
  };
  people_id: number;
  scheduled: number;
  billable: number;
  nonbillable: number;
  billablepert: number;
  scheduledpercent: number;
  timeOff: number;
  projects: {
    billable: number;
    scheduled: number;
    nonbillable: number;
    billableperct: number;
    name: string;
    client: string;
  }[];
}
