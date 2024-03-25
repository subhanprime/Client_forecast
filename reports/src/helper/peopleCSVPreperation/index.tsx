import { useEffect } from 'react';
import PeopleTableInterface from '../../components/tables/tableComponent/propleInterface';
import DepartmentInterface from '../../interface/departmentInterface';
import PeopleFilter from '../../interface/peopleFilterInterface';
import People from '../../interface/peopleListInterface';
import Project from '../../interface/projectInterface';
import Task from '../../interface/taskInterface';
import { useAppSelector } from '../../redux/store/store';
import {
  getPeopleData, getProjectData, getDepartmentData, getTaskData, getRolesData,
} from '../../services/peopleService';
import { DataPoints } from '../../interface/chartDatapointsInterface';

export const preparePeopleCSV = async (setpeopleCSV:any, peopleFilterData:PeopleFilter) => {
  const peopleData = await getPeopleData();
  const projectData = await getProjectData();
  const departmentData = await getDepartmentData();
  const taskData:any = await getTaskData();
  const rolesData = await getRolesData();
  // const peopleFilterData = await getPeopleFilterData();
  // const peopleFilterData = useAppSelector((state) => state?.apiSlice.peopleFilterData);

  try {
    let projectList: Project[];
    let peopleList:People[];
    let projectFilterlist:PeopleFilter;
    let departmentList:DepartmentInterface | DepartmentInterface[];

    // let peopleData:PeopleTableInterface[] = [];
    const filterTable = async () => {
      const departmentMap:any = new Map();
      departmentList.forEach((dept:any) => {
        departmentMap.set(dept.department_id, { ...dept });
      });

      const capacityObj = projectFilterlist['legacy.capacity'];
      const overtimeObj = projectFilterlist['legacy.overtime'];
      const scheduledObject = projectFilterlist['legacy.totals'];
      const timeOffObject = projectFilterlist['legacy.timeoff'];
      const overtimeObject = projectFilterlist['legacy.overtine'];

      const peopleTableData = peopleList.map((e:any) => {
        const userProject: any[] = [];

        let totalScheduledHours = 0;
        let totalBillableHours = 0;
        let totalNonBillableHours = 0;
        let totalTimeOffHours = 0;
        let totalTentativeHours = 0;

        let totalIndivisualScheduledHours = 0;
        let totalIndivisualBillableHours = 0;
        let totalIndivisualNonBillableHours = 0;
        let totalIndivisualTimeOffHours = 0;
        let totalIndivisualTentativeHours = 0;

        const updatedObject = {
          ...e,
          department: {},
          capacity: 0,
          overtime: 0,
          projects: [],
          scheduled: 0,
          billable: 0,
          nonbillable: 0,
          timeOff: 0,
        };

        // TO ADD A NEW PROJECT OF LEAVE IN THE UserProject
        timeOffObject.forEach((timeOff:any) => {
          if (timeOff && timeOff.holiday === false) {
            const peopleInProject: number[] = [];
            const peopleIds = Object.keys(timeOff.people);
            peopleIds.forEach((ids) => {
              if (parseInt(ids, 10) === parseInt(e.people_id, 10)) {
                peopleInProject.push(parseInt(e.people_id, 10));
                const timeOf = timeOff.people[e.people_id].hours;
                const timeOfDays = timeOff.people[e.people_id].days;
                const timeOffProject = {
                  project_id: timeOff.id,
                  name: timeOff.name,
                  isHoliday: false,
                  color: '173074',
                  tags: [],
                  budget_type: 0,
                  budget_per_phase: 0,
                  non_billable: 0,
                  tentative: 0,
                  locked_task_list: 0,
                  active: 0,
                  project_manager: 0,
                  all_pms_schedule: 0,
                  created: '2023-12-05 12:39:15',
                  modified: '2023-12-05 12:39:15',
                  rate_type: 1,
                  ext_calendar_count: 0,
                  people_ids: peopleInProject,
                  start_date: '2023-12-04',
                  end_date: '2023-12-08',
                  manager: {
                  },
                  people_id: 0,
                  scheduled: 0,
                  billable: 0,
                  nonbillable: 0,
                  billablepert: 0,
                  timeOff: timeOf,
                  timeOfDays,
                };
                userProject.push(timeOffProject);
              }
            });
          } else {
            const peopleInProject: number[] = [];
            const peopleIds = Object.keys(timeOff.people);
            peopleIds.forEach((ids) => {
              if (parseInt(ids, 10) === parseInt(e.people_id, 10)) {
                // console.log('UFF YE TERI PALKAIN GHAANI SI', e, timeOff.name);
                peopleInProject.push(parseInt(e.people_id, 10));
                const timeOfHours = timeOff.people[e.people_id].hours;
                const timeOfDays = timeOff.people[e.people_id].days;
                const timeOffProject = {
                  project_id: timeOff.id,
                  name: timeOff.name,
                  isHoliday: true,
                  color: '173074',
                  tags: [],
                  budget_type: 0,
                  budget_per_phase: 0,
                  non_billable: 0,
                  tentative: 0,
                  locked_task_list: 0,
                  active: 0,
                  project_manager: 0,
                  all_pms_schedule: 0,
                  created: '2023-12-05 12:39:15',
                  modified: '2023-12-05 12:39:15',
                  rate_type: 1,
                  ext_calendar_count: 0,
                  people_ids: peopleInProject,
                  start_date: '2023-12-04',
                  end_date: '2023-12-08',
                  manager: {
                  },
                  people_id: 0,
                  scheduled: 0,
                  billable: 0,
                  nonbillable: 0,
                  billablepert: 0,
                  timeOff: timeOfHours,
                  timeOffDays: timeOfDays,
                };
                userProject.push(timeOffProject);
              }
            });
          }
        });

        projectList.forEach((proj:any) => {
          if (proj.people_ids && proj.people_ids.length > 0 && proj.people_ids.includes(e.people_id)) {
            const modifiedProj = { ...proj, manager: {} };
            modifiedProj.people_id = e.people_id;
            peopleList.forEach((element:People) => {
              if (element.account_id === proj.project_manager) {
                modifiedProj.manager = element;
              }
            });
            // console.log('IRON MAN', modifiedProj);
            userProject.push(modifiedProj);
          }
        });
        // FOR OVERALL BILLABLE SCHEUDLED AND NONBILLABLE
        if (taskData.length > 0) {
          Object.keys(taskData).forEach((key:any) => {
            const tdl = taskData[key];
            scheduledObject.forEach((sched:any) => {
              if (sched.person_id === e.people_id
                  && Object.keys(tdl.ids).includes(sched.id.toString())) {
                if (typeof sched?.hours?.scheduled === 'number') {
                  totalScheduledHours += sched.hours.scheduled;
                }
                if (typeof sched?.hours?.scheduled === 'number' && sched.billable) {
                  totalBillableHours += sched.hours.scheduled;
                }
                if (typeof sched?.hours?.scheduled === 'number' && sched.billable === false) {
                  totalNonBillableHours += sched.hours.scheduled;
                }
                if (typeof sched?.hours?.scheduled === 'number' && sched.tentative) {
                  totalTentativeHours += sched.hours.scheduled;
                }
              }
              // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
              if (sched.billable === undefined && sched.project_id === undefined && sched.person_id === e.people_id) {
                totalTimeOffHours = sched.hours.scheduled + totalTimeOffHours;
              }
            });
          });
        }

        // FOR INDIVISUAL BILLABLE SCHEUDLED AND NONBILLABLE
        userProject.forEach((element:any, index:number) => {
          totalIndivisualScheduledHours = 0;
          totalIndivisualBillableHours = 0;
          totalIndivisualNonBillableHours = 0;
          totalIndivisualTimeOffHours = 0;
          totalIndivisualTentativeHours = 0;
          if (taskData.length > 0) {
            Object.keys(taskData).forEach((key:any) => {
              const tdl = taskData[key];
              scheduledObject.forEach((sched:any) => {
                if (sched.person_id === element.people_id
                    && sched.project_id === element.project_id
                    && Object.keys(tdl.ids).includes(sched.id.toString())) {
                  if (typeof sched?.hours?.scheduled === 'number') {
                    totalIndivisualScheduledHours += sched?.hours?.scheduled;
                  }
                  if (typeof sched?.hours?.scheduled === 'number' && sched.billable) {
                    totalIndivisualBillableHours += sched?.hours?.scheduled;
                  }
                  if (typeof sched?.hours?.scheduled === 'number' && sched.billable === false) {
                    totalIndivisualNonBillableHours += sched?.hours?.scheduled;
                  }
                  if (typeof sched?.hours?.scheduled === 'number' && sched.tentative) {
                    totalIndivisualTentativeHours += sched?.hours?.scheduled;
                  }
                }
                // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
                if (sched.id === element.project_id) {
                  totalIndivisualTimeOffHours = sched.hours.scheduled + totalIndivisualTimeOffHours;
                }
              });
            });
          }
          let overtimeScheduledHours = 0;
          let overtimeLoggedHours = 0;
          const keysArray = Object.keys(overtimeObj);
          if (keysArray.includes(element.people_id.toString())) {
            overtimeScheduledHours = overtimeObj[element.people_id.toString()].future;
            overtimeLoggedHours = overtimeObj[element.people_id.toString()].logged;
          }

          const modifiedProj = { ...element };
          modifiedProj.scheduled = totalIndivisualScheduledHours;
          modifiedProj.billable = totalIndivisualBillableHours;
          modifiedProj.nonbillable = totalIndivisualNonBillableHours;
          modifiedProj.billablepert = (totalIndivisualBillableHours / totalIndivisualScheduledHours) * 100;
          modifiedProj.timeOff = totalIndivisualTimeOffHours;
          modifiedProj.tentative = totalIndivisualTentativeHours;
          modifiedProj.scheduledOvertimeHours = overtimeScheduledHours;
          modifiedProj.loggedOvertimeHours = overtimeLoggedHours;
          userProject.splice(index, 1, modifiedProj);
        });
        const deptarmentObj = departmentMap.get(e.department_id);
        // Add a new property to the modifiedProj object
        updatedObject.department = deptarmentObj ? deptarmentObj?.name : 'No Department';
        updatedObject.capacity = capacityObj[e.people_id];
        updatedObject.overtime = overtimeObj[e.people_id] ? overtimeObj[e.people_id]?.total : 0;
        updatedObject.projects = userProject;
        updatedObject.scheduled = totalScheduledHours;
        updatedObject.billable = totalBillableHours;
        updatedObject.nonbillable = totalNonBillableHours;
        updatedObject.tentative = totalTentativeHours;
        updatedObject.timeOff = totalTimeOffHours;
        const schedulePercentage = (totalBillableHours / capacityObj[e.people_id]) * 100;
        updatedObject.scheduledpercent = schedulePercentage;
        delete updatedObject.role_id;
        delete updatedObject.auto_email;
        delete updatedObject.employee_type;
        delete updatedObject.active;
        delete updatedObject.people_type_id;
        delete updatedObject.modified;
        delete updatedObject.department_id;
        delete updatedObject.managers;
        delete updatedObject.account_id;
        delete updatedObject.start_date;
        delete updatedObject.created;
        delete updatedObject.region_id;
        return updatedObject;
      });
      const csvarray:any = [];

      peopleTableData.forEach((e) => {
        let projectLength = 0;
        if (e.projects.length > 0) {
          projectLength = e.projects.length;
          let counter = 0;
          // THIS IS FOR INDIVISUAL PROJECT
          e.projects.forEach((y: { name: any; scheduled: number; billable: number; nonbillable: any; tentative: any; scheduledOvertimeHours: any; loggedOvertimeHours: any; timeOff: any; timeOffDays: undefined; }) => {
            counter += 1;
            const mainObject = {
              '': '',
              Person: e.name,
              Role: e.job_title,
              Department: e.department,
              tags: e.tags[0] === undefined ? 0 : e.tags[0],
              Capacity_hrs: e.capacity,
              Project: y.name,
              Task: '',
              Time_off: '',
              Holiday: '',
              scheduled_hrs: y.scheduled,
              scheduled_billable_hrs: y.billable,
              scheduled_nonbillable_hrs: y.nonbillable,
              scheduled_tentative_hrs: y.tentative,
              scheduled_overtime_hrs: y.scheduledOvertimeHours,
              logged_overtime_hrs: y.loggedOvertimeHours,
              unscheduled_hrs: e.capacity - e.scheduled,
              timeoff_hrs: 0,
              timeoff_days: 0,
              holiday_hrs: y.timeOff,
              holiday_days: y.timeOffDays === undefined ? 0 : y.timeOffDays,
              scheduled_perc_capacity: y.scheduled === 0 ? '0%' : `${(e.scheduled / e.capacity) * 100}%`,
              scheduled_billable_perc_capacity: y.billable === 0 ? '0%' : `${(e.billable / e.capacity) * 100}%`,
              scheduled_billable_perc_scheduled: y.scheduled === 0 ? '0%' : `${(e.billable / e.scheduled) * 100}%`,
            };
            csvarray.push(mainObject);
            // THIS IS FOR SUM OF ALL PROJECTS
            if (counter === projectLength) {
              let totalForIndivisualPerson = {};
              csvarray.forEach((total: any) => {
                let totalScheduledHours = 0;
                let totalScheduledBillableHours = 0;
                let totalScheduledNonBillableHours = 0;
                let totalScheduledTentativeHours = 0;
                let scheduledOvertime = 0;
                let loggedOvertime = 0;
                let unscheduledHours = 0;
                let timeOffHours = 0;
                let timeOffDays = 0;
                let holidayHours = 0;
                let holidaysDays = 0;
                let totalScheduledPercCapacity = 0;
                let totalBillablePercCapacity = 0;
                let totalScheduledBillablePercCapacity = 0;
                totalScheduledHours = total.scheduled_hrs + totalScheduledHours;
                totalScheduledBillableHours = total.scheduled_billable_hrs + totalScheduledBillableHours;
                totalScheduledNonBillableHours = total.scheduled_nonbillable_hrs + totalScheduledNonBillableHours;
                totalScheduledTentativeHours = total.scheduled_tentative_hrs + totalScheduledTentativeHours;
                scheduledOvertime = total.scheduled_overtime_hrs + scheduledOvertime;
                loggedOvertime = total.logged_overtime_hrs + loggedOvertime;
                unscheduledHours = total.unscheduled_hrs + unscheduledHours;
                timeOffHours = total.timeoff_hrs + timeOffHours;
                timeOffDays = total.timeOffDays + timeOffDays;
                holidayHours = total.holiday_hrs + holidayHours;
                holidaysDays = total.holiday_days + holidaysDays;
                totalScheduledPercCapacity = total.scheduled_perc_capacity + totalScheduledPercCapacity;
                totalBillablePercCapacity = total.scheduled_billable_perc_capacity + totalBillablePercCapacity;
                totalScheduledBillablePercCapacity = total.scheduled_billable_perc_scheduled + totalScheduledBillablePercCapacity;
                // console.log('total', total, total.holiday_days, holidayHours);
                totalForIndivisualPerson = {
                  '': 'Total',
                  Person: e.name,
                  Role: e.job_title,
                  Department: e.department,
                  tags: e.tags[0] === undefined ? 0 : e.tags[0],
                  Capacity_hrs: e.capacity,
                  Project: 'All',
                  Task: 'All',
                  Time_off: 'All',
                  Holiday: 'All',
                  scheduled_hrs: totalScheduledHours,
                  scheduled_billable_hrs: totalScheduledBillableHours,
                  scheduled_nonbillable_hrs: totalScheduledNonBillableHours,
                  scheduled_tentative_hrs: totalScheduledTentativeHours,
                  scheduled_overtime_hrs: scheduledOvertime,
                  logged_overtime_hrs: loggedOvertime,
                  unscheduled_hrs: e.capacity - totalScheduledHours,
                  timeoff_hrs: timeOffHours,
                  timeoff_days: timeOffDays,
                  holiday_hrs: holidayHours,
                  holiday_days: holidaysDays,
                  scheduled_perc_capacity: `${totalScheduledPercCapacity}%`,
                  scheduled_billable_perc_capacity: `${totalBillablePercCapacity}%`,
                  scheduled_billable_perc_scheduled: `${totalScheduledBillablePercCapacity}%`,
                };
              });
              csvarray.push(totalForIndivisualPerson);
            }
          });
        } else {
          const mainObject = {
            '': 'Total',
            Person: e.name,
            Role: e.job_title,
            Department: e.department,
            tags: e.tags[0] === undefined ? 0 : e.tags[0],
            Capacity_hrs: e.capacity,
            Project: 'All',
            Task: 'All',
            Time_off: 'All',
            Holiday: 'All',
            scheduled_hrs: e.scheduled,
            scheduled_billable_hrs: e.billable,
            scheduled_nonbillable_hrs: e.nonbillable,
            scheduled_tentative_hrs: e.tentative,
            scheduled_overtime_hrs: 0,
            logged_overtime_hrs: 0,
            unscheduled_hrs: e.capacity - e.scheduled,
            timeoff_hrs: 0,
            timeoff_days: 0,
            holiday_hrs: 0,
            holiday_days: 0,
            scheduled_perc_capacity: `0%`,
            scheduled_billable_perc_capacity: `0%`,
            scheduled_billable_perc_scheduled: `0%`,
          };
          csvarray.push(mainObject);
        }
      });
      // console.log('PEOPLE CSV', csvarray);
      await setpeopleCSV(csvarray);
    };

    const getData = async () => {
      projectList = projectData;
      peopleList = peopleData;
      projectFilterlist = peopleFilterData;
      // NEEDS TO BE LOOK
      departmentList = departmentData;
      filterTable();
    };
    getData();
  } catch (e) { /* empty */ }
};

