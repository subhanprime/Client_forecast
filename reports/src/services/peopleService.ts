import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPeopleData } from '../redux/store/features/apiSlice';
import People from '../interface/peopleListInterface';
import PeopleFilter from '../interface/peopleFilterInterface';
import DepartmentInterface from '../interface/departmentInterface';
import Roles from '../interface/rolesInterface';
import Project from '../interface/projectInterface';
import { getCollection } from '../firebase/database';
import { FirebaseCollection } from '../constants/enums';
import Task from '../interface/taskInterface';
import { fakeFilterData } from '../helper/fakeTempData';

export const getPeopleData = async ():
Promise<People[]> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/people`);
    const { data } = await getCollection<People>(FirebaseCollection.People);
    resolve(data);
  } catch (e) {
    reject(e);
  }
});

export const getProjectData = async ():
Promise<Project[]> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/projects`);
    const { data } = await getCollection<Project>(FirebaseCollection.Project);
    resolve(data);
  } catch (e) {
    reject(e);
  }
});

// export const getPeopleFilterData = async ():
// Promise<PeopleFilter> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getPeopleFilterDataFake = async ():
Promise<PeopleFilter> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/date_filterend_date=12-01-2023&start_date=12-01-2023`);
    // resolve(data);
    const fakeData:any = fakeFilterData;
    resolve(fakeData);
  } catch (e) {
    reject(e);
  }
});

export const getDepartmentData = async ():
Promise<DepartmentInterface | DepartmentInterface[]> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/department`);
    const { data } = await getCollection<DepartmentInterface>(FirebaseCollection.Department);
    resolve(data);
  } catch (e) {
    reject(e);
  }
});

export const getRolesData = async ():
Promise<Roles[]> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/roles`);
    const { data } = await getCollection<Roles>(FirebaseCollection.Role);
    resolve(data);
  } catch (e) {
    reject(e);
  }
});

// export const getClientData = async ():
// Promise<Roles> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/client`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getTaskData = async ():
Promise<Task[] | Task> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/task`);
    // resolve(data);
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/new_task_float`);
    // console.log('DATA', data);
    const { data } = await getCollection<Task>(FirebaseCollection.Task);
    const checkStatus = (status:string) => {
      if (status === 'tentative') {
        return 3;
      }
      if (status === 'none') {
        return 2;
      }
      if (status === 'completed') {
        return 1;
      }
      return 0;
    };
    const convertedData = data.map((item: any) => {
      const taskObj = {
        val: item.name,
        ids: {
          [item.task_id]: {
            personIds: item.people_ids === null ? [item.people_id] : item.people_ids,
            projectId: item.project_id,
            phaseId: item.phase_id,
            billable: item.billable,
            // status: item.status === 'none' ? 2 : 0, // Assuming "tentative" corresponds to status 2, adjust as needed
            status: checkStatus(item.status),
          },
        },
      };
      return taskObj;
    });
    resolve(convertedData);
  } catch (e) {
    reject(e);
  }
});

export const getNewTaskFloat = async ():
Promise<Task[] | Task> => new Promise(async (resolve, reject) => {
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/new_task_float`);
    const { data } = await getCollection<Task>(FirebaseCollection.Task);
    resolve(data);
  } catch (e) {
    reject(e);
  }
});
