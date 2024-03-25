import moment, { Moment } from 'moment';
import _ from 'lodash';

import { DateRange } from 'react-day-picker';
import { AppDispatch } from '../app/store';
import {
  changeViewType, scrollCalender,
} from '../feature/calender/calenderSlice';
import { SavedFilterType, SelectedFilterType } from '../feature/filter/filterSlice';
import {
  FilterOperation, GetDateRangeParams, ScrollDir, ViewType,
} from '../constants';

interface GetDaysResult {
  weeksArray: Moment[][];
  daysInYear: number;
  daysArray: Moment[];
}
interface ScrollPositions {
  left: number;
  top: number;
}

const getDaysInCurrentYear = (): GetDaysResult => {
  const currentYear = moment().year();
  const startOfYear = moment(`${currentYear}-01-01`);
  const endOfYear = moment(`${currentYear}-12-31`);

  const daysInYear = endOfYear.diff(startOfYear, 'days') + 1;

  const daysArray = Array.from({ length: daysInYear }, (__, i) => startOfYear.clone().add(i, 'days'));

  const weeksArray: Moment[][] = [];
  let currentWeek: Moment[] = [];

  daysArray.forEach((day, index) => {
    currentWeek.push(day);

    if (day.day() === 0) {
      weeksArray.push(currentWeek);
      currentWeek = [];
    } else if (day.day() !== 0 && index === daysArray.length - 1) {
      weeksArray.push(currentWeek);
    }
  });

  return { weeksArray, daysInYear, daysArray };
};

const sortAndAssignY = (nodes:TaskSlot[]) => {
  // Sort nodes based on x attribute
  nodes.sort((a:TaskSlot, b:TaskSlot) => a.x - b.x);

  // Initialize a variable to keep track of the last x-coordinate encountered
  let lastX:null | number = null;

  // Iterate through nodes to assign y attribute
  nodes.forEach((node:TaskSlot, index:any) => {
    if (node.x !== lastX) {
      // If a new x-coordinate is encountered, set y to 0
      node.y = 0;
    } else {
      // If the same x-coordinate is encountered, set y to the previous node's h
      node.y = (nodes[index - 1]?.y ?? 0) + nodes[index - 1].h;
    }

    // Update lastX to the current x-coordinate
    lastX = node.x;
  });

  return nodes;
};

const scrollHandler = (
  e:Event,
  scrollPositions: React.MutableRefObject<ScrollPositions>,
  setScrolled:React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const target = e.target as HTMLElement;
  const currentScrollLeft = target.scrollLeft;
  const currentScrollTop = target.scrollTop;

  const isHorizontalScroll = currentScrollLeft !== scrollPositions.current.left;
  const isVerticalScroll = currentScrollTop !== scrollPositions.current.top;

  scrollPositions.current = {
    left: currentScrollLeft,
    top: currentScrollTop,
  };
  if (isHorizontalScroll) {
    setScrolled(true);

    // Handle horizontal scroll
  } else if (isVerticalScroll) {
    setScrolled(false);

    // Handle vertical scroll
  }
};

const handlenNavigation = (
  ref: React.MutableRefObject<HTMLElement | null>,
  dispatch:AppDispatch,
  direction: ScrollDir,
  dayWidth:number,
) => {
  if (ref.current) {
    const today = moment().dayOfYear() * dayWidth;
    const element = ref.current as HTMLElement;
    const week = dayWidth * 7;
    let updatedOffset;

    if (direction === ScrollDir.Today) {
      element.scroll({ left: today - (dayWidth * 2), behavior: 'smooth' });
    } else {
      const currentOffset = element.scrollLeft;
      updatedOffset = direction === ScrollDir.Right ? currentOffset + week : currentOffset - week;
      element.scroll({ left: updatedOffset, behavior: 'smooth' });
    }

    dispatch(scrollCalender(ScrollDir.None));
  }
};

const handleUpdateScroll = (
  ref: React.MutableRefObject<HTMLElement | null>,
  setScrollSet: React.Dispatch<React.SetStateAction<boolean>>,
  scrollPositions:React.MutableRefObject<{
    left: number;
    top: number;
  }>,
) => {
  const today = moment().dayOfYear() * 100;
  const element = ref.current as HTMLElement | null;
  if (element && element.scroll) {
    element.scroll({ left: today - 200, behavior: 'smooth' });
  }
  scrollPositions.current = {
    left: (ref.current as HTMLElement).scrollLeft,
    top: (ref.current as HTMLElement).scrollTop,
  };
  setScrollSet(true);
};

// ... (other imports)

