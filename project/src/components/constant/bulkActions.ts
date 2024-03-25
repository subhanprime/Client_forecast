export interface ITagsFields {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface IBillType {
  isBillable: boolean | undefined;
  setIsBillable: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isTentative: boolean | undefined;
  setIsTentative: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
export interface IBudgetField {
  hoursByProject: number | undefined;
  setHoursByProject: React.Dispatch<React.SetStateAction<number | undefined>>;
  isDifferentRate: string | undefined;
  setIsDifferentRate: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedBudget: string | undefined;
  setSelectedBudget: React.Dispatch<React.SetStateAction<string | undefined>>;
  totalProjectHours: number | undefined;
  setTotalProjectHours: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface FilterDropDownProp {
  filterDropdownObj: IFilterDropdownObj;
  setFilterDropdownObj: React.Dispatch<React.SetStateAction<IFilterDropdownObj>>;
  // unSelectAllCheckBox: () => void;
}

export interface Milestone {
  name: string;
  from: Date | null;
  to: Date | null;
}

export interface UserDetails {
  name: string;
  price: number;
}
export interface Task {
  uuid: string,
  name: string,
  isBillable: boolean
  onlyMangersEdit?: boolean;
}
export interface ProjectObject {
  project_id: number;
  name: string;
  color?: string;
  tags: string[];
  selectedBudget: string;
  milestones: Milestone[];
  client: string;
  active?: boolean | number;
  isDifferentRate: string;
  isTentative: boolean;
  budget_total?: string | number;
  perHourRate: number;
  selectedUsers: UserDetails[] | null; //
  note: string;
  isBillable: boolean;
  metaTasks: Task[];
  totalProjectHour?: number;
  archived?: boolean,


  budget_per_phase?: number;
  locked_task_list?: number;
  project_manager?: number;
  all_pms_schedule?: number;
  created?: string;
  modified?: string;
  rate_type?: number;
  ext_calendar_count?: number;
  people_ids?: number[]; //
  start_date?: string;
  end_date?: string;
  uuid?: string;
  budget_type?: number;
  non_billable?: number
  tentative?: number;

}

export interface BulkEditorModalProps {
  isBulkEditOpen: boolean;
  onBulkEditClose: () => void;
  selectedRowsIds: number[];
  selectedUuidIds: ProjectObject[];
}


export interface UserDetails {
  name: string;
  price: number;
}

export interface ModalState {
  projects: ProjectObject[];
}

export interface RemoveProjectsPayload {
  ids: number[];
}

export interface UpdateBulkPayload {
  filteredObject: ProjectObject;
  selectedRowsIds: number[];
}

export interface RowData {
  id: number;
  project: string;
  client: string;
  budget: string;
  start: string;
  end: string;
  owner: string;
}

export interface IClients {
  clients: {
    name: string;
  }[];
}

export interface IFilterDropdownObj {
  archived: boolean;
  active: boolean;
  myProjects: boolean;
}

export interface ModalProps {
  isModelOpen: boolean;
  onClose: () => void;
  isForUpdate?: boolean;
  singleRecord?: ProjectObject
}

export interface UserDetails {
  name: string;
  price: number;
}
export interface HeaderCpProps {
  filterDropdownObj: IFilterDropdownObj;
}
