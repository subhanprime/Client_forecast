import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '@testing-library/jest-dom';

import moment from 'moment';
import { Provider } from 'react-redux';

import Navbar from './components/nav/Navbar';
import CalendarHeader from './components/calender/CalenderHeader';
import helpers from './utils/helpers';
import SidebarHeader from './components/sidebar/SidebarHeader';
import DateColumns from './components/calender/DateColumns';
import GridRow from './components/grid/GridRow';
import GridItem from './components/grid/GridItem';

import { setupStore, store } from './app/store';
import { renderWithProviders } from './utils/testUtils';
import Scheduling from './App';
import { changeContext, setSelectedDates } from './feature/calender/calenderSlice';
import { ContextSelectedType } from './constants';
import Schedule from './pages/Schedule/Schedule';

jest.setTimeout(20000);
test('renders GridRow component with person and projects', () => {
  const temp = helpers.getDaysInCurrentYear();
  const daysArrayMock = temp.daysArray;
  const daysArray = daysArrayMock;
  const person:PeopleTasks = {
    people_id: 18104395,
    name: 'Abdul Hadi',
    auto_email: -1,
    employee_type: 1,
    active: 1,
    people_type_id: 1,
    tags: [],
    start_date: '2023-01-01',
    created: '2023-10-30 06:40:09',
    modified: '2023-10-30 06:40:54',
    region_id: 86611,
    department_id: 16913892,
    managers: [],
    tasks: [
      {
        task_id: '763941720',
        project_id: 8806069,
        phase_id: 0,
        start_date: '2023-11-23',
        end_date: '2023-11-24',
        hours: 8,
        people_id: 18104395,
        people_ids: null,
        status: 'none',
        billable: true,
        name: '',
        notes: '',
        repeat_state: 0,
        created_by: 806829,
        modified_by: 0,
        created: '2023-11-20 13:14:29.552',
        modified: '2023-11-20 13:14:29.552',
        task_meta_id: 23076149,
        has_child: 0,
        priority: 0,
        priority_info: null,
        integration_status: 0,
      },
      {
        task_id: '747083945',
        project_id: 8806038,
        phase_id: 0,
        start_date: '2023-10-30',
        end_date: '2023-11-22',
        hours: 8,
        people_id: 18104395,
        people_ids: null,
        status: 'none',
        billable: true,
        name: '',
        notes: 'Fixing issues',
        repeat_state: 0,
        created_by: 806795,
        modified_by: 806795,
        created: '2023-10-30 06:58:01.403',
        modified: '2023-11-14 10:58:25.437',
        task_meta_id: 23076091,
        has_child: 0,
        priority: 0,
        priority_info: null,
        integration_status: 0,
      },
    ],
  };
  const projects = new Map([
    [
      8852090,
      {
        name: 'Salesbooster',
        color: '3451b2',
      },
    ],
    [
      8852061,
      {
        name: 'Krillpay',
        color: 'ecadd4',
      },
    ],
    [
      8816201,
      {
        name: 'Txend Website`',
        color: 'ed5f00',
      },
    ],
    [
      8816200,
      {
        name: 'Server Management',
        color: 'd24023',
      },
    ],
    [
      8809397,
      {
        name: 'Management',
        color: 'cbbda4',
      },
    ],
    [
      8806843,
      {
        name: 'ResearchPortal',
        color: '776750',
      },
    ],
    [
      8806180,
      {
        name: 'Discord',
        color: '067a6f',
      },
    ],
    [
      8806172,
      {
        name: 'Vacations',
        color: '173074',
      },
    ],
    [
      8806167,
      {
        name: 'Training',
        color: '0b752e',
      },
    ],
    [
      8806069,
      {
        name: 'Vacant Time',
        color: '706f6c',
      },
    ],
    [
      8806058,
      {
        name: 'OG',
        color: 'cbbda4',
      },
    ],
    [
      8806057,
      {
        name: 'Hypnosis',
        color: '5eb0ef',
      },
    ],
    [
      8806055,
      {
        name: 'CloudCRM',
        color: 'bfcbdc',
      },
    ],
    [
      8806052,
      {
        name: 'WealthManagement',
        color: '067a6f',
      },
    ],
    [
      8806051,
      {
        name: 'LyneUp',
        color: '067a6f',
      },
    ],
    [
      8806050,
      {
        name: 'MedSure',
        color: 'd3b4ed',
      },
    ],
    [
      8806049,
      {
        name: 'Foodie',
        color: '5eb0ef',
      },
    ],
    [
      8806046,
      {
        name: 'HealthCareGraduates',
        color: '3451b2',
      },
    ],
    [
      8806045,
      {
        name: 'CloneYourself',
        color: '2e5fe8',
      },
    ],
    [
      8806044,
      {
        name: 'Pendulum',
        color: '68ddfd',
      },
    ],
    [
      8806040,
      {
        name: 'TickPlunge',
        color: 'ffb224',
      },
    ],
    [
      8806038,
      {
        name: 'TeamedApp',
        color: '067a6f',
      },
    ],
    [
      8806034,
      {
        name: 'Pav and Broome',
        color: '5eb0ef',
      },
    ],
    [
      8806032,
      {
        name: 'WeatherRadar',
        color: 'cbbda4',
      },
    ],
    [
      8806031,
      {
        name: 'FEDPipeline',
        color: 'd3b4ed',
      },
    ],
    [
      8806030,
      {
        name: 'MedWrite',
        color: '344765',
      },
    ],
    [
      8806029,
      {
        name: 'GuideDoc',
        color: '34c754',
      },
    ],
    [
      8806028,
      {
        name: 'MSP',
        color: 'f7ce00',
      },
    ],
    [
      8805992,
      {
        name: 'JOP',
        color: 'd24023',
      },
    ],
  ]);
  const { getByTestId } = renderWithProviders(
    <GridRow
      daysArray={daysArray}
      person={person}
      projects={projects}
      scrolled={false}
      scrollPosition={{ top: 0, left: 0 }}
    />,
  );

  const gridRowElement = getByTestId('grid-row');
  const initialPosition = gridRowElement.style.transform;
  expect(initialPosition).toBeFalsy();

  expect(gridRowElement).toBeInTheDocument();
});