export const getRoundedValue = (value:number) => parseInt(Math.round(value).toFixed(3), 10);

interface ChartCSVInterface {
  Date: string;
  Capacity_hrs: number;
  Schedued_hrs: number;
  Schedued_perc: number | string;
  Schedued_bilable_hrs: number;
  Schedued_bilable_perct: number | string;
  Schedued_non_bilable_hrs: number;
  Schedued_non_bilable_perct: number;
  Schedued_tentative_all_hrs: number;
  Schedued_tentative_all_perct: number;
  Unschedued_hrs: number;
  Logged_hrs: number;
  Logged_perct: number;
  Logged_billable_hrs: number;
  Logged_billable_perct: number;
  Logged_non_billable_hrs: number;
  Logged_non_billable_perct: number;
  Scheduled_overtime_hrs: number;
  Logged_overtime_hrs: number;
  Timeoff_Holiday_hrs: number;
  Timeoff_Holiday_days: number;
}
export const prepareChartCSV = async (setChartCSV:any, peopleFilterData:PeopleFilter) => {
  // const peopleFilterData = await getPeopleFilterData();
  // const peopleFilterData = useAppSelector((state) => state?.apiSlice.peopleFilterData);
  const chartData = peopleFilterData.chart;
  let chartArrayCSV:ChartCSVInterface[] = [];
  if (chartData.datapoints.length > 0) {
    chartArrayCSV = [];
    chartData.datapoints.forEach((e:DataPoints) => {
      const chartObject = {
        Date: '',
        Capacity_hrs: 0,
        Schedued_hrs: 0,
        Schedued_perc: 0,
        Schedued_bilable_hrs: 0,
        Schedued_bilable_perct: 0,
        Schedued_non_bilable_hrs: 0,
        Schedued_non_bilable_perct: 0,
        Schedued_tentative_all_hrs: 0,
        Schedued_tentative_all_perct: 0,
        Unschedued_hrs: 0,
        Logged_hrs: 0,
        Logged_perct: 0,
        Logged_billable_hrs: 0,
        Logged_billable_perct: 0,
        Logged_non_billable_hrs: 0,
        Logged_non_billable_perct: 0,
        Scheduled_overtime_hrs: 0,
        Logged_overtime_hrs: 0,
        Timeoff_Holiday_hrs: 0,
        Timeoff_Holiday_days: 0,
      };
      chartObject.Date = e.date;
      chartObject.Capacity_hrs = e.capacity;
      chartObject.Schedued_hrs = e.billable;
      chartObject.Schedued_perc = (e.capacity) === 0 ? 0 : getRoundedValue((e.billable / e.capacity) * 100);
      chartObject.Schedued_bilable_hrs = e.billable;
      chartObject.Schedued_bilable_perct = (e.billable) === 0 ? 0 : (e.billable / e.billable) * 100;
      chartObject.Schedued_non_bilable_hrs = e.nonbillable;
      chartObject.Schedued_non_bilable_perct = (e.billable) === 0 ? 0 : (e.nonbillable / e.billable) * 100;
      chartObject.Schedued_tentative_all_hrs = e.tentative.billable + e.tentative.nonbillable + e.tentative.timeoff;
      chartObject.Schedued_tentative_all_perct = (e.billable) === 0 ? 0 : ((e.tentative.billable + e.tentative.nonbillable + e.tentative.timeoff) / e.billable) * 100;
      chartObject.Unschedued_hrs = e.capacity - e.billable;
      chartObject.Logged_hrs = e.logged.nonbillable + e.logged.billable;
      chartObject.Logged_perct = 0;
      chartObject.Logged_billable_hrs = e.logged.billable;
      chartObject.Logged_billable_perct = (e.logged.nonbillable + e.logged.billable) === 0 ? 0 : (e.logged.billable / (e.logged.nonbillable + e.logged.billable)) * 100;
      chartObject.Logged_non_billable_hrs = e.logged.nonbillable;
      chartObject.Logged_non_billable_perct = (e.logged.nonbillable + e.logged.billable) === 0 ? 0 : (e.logged.nonbillable / (e.logged.nonbillable + e.logged.billable)) * 100;
      chartObject.Scheduled_overtime_hrs = e.overtime.scheduled;
      chartObject.Logged_overtime_hrs = e.overtime.logged;
      chartObject.Timeoff_Holiday_hrs = e.holidays.hours + e.timeoff.hours;
      chartObject.Timeoff_Holiday_days = e.holidays.days + e.timeoff.days;
      chartArrayCSV.push(chartObject);
    });
    let capacityHrs = 0;
    let scheduledHrs = 0;
    let scheduledPerc = 0;
    let scheduledBillableHrs = 0;
    let scheduledBillablePerc = 0;
    let scheduledNonBillableHrs = 0;
    let scheduledNonBillablePerc = 0;
    let scheduledTentativeAllHrs = 0;
    let scheduledTentativeAllPerc = 0;
    let unscheduledHrs = 0;
    let loggedHrs = 0;
    let loggedPerc = 0;
    let loggedBillableHrs = 0;
    let loggedBillablePerc = 0;
    let loggedNonBillableHrs = 0;
    let loggedNonBillablePerc = 0;
    let scheduledOvertimeHrs = 0;
    let loggedOvertimeHrs = 0;
    let timeoffHolidayHrs = 0;
    let timeoffHolidayDays = 0;
    let totalChartObject: ChartCSVInterface = {
      Date: '',
      Capacity_hrs: 0,
      Schedued_hrs: 0,
      Schedued_perc: 0,
      Schedued_bilable_hrs: 0,
      Schedued_bilable_perct: 0,
      Schedued_non_bilable_hrs: 0,
      Schedued_non_bilable_perct: 0,
      Schedued_tentative_all_hrs: 0,
      Schedued_tentative_all_perct: 0,
      Unschedued_hrs: 0,
      Logged_hrs: 0,
      Logged_perct: 0,
      Logged_billable_hrs: 0,
      Logged_billable_perct: 0,
      Logged_non_billable_hrs: 0,
      Logged_non_billable_perct: 0,
      Scheduled_overtime_hrs: 0,
      Logged_overtime_hrs: 0,
      Timeoff_Holiday_hrs: 0,
      Timeoff_Holiday_days: 0,
    };
    chartArrayCSV.forEach((total:any) => {
      capacityHrs += total.Capacity_hrs;
      scheduledHrs += total.Schedued_hrs;
      scheduledPerc += total.Schedued_perc;
      scheduledBillableHrs += total.Schedued_bilable_hrs;
      scheduledBillablePerc += total.Schedued_bilable_perct;
      scheduledNonBillableHrs += total.Schedued_non_bilable_hrs;
      scheduledNonBillablePerc += total.Schedued_non_bilable_perct;
      scheduledTentativeAllHrs += total.Schedued_tentative_all_hrs;
      scheduledTentativeAllPerc += total.Schedued_tentative_all_perct;
      unscheduledHrs += total.Unschedued_hrs;
      loggedHrs += total.Logged_hrs;
      loggedPerc += total.Logged_perct;
      loggedBillableHrs += total.Logged_billable_hrs;
      loggedBillablePerc += total.Logged_billable_perct;
      loggedNonBillableHrs += total.Logged_non_billable_hrs;
      loggedNonBillablePerc += total.Logged_non_billable_perct;
      scheduledOvertimeHrs += total.Scheduled_overtime_hrs;
      loggedOvertimeHrs += total.Logged_overtime_hrs;
      timeoffHolidayHrs += total.Timeoff_Holiday_hrs;
      timeoffHolidayDays += total.Timeoff_Holiday_days;

      totalChartObject = {
        Date: 'Total',
        Capacity_hrs: capacityHrs,
        Schedued_hrs: scheduledHrs,
        Schedued_perc: `${Math.round((scheduledHrs / capacityHrs) * 100)}%`,
        Schedued_bilable_hrs: scheduledBillableHrs,
        Schedued_bilable_perct: `${Math.round((scheduledBillableHrs / scheduledHrs) * 100)}%`,
        Schedued_non_bilable_hrs: scheduledNonBillableHrs,
        Schedued_non_bilable_perct: scheduledNonBillablePerc,
        Schedued_tentative_all_hrs: scheduledTentativeAllHrs,
        Schedued_tentative_all_perct: scheduledTentativeAllPerc,
        Unschedued_hrs: unscheduledHrs,
        Logged_hrs: loggedHrs,
        Logged_perct: loggedPerc,
        Logged_billable_hrs: loggedBillableHrs,
        Logged_billable_perct: loggedBillablePerc,
        Logged_non_billable_hrs: loggedNonBillableHrs,
        Logged_non_billable_perct: loggedNonBillablePerc,
        Scheduled_overtime_hrs: scheduledOvertimeHrs,
        Logged_overtime_hrs: loggedOvertimeHrs,
        Timeoff_Holiday_hrs: timeoffHolidayHrs,
        Timeoff_Holiday_days: timeoffHolidayDays,
      };
    });
    chartArrayCSV.push(totalChartObject);
    await setChartCSV(chartArrayCSV);
  }
};
