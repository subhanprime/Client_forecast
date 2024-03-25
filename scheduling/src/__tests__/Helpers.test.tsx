import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import helpers from '../utils/helpers';
import reduxHelpers from '../utils/reduxHelpers';
import { ScrollDir } from '../constants';

describe('Helpers', () => {
  test('getDaysInCurrentYear returns expected result', () => {
    const result = helpers.getDaysInCurrentYear();

    // Perform assertions based on the expected structure of the result
    expect(result).toHaveProperty('weeksArray');
    expect(result).toHaveProperty('daysInYear');
    expect(result).toHaveProperty('daysArray');
  });

  test('sortAndAssignY sorts nodes and assigns y attribute correctly', () => {
    const nodes:TaskSlot[] = [
      {
        id: '1', name: 'Task 1', taskName: 'ddsasd', status: 'none', color: 'blue', x: 1, w: 10, h: 5, time: 123456, startDate: '2023-01-01', endDate: '2023-01-05', modifiedDate: '2023-01-01', modifiedBy: 1, personName: 'John', y: 0,
      },
      {
        id: '2', name: 'Task 2', taskName: 'ddsasd', status: 'none', color: 'red', x: 2, w: 15, h: 10, time: 654321, startDate: '2023-01-02', endDate: '2023-01-12', modifiedDate: '2023-01-02', modifiedBy: 2, personName: 'Jane', y: 5,
      },
      // Add more nodes as needed
    ];

    const sortedAndAssigned = helpers.sortAndAssignY(nodes);

    // Perform assertions based on the expected result
    // Check if nodes are sorted based on x attribute
    for (let i = 1; i < sortedAndAssigned.length; i++) {
      expect(sortedAndAssigned[i].x).toBeGreaterThanOrEqual(sortedAndAssigned[i - 1].x);
    }

    // Check if y attribute is assigned correctly
    for (let i = 1; i < sortedAndAssigned.length; i++) {
      expect(sortedAndAssigned[i].y).toBeGreaterThanOrEqual(sortedAndAssigned[i - 1].y as number);
    }
  });

  test('scrollHandler updates scroll positions correctly', () => {
    const scrollPositions = { current: { left: 0, top: 0 } };
    const setScrolled = jest.fn();

    const target = document.createElement('div');
    target.scrollLeft = 100;
    target.scrollTop = 50;

    const event = { target } as unknown as Event;

    helpers.scrollHandler(event, scrollPositions, setScrolled);

    // Perform assertions based on the expected behavior
    expect(scrollPositions.current.left).toBe(100);
    expect(scrollPositions.current.top).toBe(50);
    expect(setScrolled).toHaveBeenCalledWith(true); // Assuming horizontal scroll
  });

  test('handlenNavigation scrolls element and dispatches action correctly', async () => {
    const dispatch = jest.fn();
    const ref = { current: document.createElement('div') } as React.MutableRefObject<HTMLElement>;

    // Mocking scroll method
    Object.defineProperty(ref.current, 'scroll', { value: jest.fn() });

    helpers.handlenNavigation(ref, dispatch, ScrollDir.Right, 100);

    // Wait for the asynchronous scroll behavior to complete
    await waitFor(() => {
      // Perform assertions based on the expected behavior
      expect(ref.current.scroll).toHaveBeenCalledWith({ left: expect.any(Number), behavior: 'smooth' });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'calender/scrollCalender',
        payload: 'none',
      });
    });
  });

  test('handleUpdateScroll scrolls element and updates scroll positions correctly', () => {
    const setScrollSet = jest.fn();
    const ref = { current: document.createElement('div') } as React.MutableRefObject<HTMLElement>;
    const scrollPositions = { current: { left: 0, top: 0 } };

    // Mocking element.scroll method
    Object.defineProperty(ref.current, 'scroll', { value: jest.fn() });

    // Mocking moment to return a specific day of the year
    const today = (moment().dayOfYear() * 100) - 200;

    helpers.handleUpdateScroll(ref, setScrollSet, scrollPositions);

    // Perform assertions based on the expected behavior
    expect(ref.current.scroll).toHaveBeenCalledWith({ left: today, behavior: 'smooth' });

    expect(setScrollSet).toHaveBeenCalledWith(true);
  });
});

