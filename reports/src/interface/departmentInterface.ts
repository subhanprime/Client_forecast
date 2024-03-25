interface DepartmentInterface {
  [x: string]: any;
  map(arg0: (dept: { department_id: any; }) => { capacity: number; scheduled: number; billable: number; nonbillable: number; timeoff: number; overtime: number; schedulepercentage: number; people: never[]; department_id: any; }): any[];
  department_id: number;
  parent_id: number | null;
  name: string;
}

export default DepartmentInterface;
