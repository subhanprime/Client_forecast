interface Task {
  task_id: string;
  project_id: number;
  phase_id: number;
  start_date: string;
  end_date: string;
  hours: number;
  people_id: number | null;
  people_ids: null | any[]; // You might want to define an interface for people_ids as well
  status: 'completed' | 'tentative' | 'none';
  billable: boolean;
  name: string;
  notes: string;
  repeat_state: number;
  created_by: number | string;
  modified_by: number;
  created: string;
  modified: string;
  task_meta_id: number | string | null;
  has_child: number;
  priority: number;
  priority_info: null | any; // You might want to define an interface for priority_info as well
  integration_status: number;
}

interface TaskSlot {
  id: string;
  taskName:string,
  status: 'completed' | 'tentative' | 'none',
  name: string;
  color: string;
  x: number;
  w: number;
  h: number;
  time: number;
  startDate: string;
  endDate: string;
  modifiedDate:string;
  modifiedBy:number;
  personName:string,
  y?:number;
}

// type TaskMap = Map<string, Task>;
type TaskMap = {
  [key:string] : Task
};
