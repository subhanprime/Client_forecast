import {
  collection, getDocs, query,
} from 'firebase/firestore';
import { db } from './config';
import { FirebaseCollection } from '../constants/enums';

export const fname = 'Database Func';
export const getCollection = async <T>(
  collName:FirebaseCollection): Promise<{ data: T[] }> => new Promise(
  async (resolve, reject) => {
    try {
      const q = query(collection(db, collName));
      const querySnapshot = await getDocs(q);
      const data:T[] = [];
      querySnapshot.forEach((doc) => {
        const temp:T = doc.data() as T;
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
