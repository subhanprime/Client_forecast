import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ClientFields from '../components/bulkEditHandler/clientFields';

describe('ClientFields component', () => {
  const initialState = {
    clientSlice: {
      clients: [
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
      ],
    },
  };
  const mockStore = configureStore();
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders ClientFields component', () => {
    const { getByText, getByDisplayValue } = render(
      <Provider store={store}>
        <ClientFields client="Client 1" setClient={jest.fn()} />
      </Provider>
    );

    expect(getByText('Client')).toBeInTheDocument();
    expect(getByDisplayValue('Client 1')).toBeInTheDocument();
  });

  it('populates dropdown options correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ClientFields client="" setClient={jest.fn()} />
      </Provider>
    );

    const dropdown = getByTestId('client-dropdown');

    expect(dropdown).toHaveTextContent('Choose one ...');
    expect(dropdown).toHaveTextContent('Client 1');
    expect(dropdown).toHaveTextContent('Client 2');
  });

  it('triggers change event on selecting an option', () => {
    const setClient = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <ClientFields client="" setClient={setClient} />
      </Provider>
    );

    const dropdown = getByTestId('client-dropdown');

    fireEvent.change(dropdown, { target: { value: 'Client 2' } });

    expect(setClient).toHaveBeenCalledWith('Client 2');
  });
});
