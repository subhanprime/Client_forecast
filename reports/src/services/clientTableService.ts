import axios from 'axios';
import DepartmentInterface from '../interface/departmentInterface';
import People from '../interface/peopleListInterface';
import PeopleFilter from '../interface/peopleFilterInterface';
import Task from '../interface/taskInterface';
import Client from '../interface/clientInterface';
import Project from '../interface/projectInterface';

export const getClientDataManually = (
  peopleFilterData: PeopleFilter,
  projectData: Project,
  // clientData:Client[],
): Promise<any[]> => new Promise(async (resolve, reject) => {
  const budgetsObj = peopleFilterData['legacy.budgets'];
  const scheduledObject = peopleFilterData['legacy.totals'];
  const clientProjectsMap: Record<string, {
    name: string;
    budget: number;
    scheduled: number;
    logged: number;
    projects: {
      name: string;
      budget: number;
      scheduled: number;
      logged: number;
    }[];
  }> = {};

  projectData.forEach((project: Project) => {
    // clientData.forEach((client: Client) => {
    // if (client.id === project.client_id) {
    if (project.client !== '') {
      // const clientName = client.val;
      const clientName = project.client;

      if (!clientProjectsMap[clientName]) {
        // Initialize if it's the first time encountering this clientName
        clientProjectsMap[clientName] = {
          name: clientName,
          budget: 0,
          scheduled: 0,
          logged: 0,
          projects: [],
        };
      }

      const indivisualClientObj = {
        name: project.name,
        budget: 0,
        scheduled: 0,
        logged: 0,
      };

      let indivisualScheduledHours = 0;
      scheduledObject.forEach((total: any) => {
        if (total.project_id === project.project_id) {
          if (Object.prototype.hasOwnProperty.call(budgetsObj?.projects, project.project_id)) {
            const budgetValue = budgetsObj.projects[project.project_id].budget;
            if (budgetValue === null) {
              indivisualClientObj.budget = 0;
            } else {
              indivisualClientObj.budget = budgetValue;
            }
          }
          indivisualScheduledHours += total.hours.scheduled;
        }
      });

      indivisualClientObj.scheduled = indivisualScheduledHours;
      clientProjectsMap[clientName].projects.push(indivisualClientObj);
    } else {
      const clientName = 'No Client';

      if (!clientProjectsMap[clientName]) {
        // Initialize if it's the first time encountering this clientName
        clientProjectsMap[clientName] = {
          name: clientName,
          budget: 0,
          scheduled: 0,
          logged: 0,
          projects: [],
        };
      }

      const indivisualClientObj = {
        name: project.name,
        budget: 0,
        scheduled: 0,
        logged: 0,
      };

      let indivisualScheduledHours = 0;
      scheduledObject.forEach((total: any) => {
        if (total.project_id === project.project_id) {
          if (Object.prototype.hasOwnProperty.call(budgetsObj?.projects, project.project_id)) {
            const budgetValue = budgetsObj.projects[project.project_id].budget;
            if (budgetValue === null) {
              indivisualClientObj.budget = 0;
            } else {
              indivisualClientObj.budget = budgetValue;
            }
          }
          indivisualScheduledHours += total.hours.scheduled;
        }
      });

      indivisualClientObj.scheduled = indivisualScheduledHours;
      clientProjectsMap[clientName].projects.push(indivisualClientObj);
    }
    // });
  });

  // Convert the values of the dictionary into an array
  const resultArray = Object.values(clientProjectsMap);
  resultArray.forEach((e:any, index:number) => {
    let totalScheduledHours = 0;
    e.projects.forEach((project:any) => {
      totalScheduledHours += project.scheduled;
    });
    resultArray[index].scheduled = totalScheduledHours;
  });
  resolve(resultArray);
});
