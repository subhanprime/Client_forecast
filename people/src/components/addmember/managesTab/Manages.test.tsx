import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import Manages from './Manages';
import { store } from '../../../app/store';

// Mocking the useAppSelector hook
jest.mock('../../../app/hooks', () => ({
  useAppSelector: jest.fn(() => ({
    people: [
      { people_id: 1, name: 'Person 1' },
      { people_id: 2, name: 'Person 2' },
    ],
  })),
}));

describe('Manages Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Manages onClose={() => {}} />
      </Provider>,
    );
    expect(screen.getByTestId('mock-manages-select')).toBeInTheDocument();
  });

  it('handles selecting and removing people', async () => {
    render(
      <Provider store={store}>
        <Manages onClose={() => {}} />
      </Provider>,
    );
    const button = screen.getByText('Select People');
    fireEvent.click(button);

    // Verify that 'Person 1' is removed from the dropdown
    // expect(screen.queryByText('Person 1')).toBeNull();
  });

  // it('selects and removes people', () => {
  //   render(
  //     <Provider store={store}>
  //       <Manages onClose={() => {}} />
  //     </Provider>,
  //   );

  //   // Open dropdown and select a person
  //   fireEvent.click(screen.getByText('Select People'));
  //   fireEvent.click(screen.getByText('Person 1'));

  //   // Verify selected person
  //   expect(screen.getByText('Person 1')).toBeInTheDocument();

  //   // Remove selected person
  //   fireEvent.click(screen.getByTestId('mock-X-icon'));

  //   // Verify person is removed
  //   expect(screen.queryByText('Person 1')).not.toBeInTheDocument();
  // });

  // it('adds and invites a person', () => {
  //   // const onCloseMock = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <Manages onClose={() => {}} />
  //     </Provider>,
  //   );

  //   // Click "Add & invite person" button
  //   fireEvent.click(screen.getByText('Add & invite person'));

  //   // Your logic for adding and inviting a person should go here.
  //   // You can add assertions based on the expected behavior.
  // });

  // it('cancels the action', () => {
  //   const onCloseMock = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <Manages onClose={onCloseMock} />
  //     </Provider>,
  //   );

  //   // Click "Cancel" button
  //   fireEvent.click(screen.getByText('Cancel'));

  //   // Verify that onCloseMock has been called
  //   expect(onCloseMock).toHaveBeenCalled();
  // });
});
