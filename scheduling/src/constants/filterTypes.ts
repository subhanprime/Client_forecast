import { ViewType } from './enums';

export type ForeignFilteredData =
(PeopleType | Role | Department
| Tag | [number, Project] | [number, People]
| People | Project | Task);

export enum ForeignData {
  Tasks = 'tasks',
  Projects = 'projects',
  People = 'people',
  Roles = 'roles',
  Department = 'department',
  Tags = 'tags',
  ProjectOwner = 'projectOwner',
  Managers = 'managers',
  PeopleType = 'peopleType',
}

// Use ForeignData as an array
export const foreignDataArray: ForeignData[] = [
  ForeignData.Tasks,
  ForeignData.Projects,
  ForeignData.People,
  ForeignData.Roles,
  ForeignData.Department,
  ForeignData.Tags,
  ForeignData.ProjectOwner,
  ForeignData.Managers,
  ForeignData.PeopleType,
];

export type FilterDataMap = {
  [K in ForeignData]:ForeignFilteredData[];
};

export const initialFilterData:FilterDataMap = {
  [ForeignData.Tasks]: [],
  [ForeignData.Projects]: [],
  [ForeignData.People]: [],
  [ForeignData.Roles]: [],
  [ForeignData.Department]: [],
  [ForeignData.Tags]: [],
  [ForeignData.ProjectOwner]: [],
  [ForeignData.Managers]: [],
  [ForeignData.PeopleType]: [],
};

export interface FilterOption {
  name: string;
  foreignData: ForeignData,
  localData:string;
  localKey: string,
  foreignKey: string,
  isSpecialCase?:boolean;
  onBoth:'both' | ViewType,
  onFilter?:
  (people: PeopleTasks[], selected: ForeignFilteredData,
    included:boolean, project:ProjectTask[],
    view:'Schedule' | 'Project Plan') => PeopleTasks[] | ProjectTask[]
}
export interface FilterType {
  name: string;
  icon: (size?: number) => JSX.Element;
  color: string;
  filters: FilterOption[];
}

export interface SelectedFilter {
  // mainFilter:FilterType;
  fiterName: string;
  icon:(size?: number) => JSX.Element;
  color: string;
  filter:FilterOption,
  included:boolean
}
