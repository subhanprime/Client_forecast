export enum SortType {
  Name = 'name',
  Role = 'job_title',
  Department = 'department',
}
export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}
export enum ContextSelectedType {
  Add = 'add',
  Delete = 'delete',
  View = 'view',
}
export enum FilterOperation {
  And = 'and',
  Or = 'or',
}

export enum ScrollDir {
  Today = 'today',
  Right = 'right',
  Left = 'left',
  None = 'none',
}

export enum ViewType {
  Schedule = 'Schedule',
  ProjectPlan = 'Project Plan',
}

export enum CalenderType {
  Days = 'Days',
  Weeks = 'Weeks',
  Months = 'Months',
}

export enum RowsType {
  Compact = 'Compact',
  Comfortable = 'Comfortable',
  Spacious = 'Spacious',
}

export enum Modals {
  Alloc = 'management',
  Task = 'taskDetails',
  Confirm = 'confirm',
  Email = 'emailSchedule',
  Export = 'exportCSV',
  Filter = 'saveFilter',
  Delete = 'deleteConfirm',
}

export enum DateRangeEnum {
  Next2 = 'Next 2 weeks',
  Next12 = 'Next 12 weeks',
  Next = 'Next week',
  Week = 'This week',
  Month = 'This month',
  Quarter = 'This quarter',
  Year = 'This year',
  LWeek = 'Last week',
  LMonth = 'Last month',
  LQuarter = 'Last quarter',
  LYear = 'Last year',
  Custom = 'Custom',
}

export enum SavedTypeEnum {
  All = 'all',
  Personal = 'personal',
  Shared = 'shared',
}
export enum OptionActions {
  Edit = 'edit',
  Delete = 'delete',
  Change = 'change',
}
export enum FirebaseCollection {
  People = 'people',
  Task = 'tasks',
  Project = 'projects',
  Role = 'roles',
  Department = 'departments',
  Tag = 'tags',
  Account = 'accounts',
}

export enum TaskStatus {
  Tentative = 'tentative',
  Completed = 'completed',
  None = 'none',
}
