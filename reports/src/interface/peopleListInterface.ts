interface People {
  [x: string]: any;
  people_id: number;
  name: string;
  email: string;
  auto_email: number;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: string[]; // Assuming tags is an array of strings
  start_date: string;
  created: string;
  modified: string;
  region_id: number;
  account_id: number;
  department_id: number;
  managers: any[]; // Assuming managers is an array, you might need a specific type for managers
}

export default People;