test('renders DateColumns component with daysArray', () => {
  store.dispatch(setSelectedDates({
    start: 33000,
    end: 33100,
    total: 1,
  }));
  const daysArray = [moment(), moment().add(1, 'day'), moment().add(2, 'days')];
  const { getByTestId } = renderWithProviders(<DateColumns daysArray={daysArray} />, { store });
  const dateColumnsElement = getByTestId('date-columns');
  expect(dateColumnsElement).toBeInTheDocument();
});

describe('GridItem', () => {
  const storeNew = setupStore();
  const mockTask:TaskSlot = {
    id: '54564',
    name: 'Test Task',
    taskName: 'Test Task',
    status: 'none',
    time: 2,
    x: 1,
    w: 2,
    h: 3,
    color: 'ff0000', // Assuming color is a hex code
    startDate: '2023-12-12',
    endDate: '2023-12-12',
    modifiedBy: 2434,
    modifiedDate: '2023-12-12',
    personName: 'Moeez',
  };
  const func1 = jest.fn();
  const func2 = jest.fn();
  const func3 = jest.fn();

  it('renders with the correct attributes', () => {
    const { container } = renderWithProviders(<GridItem
      task={mockTask}
      handleMouseEnter={func1}
      handleMouseLeave={func2}
      handleDelete={func3}
    />);
    const gridItem = container.querySelector('.grid-stack-item');

    expect(gridItem).toHaveAttribute('gs-id', '54564');

    if (gridItem) {
      const gridStackItemContent = gridItem.querySelector('.grid-stack-item-content');
      expect(gridStackItemContent).toHaveStyle({ backgroundColor: '#ff0000' });

      if (gridStackItemContent) {
        const gridItemContentChildren = Array.from(gridStackItemContent.children);
        expect(gridItemContentChildren).toHaveLength(2); // Assuming there are two children

        const nameElement = gridItemContentChildren[0];
        expect(nameElement).toHaveTextContent('Test Task');

        const timeElement = gridItemContentChildren[1];
        expect(timeElement).toHaveTextContent('2h'); // Assuming 'time' should be followed by 'h'
      }
    }
  });
  it('renders with the correct attributes and selects add', () => {
    storeNew.dispatch(changeContext(ContextSelectedType.Add));
    const { getByTestId } = renderWithProviders(<GridItem
      task={mockTask}
      handleMouseEnter={func1}
      handleMouseLeave={func2}
      handleDelete={func3}
    />, { store: storeNew });
    const gridItem = getByTestId('gridItemContent');

    if (gridItem) {
      fireEvent.click(gridItem);
    }
  });
  it('renders with the correct attributes and selects view', () => {
    storeNew.dispatch(changeContext(ContextSelectedType.View));
    const { getByTestId } = renderWithProviders(<GridItem
      task={mockTask}
      handleMouseEnter={func1}
      handleMouseLeave={func2}
      handleDelete={func3}
    />, { store: storeNew });
    const gridItem = getByTestId('gridItemContent');

    if (gridItem) {
      fireEvent.click(gridItem);
    }
  });
  it('renders with the correct attributes and selects delet', () => {
    storeNew.dispatch(changeContext(ContextSelectedType.Delete));
    const { getByTestId } = renderWithProviders(<GridItem
      task={mockTask}
      handleMouseEnter={func1}
      handleMouseLeave={func2}
      handleDelete={func3}
    />, { store: storeNew });
    const gridItem = getByTestId('gridItemContent');

    if (gridItem) {
      fireEvent.click(gridItem);
    }
  });
});

