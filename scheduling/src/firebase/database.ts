import {
  collection, getDocs, query, orderBy, doc, updateDoc, setDoc, deleteDoc,
} from 'firebase/firestore';
import { db } from './config';
import { FirebaseCollection } from '../constants';

export const fname = 'Database Func';

export const getCollection = async <T>(
  collName:FirebaseCollection): Promise<{ data: T[] }> => new Promise(
  async (resolve, reject) => {
    try {
      const q = query(collection(db, collName), orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      const data:T[] = [];
      querySnapshot.forEach((d) => {
        const temp:T = d.data() as T;
        if (temp) {
          data.push(temp);
        }
      });
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  },
);

export const updateProject = async (
  id:number,
  metatask:MetaTask[],
  peopleIds:number[],
): Promise<boolean> => new Promise(
  async (resolve, reject) => {
    try {
      const ref = doc(db, FirebaseCollection.Project, `${id}`);
      await updateDoc(ref, {
        metaTasks: metatask,
        people_ids: peopleIds,
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  },
);
export const updateTask = async (
  id:string,
  data:any,
): Promise<boolean> => new Promise(
  async (resolve, reject) => {
    try {
      const ref = doc(db, FirebaseCollection.Task, `${id}`);
      await updateDoc(ref, data);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  },
);
export const addTask = async (
  task:Task,
): Promise<boolean> => new Promise(
  async (resolve, reject) => {
    try {
      const ref = doc(db, FirebaseCollection.Task, task.task_id);
      await setDoc(ref, task);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  },
);
export const deleteTask = async (
  id:string,
): Promise<boolean> => new Promise(
  async (resolve, reject) => {
    try {
      const ref = doc(db, FirebaseCollection.Task, id);
      await deleteDoc(ref);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  },
);
