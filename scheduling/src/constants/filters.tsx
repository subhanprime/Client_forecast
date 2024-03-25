import React from 'react';
import {
  Banknote, Building, Folder, LayoutIcon, Users2,
} from 'lucide-react';
import {
  filterPeople, filterPeopleManager, filterPeopleTags, filterProjectOwner, filterProjects,
} from '../utils/filterHelper';
import { ViewType } from './enums';
import { FilterType, ForeignData } from './filterTypes';

export const filterPage = 'Filters';

export const filters:FilterType[] = [
  {
    name: 'department',
    icon: (size = 12) => <Building size={size} />,
    color: '#FFFBD1',
    filters: [
      {
        name: 'Department',
        foreignData: ForeignData.Department,
        onBoth: 'both',
        localData: 'people',
        localKey: 'department_id',
        foreignKey: 'department_id',
        onFilter: (people, selected, included, project, view) => filterPeople(people, 'department_id', 'department_id', selected, included, project, view),
      },
    ],
  },
  {
    name: 'person',
    icon: (size = 12) => <Users2 size={size} />,
    color: '#CEE7FE',
    filters: [
      {
        name: 'Me',
        isSpecialCase: true,
        onBoth: 'both',
        foreignData: ForeignData.People,
        localData: 'people',
        localKey: 'people_id',
        foreignKey: 'people_id',
        onFilter: (people, selected, included, project, view) => filterPeople(people, 'people_id', 'people_id', selected, included, project, view),

      },
      {
        name: 'Person',
        foreignData: ForeignData.People,
        onBoth: 'both',
        localData: 'people',
        localKey: 'people_id',
        foreignKey: 'people_id',
        onFilter: (people, selected, included, project, view) => filterPeople(people, 'people_id', 'people_id', selected, included, project, view),

      },
      {
        name: 'Role',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
        onFilter: (people, selected, included, project, view) => filterPeople(people, 'role_id', 'id', selected, included, project, view),

      },
      {
        name: 'Person tag',
        foreignData: ForeignData.Tags,
        onBoth: 'both',
        localData: 'people',
        localKey: 'tags',
        foreignKey: 'name',
        onFilter: (
          people,
          selected,
          included,
          project,
          view,
        ) => filterPeopleTags(people, selected, included, project, view),
      },
      {
        name: 'Person Type',
        foreignData: ForeignData.PeopleType,
        onBoth: 'both',
        localData: 'people',
        localKey: 'people_type_id',
        foreignKey: 'people_type_id',
        onFilter: (people, selected, included, project, view) => filterPeople(people, 'people_type_id', 'people_type_id', selected, included, project, view),

      },
      {
        name: 'Manager',
        foreignData: ForeignData.Managers,
        onBoth: 'both',
        localData: 'people',
        localKey: 'managers',
        foreignKey: 'id',
        onFilter: (
          people,
          selected,
          included,
          project,
          view,
        ) => filterPeopleManager(people, selected, included, project, view),

      },
    ],
  },

  {
    name: 'client',
    icon: (size = 12) => <Banknote size={size} />,
    color: '#C7EBE5',
    filters: [
      {
        name: 'Client',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
      },

    ],
  },
  {
    name: 'project',
    icon: (size = 12) => <Folder size={size} />,
    color: '#F9D8EC',
    filters: [
      {
        name: 'Project',
        foreignData: ForeignData.Projects,
        onBoth: ViewType.ProjectPlan,
        localData: 'project',
        localKey: 'project_id',
        foreignKey: 'project_id',
        onFilter: (
          people,
          selected,
          included,
          project,
          view,
        ) => filterProjects(people, selected, included, project, view),
      },
      {
        name: 'Phase',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
      },
      {
        name: 'Project Tag',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
      },
      {
        name: 'Project Owner',
        foreignData: ForeignData.ProjectOwner,
        onBoth: 'both',
        localData: 'people',
        localKey: 'tasks',
        foreignKey: 'account_id',
        onFilter: (
          people,
          selected,
          included,
          project,
          view,
        ) => filterProjectOwner(people, selected, included, project, view),
      },
      {
        name: 'Project Status',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
      },

    ],
  },
  {
    name: 'task',
    icon: (size = 12) => <LayoutIcon size={size} />,
    color: '#FDD8D3',
    filters: [
      {
        name: 'Task',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
      },
      {
        name: 'Allocation status',
        foreignData: ForeignData.Roles,
        onBoth: 'both',
        localData: 'people',
        localKey: 'role_id',
        foreignKey: 'id',
      },

    ],
  },
];
