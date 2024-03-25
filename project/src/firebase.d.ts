declare module 'firebase/app' {
  export interface FirebaseOptions {
    // Add types for your Firebase config properties here
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    // ...other details
  }

  export interface FirebaseApp {
    // Add types for any additional properties or methods you might use
    // For example, if initializeApp returns a FirebaseApp with additional methods
  }
  interface Timestamp {
    toDate: () => Date;
  }

  export function initializeApp(options: FirebaseOptions, name?: string): FirebaseApp;
}
