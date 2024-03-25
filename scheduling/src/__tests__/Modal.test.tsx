import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import { X } from 'lucide-react';
import Modal from '../components/modal/Modal';
import TaskDetailsModal from '../components/modal/TaskDetailsModal';
import EmailScheduleModal from '../components/modal/EmailScheduleModal';
import { renderWithProviders } from '../utils/testUtils';
import { setupStore } from '../app/store';
import { initializeScheduler } from '../feature/scheduler/schedulerSlice';
import {
  departmentData, peopleData, projectData, roleData, tagsData, tasksData,
} from '../constants';
import ExportCSVModal from '../components/modal/ExportCSVModal';
import SaveFilterModal from '../components/modal/SaveFilterModal';
import { SavedFilterTypeEnum, addSelectedFilterState } from '../feature/filter/filterSlice';
import DeleteConfirmationModal from '../components/modal/DeleteConfirmationModal';

const selectedFilter = {
  filter: {
    name: 'Manager', foreignData: 'managers' as any, onBoth: 'both', localData: 'people', localKey: 'managers', foreignKey: 'id',
  },
  filterName: 'person',
  color: '#CEE7FE',
  icon: (size = 12) => <X size={size} />,
  included: true,
  selectedItem: {
    people_id: 18123910, name: 'Abdul Moeez', email: 'abdul.moeez@txend.com', job_title: 'Developer', role_id: 233302, auto_email: -1, employee_type: 1, active: 1, people_type_id: 1, tags: [], start_date: '2023-01-01', default_hourly_rate: '0.0000', created: '2023-12-05 12:40:03', modified: '2023-12-05 13:25:59', region_id: 88616, account_id: 810890, department_id: 16915826, managers: [],
  },
  operation: 'and' as any,
};

