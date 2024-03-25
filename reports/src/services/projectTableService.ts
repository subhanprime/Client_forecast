import axios from 'axios';
import { Hour, ProjectData } from '../components/tables/tableComponent/projectInterface';
import Task from '../interface/taskInterface';
import People from '../interface/peopleListInterface';
import Project from '../interface/projectInterface';
import PeopleFilter from '../interface/peopleFilterInterface';

// export const getProjectDataMockoon = async (): Promise<any[]> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/project_table_data`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

// export const getProjectDataManually = (taskData:Task, peopleData:People, projectData:Project, peopleFilterData:PeopleFilter): Promise<ProjectData[]> => new Promise(async (resolve, reject) => {
//   try {
//     let projectList: Project;
//     let peopleList:People;
//     let projectFilterlist:PeopleFilter;
//     let projectTableData:ProjectData[] = [];
//     const updatedProjectList: ProjectData[] = [];
//     const filterProjectTable = async () => {
//       const personMap:any = new Map();
//       const hoursMap:any = new Map();
//       const managerMap:any = new Map();
//       peopleList.forEach((person:any) => {
//         personMap.set(person.people_id, { ...person });
//         managerMap.set(person.account_id, { ...person });
//       });

//       const hours = projectFilterlist['legacy.totals'];
//       hours.forEach((hour:Hour) => {
//         const key = { person_id: hour.person_id, project_id: hour.project_id };
//         // Check if the key is already in the map
//         if (hoursMap.has(JSON.stringify(key))) {
//           // If the key is present, push the new value to the array
//           hoursMap.get(JSON.stringify(key)).push({ ...hour });
//         } else {
//           // If the key is not present, create a new array with the value
//           hoursMap.set(JSON.stringify(key), [{ ...hour }]);
//         }
//       });
//       const projectsNewPromises = projectList.map(async (project: ProjectData) => {
//         const updatedProject: ProjectData = {
//           ...project, people: [], manager: {}, scheduled: 0, billable: 0, nonbillable: 0,
//         };

//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         project.people_ids && project.people_ids.length > 0 && project.people_ids.forEach(async (id) => {
//           let totalScheduledHours = 0;
//           let totalIndivisualScheduledHours = 0;
//           let totalBillableHours = 0;
//           let totalIndivisualBillableHours = 0;
//           let totalNonBillableHours = 0;
//           let totalIndivisualNonBillableHours = 0;

//           const temp = personMap.get(id);
//           const managerName = managerMap.get(project.project_manager);
//           const key = { person_id: id, project_id: project.project_id };
//           console.log('HOURS MAP', hoursMap);
//           console.log('DSJDIOAJSDIOJASIOD', JSON.stringify(key));
//           const h = hoursMap.get(JSON.stringify(key));

