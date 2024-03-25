// Import necessary dependencies and the Signup component
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import Signup from './Signup';

// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// })); // Mock the router

describe('Signup component', () => {
  test('renders Signup component', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    // Check if the component renders successfully
    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
    // You can add more assertions based on your UI
  });

  test('updates state when input values change', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('First and last name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Work Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'secretpassword' } });

    // Check if the state is updated accordingly
    expect(screen.getByPlaceholderText('First and last name')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('Work Email')).toHaveValue('john@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('secretpassword');
  });

  test('submits form data when the form is submitted', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('First and last name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Work Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'secretpassword' } });

    // Simulate form submission
    fireEvent.submit(screen.getByTestId('login-form'));

    // You can add assertions based on your form submission logic
  });

  // Add more test cases based on your component functionality
});
