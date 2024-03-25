import React from 'react';
import TableComponent from '../components/tables/tableComponent';
import { useAppSelector } from '../redux/store/store';

const tabIndexes = [
  {
    label: 'People',
    value: 'people',
    component: <TableComponent type="people" />,
  },
  {
    label: 'Roles',
    value: 'roles',
    component: <TableComponent type="roles" />,
  },
  {
    label: 'Department',
    value: 'department',
    component: <TableComponent type="department" />,
  },
  {
    label: 'Project',
    value: 'project',
    component: <TableComponent type="project" />,
  },
  {
    label: 'Tasks',
    value: 'tasks',
    component: <TableComponent type="task" />,
  },
  {
    label: 'Time Off',
    value: 'timeoff',
    component: <TableComponent type="timeoff" />,
  },
  {
    label: 'Clients',
    value: 'clients',
    component: <TableComponent type="clients" />,
  },
];
export const makeTabs = (peopleSelected:boolean, selectedFilterType:string) => {
  if (peopleSelected && selectedFilterType !== 'people') {
    return [
      {
        label: 'People',
        value: 'people',
        component: <TableComponent type="people" />,
      },
      {
        label: 'Roles',
        value: 'roles',
        component: <TableComponent type="roles" />,
      },
      {
        label: 'Department',
        value: 'department',
        component: <TableComponent type="department" />,
      },
      {
        label: 'Project',
        value: 'project',
        component: <TableComponent type="project" />,
      },
      {
        label: 'Tasks',
        value: 'tasks',
        component: <TableComponent type="task" />,
      },
      {
        label: 'Time Off',
        value: 'timeoff',
        component: <TableComponent type="timeoff" />,
      },
    ];
  }
  if (selectedFilterType === 'people') {
    return [
      {
        label: 'Project',
        value: 'project',
        component: <TableComponent type="project" />,
      },
      {
        label: 'Tasks',
        value: 'tasks',
        component: <TableComponent type="task" />,
      },
    ];
  }

  return [
    {
      label: 'Project',
      value: 'project',
      component: <TableComponent type="project" />,
    },
    {
      label: 'Clients',
      value: 'clients',
      component: <TableComponent type="clients" />,
    },
    {
      label: 'Team',
      value: 'team',
      component: <TableComponent type="team" />,
    },
  ];
};
export default tabIndexes;