test('renders SidebarHeader component', async () => {
  const { getByText } = renderWithProviders(<SidebarHeader />);
  const sortButton = getByText(/Name/i);
  expect(sortButton).toBeInTheDocument();
});

test('clicking on sort button should trigger handleSelect function', async () => {
  const { getByText } = renderWithProviders(<SidebarHeader />);
  const sortButton = getByText(/Name/i);
  fireEvent.click(sortButton);

  await waitFor(() => {
    const sort = screen.getByText('Role');
    fireEvent.click(sort);
  });

  // Add assertions based on your component's behavior
  // Example:
});
test('side bar with selected dates ', async () => {
  store.dispatch(setSelectedDates({
    start: 33000,
    end: 33100,
    total: 1,
  }));
  const { getByText } = renderWithProviders(<SidebarHeader />, { store });
  const sortButton = getByText(/Name/i);
  expect(sortButton).toBeInTheDocument();

  await waitFor(() => {
    const sort = screen.getByText('Custom');
    expect(sort).toBeInTheDocument();

    fireEvent.click(sort);
  });
  await waitFor(() => {
    const sort = screen.getByText('This week');
    expect(sort).toBeInTheDocument();

    fireEvent.click(sort);
  });

  // Add assertions based on your component's behavior
  // Example:
});

test('renders CalendarHeader component with date headers', () => {
  const temp = helpers.getDaysInCurrentYear();
  const daysArrayMock = temp.weeksArray;
  const dateHeaders = daysArrayMock;

  const { getByTestId } = renderWithProviders(<CalendarHeader dateHeaders={dateHeaders} />);
  const calendarHeaderElement = getByTestId('calendar-header');
  expect(calendarHeaderElement).toBeInTheDocument();
});

test('selecting dates reseting dates ', async () => {
  const temp = helpers.getDaysInCurrentYear();
  const daysArrayMock = temp.weeksArray;
  const dateHeaders = daysArrayMock;
  store.dispatch(setSelectedDates({
    start: 33000,
    end: 33100,
    total: 1,
  }));

  const { getByTestId } = renderWithProviders(
    <CalendarHeader dateHeaders={dateHeaders} />,
    { store },
  );

  const calendarHeaderElement = getByTestId('calendar-header');
  expect(calendarHeaderElement).toBeInTheDocument();
});
test('selecting dates in CalendarHeader ', async () => {
  const temp = helpers.getDaysInCurrentYear();
  const daysArrayMock = temp.weeksArray;
  const dateHeaders = daysArrayMock;

  renderWithProviders(<CalendarHeader dateHeaders={dateHeaders} />);

  await waitFor(() => {
    const date = screen.getAllByText('Mon 2')[0];
    const date2 = screen.getAllByText('Tue 3')[0];
    expect(date).toBeInTheDocument();
    fireEvent.mouseDown(date);
    fireEvent.mouseMove(date2);
    setTimeout(() => {
      fireEvent.mouseUp(date2);
    }, 1000);
  });
});
test('selecting and cancelling dates in CalendarHeader ', async () => {
  const temp = helpers.getDaysInCurrentYear();
  const daysArrayMock = temp.weeksArray;
  const dateHeaders = daysArrayMock;

  renderWithProviders(<CalendarHeader dateHeaders={dateHeaders} />);

  await waitFor(() => {
    const date = screen.getAllByText('Mon 2')[0];
    const date2 = screen.getAllByText('Jan')[0];
    expect(date).toBeInTheDocument();
    fireEvent.mouseDown(date);
    fireEvent.mouseMove(date2);
    setTimeout(() => {
      fireEvent.mouseUp(date2);
    }, 1000);
  });
});

