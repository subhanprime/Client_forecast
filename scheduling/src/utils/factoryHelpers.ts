import moment from 'moment';

export const createTaskSlots = (task:Task, projects:ProjectsMap, person:People) => {
  const project = projects.get(task.project_id);
  const startDate = moment(task.start_date).dayOfYear();
  const endDate = moment(task.end_date).dayOfYear();
  const totalDays = endDate - startDate;
  return {
    id: task.task_id,
    taskName: task.name,
    status: task.status,
    name: project?.name || '',
    color: project?.color || '',
    x: startDate - 1,
    w: totalDays === 0 ? 1 : totalDays + 1,
    h: task.hours,
    time: task.hours,
    startDate: task.start_date,
    endDate: task.end_date,
    modifiedBy: task.modified_by,
    modifiedDate: task.modified,
    personName: person.name,
  };
};

export const createSerializedTask = (item:TaskSlot) => ({
  x: item.x,
  h: item.h,
  w: item.w,
  y: item?.y,
  id: `${item.id}`,
  locked: true,
});
