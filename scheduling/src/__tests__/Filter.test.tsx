// __tests__/Filter.test.js

import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/testUtils';
import Filter from '../components/filter/Filter';
import { setupStore } from '../app/store';
import { initializeScheduler } from '../feature/scheduler/schedulerSlice';
import {
  departmentData, peopleData, projectData, roleData, tagsData, tasksData,
  filters as sampleFilters,
  OptionActions,
  Modals,
  ViewType,
} from '../constants';
import Scheduler from '../components/scheduler/Scheduler';
import helpers from '../utils/helpers';
import {
  SavedFilterType,
  SavedFilterTypeEnum,
  SelectedFilterType,
  addSelectedFilterState, deleteSavedFilterState, deleteSelectedFilterState,
  setFilters, setSavedFilterState,
  setSelectedFilterState, updateSavedFilterState, updateSelectedFilterState,
} from '../feature/filter/filterSlice';
import { changeViewType } from '../feature/calender/calenderSlice';
import { openModal } from '../feature/modal/modalSlice';

describe('Filter component', () => {
  const store = setupStore();
  store.dispatch(initializeScheduler({
    projects: projectData,
    tasks: tasksData as Task[],
    people: peopleData,
    roles: roleData,
    department: departmentData,
    tags: tagsData,
  }));
  const sheduler = store.getState().sheduler;
  const {
    filters, selectedFilter, savedFilter, selectedSavedFilter,
  } = store.getState().filter;

  // For filters
  const resetFilters = () => {
    store.dispatch(setFilters(sampleFilters));
  };

  const clearSelectedFilters = () => {
    store.dispatch(setSelectedFilterState([]));
  };
  const updateSelectedFilter = (index:number, data:SelectedFilterType) => {
    store.dispatch(updateSelectedFilterState({ filter: data, index }));
  };
  const addSelectedFilter = (data:SelectedFilterType) => {
    store.dispatch(addSelectedFilterState(data));
  };
  const deleteSelectedFilter = (index:number) => {
    store.dispatch(deleteSelectedFilterState(index));
  };

  const onSaveFilter = () => {
    store.dispatch(openModal({ isOpen: true, name: Modals.Filter }));
  };
  const onSetSavedFilter = (filter:SavedFilterType) => {
    store.dispatch(setSavedFilterState(filter));
  };
  const onSavedFilterActions = (optionAction:OptionActions, filter:SavedFilterType) => {
    if (optionAction === OptionActions.Edit) {
      store.dispatch(openModal({ isOpen: true, name: Modals.Filter, filter }));
    } else if (optionAction === OptionActions.Change) {
      store.dispatch(updateSavedFilterState(
        {
          filter: {
            ...filter,
            type: filter.type === SavedFilterTypeEnum.Personal
              ? SavedFilterTypeEnum.Shared : SavedFilterTypeEnum.Personal,
          },
          name: filter.name,
        },
      ));
    } else if (optionAction === OptionActions.Delete) {
      store.dispatch(openModal({
        isOpen: true,
        name: Modals.Delete,
        onDelete: () => {
          store.dispatch(deleteSavedFilterState(filter.name));
        },
        type: 'View',
        title: filter.name,
      }));
    }
  };

  it('renders without crashing', () => {
    const { getByTestId } = renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    // You can add more specific tests here based on your component's behavior
    expect(getByTestId('filter')).toBeInTheDocument();
  });

  it('opens the filter on button click', async () => {
    const { getByTestId } = renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(getByTestId('Search')).toBeInTheDocument();
    });
  });

  it('applies department filter', async () => {
    renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    const departmentFilter = screen.getByText('Department');
    fireEvent.click(departmentFilter);
    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument();
    });
  });
  it('applies person filter', async () => {
    renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    const personFilter = screen.getByText('Person');
    fireEvent.click(personFilter);
    await waitFor(() => {
      expect(screen.getByText('Abdul Hadi')).toBeInTheDocument();
    });
    await waitFor(() => {
      const button = screen.getByText('is not');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getByText('is');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
  });

  it('handles search input', async () => {
    renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Ab' } });
    await waitFor(() => {
      expect(screen.getAllByText('Abdul Hadi')[0]).toBeInTheDocument();
    });
    const button2 = screen.getByText('Person');
    fireEvent.click(button2);
  });
  it('handles selected filters opening', async () => {
    renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'en' } });
    await waitFor(() => {
      const button = screen.getByText('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getByText('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getAllByText('Department')[0];
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('filter-included');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('handles search input', async () => {
    renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Ab' } });
    await waitFor(() => {
      expect(screen.getAllByText('Abdul Hadi')[0]).toBeInTheDocument();
    });
    const button2 = screen.getByText('Person');
    fireEvent.click(button2);
  });
  it('handles selected filters opening', async () => {
    renderWithProviders(<Filter
      sheduler={sheduler}
      filters={filters}
      selectedFilter={selectedFilter}
      savedFilter={savedFilter}
      selectedSavedFilter={selectedSavedFilter}
      resetFilters={resetFilters}
      clearSelectedFilters={clearSelectedFilters}
      addSelectedFilter={addSelectedFilter}
      updateSelectedFilter={updateSelectedFilter}
      deleteSelectedFilter={deleteSelectedFilter}
      onSaveFilter={onSaveFilter}
      onSetSavedFilter={onSetSavedFilter}
      onSavedFilterActions={onSavedFilterActions}
    />, { store });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'en' } });
    await waitFor(() => {
      const button = screen.getByText('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getByText('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    await waitFor(() => {
      const button = screen.getAllByText('Department')[0];
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('filter-included');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers generic handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Department');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers person tag handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Person tag');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Dev');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers managers handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
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
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers project owner handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Project Owner');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Abdul Moeez');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers projects handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Project');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Child Radar');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers generic handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    store.dispatch(changeViewType(ViewType.Schedule));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Department');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });

    await waitFor(() => {
      store.dispatch(changeViewType(ViewType.ProjectPlan));

      const filterButton1 = screen.getByText('Filter');
      fireEvent.click(filterButton1);
    });

    await waitFor(() => {
      const button = screen.getByText('Department');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Engineering');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });

  it('testing filters handlers person tag handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();

    store.dispatch(setSelectedFilterState([]));
    store.dispatch(changeViewType(ViewType.Schedule));
    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Person tag');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Dev');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
    await waitFor(() => {
      store.dispatch(changeViewType(ViewType.ProjectPlan));

      const filterButton1 = screen.getByText('Filter');
      fireEvent.click(filterButton1);
    });
    await waitFor(() => {
      const button = screen.getByText('Person tag');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Dev');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });

  it('testing filters handlers managers handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    store.dispatch(changeViewType(ViewType.Schedule));

    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
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
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });

    await waitFor(() => {
      store.dispatch(changeViewType(ViewType.ProjectPlan));

      const filterButton1 = screen.getByText('Filter');
      fireEvent.click(filterButton1);
    });
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
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });

  it('testing filters handlers project owner handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    store.dispatch(changeViewType(ViewType.Schedule));

    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Project Owner');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Abdul Moeez');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });

    await waitFor(() => {
      store.dispatch(changeViewType(ViewType.ProjectPlan));

      const filterButton1 = screen.getByText('Filter');
      fireEvent.click(filterButton1);
    });

    await waitFor(() => {
      const button = screen.getByText('Project Owner');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Abdul Moeez');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
  it('testing filters handlers project handler', async () => {
    const { weeksArray, daysArray, daysInYear } = helpers.getDaysInCurrentYear();
    store.dispatch(setSelectedFilterState([]));
    store.dispatch(changeViewType(ViewType.Schedule));

    const { getByTestId } = renderWithProviders(
      <div>
        <Filter
          sheduler={sheduler}
          filters={filters}
          selectedFilter={selectedFilter}
          savedFilter={savedFilter}
          selectedSavedFilter={selectedSavedFilter}
          resetFilters={resetFilters}
          clearSelectedFilters={clearSelectedFilters}
          addSelectedFilter={addSelectedFilter}
          updateSelectedFilter={updateSelectedFilter}
          deleteSelectedFilter={deleteSelectedFilter}
          onSaveFilter={onSaveFilter}
          onSetSavedFilter={onSetSavedFilter}
          onSavedFilterActions={onSavedFilterActions}
        />
        <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      </div>,
      { store },
    );
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      const button = screen.getByText('Project');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    await waitFor(() => {
      const button = getByTestId('Child Radar');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
    // await waitFor(() => {
    //   const button = getByTestId('close-filter');
    //   expect(button).toBeInTheDocument();
    //   fireEvent.click(button);
    // });
  });
});
