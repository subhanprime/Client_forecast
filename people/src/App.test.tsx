import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PeopleApplication from './App';
import { store } from './app/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useAppDispatch: jest.fn(),
}));

test('renders PeopleApplication component', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <PeopleApplication />
    </Provider>,
  );

  // You can add more specific assertions based on your actual UI
  expect(getByTestId('navbar')).toBeInTheDocument();
  expect(getByTestId('all-people')).toBeInTheDocument();
});
