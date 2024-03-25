import axios from 'axios';
import Task from '../interface/taskInterface';
import PeopleFilter from '../interface/peopleFilterInterface';
import People from '../interface/peopleListInterface';

// export const getTaskDataMockoon = async (): Promise<any[]> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/task_table_data`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getTaskDataManually = (
  taskData: Task,
  peopleFilterData:PeopleFilter,
  peopleData:People,
): Promise<any[]> => new Promise(async (resolve, reject) => {
  try {
    const totalLegacy = peopleFilterData['legacy.totals'];
    const listofTask: any[] = [];
    const noTaskupdatedPeopleObj:any = {
      name: 'No Task Allocation', scheduled: 0, billable: 0, nonbillable: 0, people: [], billablepert: 0,
    };
    taskData.forEach((item1: { val: any; ids: any; status:number }) => {
      const arrayOfObjects = Object.entries(item1.ids).map(([key, value]) => ({
        id: key,
        [key]: value,
        name: item1.val,
        projectId: (value as any).projectId,
        personIds: (value as any).personIds,
        personId: (value as any).personIds[0],
        status: (value as any).status,
      }));
      arrayOfObjects.forEach((e:any) => {
        if (e.status !== 2) {
          let totalBillable = 0;
          let totalScheduled = 0;
          let totalNonBillable = 0;

          const updatedPeopleObj = {
            ...e, scheduled: 0, billable: 0, nonbillable: 0, people: [], billablepert: 0,
          };
          totalLegacy.forEach((x) => {
            if (e.id === x.id && e.projectId === x.project_id && e.personId === x.person_id) {
              let indivisualScheduledHours = 0;
              let indivisualBillableHours = 0;
              let indivisualNonBillableHours = 0;

              const updatedPeopleObject = {
                ...x, billable: 0, nonbillable: 0, scheduled: 0, name: '', billablepert: 0,
              };
              const personName = peopleData.find((person: { people_id: any; }) => person.people_id === e.personId);
              indivisualScheduledHours += x.hours.scheduled;
              if (x.billable) {
                indivisualBillableHours += x.hours.scheduled;
              }
              if (x.billable === false) {
                indivisualNonBillableHours += x.hours.scheduled;
              }
              updatedPeopleObject.scheduled = indivisualScheduledHours;
              updatedPeopleObject.billable = indivisualBillableHours;
              updatedPeopleObject.nonbillable = indivisualNonBillableHours;
              updatedPeopleObject.name = personName.name;
              if (indivisualScheduledHours !== 0) {
                updatedPeopleObject.billablepert = Math.round((indivisualBillableHours / indivisualScheduledHours) * 100);
              }

              updatedPeopleObj.people.push(updatedPeopleObject);
            }
          });
          updatedPeopleObj.people.forEach((upo: any) => {
            totalScheduled += upo.scheduled;
            totalBillable += upo.billable;
            totalNonBillable += upo.nonbillable;
          });
          updatedPeopleObj.scheduled = totalScheduled;
          updatedPeopleObj.billable = totalBillable;
          updatedPeopleObj.nonbillable = totalNonBillable;
          if (totalScheduled !== 0) {
            updatedPeopleObj.billablepert = Math.round((totalBillable / totalScheduled) * 100);
          }
          if (updatedPeopleObj.people.length > 0) {
            listofTask.push(updatedPeopleObj);
          }
        } else {
          // THIS IS FOR NO TASK ALLOCATION IF STATUS ID IS 2 on all the tasks then we need to create No Task Allocation Project
          // With all the names of people in the task people array
          e.personIds.forEach((peopleList: any) => {
            totalLegacy.forEach((x) => {
              if (peopleList === x.person_id && e.projectId === x.project_id && parseInt(e.id, 10) === x.id) {
                let noTaskindivisualScheduledHours = 0;
                let noTaskindivisualBillableHours = 0;
                let noTaskindivisualNonBillableHours = 0;

                // FOR INDIVISUAL SUM OF BILLABLE NON BILLABLE AND SCHEDULED TASKS OF PEOPLE
                const noTaskupdatedPeopleObject = {
                  ...x, billable: 0, nonbillable: 0, scheduled: 0, name: '', billablepert: 0,
                };
                const personName = peopleData.find((person: { people_id: any; }) => person.people_id === peopleList);
                noTaskindivisualScheduledHours += x.hours.scheduled;
                if (x.billable) {
                  noTaskindivisualBillableHours += x.hours.scheduled;
                }
                if (x.billable === false) {
                  noTaskindivisualNonBillableHours += x.hours.scheduled;
                }

                noTaskupdatedPeopleObject.scheduled = noTaskindivisualScheduledHours;
                noTaskupdatedPeopleObject.billable = noTaskindivisualBillableHours;
                noTaskupdatedPeopleObject.nonbillable = noTaskindivisualNonBillableHours;
                noTaskupdatedPeopleObject.name = personName.name;
                if (noTaskindivisualScheduledHours !== 0) {
                  noTaskupdatedPeopleObject.billablepert = Math.round((noTaskindivisualBillableHours / noTaskindivisualScheduledHours) * 100);
                }
                noTaskupdatedPeopleObj.people.push(noTaskupdatedPeopleObject);
              }
            });
          });
          // FOR OVERALLL SUM OF BILLABLE NON BILLABLE AND SCHEDULED TASKS OF PEOPLE
          let noTasktotalBillable = 0;
          let noTasktotalScheduled = 0;
          let noTasktotalNonBillable = 0;
          let noTasktotalBillablePert = 0;
          noTaskupdatedPeopleObj.people.forEach((indivisualSum: any) => {
            noTasktotalBillable += indivisualSum.billable;
            noTasktotalScheduled += indivisualSum.scheduled;
            noTasktotalNonBillable += indivisualSum.nonbillable;
            noTasktotalBillablePert = Math.round((noTasktotalBillable / noTasktotalScheduled) * 100);
          });
          noTaskupdatedPeopleObj.billable = noTasktotalBillable;
          noTaskupdatedPeopleObj.scheduled = noTasktotalScheduled;
          noTaskupdatedPeopleObj.nonbillable = noTasktotalNonBillable;
          noTaskupdatedPeopleObj.billablepert = noTasktotalBillablePert;
        }
      });
      // if ([noTaskupdatedPeopleObj].length > 0) {
      //   resolve([noTaskupdatedPeopleObj]);
      // } else {
      //   resolve(listofTask);
      // }

      if (listofTask.length !== 0) {
        resolve(listofTask);
      } else {
        resolve([noTaskupdatedPeopleObj]);
      }
    });
  } catch (e) { /* empty */ }
});