//           if (taskData.length > 0) {
//             Object.keys(taskData).forEach((keys) => {
//               const tdl = taskData[keys];
//               h?.forEach((element:any) => {
//                 console.log('ELEMENT', element);
//                 if (Object.keys(tdl.ids).includes(element.id.toString())) {
//                   totalScheduledHours = element.hours.scheduled + totalScheduledHours;
//                 }
//                 if (element.billable && Object.keys(tdl.ids).includes(element.id.toString())) {
//                   totalBillableHours = element.hours.scheduled + totalBillableHours;
//                 } else if (Object.keys(tdl.ids).includes(element.id.toString())) {
//                   totalNonBillableHours = element.hours.scheduled + totalNonBillableHours;
//                 }
//               });
//             });
//           }
//           // Create a new object with updated properties for temp
//           const updatedTemp = {
//             ...temp, hours: h, scheduled: totalScheduledHours, billable: totalBillableHours, nonbillable: totalNonBillableHours, billablepert: totalScheduledHours === 0 ? 0 : (totalBillableHours / totalScheduledHours) * 100,
//           };
//           // Update the people array for the new project object
//           updatedProject.people?.push(updatedTemp);
//           updatedProject.people?.forEach((e) => {
//             totalIndivisualScheduledHours = e.scheduled + totalIndivisualScheduledHours;
//             totalIndivisualBillableHours = e.billable + totalIndivisualBillableHours;
//             totalIndivisualNonBillableHours = e.nonbillable + totalIndivisualNonBillableHours;
//           });
//           // Update the manager property for the new project object
//           updatedProject.manager = managerName;
//           updatedProject.scheduled = totalIndivisualScheduledHours;
//           updatedProject.billable = totalIndivisualBillableHours;
//           updatedProject.nonbillable = totalIndivisualNonBillableHours;
//           updatedProject.billablepert = (totalIndivisualBillableHours / totalIndivisualScheduledHours) * 100;
//           if (isNaN(updatedProject.billablepert)) {
//             updatedProject.billablepert = 0;
//           }
//         });
//         updatedProjectList.push(updatedProject);
//         return updatedProject;
//       });
//       const projectsNew = await Promise.all(projectsNewPromises);
//       projectTableData = projectsNew;
//       resolve(projectTableData);
//     };
//     const getPeopleData = () => {
//       projectList = projectData;
//       peopleList = peopleData;
//       projectFilterlist = peopleFilterData;
//       filterProjectTable();
//     };
//     getPeopleData();
//   } catch (e) {
//     reject(e);
//   }
// });
export const getProjectDataManually = (taskData: Task, peopleData: People, projectData: Project, peopleFilterData: PeopleFilter): Promise<ProjectData[]> => new Promise(async (resolve, reject) => {
  try {
    let projectList: Project;
    let peopleList: People;
    let projectFilterlist: PeopleFilter;
    let projectTableData: ProjectData[] = [];
    const updatedProjectList: ProjectData[] = [];

    const filterProjectTable = async () => {
      const personMap: any = new Map();
      const hoursMap: any = new Map();
      const managerMap: any = new Map();
      peopleList.forEach((person: any) => {
        personMap.set(person.people_id, { ...person });
        managerMap.set(person.account_id, { ...person });
      });

      const hours = projectFilterlist['legacy.totals'];
      hours.forEach((hour: Hour) => {
        const key = { person_id: hour.person_id, project_id: hour.project_id };
        // Check if the key is already in the map
        if (hoursMap.has(JSON.stringify(key))) {
          // If the key is present, push the new value to the array
          hoursMap.get(JSON.stringify(key)).push({ ...hour });
        } else {
          // If the key is not present, create a new array with the value
          hoursMap.set(JSON.stringify(key), [{ ...hour }]);
        }
      });

      const projectsNewPromises = projectList.map(async (project: ProjectData) => {
        const updatedProject: ProjectData = {
          ...project, people: [], manager: {}, scheduled: 0, billable: 0, nonbillable: 0,
        };

        if (project.people_ids && project.people_ids.length > 0) {
          await Promise.all(project.people_ids.map(async (id) => {
            let totalScheduledHours = 0;
            let totalIndivisualScheduledHours = 0;
            let totalBillableHours = 0;
            let totalIndivisualBillableHours = 0;
            let totalNonBillableHours = 0;
            let totalIndivisualNonBillableHours = 0;

            const temp = personMap.get(id);
            const managerName = managerMap.get(project.project_manager);
            const key = { person_id: id, project_id: project.project_id };
            const h = hoursMap.get(JSON.stringify(key));
            // console.log('KEY', key);
            // console.log('KEY', hoursMap.get(JSON.stringify({ person_id: 18123910, project_id: 8903646 })));

            if (taskData.length > 0) {
              Object.keys(taskData).forEach((keys) => {
                const tdl = taskData[keys];
                h?.forEach((element: any) => {
                  if (Object.keys(tdl.ids).includes(element.id.toString())) {
                    totalScheduledHours = element.hours.scheduled + totalScheduledHours;
                  }
                  if (element.billable && Object.keys(tdl.ids).includes(element.id.toString())) {
                    totalBillableHours = element.hours.scheduled + totalBillableHours;
                  } else if (Object.keys(tdl.ids).includes(element.id.toString())) {
                    totalNonBillableHours = element.hours.scheduled + totalNonBillableHours;
                  }
                });
              });
            }

            // Create a new object with updated properties for temp
            const updatedTemp = {
              ...temp, hours: h, scheduled: totalScheduledHours, billable: totalBillableHours, nonbillable: totalNonBillableHours, billablepert: totalScheduledHours === 0 ? 0 : (totalBillableHours / totalScheduledHours) * 100,
            };

            // Update the people array for the new project object
            updatedProject.people?.push(updatedTemp);
            updatedProject.people?.forEach((e) => {
              totalIndivisualScheduledHours = e.scheduled + totalIndivisualScheduledHours;
              totalIndivisualBillableHours = e.billable + totalIndivisualBillableHours;
              totalIndivisualNonBillableHours = e.nonbillable + totalIndivisualNonBillableHours;
            });

            // Update the manager property for the new project object
            updatedProject.manager = managerName;
            updatedProject.scheduled = totalIndivisualScheduledHours;
            updatedProject.billable = totalIndivisualBillableHours;
            updatedProject.nonbillable = totalIndivisualNonBillableHours;
            updatedProject.billablepert = (totalIndivisualBillableHours / totalIndivisualScheduledHours) * 100;

            if (isNaN(updatedProject.billablepert)) {
              updatedProject.billablepert = 0;
            }
          }));
        }

        updatedProjectList.push(updatedProject);
        return updatedProject;
      });

      const projectsNew = await Promise.all(projectsNewPromises);
      projectTableData = projectsNew;
      resolve(projectTableData);
    };

    const getPeopleData = () => {
      projectList = projectData;
      peopleList = peopleData;
      projectFilterlist = peopleFilterData;
      filterProjectTable();
    };

    getPeopleData();
  } catch (e) {
    reject(e);
  }
});