const applyFilters = (
  selectedFilter: SelectedFilterType[],
  selectedSavedFitler:SavedFilterType | null,
  peopleTasks: PeopleTasks[],
  projectTasks: ProjectTask[],
  viewType: ViewType,
  dispatch:AppDispatch,
): { peopleTask: PeopleTasks[], projectTask: ProjectTask[] } => {
  let filteredResults: (PeopleTasks | ProjectTask)[] = [];
  const isProjectView = viewType === 'Project Plan';
  let allFilters = selectedFilter;
  if (selectedSavedFitler) {
    allFilters = [...selectedSavedFitler.filter, ...selectedFilter];
  }

  allFilters.forEach((filter) => {
    if (!filter.filter.onFilter) {
      return;
    }
    if (filter.filter.onBoth !== 'both') {
      dispatch(changeViewType(filter.filter.onBoth));
    }

    const filteredData = filter.filter.onFilter(
      peopleTasks || [],
      filter.selectedItem,
      filter.included,
      projectTasks || [],
      viewType,
    );

    if (filteredResults.length === 0) {
      filteredResults = filteredData;
    } else if (filter.operation === FilterOperation.And) {
      // Apply AND logic
      filteredResults = filteredResults.filter((item) => {
        const key = isProjectView ? 'project_id' : 'people_id';
        return key in item && filteredData.some(
          (filteredItem) => (item as any)[key] === (filteredItem as any)[key],
        );
      });
    } else if (filter.operation === FilterOperation.Or) {
      // Apply OR logic
      filteredResults = _.unionBy(filteredResults, filteredData, isProjectView ? 'project_id' : 'people_id');
    }
  });

  if (isProjectView) {
    return { peopleTask: [], projectTask: filteredResults as ProjectTask[] };
  }
  return { peopleTask: filteredResults as PeopleTasks[], projectTask: [] };
};

const getDateRangeWeeks = ({
  skipNum, totalNum, unit, isPrev,
}:GetDateRangeParams) => {
  if (!isPrev) {
    return {
      from: moment().add(skipNum, unit).startOf(unit === 'weeks' ? 'isoWeek' : unit).toDate(),
      to: moment().add(skipNum + totalNum - 1, unit).endOf(unit === 'weeks' ? 'isoWeek' : unit).toDate(),
    };
  }

  return {
    from: moment().subtract(skipNum, unit).startOf(unit === 'weeks' ? 'isoWeek' : unit).toDate(),
    to: moment().subtract(skipNum + totalNum - 1, unit).endOf(unit === 'weeks' ? 'isoWeek' : unit).toDate(),
  };
};

function generateDateRange(startDate: Date, endDate: Date, interval: 'days' | 'weeks'): Moment[] {
  const start = moment(startDate);
  const end = moment(endDate);
  const dates: Moment[] = [];
  if (start.isSame(end)) {
    return [start];
  }
  let date = start;
  if (interval === 'weeks') {
    date = date.startOf('isoWeek');
  }

  do {
    dates.push(date);
    date = moment(date).add(1, interval);
  } while (moment(date).isBefore(endDate));

  return dates;
}

const handleDownload = (csvData:string) => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Schedule.csv');
  document.body.appendChild(link);
  link.click();

  // Clean up the temporary URL
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

function getIntersectionCount(
  range1Start: string,
  range1End: string,
  range2Start: Moment,
  range2End?:Moment,
): number {
  const start1 = moment(range1Start);
  const end1 = moment(range1End);
  const start2 = range2Start;
  const end2 = range2End || moment(range2Start).endOf('isoWeek');

  // console.log(end1, start2);
  // Check for no overlap
  if (end1.isBefore(start2, 'days') || end2.isBefore(start1, 'days')) {
    return 0; // No overlap
  }

  // Calculate intersection
  const intersectionStart = moment.max(start1, start2);
  const intersectionEnd = moment.min(end1, end2);
  if (intersectionStart.isSame(intersectionEnd)) {
    return 1;
  }

  // Calculate the duration of the intersection
  const intersectionDuration = moment.duration(intersectionEnd.diff(intersectionStart));
  // Get the count of overlapping days
  const overlapDays = Math.ceil(intersectionDuration.asDays());

  return overlapDays + 1;
}

const getAllocErrors = (values: FormValues, dateRange:DateRange | undefined) => {
  let err:FormErrors = { };
  if (+values.hours < 1 || +values.hours > 24) {
    err = {
      ...err,
      hours: 'Allocate time for the task',
    };
  }
  if (values.project === null) {
    err = {
      ...err,
      project: 'A project must be selected',
    };
  }
  if (values.people.length === 0) {
    err = {
      ...err,
      people: 'Task must be assigned to atleast one person',
    };
  }
  if (!dateRange || !dateRange.from) {
    err = {
      ...err,
      date: 'A date must be selected',
    };
  }

  return err;
};

const checkForDuplicationTimings = (
  ids:number[],
  dateRange:DateRange,
  peopleTasks:PeopleTasks[],
  taskId?:string,
) => {
  // Use lodash's filter function to get objects with matching ids
  const startDate = moment((dateRange as DateRange).from);
  const endDate = moment(
    (dateRange as DateRange).to || (dateRange as DateRange).from,
  );
  const dups:string[] = [];
  const filteredObjects = _.filter(peopleTasks, (obj) => ids.includes(obj.people_id));
  filteredObjects.forEach((proj) => {
    proj.tasks.forEach((task) => {
      const count = getIntersectionCount(task.start_date, task.end_date, startDate, endDate);
      if (count > 0) {
        if (!taskId || (taskId && taskId !== task.task_id)) {
          dups.push(proj.name);
        }
      }
    });
  });
  return dups;
};

// Example usage
export default {
  getDaysInCurrentYear,
  sortAndAssignY,
  scrollHandler,
  handlenNavigation,
  handleUpdateScroll,
  applyFilters,
  getDateRangeWeeks,
  generateDateRange,
  getIntersectionCount,
  handleDownload,
  getAllocErrors,
  checkForDuplicationTimings,
};
