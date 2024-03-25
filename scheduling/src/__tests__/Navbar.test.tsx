import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { X } from 'lucide-react';
import Navbar from '../components/nav/Navbar';
import { setupStore, store } from '../app/store';
import Loading from '../components/loading/Loading';
import { renderWithProviders } from '../utils/testUtils';
import { initializeScheduler } from '../feature/scheduler/schedulerSlice';
import {
  departmentData, peopleData, projectData, roleData, tagsData, tasksData,

} from '../constants';
import {
  SavedFilterTypeEnum, addSelectedFilterState,
} from '../feature/filter/filterSlice';
import SaveFilter from '../components/filter/SaveFilter';

const mockDispatch = jest.fn();
jest.mock('../app/hooks', () => ({
  ...jest.requireActual('../app/hooks'),
  useAppDispatch: () => mockDispatch,
}));

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

describe('Navbar component', () => {
  const storeNew = setupStore();
  storeNew.dispatch(initializeScheduler({
    projects: projectData,
    tasks: tasksData,
    people: peopleData,
    roles: roleData,
    department: departmentData,
    tags: tagsData,
  }));

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
  });

  test('renders Loading component', () => {
    const { container } = render(<Loading />);
    const loader = container.querySelector('#loader');

    // Assert that the loader element is present
    expect(loader).toBeInTheDocument();
  });

  test('handles scroll left', async () => {
    // const mockDispatch = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const navigateLeftButton = getByTestId('navigateLeft');
    fireEvent.click(navigateLeftButton);
    // Add assertions based on the expected behavior
    await waitFor(async () => {
      await expect(mockDispatch).toHaveBeenCalledWith({ payload: 'left', type: 'calender/scrollCalender' });
    });
  });

  test('handles scroll right', async () => {
    // const mockDispatch = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const navigateRightButton = getByTestId('navigateRight');
    fireEvent.click(navigateRightButton);
    // Add assertions based on the expected behavior
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ payload: 'right', type: 'calender/scrollCalender' });
    });
  });

  test('handles scroll today', async () => {
    // const dispatch = jest.fn();
    // (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    // Mock the useAppDispatch hook

    const { getByText } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const todayButton = getByText('Today');

    fireEvent.click(todayButton);
    // Add assertions based on the expected behavior
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ payload: 'today', type: 'calender/scrollCalender' });
    });
  });

  test('handles view change', async () => {
    // const dispatch = jest.fn();
    // (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    // Mock the useAppDispatch hook

    const { getByText } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const schedButton = getByText('Schedule');

    fireEvent.click(schedButton);
    // Add assertions based on the expected behavior
    await waitFor(() => {
      const proj = getByText('Project Plan');
      expect(proj).toBeInTheDocument();
      fireEvent.click(proj);
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ payload: 'Project Plan', type: 'calender/changeViewType' });
    });
  });

  test('handles view change', async () => {
    // const dispatch = jest.fn();
    // (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    // Mock the useAppDispatch hook

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const add = getByTestId('add-button');

    fireEvent.click(add);
    // Add assertions based on the expected behavior
    await waitFor(() => {
      const proj = getByText('Alocation Time');
      expect(proj).toBeInTheDocument();
      fireEvent.click(proj);
    });
  });
  test('handles filters', async () => {
    // const dispatch = jest.fn();
    // (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    // Mock the useAppDispatch hook

    const { getByTestId } = renderWithProviders(
      <Navbar />,
      { store: storeNew },
    );
    const save = getByTestId('saved-filters');
    fireEvent.click(save);

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Manager');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Abdul Moeez');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
  });
  test('handles selected filters', async () => {
    storeNew.dispatch(addSelectedFilterState(
      selectedFilter as any,
    ));

    const { getByTestId } = renderWithProviders(
      <Navbar />,
      { store: storeNew },
    );

    await waitFor(() => {
      const saved = getByTestId('save-filter');
      expect(saved).toBeInTheDocument();

      fireEvent.click(saved);
    });

    const save = getByTestId('saved-filters');
    fireEvent.click(save);
    // await waitFor(() => {
    //   const button = getByTestId('close-all-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  test('handles saved filters', async () => {
    const savedFil = [{
      filter: selectedFilter as any,
      name: 'yolo filter',
      type: SavedFilterTypeEnum.Shared,
    }];

    const { getByTestId } = renderWithProviders(
      <SaveFilter
        setIsOpen={() => {}}
        handleOpen={() => {}}
        isOpen
        onSavedFilterActions={() => {}}
        onSetSavedFilter={() => {}}
        selectedSavedFilter={null}
        savedFilter={savedFil}

      />,
    );

    const save = getByTestId('saved-filters');
    fireEvent.click(save);
    await waitFor(() => {
      const button = screen.getByText('yolo filter');
      expect(button).toBeInTheDocument();
    });
    await waitFor(() => {
      const button = getByTestId('menu-buttons');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getByText('shared');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getByText('personal');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
  });
  test('renders saved filters', async () => {
    const { getByTestId } = renderWithProviders(
      <SaveFilter
        setIsOpen={() => {}}
        handleOpen={() => {}}
        isOpen
        onSavedFilterActions={() => {}}
        onSetSavedFilter={() => {}}
        selectedSavedFilter={null}
        savedFilter={[]}

      />,
    );

    const save = getByTestId('saved-filters');
    fireEvent.click(save);
  });
  test('renders saved filters and closes', async () => {
    const { getByTestId } = renderWithProviders(
      <div>
        <div data-testid="test" />
        <SaveFilter
          setIsOpen={() => {}}
          handleOpen={() => {}}
          isOpen
          onSavedFilterActions={() => {}}
          onSetSavedFilter={() => {}}
          selectedSavedFilter={null}
          savedFilter={[]}

        />
      </div>,
    );

    const save = getByTestId('saved-filters');
    const test = getByTestId('test');
    fireEvent.click(save);
    await waitFor(() => {
      expect(screen.getByText('Create your first View by adding a filter, then clicking “Save”')).toBeInTheDocument();
      fireEvent.click(test);
    });
  });
});
