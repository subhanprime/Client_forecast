interface PeopleTag {
  name:string,
  id:number
}

interface People {
  people_id: number;
  name: string;
  email?: string;
  job_title?: string;
  role_id?: number;
  auto_email: number;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: PeopleTag[]; // Assuming tags is an array with no elements
  start_date?: string; // Make start_date optional
  modified?: string; // Make modified optional
  created?: string; // Make created optional
  region_id?: number; // Make region_id optional
  account_id?: number; // Make account_id optional
  department_id: number;
  managers: number[]; // You may need to replace 'any' with the actual type of managers
  default_hourly_rate?:any
}

interface PeopleTasks extends People {
  department?:string
  tasks:Task[]
}

type PeopleMap = Map<number, People>;
type PeopleTaskMap = Map<number, PeopleTasks>;

interface PeopleType {
  name: string;
  people_type_id: number;
}
