interface Fees {
  logged: number;
  scheduled: number;
}

interface Holidays {
  days: number;
  hours: number;
}

interface Logged {
  billable: number;
  nonbillable: number;
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

interface Timeoff {
  days: number;
  hours: number;
}

interface Unassigned {
  logged: number;
  scheduled: number;
}

export interface DataPoints {
  billable: number;
  capacity: number;
  date: string;
  fees: Fees;
  holidays: Holidays;
  logged: Logged;
  month: number;
  nonbillable: number;
  overtime: Overtime;
  tentative: Tentative;
  timeoff: Timeoff;
  unassigned: Unassigned;
  week: number;
}
