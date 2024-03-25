import { Render, Table } from '@tanstack/react-table';
import React from 'react';
import { getHeaderNameSection } from './headerSectionName';
import { DownArrowSvg, RightArrowSvg } from './svg';
import { cellButton, createHeaderAndId } from '../helper/tableComponent';

const scheduledHeader = createHeaderAndId('Scheduled');
const nameHeader = createHeaderAndId('Name');

const TeamTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>) => [
  table.createDataColumn((row: any) => row.name, {
    id: nameHeader.id,
    header: nameHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      cellButton(props)
    ),
  }),
  table.createDataColumn((row: any) => row.scheduled, {
    id: scheduledHeader.id,
    header: scheduledHeader.header,
    cell: (props) => (
      <div className="items-center">
        {props.getValue()}
      </div>

    ),
  }),
];

export default TeamTableConfiguration;
