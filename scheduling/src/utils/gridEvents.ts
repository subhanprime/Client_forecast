// gridCallbacks.ts

import { GridItemHTMLElement, GridStack, GridStackNode } from 'gridstack';
import moment, { Moment } from 'moment';
import toast from 'react-hot-toast';
import { DateRange } from 'react-day-picker';
import { updateTask } from '../firebase';
import { updateTaskStatebyId, updateTasksStatebyIds } from '../feature/scheduler/schedulerSlice';
import { store } from '../app/store';
import helpers from './helpers';

const updateTaskDate = async (id:string, x:number, w:number) => {
  const startDate = moment().dayOfYear(x + 1).format('YYYY-MM-DD');
  const endDate = moment().dayOfYear(x + w).format('YYYY-MM-DD');
  const data = {
    start_date: startDate,
    end_date: endDate,
  };
  try {
    await updateTask(id, data);
    store.dispatch(updateTaskStatebyId({ id, data }));
    toast.success('Task updated!!');
  } catch (error) {
    toast.error('Error updating task!');
  }
};
const updateTaskWithData = async (id:string, data:any) => {
  try {
    await updateTask(id, data);
    store.dispatch(updateTaskStatebyId({ id, data }));
    toast.success('Task updated!!');
  } catch (error) {
    toast.error('Error updating task!');
  }
};

const updateTaskPerson = async (newId:string, oldId:string, taskId:string, x:number, w:number) => {
  const tasks = store.getState().sheduler.tasks;
  const startDate = moment().dayOfYear(x + 1).format('YYYY-MM-DD');
  const endDate = moment().dayOfYear(x + w).format('YYYY-MM-DD');
  if (!tasks) {
    return;
  }
  const task = tasks[taskId];
  if (!task) {
    return;
  }
  let peopleId:any[] | any = task.people_id ? task.people_id : task.people_ids;
  const deleteId = +oldId;
  if (Array.isArray(peopleId)) {
    peopleId = peopleId.filter((pep) => pep !== (+oldId));
    peopleId.push(+newId);
  } else {
    peopleId = +newId;
  }

  const data = {
    people_id: Array.isArray(peopleId) ? null : peopleId,
    people_ids: Array.isArray(peopleId) ? peopleId : null,
    start_date: startDate,
    end_date: endDate,
  };
  try {
    await updateTask(taskId, data);
    store.dispatch(updateTasksStatebyIds({
      id: taskId, data, deletePer: deleteId, newPer: +newId,
    }));
    toast.success('Task updated!!');
  } catch (error) {
    toast.error('Error updating task!');
  }
};

export const handleDrag = (el: GridItemHTMLElement, daysArray: Moment[]): void => {
  if (el) {
    const temp = el.getAttribute('gs-x');
    if (!temp) {
      return;
    }

    const x = +temp;

    const col = daysArray[x].day();

    if (col === 0 || col === 6) {
      const placeholder = document.querySelector('.grid-stack-placeholder');
      if (!placeholder) {
        return;
      }
      placeholder.setAttribute('gs-x', `${col === 6 ? x + 2 : x + 1}`);
    }
  }
};

export const handleDragStop = (
  el: GridItemHTMLElement,
  daysArray: Moment[],
  itemsRef: React.MutableRefObject<TaskSlot[] | null>,

): void => {
  const temp = el.getAttribute('gs-x');
  const [temp1, temp2, id] = [el.getAttribute('gs-y'), el.getAttribute('gs-w'), el.getAttribute('gs-id')];
  const items = itemsRef.current;
  if (!temp || !temp1) {
    return;
  }
  const { people, tasks, peopleTasks } = store.getState().sheduler;
  if (!people || !tasks || !id) {
    return;
  }
  const task = tasks[id];
  if (!task) {
    return;
  }

  let x = +temp;
  let w = temp2 ? +temp2 : 1;
  const col = daysArray[x].day();
  const wideCol = daysArray[x + w - 1].day();
  let canUpdateW = true;
  let canUpdateX = true;
  let selectedItem:TaskSlot | null = null;

  if (task.people_ids && task.people_ids.length > 1) {
    const tempWW = w > 1 ? w : 0;
    const dateRange = {
      from: moment().dayOfYear(x + 1).toDate(),
      to: moment().dayOfYear(x + tempWW).toDate(),
    };
    const names = helpers.checkForDuplicationTimings(
      task.people_ids,
      dateRange as DateRange,
      peopleTasks as PeopleTasks[],
      task.task_id,
    );
    if (names.length > 0) {
      const startDate = moment(task.start_date).dayOfYear();
      const endDate = moment(task.end_date).dayOfYear();
      const totalDays = endDate - startDate;

      el.setAttribute('gs-w', `${totalDays === 0 ? 1 : totalDays + 1}`);
      el.setAttribute('gs-x', `${startDate - 1}`);
      toast.error('Task assigned to multiple people who already have tasks scheduled at new date');

      return;
    }
  }

  if (el && w > 2 && (wideCol === 0 || wideCol === 6)) {
    if (items) {
      items.forEach((item) => {
        if (id && item.id === id) {
          selectedItem = item;
        }
        if (item.x <= x + w + 2) {
          canUpdateW = false;
        }
      });
    }
    if (canUpdateW) {
      w += 2;
      el.setAttribute('gs-w', `${w}`);
    } else if (selectedItem && 'w' in selectedItem) {
      el.setAttribute('gs-w', `${(selectedItem as TaskSlot).w}`);
    }
  }

  if (el && (col === 0 || col === 6)) {
    if (items) {
      const tempx = col === 6 ? x + 2 : x + 1;
      items.forEach((item) => {
        if (id && item.id === id) {
          selectedItem = item;
        }
        if (item.x <= tempx) {
          canUpdateX = false;
        }
      });
    }
    if (canUpdateX) {
      x = col === 6 ? x + 2 : x + 1;
      el.setAttribute('gs-x', `${x}`);
    } else if (selectedItem && 'x' in selectedItem) {
      el.setAttribute('gs-x', `${(selectedItem as TaskSlot).x}`);
    }
  }
  if (x && w && id) {
    updateTaskDate(id, x, w);
  } else {
    toast.error('Error updating task, please refresh!');
  }
};

