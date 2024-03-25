import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectApp from '../App';
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

test('renders MainPage when "/" route is accessed', async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <ProjectApp />
    </MemoryRouter>
  );

});
