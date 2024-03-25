import { Render, Table } from '@tanstack/react-table';
import React from 'react';
import Roles from '../interface/rolesInterface';
import { cellButton, createHeaderAndId } from '../helper/tableComponent';

const clientHeader = createHeaderAndId('Client');
const budgetHeader = createHeaderAndId('Budget');
const scheduledHeader = createHeaderAndId('Scheduled');
const loggedHeader = createHeaderAndId('Logged');

const ClientTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>) => [
  table.createDataColumn((row: any) => row.name, {
    id: clientHeader.id,
    header: clientHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      cellButton(props)
    ),
  }),
  table.createDataColumn((row: any) => row.budget, {
    id: budgetHeader.id,
    header: budgetHeader.header,
  }),
  table.createDataColumn((row: any) => row.scheduled, {
    id: scheduledHeader.id,
    header: scheduledHeader.header,
  }),
  table.createDataColumn((row: any) => row.logged, {
    id: loggedHeader.id,
    header: loggedHeader.header,
  }),
];
export default ClientTableConfiguration;
