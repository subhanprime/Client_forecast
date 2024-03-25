import axios from 'axios';
import DepartmentInterface from '../interface/departmentInterface';
import People from '../interface/peopleListInterface';
import PeopleFilter from '../interface/peopleFilterInterface';
import Roles from '../interface/rolesInterface';
import Task from '../interface/taskInterface';
import { RolesTable } from '../interface/rolesTableInterface';

// export const getRolesDataMockoon = async ():
// Promise<RolesTable[]> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/roles_table_data`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getRolesDataManually = (
  peopleData: People,
  peopleFilterData: PeopleFilter,
  rolesData: Roles,
  taskData:Task,
): Promise<any[]> => new Promise(async (resolve, reject) => {
  let rolesTableData: any[] = [];
  const nonRoleTableData:any[] = [];
  const capacityObj = peopleFilterData['legacy.capacity'];
  const overtimeObj = peopleFilterData['legacy.overtime'];
  const scheduledObject = peopleFilterData['legacy.totals'];
  rolesTableData = rolesData.map((role: any) => {
    const updatedRolesObject: any = {
      ...role,
      capacity: 0,
      scheduled: 0,
      billable: 0,
      nonbillable: 0,
      timeoff: 0,
      overtime: 0,
      schedulepercentage: 0,
      people: [],
    };
    const noRolesTableData : any = {
      id: 112233,
      created_by: 112233,
      created: '',
      modified: '',
      modified_by: 112233,
      name: 'No Role',
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

    let noRoletotalScheduledHours = 0;
    let noRoletotalBillableHours = 0;
    let noRoletotalNonBillableHours = 0;
    let noRoletotalTimeOffHours = 0;
    let noRoletotalOvertimeHours = 0;
    let noRoletotalCapacityHours = 0;

    peopleData.forEach((p: { role_id: any; people_id: number; }) => {
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

      if (p.role_id === role.id) {
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
              // if (sched.person_id === p.people_id) {
              //   if (typeof sched?.hours?.scheduled === 'number'
              //   && Object.keys(tdl.ids).includes(sched.id.toString())) {
              //     totalIndivisualScheduledHours += sched.hours.scheduled;
              //   }
              // }
              // if (sched.person_id === p.people_id && sched.billable === true
              //   && Object.keys(tdl.ids).includes(sched.id.toString())) {
              //   if (typeof sched?.hours?.scheduled === 'number') {
              //     totalIndivisualBillableHours += sched.hours.scheduled;
              //   }
              // }
              // if (sched.person_id === p.people_id && sched.billable === false
              //   && Object.keys(tdl.ids).includes(sched.id.toString())) {
              //   if (typeof sched?.hours?.scheduled === 'number') {
              //     totalIndivisualNonBillableHours += sched.hours.scheduled;
              //   }
              // }
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

        updatedRolesObject.people.push(updatedPeopleObject);
      } else {
        // NO ROLE TBALE DATA
        updatedPeopleObject.capacity = capacityObj[p.people_id as number];
        if (typeof overtimeObj[p.people_id as number]?.total === 'number') {
          updatedPeopleObject.overtime = overtimeObj[p.people_id as number]?.total;
        }

        if (taskData.length > 0) {
          Object.keys(taskData).forEach((key) => {
            const tdl = taskData[key];
            scheduledObject.forEach((sched: any) => {
              if (sched.person_id === p.people_id) {
                if (typeof sched?.hours?.scheduled === 'number'
                && Object.keys(tdl.ids).includes(sched.id.toString())) {
                  totalIndivisualScheduledHours += sched.hours.scheduled;
                }
              }
              if (sched.person_id === p.people_id && sched.billable === true
                && Object.keys(tdl.ids).includes(sched.id.toString())) {
                if (typeof sched?.hours?.scheduled === 'number') {
                  totalIndivisualBillableHours += sched.hours.scheduled;
                }
              }
              if (sched.person_id === p.people_id && sched.billable === false
                 && Object.keys(tdl.ids).includes(sched.id.toString())) {
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
        noRolesTableData.people.push(updatedPeopleObject);
      }
    });
    // ROLED TABLE DATA
    updatedRolesObject.people.forEach((ud: any) => {
      totalCapacityHours += ud.capacity;
      totalOvertimeHours += ud.overtime;
      totalTimeOffHours += ud.timeoff;
      totalNonBillableHours += ud.nonbillable;
      totalBillableHours += ud.billable;
      totalScheduledHours += ud.scheduled;
    });
    // NO ROLE TABLE DATA
    noRolesTableData.people.forEach((nr:any) => {
      noRoletotalCapacityHours += nr.capacity;
      noRoletotalOvertimeHours += nr.overtime;
      noRoletotalTimeOffHours += nr.timeoff;
      noRoletotalNonBillableHours += nr.nonbillable;
      noRoletotalBillableHours += nr.billable;
      noRoletotalScheduledHours += nr.scheduled;
    });
    // NO ROLE TABLE DATA

    updatedRolesObject.scheduled = totalScheduledHours;
    updatedRolesObject.billable = totalBillableHours;
    updatedRolesObject.nonbillable = totalNonBillableHours;
    updatedRolesObject.timeoff = totalTimeOffHours;
    updatedRolesObject.overtime = totalOvertimeHours;
    updatedRolesObject.capacity = totalCapacityHours;
    updatedRolesObject.schedulepercentage = Math.round((totalScheduledHours / totalCapacityHours) * 100);
    if (isNaN(updatedRolesObject.schedulepercentage)) {
      updatedRolesObject.schedulepercentage = 0;
    }
    // ROLED TABLE DATA

    noRolesTableData.scheduled = noRoletotalScheduledHours;
    noRolesTableData.billable = noRoletotalBillableHours;
    noRolesTableData.nonbillable = noRoletotalNonBillableHours;
    noRolesTableData.timeoff = noRoletotalTimeOffHours;
    noRolesTableData.overtime = noRoletotalOvertimeHours;
    noRolesTableData.capacity = noRoletotalCapacityHours;
    noRolesTableData.schedulepercentage = Math.round((noRoletotalScheduledHours / noRoletotalCapacityHours) * 100);
    nonRoleTableData.push(noRolesTableData);
    return updatedRolesObject;
  });
  if (rolesTableData.length === 0) {
    rolesTableData.push(nonRoleTableData[0]);
  }
  resolve(rolesTableData);
});