describe('People functions', () => {
  let samplePeople: PeopleTasks;
  const task:Task = {
    hours: 8,
    phase_id: 0,
    end_date: '2024-01-05',
    created: '2024-01-08T06:27:18.355Z',
    integration_status: 0,
    name: '',
    has_child: 0,
    start_date: '2024-01-01',
    modified_by: 0,
    priority_info: null,
    created_by: 810890,
    priority: 0,
    people_ids: [
      18123910,
      18123912,
    ],
    modified: '2024-01-08T06:27:18.355Z',
    project_id: 8903636,
    task_id: '776695711',
    billable: true,
    task_meta_id: null,
    repeat_state: 0,
    people_id: null,
    notes: '',
    status: 'tentative',
  };

  beforeEach(() => {
    // Create a sample PeopleTasks object for testing
    samplePeople = {
      role_id: 233302,
      default_hourly_rate: '0.0000',
      email: 'abdul.moeez@txend.com',
      account_id: 810890,
      modified: '2023-12-07 13:19:44',
      people_type_id: 1,
      start_date: '2023-01-01',
      created: '2023-12-05 12:40:03',
      job_title: 'Developer',
      name: 'Abdul Moeez',
      tags: [
        {
          name: 'Dev',
          id: 1,
        },
      ],
      managers: [],
      auto_email: -1,
      people_id: 18123910,
      department_id: 16915826,
      employee_type: 1,
      active: 1,
      region_id: 88616,
      tasks: [
        {
          hours: 8,
          has_child: 0,
          task_meta_id: 24044427,
          priority_info: null,
          start_date: '2024-01-15',
          billable: true,
          repeat_state: 0,
          task_id: '789327880',
          people_id: 18123910,
          people_ids: null,
          integration_status: 0,
          created: '2023-12-22 07:35:34.438',
          status: 'none',
          name: '',
          created_by: 810890,
          modified_by: 0,
          modified: '2023-12-22 07:35:34.438',
          notes: '',
          priority: 0,
          phase_id: 0,
          end_date: '2024-01-19',
          project_id: 8903636,
        },
      ],
      department: 'Engineering',
    };
  });

  describe('addTaskToArray', () => {
    it('should add a new task to the tasks array', () => {
      const newTask = task;
      const result = reduxHelpers.addTaskToArray(samplePeople, newTask);

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks[1]).toEqual(newTask);
    });

    it('should not add a new task if people_id does not match', () => {
      const newTask = { ...task, people_ids: [] };
      const result = reduxHelpers.addTaskToArray(samplePeople, newTask);

      expect(result.tasks).toHaveLength(1);
    });
  });

  describe('updateTaskArray', () => {
    it('should update an existing task in the tasks array', () => {
      // Assuming there is an existing task in the tasks array
      const existingTask = task;
      samplePeople.tasks.push(existingTask);

      const updatedTask = task;
      const result = reduxHelpers.updateTaskArray(samplePeople, updatedTask);

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks[1]).toEqual(updatedTask);
    });

    it('should not update a task if task_id does not match', () => {
      // Assuming there is an existing task in the tasks array
      const existingTask = task;
      samplePeople.tasks.push(existingTask);

      const updatedTask = { ...task, task_id: 'djllkadsjkl' };
      const result = reduxHelpers.updateTaskArray(samplePeople, updatedTask);

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks[1]).toEqual(existingTask);
    });
  });

  describe('deleteTaskArray', () => {
    it('should delete an existing task from the tasks array', () => {
      // Assuming there is an existing task in the tasks array
      const existingTask = task;
      samplePeople.tasks.push(existingTask);

      const result = reduxHelpers.deleteTaskArray(samplePeople, '776695711');

      expect(result.tasks).toHaveLength(1);
    });

    it('should not delete a task if task_id does not match', () => {
      // Assuming there is an existing task in the tasks array
      const existingTask = task;
      samplePeople.tasks.push(existingTask);

      const result = reduxHelpers.deleteTaskArray(samplePeople, 'task456');

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks[1]).toEqual(existingTask);
    });
  });
});
