import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectApp from '../components/navbar';
import { renderWithProviders } from '../utils/tet-utils';

// Mock BrowserRouter to avoid nested routers
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Route: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.setTimeout(10000);

test('renders MainPage when "/" route is accessed', async () => {
  const filterDropdownObj = {
    active: true,
    archived: false,
    myProjects: false,
  };
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <ProjectApp filterDropdownObj={filterDropdownObj} />
    </MemoryRouter>
  );

  const initialProjectCount = screen.getByText(/Project/i);
  expect(initialProjectCount).toHaveTextContent('Project');

  expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

  const plusIcon = screen.getByAltText('plus icon');
  fireEvent.click(plusIcon);

  // await waitFor(() => {
  //   expect(screen.getByTestId('modal')).toBeInTheDocument();
  // }, { timeout: 10000 });

  // fireEvent.click(plusIcon);

  // await waitFor(() => {
  //   expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  // });

});
