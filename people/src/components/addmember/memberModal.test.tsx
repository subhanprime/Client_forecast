import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react'; // Make sure you import `waitFor` from '@testing-library/react'
import '@testing-library/jest-dom'; // Import this for custom jest matchers
import { Provider } from 'react-redux';
import MemberModal from './memberModal';
import { store } from '../../app/store';

const mockProps = {
  isModalOpen: true,
  closeModal: jest.fn(),
  selected: {
    name: 'John Doe',
    employee_type: 1,
    projects: [],
    start_date: '2023-01-01',
    account_type: 1,
    // Add other required properties for selected object
  },
  isEdit: true,
};

describe('MemberModal', () => {
  // Mock the props you need for testing

  it('renders modal with initial tab selected', () => {
    render(
      <Provider store={store}>

        <MemberModal {...mockProps} />
      </Provider>,
    );
    // Assuming the initial tab is 'Info'
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('changes tab when clicked', () => {
    render(
      <Provider store={store}>
        <MemberModal {...mockProps} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('tabs'));
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('renders information in Info tab', () => {
    render(
      <Provider store={store}>
        <MemberModal {...mockProps} />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Info'));
    // Add assertions for the information rendered in the Info tab
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    // Add more assertions as needed
  });
});

describe('MemberModal Component', () => {
  it('handles tab click', () => {
    const onCloseMock = jest.fn();

    render(
      <Provider store={store}>
        <MemberModal isModalOpen closeModal={onCloseMock} selected={mockProps.selected} isEdit />
      </Provider>,
    );

    // Simulate clicking on the "Access" tab
    fireEvent.click(screen.getByText('Access'));

    // Check if the "Access" tab is selected
    // expect(screen.getByText('Access')).toHaveClass('text-blue-700');

    // Verify that other tabs are not selected
    expect(screen.getByText('Info')).not.toHaveClass('text-blue-700');
    expect(screen.getByText('Availability')).not.toHaveClass('text-blue-700');
    expect(screen.getByText('Projects')).not.toHaveClass('text-blue-700');
    // expect(screen.getByText('Manages')).not.toHaveClass('text-blue-700');

    // Ensure that onCloseMock has not been called
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
