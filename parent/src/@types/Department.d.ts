interface Department {
  department_id: number;
  parent_id: number | null;
  name: string;
}

type DepartmentMap = Map<number, Department>;
