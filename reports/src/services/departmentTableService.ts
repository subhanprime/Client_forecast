import axios from 'axios';
import DepartmentInterface from '../interface/departmentInterface';
import People from '../interface/peopleListInterface';
import PeopleFilter from '../interface/peopleFilterInterface';
import Task from '../interface/taskInterface';

// export const getDepartmentDataMockoon = async ():
// Promise<DepartmentInterface[]> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/department_table_data`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getDepartmentDataManually = (
  peopleData: People,
  peopleFilterData: PeopleFilter,
  departmentData: DepartmentInterface,
  taskData:Task,
): Promise<any[]> => new Promise(async (resolve, reject) => {
  let departmentTableData: any[] = [];
  const noDepartmentTableData: any[] = [];

  const capacityObj = peopleFilterData['legacy.capacity'];
  const overtimeObj = peopleFilterData['legacy.overtime'];
  const scheduledObject = peopleFilterData['legacy.totals'];

  departmentTableData = departmentData.map((dept) => {
    const updatedDeptObject: any = {
      ...dept,
      capacity: 0,
      scheduled: 0,
      billable: 0,
      nonbillable: 0,
      timeoff: 0,
      overtime: 0,
      schedulepercentage: 0,
      people: [],
    };
    const updatedNoDeptObject: any = {
      department_id: 112233,
      name: 'No Department',
      parent_id: 112233,
      capacity: 0,
      scheduled: 0,
      billable: 0,
      nonbillable: 0,
      timeoff: 0,
      overtime: 0,
      schedulepercentage: 0,
      people: [],
    };

    let totalScheduledHours = 0;
    let totalBillableHours = 0;
    let totalNonBillableHours = 0;
    let totalTimeOffHours = 0;
    let totalOvertimeHours = 0;
    let totalCapacityHours = 0;

    let noDepttotalScheduledHours = 0;
    let noDepttotalBillableHours = 0;
    let noDepttotalNonBillableHours = 0;
    let noDepttotalTimeOffHours = 0;
    let noDepttotalOvertimeHours = 0;
    let noDepttotalCapacityHours = 0;

    // TO ADD A NEW PROJECT OF LEAVE IN THE UserProject
    // timeOffObject.forEach((timeOff:any) => {
    //   if (timeOff && timeOff.holiday === false) {
    //     const peopleInProject: number[] = [];
    //     const peopleIds = Object.keys(timeOff.people);
    //     peopleIds.forEach((ids) => {
    //       if (parseInt(ids, 10) === parseInt(e.people_id, 10)) {
    //         peopleInProject.push(parseInt(e.people_id, 10));
    //         const timeOf = timeOff.people[e.people_id].hours;

    //         const timeOffProject = {
    //           project_id: timeOff.id,
    //           name: timeOff.name,
    //           color: '173074',
    //           tags: [],
    //           budget_type: 0,
    //           budget_per_phase: 0,
    //           non_billable: 0,
    //           tentative: 0,
    //           locked_task_list: 0,
    //           active: 0,
    //           project_manager: 0,
    //           all_pms_schedule: 0,
    //           created: '2023-12-05 12:39:15',
    //           modified: '2023-12-05 12:39:15',
    //           rate_type: 1,
    //           ext_calendar_count: 0,
    //           people_ids: peopleInProject,
    //           start_date: '2023-12-04',
    //           end_date: '2023-12-08',
    //           manager: {
    //           },
    //           people_id: 0,
    //           scheduled: 0,
    //           billable: 0,
    //           nonbillable: 0,
    //           billablepert: 0,
    //           timeOff: timeOf,
    //         };
    //         userProject.push(timeOffProject);
    //       }
    //     });
    //   }
    // });

    peopleData.forEach((p: { department_id: any; people_id: number; }) => {
      let totalIndivisualScheduledHours = 0;
      let totalIndivisualBillableHours = 0;
      let totalIndivisualNonBillableHours = 0;
      let totalIndivisualTimeOffHours = 0;
      const updatedPeopleObject: any = {
        ...p,
        capacity: 0,
        scheduled: 0,
        billable: 0,
        nonbillable: 0,
        timeoff: 0,
        overtime: 0,
        schedulepercentage: 0,
      };

      if (p.department_id === dept.department_id) {
        // Type assertions for capacityObj and overtimeObj
        updatedPeopleObject.capacity = capacityObj[p.people_id as number];

        if (typeof overtimeObj[p.people_id as number]?.total === 'number') {
          updatedPeopleObject.overtime = overtimeObj[p.people_id as number]?.total;
        }

        if (taskData.length > 0) {
          Object.keys(taskData).forEach((key) => {
            const tdl = taskData[key];
            scheduledObject.forEach((sched: any) => {
              if (sched.person_id === p.people_id && Object.keys(tdl.ids).includes(sched.id.toString())) {
                if (typeof sched?.hours?.scheduled === 'number') {
                  totalIndivisualScheduledHours += sched.hours.scheduled;
                }
                if (typeof sched?.hours?.scheduled === 'number' && sched.billable) {
                  totalIndivisualBillableHours += sched.hours.scheduled;
                }
                if (typeof sched?.hours?.scheduled === 'number' && sched.billable === false) {
                  totalIndivisualNonBillableHours += sched.hours.scheduled;
                }
              }
              // FOR NON WORKING DAYS THAT ARE NOT OFFICIAL HOLIDAYS
              if (sched.billable === undefined && sched.project_id === undefined && sched.person_id === p.people_id) {
                totalIndivisualTimeOffHours = sched.hours.scheduled + totalIndivisualTimeOffHours;
              }
            });
          });
        }

        updatedPeopleObject.scheduled = totalIndivisualScheduledHours;
        updatedPeopleObject.billable = totalIndivisualBillableHours;
        updatedPeopleObject.nonbillable = totalIndivisualNonBillableHours;
        updatedPeopleObject.timeoff = totalIndivisualTimeOffHours;
        updatedPeopleObject.schedulepercentage = Math.round(
          (totalIndivisualScheduledHours / capacityObj[p.people_id as number]) * 100,
        );
        if (isNaN(updatedPeopleObject.schedulepercentage)) {
          updatedPeopleObject.schedulepercentage = 0;
        }
        updatedDeptObject.people.push(updatedPeopleObject);
      } else {
        // NO DEPRATMENT OBJ
        updatedPeopleObject.capacity = capacityObj[p.people_id as number];
        if (typeof overtimeObj[p.people_id as number]?.total === 'number') {
          updatedPeopleObject.overtime = overtimeObj[p.people_id as number]?.total;
        }

        if (taskData.length > 0) {
          Object.keys(taskData).forEach((key) => {
            const tdl = taskData[key];
            scheduledObject.forEach((sched: any) => {
              if (sched.person_id === p.people_id) {
                if (typeof sched?.hours?.scheduled === 'number' && Object.keys(tdl.ids).includes(sched.id.toString())) {
                  totalIndivisualScheduledHours += sched.hours.scheduled;
                }
              }
              if (sched.person_id === p.people_id && sched.billable === true && Object.keys(tdl.ids).includes(sched.id.toString())) {
                if (typeof sched?.hours?.scheduled === 'number') {
                  totalIndivisualBillableHours += sched.hours.scheduled;
                }
              }
              if (sched.person_id === p.people_id && sched.billable === false && Object.keys(tdl.ids).includes(sched.id.toString())) {
                if (typeof sched?.hours?.scheduled === 'number') {
                  totalIndivisualNonBillableHours += sched.hours.scheduled;
                }
              }
            });
          });
        }
        updatedPeopleObject.scheduled = totalIndivisualScheduledHours;
        updatedPeopleObject.billable = totalIndivisualBillableHours;
        updatedPeopleObject.nonbillable = totalIndivisualNonBillableHours;
        updatedPeopleObject.schedulepercentage = Math.round(
          (totalIndivisualScheduledHours / capacityObj[p.people_id as number]) * 100,
        );
        if (isNaN(updatedPeopleObject.schedulepercentage)) {
          updatedPeopleObject.schedulepercentage = 0;
        }
        updatedNoDeptObject.people.push(updatedPeopleObject);
      }
    });

    // DEPRATMENT OBJ
    updatedDeptObject.people.forEach((ud: any) => {
      totalCapacityHours += ud.capacity === undefined ? 0 : ud.capacity;
      totalOvertimeHours += ud.overtime;
      totalTimeOffHours += ud.timeoff;
      totalNonBillableHours += ud.nonbillable;
      totalBillableHours += ud.billable;
      totalScheduledHours += ud.scheduled;
    });

    // NO DEPRATMENT OBJ
    updatedNoDeptObject.people.forEach((ud: any) => {
      noDepttotalCapacityHours += ud.capacity;
      noDepttotalOvertimeHours += ud.overtime;
      noDepttotalTimeOffHours += ud.timeoff;
      noDepttotalNonBillableHours += ud.nonbillable;
      noDepttotalBillableHours += ud.billable;
      noDepttotalScheduledHours += ud.scheduled;
    });

    // DEPRATMENT OBJ
    updatedDeptObject.scheduled = totalScheduledHours;
    updatedDeptObject.billable = totalBillableHours;
    updatedDeptObject.nonbillable = totalNonBillableHours;
    updatedDeptObject.timeoff = totalTimeOffHours;
    updatedDeptObject.overtime = totalOvertimeHours;
    updatedDeptObject.capacity = totalCapacityHours;
    updatedDeptObject.schedulepercentage = Math.round((totalScheduledHours / totalCapacityHours) * 100);
    if (isNaN(updatedDeptObject.schedulepercentage)) {
      updatedDeptObject.schedulepercentage = 0;
    }

    // NO DEPRATMENT OBJ
    updatedNoDeptObject.scheduled = noDepttotalScheduledHours;
    updatedNoDeptObject.billable = noDepttotalBillableHours;
    updatedNoDeptObject.nonbillable = noDepttotalNonBillableHours;
    updatedNoDeptObject.timeoff = noDepttotalTimeOffHours;
    updatedNoDeptObject.overtime = noDepttotalOvertimeHours;
    updatedNoDeptObject.capacity = noDepttotalCapacityHours;
    updatedNoDeptObject.schedulepercentage = Math.round((noDepttotalScheduledHours / noDepttotalCapacityHours) * 100);
    if (isNaN(updatedNoDeptObject.schedulepercentage)) {
      updatedNoDeptObject.schedulepercentage = 0;
    }
    noDepartmentTableData.push(updatedNoDeptObject);
    return updatedDeptObject;
  });
  if (departmentTableData.length === 0) {
    departmentTableData.push(noDepartmentTableData[0]);
  }
  resolve(departmentTableData);
});
