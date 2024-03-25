import axios from 'axios';
import PeopleTableInterface from '../components/tables/tableComponent/propleInterface';
import Task from '../interface/taskInterface';
import People from '../interface/peopleListInterface';
import Project from '../interface/projectInterface';
import PeopleFilter from '../interface/peopleFilterInterface';
import DepartmentInterface from '../interface/departmentInterface';

// export const getPeopleDataMockoon = async ():
// Promise<PeopleTableInterface[]> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/people_table_data`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getPeopleDataManually = (
  taskData:Task,
  peopleData:People,
  projectData:Project,
  peopleFilterData:PeopleFilter,
  departmentData:DepartmentInterface,
): Promise<PeopleTableInterface[]> => new Promise(
  (resolve, reject) => {
    try {
      let projectList: Project;
      let peopleList:People;
      let projectFilterlist:PeopleFilter;
      let departmentList:DepartmentInterface;

      // let peopleData:PeopleTableInterface[] = [];
      const filterTable = () => {
        const departmentMap:any = new Map();
        departmentList.forEach((dept:any) => {
          departmentMap.set(dept.department_id, { ...dept });
        });

        const capacityObj = projectFilterlist['legacy.capacity'];
        const overtimeObj = projectFilterlist['legacy.overtime'];
        const scheduledObject = projectFilterlist['legacy.totals'];
        const timeOffObject = projectFilterlist['legacy.timeoff'];

        const peopleTableData = peopleList.map((e:any) => {
          const userProject: any[] = [];

          let totalScheduledHours = 0;
          let totalBillableHours = 0;
          let totalNonBillableHours = 0;
          let totalTimeOffHours = 0;

          let totalIndivisualScheduledHours = 0;
          let totalIndivisualBillableHours = 0;
          let totalIndivisualNonBillableHours = 0;
          let totalIndivisualTimeOffHours = 0;

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

                  const timeOffProject = {
                    project_id: timeOff.id,
                    name: timeOff.name,
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
              userProject.push(modifiedProj);
            }
          });
          // FOR OVERALL BILLABLE SCHEUDLED AND NONBILLABLE
          if (taskData.length > 0) {
            Object.keys(taskData).forEach((key) => {
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
                }
                // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
                // if (sched.billable === undefined && sched.project_id === undefined && sched.person_id === e.people_id) {
                //   totalTimeOffHours = sched.hours.scheduled + totalTimeOffHours;
                //   // totalTimeOffHours = sched.hours.scheduled;
                // }

                // if (sched.person_id === e.people_id
                //   && Object.keys(tdl.ids).includes(sched.id.toString())) {
                //   if (typeof sched?.hours?.scheduled === 'number') {
                //     totalScheduledHours += sched.hours.scheduled;
                //   }
                // }
                // if (sched.person_id === e.people_id && sched.billable
                //   && Object.keys(tdl.ids).includes(sched.id.toString())) {
                //   if (typeof sched?.hours?.scheduled === 'number') {
                //     totalBillableHours += sched.hours.scheduled;
                //   }
                // }
                // if (sched.person_id === e.people_id && sched.billable === false
                //   && Object.keys(tdl.ids).includes(sched.id.toString())) {
                //   if (typeof sched?.hours?.scheduled === 'number') {
                //     totalNonBillableHours += sched.hours.scheduled;
                //   }
                // }
              });
            });
            scheduledObject.forEach((sched:any) => {
              // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
              if (sched.billable === undefined && sched.project_id === undefined && sched.person_id === e.people_id) {
                totalTimeOffHours = sched.hours.scheduled + totalTimeOffHours;
                // totalTimeOffHours = sched.hours.scheduled;
              }
            });
          }

          // FOR INDIVISUAL BILLABLE SCHEUDLED AND NONBILLABLE
          userProject.forEach((element:any, index:number) => {
            totalIndivisualScheduledHours = 0;
            totalIndivisualBillableHours = 0;
            totalIndivisualNonBillableHours = 0;
            totalIndivisualTimeOffHours = 0;
            if (taskData.length > 0) {
              Object.keys(taskData).forEach((key) => {
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
                  }
                  // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
                  // if (sched.id === element.project_id) {
                  //   totalIndivisualTimeOffHours = sched.hours.scheduled + totalIndivisualTimeOffHours;
                  //   // totalIndivisualTimeOffHours = sched.hours.scheduled;
                  // }
                });
              });
              scheduledObject.forEach((sched:any) => {
                // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
                if (sched.id === element.project_id) {
                  totalIndivisualTimeOffHours = sched.hours.scheduled + totalIndivisualTimeOffHours;
                }
              });
            }
            const modifiedProj = { ...element };
            modifiedProj.scheduled = totalIndivisualScheduledHours;
            modifiedProj.billable = totalIndivisualBillableHours;
            modifiedProj.nonbillable = totalIndivisualNonBillableHours;
            modifiedProj.billablepert = (totalIndivisualBillableHours / totalIndivisualScheduledHours) * 100;
            modifiedProj.scheduledpercent = (totalIndivisualScheduledHours / totalIndivisualScheduledHours) * 100;
            modifiedProj.timeOff = totalIndivisualTimeOffHours;
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
          updatedObject.nonbillable = totalNonBillableHours;
          updatedObject.timeOff = totalTimeOffHours;
          const schedulePercentage = (totalBillableHours / capacityObj[e.people_id]) * 100;
          const billablePercentage = (totalBillableHours / totalScheduledHours) * 100;
          updatedObject.scheduledpercent = schedulePercentage;
          updatedObject.billablepert = billablePercentage;
          return updatedObject;
        });
        resolve(peopleTableData);
        // resolve(matchedObjects);
      };

      const getData = async () => {
        projectList = projectData;
        peopleList = peopleData;
        projectFilterlist = peopleFilterData;
        departmentList = departmentData;
        filterTable();
      };
      getData();
    } catch (e) {
      reject(e);
    }
  },
);
