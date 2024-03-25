import React from 'react';
import { render } from '@testing-library/react';
import MainPage from '../pages/main';

// Mock the ProjectTable component
jest.mock('../components/projectTable', () => {
  return () => <div data-testid="project-table-mock"></div>;
});

test('renders MainPage with ProjectTable', () => {
  const { getByTestId } = render(<MainPage />);
  const projectTableElement = getByTestId('project-table-mock');
  
  expect(projectTableElement).toBeInTheDocument();
});
