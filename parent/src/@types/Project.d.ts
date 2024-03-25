interface Milestone {
  name: string;
  from: Date | null;
  to: Date | null;
}
interface MetaTask {
  uuid:string,
  name:string,
  isBillable:boolean
}

interface Project {
  project_id: number;
  name: string;
  color: string;
  tags: string[];
  budget_type: number;
  budget_total?: string | number; // This property was missing in your original interface
  budget_per_phase: number;
  non_billable: number;
  tentative: number;
  locked_task_list: number;
  active: number;
  project_manager: number;
  all_pms_schedule: number;
  created?: string; // These properties were not present in the provided data
  modified: string;
  rate_type: number;
  ext_calendar_count: number;
  people_ids: number[];
  start_date?: string; // These properties were not present in the provided data
  end_date?: string;

  selectedBudget: string;
  client: string;
  milestones: Milestone[];
  isDifferentRate: string;
  isTentative: boolean;
  perHourRate: number;
  note: string;
  isBillable: boolean;

  metaTasks:MetaTask[]
}

interface ProjectTask extends Project {
  people:PeopleTasks[];
}

interface ProjectInfo {
  name: string;
  color: string;
}

type ProjectsMap = Map<number, ProjectInfo>;
type ProjectsAllMap = Map<number, Project>;
