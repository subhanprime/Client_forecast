interface Fees {
  logged: number;
  scheduled: number;
}

interface Holidays {
  days: number;
  hours: number;
}

interface Overtime {
  logged: number;
  scheduled: number;
}

interface Tentative {
  billable: number;
  nonbillable: number;
  timeoff: number;
}

interface PeopleTimeOff {
  [key: number]: {
    hours: number;
    days: number;
  };
}

interface Datapoint {
  billable: number;
  capacity: number;
  date: string;
  fees: Fees;
  holidays: Holidays;
  logged: {
    billable: number;
    nonbillable: number;
  };
  month: number;
  nonbillable: number;
  overtime: Overtime;
  tentative: Tentative;
  timeoff: Holidays;
  unassigned: {
    logged: number;
    scheduled: number;
  };
  week: number;
}

interface Origin {
  billable: number;
  capacity: number;
  fees: Fees;
  holidays: Holidays;
  logged: {
    billable: number;
    nonbillable: number;
  };
  nonbillable: number;
  overtime: Overtime;
  tentative: Tentative;
  timeoff: Holidays;
  unassigned: {
    logged: number;
    scheduled: number;
  };
}

interface LegacyCapacity {
  [key: number]: number;
}

interface ProjectBudget {
  type: number;
  budget: any; // You might want to define a more specific type for budget
}

interface LegacyBudgets {
  projects: {
    [key: number]: ProjectBudget;
  };
  phases: Record<string, never>;
}

interface LegacyOvertime {
  [key: number]: {
    future: number;
    logged: number;
    total: number;
  };
}

interface LegacyTimeOff {
  id: number;
  holiday: boolean;
  name: string;
  people: PeopleTimeOff;
}

interface LegacyTotal {
  billable: boolean;
  hours: {
    future: number;
    scheduled: number;
  };
  id: number;
  name: string;
  person_id: number;
  phase_id: number;
  project_id: number;
  tentative: boolean;
  type: string;
  rate: number;
}

interface PeopleFilter {
  [x: string]: any;
  datapoints: Datapoint[];
  origin: Origin;
  'legacy.capacity': LegacyCapacity;
  'legacy.budgets': LegacyBudgets;
  'legacy.overtime': LegacyOvertime;
  'legacy.timeoff': LegacyTimeOff[];
  'legacy.totals': LegacyTotal[];
}

// interface YourData {
//   chart: Chart;
// }
export default PeopleFilter;
