import {
  collection, getDocs, query, orderBy,
} from 'firebase/firestore';
import { db } from './config';
import { FirebaseCollection } from '../enum/Enums';

export const fname = 'Database Func';

export const getCollection = async <T>(
  collName:FirebaseCollection): Promise<{ data: T[] }> => new Promise(
  async (resolve, reject) => {
    try {
      const q = query(collection(db, collName), orderBy('name', 'asc'));
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
