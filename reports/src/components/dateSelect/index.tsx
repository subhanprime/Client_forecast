import React, { useEffect, useState, useRef } from 'react';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import moment from 'moment';
import {
  getNewTaskFloat,
  getPeopleData, getProjectData, getTaskData,
} from '../../services/peopleService';
import { addPeopleFilterData } from '../../redux/store/features/apiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import {
  setTotalBillable, setTotalCapacity, setTotalNonBillable,
  setTotalOverTime, setTotalScheduled, setTotalTentative, setTotalTimeOff,
} from '../../redux/store/features/metricSlice';
import {
  getTotalScheduledHours, getTotalTimeOffHours,
} from '../../services/metricServices';
import { calculateCapacityTotal, calculateOvertimeTotal } from '../../helper/MetricCalculations';
import Dropdown from '../dropdown';
import {
  arrowRangeSelector,
  dateRangeFilter, dateRangeList,
} from '../../helper/dateFilter';
import { dateFilterSvg, LeftArrowSvg, RightArrowSvg } from '../../constants/svg';
import Project from '../../interface/projectInterface';
import People from '../../interface/peopleListInterface';
import Task from '../../interface/taskInterface';
import PeopleFilter from '../../interface/peopleFilterInterface';

const pastMonth = new Date();
function DateSelect() {
  const [daysSelected, setDaysSelected] = useState('This week');
  const dispatch = useAppDispatch();
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const taskDataList = useAppSelector((state) => state?.apiSlice.taskData);
  const peopleFilter = useAppSelector((state) => state?.apiSlice.peopleFilterData);
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  let footer = <p>Please pick the first day.</p>;

  if (range && range.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}
          –
          {format(range.to, 'PPP')}
        </p>
      );
    }
  }
  if (range?.from === undefined && range?.to) {
    footer = <p>{format(range.to, 'PPP')}</p>;
  }
  const catMenu = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function removeWeekendDays(startDate: moment.MomentInput, endDate: moment.MomentInput) {
    const dates = [];
    const currentDay = moment(startDate);

    while (currentDay <= moment(endDate)) {
      const dayOfWeek = currentDay.day();

      // Check if the day is not Saturday (6) or Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(currentDay.format('YYYY-MM-DD'));
      }

      currentDay.add(1, 'days');
    }
    return dates;
  }

  function getAllListOfDaysBetweenTwoDates(startDate: moment.MomentInput, endDate: moment.MomentInput) {
    const dates:string[] = [];
    const currentDay = moment(startDate);

    while (currentDay <= moment(endDate)) {
      // const dayOfWeek = currentDay.day();

      // Check if the day is not Saturday (6) or Sunday (0)
      // if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(currentDay.format('YYYY-MM-DD'));
      // }

      currentDay.add(1, 'days');
    }
    return dates;
  }

  const calculateLegacyObject = async () => {
    const projectData = await getProjectData();
    const peopleData = await getPeopleData();
    const mainLegacyObject:any = {
      chart: {
        datapoints: [],
      },
      [`legacy.budgets`]: { projects: {} },
      [`legacy.capacity`]: {},
      [`legacy.overtime`]: {},
      [`legacy.timeoff`]: [],
      [`legacy.totals`]: [],

    };
    const newTaskDataFloat: any = await getNewTaskFloat();

    if (range?.to && range.from) {
      const formattedRangeFrom = moment(range.from).format('YYYY-MM-DD');
      const formattedRangeTo = moment(range.to).format('YYYY-MM-DD');
      const filteredTasks:any = [];
      newTaskDataFloat.forEach((tasks:Task) => {
        if (moment(tasks.start_date).isBetween(formattedRangeFrom, formattedRangeTo, 'days', '[]')
            || moment(tasks.end_date).isBetween(formattedRangeFrom, formattedRangeTo, 'days', '[]')
        || moment(formattedRangeTo).isBetween(tasks.start_date, tasks.end_date, 'days', '[]')
        ) {
          if (tasks.people_ids === null) {
            const peopleId = [tasks.people_id];

            const filteredProjects = projectData.filter((project) => project.project_id === tasks.project_id);
            // const listOfDays = removeWeekendDays(tasks.start_date, tasks.end_date);
            const listOfDays = removeWeekendDays(range.from, range.to);
            const duration = moment.duration(moment(tasks.end_date).diff(moment(listOfDays[listOfDays.length - 1])));
            let scheduledHours = 0;
            if (duration.asHours() < 0) {
              const durationForHours = moment.duration(moment(tasks.end_date).add(1, 'day').diff(moment(tasks.start_date)));
              scheduledHours = durationForHours.asDays() * tasks.hours;
            } else {
              const durationForHours = moment.duration(moment(listOfDays[listOfDays.length - 1]).add(1, 'day').diff(moment(tasks.start_date)));
              scheduledHours = durationForHours.asDays() * tasks.hours;
            }
            const newObj = {
              billable: tasks.billable === true || tasks.billable === 1,
              id: `${tasks.task_id}`,
              hours: {
                future: 0,
                scheduled: scheduledHours,
              },
              name: tasks.name,
              person_id: peopleId[0],
              phase_id: tasks.phase_id,
              project_id: tasks.project_id,
              type: 'task',
              tentative: filteredProjects[0].tentative,
              rate: filteredProjects[0].rate_type,
            };
            filteredTasks.push(newObj);
          } else {
            const listOfDays = removeWeekendDays(range.from, range.to);
            const duration = moment.duration(moment(tasks.end_date).diff(moment(listOfDays[listOfDays.length - 1])));
            let scheduledHours = 0;
            if (duration.asHours() < 0) {
              const durationForHours = moment.duration(moment(tasks.end_date).add(1, 'day').diff(moment(tasks.start_date)));
              scheduledHours = durationForHours.asDays() * tasks.hours;
            } else {
              const durationForHours = moment.duration(moment(listOfDays[listOfDays.length - 1]).add(1, 'day').diff(moment(tasks.start_date)));
              scheduledHours = durationForHours.asDays() * tasks.hours;
            }
            tasks.people_ids.forEach((id:number) => {
              const peopleId = id;
              const filteredProjects = projectData.filter((project) => project.project_id === tasks.project_id);
              const newObj = {
                billable: tasks.billable === true || tasks.billable === 1,
                id: `${tasks.task_id}`,
                name: tasks.name,
                hours: {
                  future: 0,
                  scheduled: scheduledHours,
                },
                person_id: peopleId,
                phase_id: tasks.phase_id,
                project_id: tasks.project_id,
                type: 'task',
                tentative: filteredProjects[0].tentative,
                rate: filteredProjects[0].rate_type,
              };
              filteredTasks.push(newObj);
            });
          }
        }
      });
      mainLegacyObject['legacy.totals'] = filteredTasks;
      // console.log('LEGACY FILTER TASKS', filteredTasks);
      // console.log('LEGACY TOTAL', mainLegacyObject);
    }
    // ====================================================================================================================================

    // THIS IS TO COMPUTE THE CAPACITY HOURS OF THE INDIVISUAL PERSON
    // RIGHT NOWTME OFF(HOLIDAYS) HOURS ARE NOT COMPUTING IN IT LOOK CAREFULLY THE TIMEOFF LIST
    if (range?.to && range.from) {
      const listOfDays = removeWeekendDays(range.from, range.to);
      const capacityObj: Record<string, number> = {}; // Define the type for capacityObj
      peopleData.forEach((people: People) => {
        const capacityHours: number = (people.people_type_id === 3 ? 0 : listOfDays.length * 8);
        capacityObj[`${people.people_id}`] = capacityHours;
      });
      mainLegacyObject['legacy.capacity'] = capacityObj;
      // console.log('Capacity Object:', capacityObj);
    }
    // ====================================================================================================================================
    // THIS IS TO CREATE BUDGETS
    if (range?.to && range.from) {
      const formattedRangeFrom = moment(range.from).format('YYYY-MM-DD');
      const formattedRangeTo = moment(range.to).format('YYYY-MM-DD');
      const budgetProjects:any = [];
      newTaskDataFloat.forEach((tasks:Task) => {
        if (moment(tasks.start_date).isBetween(formattedRangeFrom, formattedRangeTo, 'days', '[]')
            || moment(tasks.end_date).isBetween(formattedRangeFrom, formattedRangeTo, 'days', '[]')
        || moment(formattedRangeTo).isBetween(tasks.start_date, tasks.end_date, 'days', '[]')
        ) {
          budgetProjects.push(tasks.project_id);
        }
      });
      const uniqueProjectId = new Set(budgetProjects);
      const uniqueProjectIdList = Array.from(uniqueProjectId);
      let filteredProjects:Project[] = [];
      uniqueProjectIdList.forEach((projectId:any) => {
        filteredProjects = projectData.filter((project:Project) => project.project_id === projectId);
      });
      const resultObject:any = {};
      const legacyBudgets:any = [];
      filteredProjects.forEach((project:Project) => {
        const projectId = project.project_id;
        const budgetType = project.budget_type;
        const budget = parseFloat(project.budget_total) || 0;

        resultObject[projectId] = {
          type: budgetType,
          budget,
        };
        mainLegacyObject['legacy.budgets'].projects = resultObject;
        // legacyBudgets.push(resultObject);
      });
      // mainLegacyObject['legacy.budgets'].projects = capacityObj;
      // console.log('LEGACY BUDGETS', legacyBudgets);
    }
    // ====================================================================================================================================
    // THIS IS TO CREATE CHART DATA
    if (range?.to && range.from) {
      const formattedRangeFrom = moment(range.from).format('YYYY-MM-DD');
      const formattedRangeTo = moment(range.to).format('YYYY-MM-DD');
      // const budgetProjects:any = [];
      const daysList = getAllListOfDaysBetweenTwoDates(formattedRangeFrom, formattedRangeTo);
      // console.log('first', daysList);
      let indivisualChartObj = {};
      const chartList:any = [];
      const peopleWithoutPeopleTypeId = peopleData.filter((e:People) => e.people_type_id !== 3);
      daysList.forEach((todayDate:string, index:number) => {
        let billableHours = 0;
        let nonBillableHours = 0;
        const capacityHours = peopleWithoutPeopleTypeId.length * 8;
        const currentWeekOfYear = moment(todayDate).week();
        const currentMonthOfMonth = moment(todayDate).month();
        const currentDayOfWeek = moment(todayDate).day();
        newTaskDataFloat.forEach((tasks:any) => {
          if (moment(todayDate).isBetween(tasks.start_date, tasks.end_date, 'days', '[]')) {
            if (tasks.billable === 1 || tasks.billable === true) {
              if (tasks.people_ids !== null) {
                billableHours = tasks.people_ids.length * tasks.hours;
              } else if (tasks.people_id !== null) {
                const peopleId = tasks.people_id;
                billableHours = [peopleId].length * tasks.hours;
              }
            } if (tasks.billable === 0 || tasks.billable === false) {
              if (tasks.people_ids !== null) {
                nonBillableHours = tasks.people_ids.length * tasks.hours;
              } else if (tasks.people_id !== null) {
                const peopleId = tasks.people_id;
                nonBillableHours = [peopleId].length * tasks.hours;
              }
            }
          }
        });
        indivisualChartObj = {
          date: todayDate,
          billable: billableHours,
          capacity: currentDayOfWeek === 6 || currentDayOfWeek === 0 ? 0 : capacityHours,
          week: currentWeekOfYear,
          month: currentMonthOfMonth,
          nonbillable: nonBillableHours,
        };
        chartList.push(indivisualChartObj);
      });
      // console.log('CHART LIST', chartList);
      mainLegacyObject.chart.datapoints = chartList;
    }
    console.log('MAIN LEGACY OBJECT', mainLegacyObject);
    return mainLegacyObject;
  };

  const setPeopleFilterDataInRedux = async () => {
    // if (range?.to && range.from) {
    const peopleFilterData:any = await calculateLegacyObject();
    // console.log('PEOPLE FILTER DATA', peopleFilterData);
    // console.log('AHO AHO AHO', peopleFilterData);
    dispatch(addPeopleFilterData(peopleFilterData));
    // }
    // ORIGINAL DATA
    // const peopleFilterData = await getPeopleFilterData();
    // dispatch(addPeopleFilterData(peopleFilterData));
  };

  const getScheduleTotalHours = async () => {
    let totalSchedule = 0;
    let totalBillableHours = 0;
    let totalNonBillableHours = 0;
    let totalTentativeHours = 0;
    const schedule = await getTotalScheduledHours(peopleFilter);
    if (taskDataList.length > 0) {
      // console.log('TASK DATA', taskDataList);
      Object.keys(taskDataList[0]).forEach((key) => {
        const tdl = taskDataList[0][key];
        schedule.forEach((e) => {
          // console.log('first', Object.keys(tdl.ids));
          // console.log('second', e.id.toString());
          // console.log('LUT PUT GAYAYA', Object.keys(tdl.ids).includes(e.id.toString()));
          if (e.hours.scheduled && Object.keys(tdl.ids).includes(e.id.toString())) totalSchedule += e.hours.scheduled;
          if (e.billable && Object.keys(tdl.ids).includes(e.id.toString())) totalBillableHours += e.hours.scheduled;
          if (e.billable === false && Object.keys(tdl.ids).includes(e.id.toString())) totalNonBillableHours += e.hours.scheduled;
          if (e.tentative === true && Object.keys(tdl.ids).includes(e.id.toString())) totalTentativeHours += e.hours.scheduled;
        });
      });
    }
    dispatch(setTotalScheduled(totalSchedule));
    dispatch(setTotalBillable(totalBillableHours));
    dispatch(setTotalNonBillable(totalNonBillableHours));
    dispatch(setTotalTentative(totalTentativeHours));
  };

  const getCapacityTotalHours = async () => {
    const totalCapacityTime = await calculateCapacityTotal(peopleFilter);
    dispatch(setTotalCapacity(totalCapacityTime));
  };

  const getOvertimeTotalHours = async () => {
    const totalOvertime = await calculateOvertimeTotal(peopleFilter);
    dispatch(setTotalOverTime(totalOvertime));
  };

  const getTimeOffTotalHours = async () => {
    interface ScheduleEntry {
      hours: number;
      days: number;
    }
    interface WorkScheduleData {
      [taskId: string]: ScheduleEntry;
    }
    let totalTimeOffHours = 0;
    const timeOff = await getTotalTimeOffHours(peopleFilter);
    timeOff.forEach((e) => {
      if (e.holiday === false) {
        const list = Object.entries(e.people).map(([key, value]) => ({ [key]: value })) as WorkScheduleData[];
        list.forEach((ex) => {
          const { hours } = Object.values(ex)[0];
          totalTimeOffHours = hours + totalTimeOffHours;
        });
        dispatch(setTotalTimeOff(totalTimeOffHours));
      }
    });
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeOpenMenus = (e: MouseEvent) => {
    if (catMenu.current && isDropdownOpen && !catMenu.current.contains(e.target as Node)) setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (taskDataList?.length > 0) {
      getScheduleTotalHours();
      getCapacityTotalHours();
      getOvertimeTotalHours();
      getTimeOffTotalHours();
    }
  }, [taskDataList, peopleFilter]);

  useEffect(() => {
    dateRangeFilter(daysSelected, setRange);
  }, [daysSelected]);

  useEffect(() => {
    if (range && range.from) {
      if (!range.to) {
        setPeopleFilterDataInRedux();
      } else if (range.to) {
        setPeopleFilterDataInRedux();
      }
      setPeopleFilterDataInRedux();
      calculateLegacyObject();
    }
  }, [range]);

  useEffect(() => {
    document.addEventListener('click', closeOpenMenus);
    return () => {
      document.removeEventListener('click', closeOpenMenus);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={catMenu}>
      <div className="relative flex justify-start px-1 items-center select-none">
        <span className="flex text-[16px] font-bold pr-1 items-center" data-testid="selectedDateText">
          <div
            data-testId="left-arrow"
            onKeyDown={() => {}}
            onClick={() => arrowRangeSelector(range, setRange, false, daysSelected)}
            className="h-[30px] w-[30px] border-[1px] flex justify-center items-center rounded-tl-md rounded-bl-md"
          >
            {LeftArrowSvg({ height: '15', width: '15' })}
          </div>
          <div
            onKeyDown={() => {}}
            onClick={() => arrowRangeSelector(range, setRange, true, daysSelected)}
            className="h-[30px] w-[30px] border-[1px] flex justify-center items-center rounded-tr-md rounded-br-md"
          >
            {RightArrowSvg({ height: '15', width: '15', isDisabled: true })}

          </div>
          <div className="pl-2 select-none">
            {`${daysSelected}:`}
          </div>
        </span>

        <button
          id="dropdownCheckboxButton"
          onClick={toggleDropdown}
          data-testid="dropdownDefaultCheckbox"
          data-dropdown-toggle="dropdownDefaultCheckbox"
          className="select-none hover:border-[1px] rounded-md border-blue-500 font-medium  px-3 py-[4px] text-center inline-flex justify-center items-center text-blue-500 hover:text-blue-500 hover:bg-blue-100"
          type="button"
        >
          <div className="flex-wrap gap-x-1">
            {footer}
          </div>
          {dateFilterSvg}
        </button>

        <div
          id="dropdownDefaultCheckbox"
          className={`
    ${isDropdownOpen ? '' : 'hidden'}
    z-10 absolute top-full left-10 bg-white
    divide-y divide-gray-100 rounded-md
    shadow-md py-2
  `}
        >
          <div>
            <div className="flex align-center items-center px-5 gap-2">
              <div>Date Range: </div>
              <Dropdown
                width="w-36"
                data-testid="dropdown-days"
                dropdownList={dateRangeList}
                defaultSelected={daysSelected}
                setSelectedState={setDaysSelected}
              />
            </div>
            <div className="h-[1px] bg-slate-300 mt-5 mx-5" />
            <DayPicker
              id="test"
              numberOfMonths={2}
              data-testid="dayPickerTestid"
              captionLayout="dropdown-buttons"
              fromYear={2015}
              toYear={2025}
              mode="range"
              defaultMonth={pastMonth}
              selected={range}
              onSelect={(e) => {
                setRange(e);
                if (!dateRangeList.includes('Custom')) dateRangeList.splice(0, 0, 'Custom');
                setDaysSelected('Custom');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSelect;
