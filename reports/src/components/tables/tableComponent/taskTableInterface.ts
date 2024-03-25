interface Hours {
  future: number;
  scheduled: number;
}

interface Person {
  billable: number;
  hours: Hours;
  id: number;
  name: string;
  person_id: number;
  phase_id: number;
  project_id: number;
  tentative: boolean;
  type: string;
  rate: number;
  nonbillable: number;
  scheduled: number;
  billableperct: number;
}

export interface TaskTableData {
  name: string;
  scheduled: number;
  billable: number;
  nonbillable: number;
  people: Person[];
  billableperct: number;
}
