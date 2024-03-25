import { initializeApp, FirebaseApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getFirestore, Firestore } from 'firebase/firestore';

// interface FirebaseConfig {
//   apiKey: string;
//   authDomain: string;
//   projectId: string;

// }
const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

};

console.log('firebaseConfig', process.env, firebaseConfig);

const app = initializeApp(firebaseConfig);

// Get Firestore instance from the initialized app
const firestore: Firestore = getFirestore();

export default firestore;
