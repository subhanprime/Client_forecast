import { ForeignFilteredData } from '../constants/filterTypes';

export const filterPeople = (
  people:PeopleTasks[],
  localField:string,
  foreignField:string,
  selected:ForeignFilteredData,
  included:boolean,
  project:ProjectTask[],
  view:'Schedule' | 'Project Plan',
) => {
  let selectedData:ForeignFilteredData | null = null;
  if (Array.isArray(selected)) {
    selectedData = selected[1];
  } else {
    selectedData = selected;
  }

  if (view === 'Schedule') {
    const filtered = people.filter((per) => {
      if (((per as any)[localField] === (selectedData as any)[foreignField]) === included) {
        return true;
      }
      return false;
    });
    return filtered;
  }
  if (view === 'Project Plan') {
    const filtered = project.map((pro) => {
      const newPeep = pro.people.filter((per) => {
        if (((per as any)[localField] === (selectedData as any)[foreignField]) === included) {
          return true;
        }
        return false;
      });
      return {
        ...pro,
        people: newPeep,
      };
    });
    const temp = filtered.filter((fil) => fil.people.length > 0);
    return temp;
  }

  return [];
};

export const filterPeopleManager = (
  people:PeopleTasks[],
  selected:ForeignFilteredData,
  included:boolean,
  project:ProjectTask[],
  view:'Schedule' | 'Project Plan',
) => {
  let selectedData:ForeignFilteredData | null = null;
  if (Array.isArray(selected)) {
    selectedData = selected[1];
  } else {
    selectedData = selected;
  }

  if (view === 'Schedule') {
    const filtered = people.filter((per) => {
      if ((per.managers.includes((selectedData as People).account_id as number)) === included) {
        return true;
      }
      return false;
    });
    return filtered;
  }
  if (view === 'Project Plan') {
    const filtered = project.map((pro) => {
      const newPeep = pro.people.filter((per) => {
        if ((per.managers.includes((selectedData as People).account_id as number)) === included) {
          return true;
        }
        return false;
      });
      return {
        ...pro,
        people: newPeep,
      };
    });
    const temp = filtered.filter((fil) => fil.people.length > 0);
    return temp;
  }
  return [];
};

export const filterPeopleTags = (
  people:PeopleTasks[],
  selected:ForeignFilteredData,
  included:boolean,
  project:ProjectTask[],
  view:'Schedule' | 'Project Plan',
) => {
  let selectedData:ForeignFilteredData | null = null;
  if (Array.isArray(selected)) {
    selectedData = selected[1];
  } else {
    selectedData = selected;
  }

  if (view === 'Schedule') {
    const filtered = people.filter((per) => {
      const tags = per.tags.filter((tag) => tag.name === (selectedData as any).name);
      if ((tags.length > 0) === included) {
        return true;
      }
      return false;
    });
    return filtered;
  }
  if (view === 'Project Plan') {
    const filtered = project.map((pro) => {
      const newPeep = pro.people.filter((per) => {
        const tags = per.tags.filter((tag) => tag.name === (selectedData as any).name);
        if ((tags.length > 0) === included) {
          return true;
        }
        return false;
      });
      return {
        ...pro,
        people: newPeep,
      };
    });
    const temp = filtered.filter((fil) => fil.people.length > 0);
    return temp;
  }
  return [];
};
export const filterProjectOwner = (
  people:PeopleTasks[],
  selected:ForeignFilteredData,
  included:boolean,
  project:ProjectTask[],
  view:'Schedule' | 'Project Plan',
) => {
  let selectedData:ForeignFilteredData | null = null;
  if (Array.isArray(selected)) {
    selectedData = selected[1];
  } else {
    selectedData = selected;
  }
  const projectMap:ProjectsAllMap = new Map();
  project.forEach((pro) => {
    projectMap.set(pro.project_id, { ...pro });
  });

  if (view === 'Schedule') {
    const filtered = people.map((per) => {
      const tasks = per.tasks.filter((task) => {
        const pro = projectMap.get(task.project_id);
        if (pro) {
          return (pro.project_manager === (selectedData as any).account_id) === included;
        }
        return false;
      });
      return { ...per, tasks };
    });
    const temp = filtered.filter((fil) => fil.tasks.length > 0);
    return temp;
  }
  if (view === 'Project Plan') {
    const filtered = project.filter((pro) => (
      pro.project_manager === (selectedData as any).account_id) === included);
    return filtered;
  }
  return [];
};

export const filterProjects = (
  people:PeopleTasks[],
  selected:ForeignFilteredData,
  included:boolean,
  project:ProjectTask[],
  view:'Schedule' | 'Project Plan',
) => {
  let selectedData:ForeignFilteredData | null = null;
  if (Array.isArray(selected)) {
    selectedData = selected[1];
  } else {
    selectedData = selected;
  }

  if (view === 'Project Plan') {
    const filtered = project.filter((
      pro,
    ) => (pro.project_id === (selectedData as any).project_id) === included);
    return filtered;
  }
  return [];
};
