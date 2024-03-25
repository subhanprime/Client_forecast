import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PersonTableSlice } from './features/personSlice';
import { MetricSlice } from './features/metricSlice';
import { APISlice } from './features/apiSlice';
import { TableSlice } from './features/tableDataSlics';

export const store = configureStore({
  reducer: {
    person: PersonTableSlice.reducer,
    metrics: MetricSlice.reducer,
    apiSlice: APISlice.reducer,
    tableSlice: TableSlice.reducer,
  },
});

export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
