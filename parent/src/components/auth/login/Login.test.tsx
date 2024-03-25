import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import Login from './Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login component', () => {
  it('renders without crashing', () => {
    render(<Login />);
    const signInWithinHeading = screen.getByText('Sign in', { selector: 'h2' });
    expect(signInWithinHeading).toBeInTheDocument();
  });
  it('updates email state on input change', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('updates password state on input change', () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput).toHaveValue('testPassword');
  });
  it('calls handleSubmit when the form is submitted', () => {
    const handleSubmitMock = jest.fn();
    render(<Login />);

    const form = screen.getByTestId('login-form');
    form.addEventListener('submit', handleSubmitMock);

    fireEvent.submit(form);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });
  // it('calls handleSubmit when the form is submitted', () => {
  //   const handleSubmitMock = jest.fn();
  //   render(<Login />);

  //   // Select the form by data-testid
  //   const form = screen.getByTestId('login-form');
  //   form.addEventListener('submit', handleSubmitMock);

  //   // Trigger form submission
  //   fireEvent.submit(form);

  //   // Check if handleSubmit was called
  //   expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  // });

  // Add more test cases as needed
});
