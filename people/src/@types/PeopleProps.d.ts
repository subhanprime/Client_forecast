interface FloatUser {
  active: number;
  auto_email: number;
  created: string;
  employee_type: number;
  managers: number[];
  modified: string;
  name: string;
  people_id: number;
  people_type_id: number;
  projects: any[];
  region_id: number;
  start_date: string;
  tags: any[];
}

interface Projects {
  active: number;
  all_pms_schedule: number;
  budget_per_phase: number;
  budget_type: number;
  color: string;
  created: string;
  end_date: string;
  ext_calendar_count: number;
  locked_task_list: number;
  modified: string;
  name: string;
  non_billable: number;
  people_ids: number[];
  project_id: number;
  project_manager: number;
  rate_type: number;
  start_date: string;
  tags: any[];
  tentative: number;
}

interface SelectedPerson {
  created?: string;
  department_id?: number;
  employee_type: number;
  managers?: number[];
  modified?: string;
  name: string;
  people_id?: number;
  people_type_id?: number;
  projects: Projects[];
  region_id?: number;
  start_date: string;
  end_date?: string;
  account_type:number;
  email?: string;
  tags?: any[];
}

interface MemberModalProps {
  closeModal: () => void;
  isModalOpen : boolean;
  selected : SelectedPerson;
  isEdit : boolean;
}
interface PeopleModalProps {
  closeModal: () => void;
  isModalOpen : boolean;
  selected : SelectedPerson;
}