test('toggle isOpen state on button click', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Navbar />
    </Provider>,
  );
  const toggleButton = getByText(/Schedule/i);

  fireEvent.click(toggleButton);

  const dropdown = getByText(/Project Plan/i);
  expect(dropdown).toBeInTheDocument();
});

// Add more tests for other functionalities in Navbar component

test('renders  Schedule component', async () => {
  renderWithProviders(<Schedule />, { store });
});

test('renders Schedule component', async () => {
  const { getByTestId } = renderWithProviders(<Scheduling />);
  await waitFor(() => {
    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});

describe('getDaysInCurrentYear Utility', () => {
  test('returns the correct number of days, weeks, and days array', () => {
    const { weeksArray, daysInYear, daysArray } = helpers.getDaysInCurrentYear();
    expect(weeksArray).toHaveLength(53);
    expect(daysInYear).toBe(366);
    expect(daysArray).toHaveLength(366);
  });
});

describe('Types', () => {
  test('People interface', () => {
    const person: People = {
      people_id: 1,
      name: 'John Doe',
      auto_email: 1,
      employee_type: 2,
      active: 1,
      people_type_id: 3,
      tags: [{ name: 'tag1', id: 2 }],
      start_date: '2023-01-01',
      created: '2023-11-22',
      modified: '2023-11-22',
      region_id: 4,
      managers: [],
      department_id: 3244,
    };

    expect(person).toBeDefined();
  });

  test('PeopleTasks interface', () => {
    const personWithTasks: PeopleTasks = {
      people_id: 1,
      name: 'John Doe',
      auto_email: 1,
      employee_type: 2,
      active: 1,
      people_type_id: 3,
      tags: [{ name: 'tag1', id: 2 }],
      start_date: '2023-01-01',
      created: '2023-11-22',
      modified: '2023-11-22',
      region_id: 4,
      managers: [],
      department_id: 53456,
      tasks: [
        {
          task_id: '1',
          project_id: 2,
          phase_id: 3,
          start_date: '2023-01-01',
          end_date: '2023-01-02',
          hours: 4,
          people_id: 5,
          people_ids: null,
          status: 'none',
          billable: true,
          name: 'Sample Task',
          notes: 'Task notes',
          repeat_state: 8,
          created_by: 9,
          modified_by: 10,
          created: '2023-11-22',
          modified: '2023-11-23',
          task_meta_id: 11,
          has_child: 12,
          priority: 13,
          priority_info: null,
          integration_status: 14,
        },
      ],
    };

    expect(personWithTasks).toBeDefined();
  });
});

describe('Types', () => {
  test('Task interface', () => {
    const sampleTask: Task = {
      task_id: '1',
      project_id: 2,
      phase_id: 3,
      start_date: '2023-01-01',
      end_date: '2023-01-02',
      hours: 4,
      people_id: 5,
      people_ids: null,
      status: 'none',
      billable: true,
      name: 'Sample Task',
      notes: 'Task notes',
      repeat_state: 8,
      created_by: 9,
      modified_by: 10,
      created: '2023-11-22',
      modified: '2023-11-23',
      task_meta_id: 11,
      has_child: 12,
      priority: 13,
      priority_info: null,
      integration_status: 14,
    };

    expect(sampleTask).toBeDefined();
  });

  test('TaskSlot interface', () => {
    const sampleTaskSlot: TaskSlot = {
      id: '1',
      name: 'Task Slot',
      taskName: 'Test Task',
      status: 'none',
      color: '123abc',
      x: 2,
      w: 3,
      h: 4,
      time: 5,
      startDate: '2023-01-01',
      endDate: '2023-01-02',
      modifiedBy: 2434,
      modifiedDate: '2023-12-12',
      personName: 'Moeez',
    };

    expect(sampleTaskSlot).toBeDefined();
  });
});
