import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slice/createProjectSlice';
import clientSlice from './slice/clientSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    clientSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
