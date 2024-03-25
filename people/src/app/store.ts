import { configureStore } from '@reduxjs/toolkit';
import navSlice from '../features/nav/navSlice';
import dataSlice from '../features/data/dataSlice';

export const store = configureStore({
  reducer: {
    nav: navSlice,
    data: dataSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
