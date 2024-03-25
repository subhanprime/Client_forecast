interface Account {
  account_id: number;
  name: string;
  email: string;
  timezone: string | null;
  avatar: string;
  account_type: number;
  access: number;
  department_filter: any[]; // You might need to replace this with the actual type
  department_filter_id: number | null;
  view_rights: number;
  edit_rights: number;
  budget_rights: number;
  active: number;
  created: string;
  modified: string;
  management_group: {
    people: number[];
    departments: any[];
  } | null;
  accepted: number;
}
