interface Task {
  [x: string]: any;
  val: string;
  ids: {
    [key: string]: {
      personIds: number[];
      projectId: number;
      phaseId: number;
      billable: boolean;
      status: number;
    };
  };
}

export default Task;
