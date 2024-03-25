const addTaskToArray = (per:PeopleTasks, newTask:Task) => {
  if (newTask.people_id === per.people_id
      || newTask.people_ids?.includes(per.people_id)) {
    per.tasks.push(newTask);
  }
  return per;
};
const updateTaskArray = (per:PeopleTasks, newTask:Task) => {
  if (newTask.people_id === per.people_id
      || newTask.people_ids?.includes(per.people_id)) {
    per.tasks = per.tasks.map((task) => {
      if (task.task_id === newTask.task_id) {
        return newTask;
      }
      return task;
    });
  }
  return per;
};
const deleteTaskArray = (per:PeopleTasks, id:string) => {
  per.tasks = per.tasks.filter((task) => {
    if (task.task_id === id) {
      return false;
    }
    return true;
  });

  return per;
};

// Example usage
export default {
  addTaskToArray,
  updateTaskArray,
  deleteTaskArray,
};
