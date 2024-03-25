import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import PeopleModal from './peopleModal';

describe('PeopleModal component', () => {
  const mockData = {
    // people_id: 18109425,
    // name: 'Mehmood Ali',
    // employee_type: 1,
    // start_date: '2023-01-01',
    // projects: [],
    isModalOpen: true,
    closeModal: jest.fn(),
    selected: {
      people_id: 18109425,
      name: 'Mehmood Ali',
      employee_type: 1,
      start_date: '2023-01-01',
      projects: [],
      account_type: 1,
    // Add other required properties for selected object
    },
    isEdit: true,
  };

  test('renders component and displays default tab content', async () => {
    const closeModal = jest.fn();
    render(<PeopleModal isModalOpen closeModal={closeModal} selected={mockData.selected} />);

    // Wait for data to be loaded
    await waitFor(() => {
      // Add your expectations based on your UI and the default tab content
      expect(screen.getByText('Department')).toBeInTheDocument(); // Adjust based on your actual UI
      expect(screen.getByText('Type')).toBeInTheDocument(); // Adjust based on your actual UI
    });
  });

  test('switches tabs and displays corresponding content', async () => {
    const closeModal = jest.fn();
    render(<PeopleModal isModalOpen closeModal={closeModal} selected={mockData.selected} />);
    const projectsTab = screen.getByText('Projects');
    fireEvent.click(projectsTab);
  });
});
