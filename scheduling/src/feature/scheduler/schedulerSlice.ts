import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  peopleTypesData, SortOrder, SortType,
} from '../../constants';
import reduxHelpers from '../../utils/reduxHelpers';

interface SortPayload {
  data:'peopleTasks' | 'projectTasks', sortType:SortType, sortOrder:SortOrder
}
interface SchedulerSlice {
  initialized:boolean;
  tasks: TaskMap | null;
  projects: ProjectsAllMap | null;
  people: PeopleMap | null,
  peopleTasks:PeopleTasks[] | null;
  projectTasks: ProjectTask[] | null;
  roles: Role[] | null;
  department: Department[] | null;
  tags: Tag[] | null;
  projectOwner:People[] | null;
  managers:People[] | null;
  peopleType:PeopleType[] | null;
}
interface InitializeParams {
  tasks:Task[];
  people:People[];
  projects:Project[];
  roles:Role[];
  department:Department[]
  tags:Tag[]
}
const initialState :SchedulerSlice = {
  initialized: false,
  tasks: null,
  projects: null,
  people: null,
  peopleTasks: null,
  projectTasks: null,
  roles: null,
  department: null,
  tags: null,
  projectOwner: null,
  managers: null,
  peopleType: peopleTypesData,
};

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    initializeScheduler(state, action:PayloadAction<InitializeParams>) {
      const {
        projects, tasks, people, department,
      } = action.payload;
      const projectsMap = new Map(_.map(projects, (project) => [project.project_id, project]));
      // const tasksMap = new Map(_.map(tasks, (task) => [task.task_id, task]));
      const tasksMap = _.keyBy(tasks, 'task_id');
      const peopleMap = new Map(_.map(people, (person) => [person.people_id, person]));
      const accPeopleMap = new Map(_.map(people, (person) => [person.account_id, person]));
      const depMap = new Map(_.map(department, (dep) => [dep.department_id, dep]));

      const manIds = _.uniq(_.map(projects, 'project_manager'));
      const managerIds = _.uniq(_.flatMap(people, 'managers'));

      const projectOwner = _.compact(_.map(manIds, (id) => accPeopleMap.get(id)));
      const managers = _.compact(_.map(managerIds, (id) => accPeopleMap.get(id)));

      const schedData: PeopleTasks[] = _.map(people, (person: People) => {
        const personTasks = _.filter(
          tasks,
          (task: Task) => task.people_id === person.people_id
          || (_.isArray(task.people_ids) && _.includes(task.people_ids, person.people_id)),
        );

        const dep = depMap.get(person.department_id);

        return {
          ...person,
          tasks: personTasks,
          department: dep?.name,
        };
      });

      const projectsWithPeople: ProjectTask[] = _.map(projects, (project) => {
        const peopleTemp = _.filter(
          schedData,
          (sched) => _.includes(project.people_ids, sched.people_id),
        );
        const peopleNew = _.map(peopleTemp, (p) => (
          { ...p, tasks: _.filter(p.tasks, { project_id: project.project_id }) }));

        return { ...project, people: peopleNew };
      });

      state.people = peopleMap;
      state.projects = projectsMap;
      state.tasks = tasksMap;
      state.peopleTasks = schedData;
      state.projectTasks = projectsWithPeople;
      state.roles = action.payload.roles;
      state.department = department;
      state.tags = action.payload.tags;
      state.projectOwner = projectOwner;
      state.managers = managers;
      state.initialized = true;
    },

    sortData(state, action:PayloadAction<SortPayload>) {
      if (state.initialized) {
        const { sortOrder, sortType, data } = action.payload;
        const temp = _.orderBy(state[data], [sortType], [sortOrder]);
        state[data] = temp as any;
      }
    },
    addTaskState(state, action:PayloadAction<Task>) {
      const newTask = action.payload;
      if (state.tasks) {
        const task = { ...state.tasks, ...{ [newTask.task_id]: newTask } };
        state.tasks = task;
      }
      if (state.peopleTasks) {
        const newPeopleTasks = state.peopleTasks.map(
          (per) => reduxHelpers.addTaskToArray(per, newTask),
        );
        state.peopleTasks = newPeopleTasks;
      }
      if (state.projectTasks) {
        const projs = state.projectTasks.map((project) => {
          project.people = project.people.map(
            (per) => reduxHelpers.addTaskToArray(per, newTask),
          );
          return project;
        });
        state.projectTasks = projs;
      }
    },
    updateTaskState(state, action:PayloadAction<Task>) {
      const newTask = action.payload;
      if (state.tasks) {
        const task = { ...state.tasks, ...{ [newTask.task_id]: newTask } };
        state.tasks = task;
      }
      if (state.peopleTasks) {
        const newPeopleTasks = state.peopleTasks.map(
          (per) => reduxHelpers.updateTaskArray(per, newTask),
        );
        state.peopleTasks = newPeopleTasks;
      }
      if (state.projectTasks) {
        const projs = state.projectTasks.map((project) => {
          project.people = project.people.map(
            (per) => reduxHelpers.updateTaskArray(per, newTask),
          );
          return project;
        });
        state.projectTasks = projs;
      }
    },
    updateTaskStatebyId(state, action:PayloadAction<{ id:string, data:any }>) {
      const newTaskId = action.payload.id;
      const data = action.payload.data;
      if (state.tasks) {
        let tempTask = state.tasks[newTaskId];
        if (tempTask) {
          tempTask = { ...tempTask, ...data };
          const task = { ...state.tasks, ...{ [tempTask.task_id]: tempTask } };
          state.tasks = task;

          if (state.peopleTasks) {
            const newPeopleTasks = state.peopleTasks.map(
              (per) => reduxHelpers.updateTaskArray(per, tempTask),
            );
            state.peopleTasks = newPeopleTasks;
          }
          if (state.projectTasks) {
            const projs = state.projectTasks.map((project) => {
              project.people = project.people.map(
                (per) => reduxHelpers.updateTaskArray(per, tempTask),
              );
              return project;
            });
            state.projectTasks = projs;
          }
        }
      }
    },
    updateTasksStatebyIds(state, action:PayloadAction<{ id:string,
      data:any,
      deletePer:any,
      newPer:any }>) {
      const newTaskId = action.payload.id;
      const data = action.payload.data;
      const newPerId = action.payload.newPer;
      const deletePerId = action.payload.deletePer;
      if (state.tasks) {
        let tempTask = state.tasks[newTaskId];
        if (tempTask) {
          tempTask = { ...tempTask, ...data };
          const task = { ...state.tasks, ...{ [tempTask.task_id]: tempTask } };
          state.tasks = task;

          if (state.peopleTasks) {
            const newPeopleTasks = state.peopleTasks.map(
              (per) => {
                if (per.people_id === deletePerId) {
                  return reduxHelpers.deleteTaskArray(per, tempTask.task_id);
                }
                if (per.people_id === newPerId) {
                  return reduxHelpers.addTaskToArray(per, tempTask);
                }
                return reduxHelpers.updateTaskArray(per, tempTask);
              },
            );
            state.peopleTasks = newPeopleTasks;
          }
          if (state.projectTasks) {
            const projs = state.projectTasks.map((project) => {
              project.people = project.people.map(
                (per) => {
                  if (per.people_id === deletePerId) {
                    return reduxHelpers.deleteTaskArray(per, tempTask.task_id);
                  }
                  if (per.people_id === newPerId) {
                    return reduxHelpers.addTaskToArray(per, tempTask);
                  }
                  return reduxHelpers.updateTaskArray(per, tempTask);
                },
              );
              return project;
            });
            state.projectTasks = projs;
          }
        }
      }
    },
    deleteTaskState(state, action:PayloadAction<string>) {
      const id = action.payload;
      if (state.tasks) {
        const task = { ...state.tasks };
        delete task[id];
        state.tasks = task;
      }
      if (state.peopleTasks) {
        const newPeopleTasks = state.peopleTasks.map(
          (per) => reduxHelpers.deleteTaskArray(per, id),
        );
        state.peopleTasks = newPeopleTasks;
      }
      if (state.projectTasks) {
        const projs = state.projectTasks.map((project) => {
          project.people = project.people.map(
            (per) => reduxHelpers.deleteTaskArray(per, id),
          );
          return project;
        });
        state.projectTasks = projs;
      }
    },

  },
});

export const {
  initializeScheduler, sortData, addTaskState, updateTaskState,
  deleteTaskState, updateTaskStatebyId, updateTasksStatebyIds,
} = schedulerSlice.actions;
export default schedulerSlice.reducer;
