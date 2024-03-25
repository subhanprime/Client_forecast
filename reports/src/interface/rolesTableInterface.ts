interface Person {
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
  modified: string; // or Date if you prefer
  department_id: number;
  managers: any[]; // or define a manager interface if needed
  capacity: number;
  scheduled: number;
  billable: number;
  nonbillable: number;
  timeoff: number;
  overtime: number;
  schedulepercentage: number;
}

export interface RolesTable {
  id: number;
  name: string;
  created: string; // or Date if you prefer
  modified: string; // or Date if you prefer
  created_by: any; // or define a creator interface if needed
  modified_by: any; // or define a modifier interface if needed
  capacity: number;
  scheduled: number;
  billable: number;
  nonbillable: number;
  timeoff: number;
  overtime: number;
  schedulepercentage: number;
  people: Person[];
}
