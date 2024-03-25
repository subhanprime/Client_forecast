// interface LegacyTimeoff {
//   id: number;
//   holiday: boolean;
//   name: string;
//   people: Record<string, {
//     hours: number;
//     days: number;
//   }>;
// }

// export default LegacyTimeoff;

interface Person {
  people_id: number;
  name: string;
  email: string;
  auto_email: number;
  employee_type: number;
  active: number;
  people_type_id: number;
  tags: string[];
  start_date: string;
  created: string;
  modified: string;
  region_id: number;
  account_id: number;
  department_id: number;
  managers: any[]; // You might want to define a Manager interface here
  hours: number;
  days: number;
}

interface HolidayInterface {
  id: number;
  holiday: boolean;
  name: string;
  people: Person[];
  hours: number;
  day: number;
  days: number;
}
export default HolidayInterface;