export const handleResizeStop = (
  el: GridItemHTMLElement,
  daysArray: Moment[],
  items: TaskSlot[],
): void => {
  if (el) {
    const temp = el.getAttribute('gs-w') || '1';
    const temp1 = el.getAttribute('gs-h') || '1';
    const id = el.getAttribute('gs-id');
    if (!temp || !id) {
      return;
    }
    const selecteditem = items.filter((item) => item.id === id)[0];
    if (!selecteditem) {
      return;
    }
    let w = +temp;
    const h = +temp1;
    const col = daysArray[w + selecteditem.x - 1].day();
    if (col === 0 || col === 6) {
      w = w ? col === 6 ? w - 1 : w - 2 : selecteditem.w;
      el.setAttribute('gs-w', `${w}`);
    }
    if (w !== selecteditem.w || h !== selecteditem.h) {
      const endDate = moment().dayOfYear(selecteditem.x + w).format('YYYY-MM-DD');
      const data = {
        end_date: endDate,
        hours: h,
      };
      updateTaskWithData(id, data);
    }
  }
};

export const handleElDropped = (
  previousWidget: GridStackNode,
  newWidget: GridStackNode,
) => {
  const oldX = newWidget.x;
  const oldId = previousWidget.id;
  const oldgrid = previousWidget.grid;
  const newgrid = newWidget.grid;
  const newgridItems = newWidget.grid?.getGridItems();
  const oldW = newWidget.w || 1;
  const oldEl = previousWidget.el;

  const { people, tasks, peopleTasks } = store.getState().sheduler;
  if (!people || !tasks || !oldId) {
    return;
  }
  const task = tasks[oldId];
  if (!task) {
    return;
  }

  if (task.people_ids && task.people_ids.length > 1 && oldX && oldW) {
    const dateRange = {
      from: moment().dayOfYear(oldX + 1).toDate(),
      to: moment().dayOfYear(oldX + oldW).toDate(),
    };
    const names = helpers.checkForDuplicationTimings(
      task.people_ids,
      dateRange as DateRange,
      peopleTasks as PeopleTasks[],
      task.task_id,
    );
    if (names.length > 0 && oldEl && oldgrid) {
      const startDate = moment(task.start_date).dayOfYear();
      const endDate = moment(task.end_date).dayOfYear();
      const totalDays = endDate - startDate;

      oldEl.setAttribute('gs-w', `${totalDays === 0 ? 1 : totalDays + 1}`);
      oldEl.setAttribute('gs-x', `${startDate - 1}`);
      oldgrid.addWidget(oldEl);

      toast.error('Task assigned to multiple people who already have tasks scheduled at new date');
      return;
    }
  }

  if (oldX && oldW && newgridItems) {
    const sameItems = newgridItems.filter((item) => {
      const x = item.getAttribute('gs-x');
      const id = item.getAttribute('gs-id');
      if (x && (oldX <= +x) && ((oldX + oldW) >= +x) && (id !== oldId)) {
        return true;
      }
      return false;
    });
    if (sameItems.length > 0 && oldEl && oldgrid && previousWidget.x) {
      oldEl.setAttribute('gs-x', `${previousWidget.x}`);
      oldgrid.addWidget(oldEl);
      // i had added the logic to remove the element after adding it back to the old item grid
      // but turns out it gets removed automatically, so keeping this in mind i'll have to
      // add api calls here like this
    } else if (oldgrid?.el && newgrid?.el) {
      const oldperId = oldgrid.el.getAttribute('data-id');
      const newperId = newgrid.el.getAttribute('data-id');
      if (oldperId && newperId && oldId) {
        updateTaskPerson(newperId, oldperId, oldId, oldX, oldW);
      }
    }
  }
};

export const onMouseEnter = (id:string, gridRef:GridStack | null) => {
  if (gridRef) {
    // return;
    gridRef.getGridItems().forEach((item:GridItemHTMLElement) => {
      const idi = item.getAttribute('gs-id');
      if (idi && (id === idi) && gridRef) {
        gridRef.update(item, {
          locked: false,
          noMove: false,
          noResize: false,
        });
      }
    });
  }
};
export const onMouseLeave = (id:string, gridRef:GridStack | null) => {
  if (gridRef) {
    // return;
    gridRef.getGridItems().forEach((item:GridItemHTMLElement) => {
      const idi = item.getAttribute('gs-id');
      if (idi && (id === idi) && gridRef) {
        gridRef.update(item, {
          locked: true,
          noMove: true,
          noResize: true,
        });
        // called.current = true;
      }
    });
  }
};
