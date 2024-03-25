import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import projectReducer from '../redux/slice/createProjectSlice';
import clientSlice from '../redux/slice/clientSlice';

interface RenderWithProvidersOptions {
  initialState?: Record<string, any>; // Modify the type according to your initial state shape
}

export function renderWithProviders(
  ui: React.ReactElement,
  { initialState = {} }: RenderWithProvidersOptions = {}
) {
  const rootReducer = combineReducers({
    projects: projectReducer,
    clientSlice,
  });

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
    store,
  };
}
