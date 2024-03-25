interface Project {
  [x: string]: any;
  project_id: number;
  name: string;
  client_id: number;
  color: string;
  notes: string;
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
  notes_meta: any[]; // Define the type based on the actual structure
  people_ids: number[];
  start_date: string; // Change this to Date if it's always in a date format
  end_date: string; // Change this to Date if it's always in a date format
}

export default Project;
