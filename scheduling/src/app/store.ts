import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import calenderSlice from '../feature/calender/calenderSlice';
import { schedulerApi } from '../feature/schedulerApi/schedulerApiSlice';
import schedulerSlice from '../feature/scheduler/schedulerSlice';
import modalSlice from '../feature/modal/modalSlice';
import filterSlice from '../feature/filter/filterSlice';

const rootReducer = combineReducers({
  calender: calenderSlice,
  [schedulerApi.reducerPath]: schedulerApi.reducer,
  sheduler: schedulerSlice,
  modal: modalSlice,
  filter: filterSlice,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(schedulerApi.middleware),
    preloadedState,
  });
}

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