describe('Modal Tests', () => {
  test('renders Modal component', () => {
    // Arrange
    const closeModalMock = jest.fn();

    // Act
    const { getByTestId } = render(
      <Modal visibility closeModal={closeModalMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>,
    );

    // Assert

    const modalContent = getByTestId('modal');
    expect(modalContent).toBeInTheDocument();
  });

  test('does not render Modal when visibility is false', () => {
    // Arrange
    const closeModalMock = jest.fn();

    // Act
    const { container } = render(
      <Modal visibility={false} closeModal={closeModalMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>,
    );

    // Assert
    expect(container.firstChild).toBeNull();
  });

  test('calls closeModal when clicking outside the modal content', () => {
    // Arrange
    const closeModalMock = jest.fn();

    // Act
    const { container } = render(
      <Modal visibility closeModal={closeModalMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>,
    );

    // Assert
    const overlay = container.firstChild;
    if (overlay) {
      fireEvent.click(overlay);
      expect(closeModalMock).toHaveBeenCalled();
    }
  });

  test('does not call closeModal when clicking inside the modal content', () => {
    // Arrange
    const closeModalMock = jest.fn();

    // Act
    const { getByTestId } = render(
      <Modal visibility closeModal={closeModalMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>,
    );

    // Assert
    const modalContent = getByTestId('modal-content');
    fireEvent.click(modalContent);
    expect(closeModalMock).not.toHaveBeenCalled();
  });

  describe('Task Details Modal', () => {
    const mockTask = {
      id: 1,
      name: 'Sample Task',
      color: '#ff0000',
      x: 0,
      w: 5,
      h: 8,
      time: 40,
      startDate: '2023-01-01',
      endDate: '2023-01-05',
      modifiedDate: '2023-01-10',
      modifiedBy: 1,
      personName: 'John Doe',
    };
    test('renders TaskDetailsModal component', () => {
      // Arrange
      const closeModalMock = jest.fn();

      // Act
      const { getByTestId } = render(
        <TaskDetailsModal visibility closeModal={closeModalMock} task={mockTask} />,
      );

      // Assert

      const taskName = getByTestId('task-name');
      expect(taskName).toHaveTextContent('Sample Task');
    });

    test('does not render TaskDetailsModal when visibility is false', () => {
      // Arrange
      const closeModalMock = jest.fn();

      // Act
      const { container } = render(
        <TaskDetailsModal visibility={false} closeModal={closeModalMock} task={mockTask} />,
      );

      // Assert
      expect(container.firstChild).toBeNull();
    });

    test('calls closeModal when clicking outside the modal content', () => {
      // Arrange
      const closeModalMock = jest.fn();

      // Act
      const { container } = render(
        <TaskDetailsModal visibility closeModal={closeModalMock} task={mockTask} />,
      );

      // Assert
      const overlay = container.firstChild;
      if (overlay) {
        fireEvent.click(overlay);
        expect(closeModalMock).toHaveBeenCalled();
      }
    });

    test('does not call closeModal when clicking inside the modal content', () => {
      // Arrange
      const closeModalMock = jest.fn();

      // Act
      const { getByText } = render(
        <TaskDetailsModal visibility closeModal={closeModalMock} task={mockTask} />,
      );

      // Assert
      const taskName = getByText('Sample Task');
      fireEvent.click(taskName);
      expect(closeModalMock).not.toHaveBeenCalled();
    });
  });
});

describe('EmailScheduleModal', () => {
  // Mock the Redux state
  const store = setupStore();
  store.dispatch(initializeScheduler({
    projects: projectData,
    tasks: tasksData,
    people: peopleData,
    department: departmentData,
    roles: roleData,
    tags: tagsData,
  }));
  it('renders correctly', () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const { getByText, getByTestId } = renderWithProviders(
      <EmailScheduleModal visibility closeModal={() => {}} />,
      { store }, // Pass the mock state as an initial state
    );

    // Verify that the component renders as expected
    expect(getByText('Email their schedule')).toBeInTheDocument();
    expect(getByTestId('date-range-picker')).toBeInTheDocument();
    expect(getByTestId('dropdown')).toBeInTheDocument();
    // Add more assertions as needed based on your component structure
  });
  it('renders and select person', async () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const { getByText, getByTestId } = renderWithProviders(
      <EmailScheduleModal visibility closeModal={() => {}} />,
      { store }, // Pass the mock state as an initial state
    );
    const dropdown = getByTestId('dropdown');

    // Verify that the component renders as expected
    expect(getByText('Email their schedule')).toBeInTheDocument();
    expect(getByTestId('date-range-picker')).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    // Add more assertions as needed based on your component structure

    fireEvent.click(dropdown);

    await waitFor(() => {
      const name = screen.getByText('Abdul Hadi');
      expect(name).toBeInTheDocument();
      fireEvent.click(name);
    });
    let el:HTMLElement | undefined;

    await waitFor(() => {
      const name = screen.getByText('Abdul Hadi');
      el = name;
      expect(name).toBeInTheDocument();
      const button = getByTestId('remove-person');
      fireEvent.click(button);
    });

    if (el) {
      await waitFor(() => {
        expect(el).not.toBeInTheDocument();
      });
    }
  });

  it('handles user interaction', () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    const { getByTestId } = renderWithProviders(
      <EmailScheduleModal visibility closeModal={closeModalMock} />,
      { store },
    );

    // Simulate user interactions (example: click a button)
    fireEvent.click(getByTestId('cancel-button'));

    // Verify that the expected function is called
    expect(closeModalMock).toHaveBeenCalled();
  });
});
describe('ExportScheduleModal', () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();

  // Mock the Redux state
  const store = setupStore();
  store.dispatch(initializeScheduler({
    projects: projectData,
    tasks: tasksData,
    people: peopleData,
    department: departmentData,
    roles: roleData,
    tags: tagsData,
  }));
  it('renders export modal', async () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <ExportCSVModal visibility closeModal={closeModalMock} />,
      { store },
    );
    const week = screen.getByText('Week');
    fireEvent.click(week);
    await waitFor(() => {
      const btn = screen.getByText('Export');
      fireEvent.click(btn);
    });
  });
  it('handles close export modal', () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <ExportCSVModal visibility closeModal={closeModalMock} />,
      { store },
    );

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Cancel'));

    // Verify that the expected function is called
    expect(closeModalMock).toHaveBeenCalled();
  });
  it('renders save view modal', () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <SaveFilterModal visibility closeModal={closeModalMock} />,
      { store },
    );

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Cancel'));

    // Verify that the expected function is called
    expect(closeModalMock).toHaveBeenCalled();
  });
  it('renders delete confirm modal', () => {
    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <DeleteConfirmationModal visibility closeModal={closeModalMock} onDelete={closeModalMock} type="yy" title="ttt" />,
      { store },
    );

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Cancel'));

    // Verify that the expected function is called
    expect(closeModalMock).toHaveBeenCalled();
    const delBTN = screen.getByTestId('delete-btn');
    fireEvent.click(delBTN);

    // Verify that the expected function is called
    expect(closeModalMock).toHaveBeenCalled();
  });
  it('renders save view modal', () => {
    store.dispatch(addSelectedFilterState(selectedFilter as any));
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <SaveFilterModal visibility closeModal={closeModalMock} />,
      { store },
    );

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Cancel'));

    // Verify that the expected function is called
    expect(closeModalMock).toHaveBeenCalled();
  });
  it('renders save view modal and submits with anything', async () => {
    store.dispatch(addSelectedFilterState(selectedFilter as any));
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <SaveFilterModal visibility closeModal={closeModalMock} />,
      { store },
    );

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Save View'));

    // Verify that the expected function is called
    await waitFor(() => {
      expect(screen.getByText('You must enter a name before saving')).toBeInTheDocument();
    });
  });
  it('renders save view modal and submits', async () => {
    store.dispatch(addSelectedFilterState(selectedFilter as any));
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <SaveFilterModal visibility closeModal={closeModalMock} />,
      { store },
    );

    const input = screen.getByPlaceholderText('Enter the name of View');

    fireEvent.change(input, { target: { value: '12' } });

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Save View'));
  });
  it('renders edit view modal and submits ', async () => {
    // Mock the necessary state for useAppSelector

    // Render the component with providers
    const closeModalMock = jest.fn();
    renderWithProviders(
      <SaveFilterModal
        visibility
        closeModal={closeModalMock}
        filter={{
          filter: [selectedFilter as any],
          name: 'yolo',
          type: SavedFilterTypeEnum.Personal,
        }}
      />,
      { store },
    );

    const input = screen.getByPlaceholderText('Enter the name of View');

    fireEvent.change(input, { target: { value: '12' } });

    // Simulate user interactions (example: click a button)
    fireEvent.click(screen.getByText('Save View'));
  });
});
