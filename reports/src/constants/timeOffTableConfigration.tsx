import { Render, Table } from '@tanstack/react-table';
import React from 'react';
import { getHeaderNameSection } from './headerSectionName';
import { DownArrowSvg, RightArrowSvg } from './svg';
import { cellButton, createHeaderAndId } from '../helper/tableComponent';

const dayHeader = createHeaderAndId('Days');
const hoursHeader = createHeaderAndId('Hours');
const nameHeader = createHeaderAndId('Name');

const TimeOffTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>) => [
  table.createDataColumn((row: any) => row.name, {
    id: nameHeader.id,
    header: nameHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      cellButton(props)
      // <div className={`flex px-[${props.row.depth * 100}] cursor-pointer`}>
      //   <button
      //     type="button"
      //     onClick={props.row.getToggleExpandedHandler()}
      //   >
      //     {!props.row.getIsExpanded() ? (
      //       <div className="pl-3">
      //         {props.row.depth === 0 && RightArrowSvg({ height: '13', width: '13' }) }
      //       </div>
      //     ) : (
      //       <div className="pl-3">
      //         {props.row.depth === 0 && DownArrowSvg({ height: '13', width: '13' }) }
      //       </div>
      //     )}
      //   </button>
      //   {props.row.depth === 0 ? (
      //     <div className="flex px-5 justify-around text-gray-600">
      //       {props.getValue()}
      //     </div>
      //   ) : (
      //     <div className="flex px-5 justify-around pl-[50px] text-gray-500">
      //       {props.getValue()}
      //     </div>
      //   )}
      // </div>
    ),
  }),
  table.createDataColumn((row: any) => row.days, {
    id: dayHeader.id,
    header: dayHeader.header,
    cell: (props) => (
      <div className="items-center">
        {props.getValue()}
      </div>

    ),
  }),
  table.createDataColumn((row: any) => row.hours, {
    id: hoursHeader.id,
    header: hoursHeader.header,
    cell: (props) => (
      <div className="items-center">
        {props.getValue()}
      </div>
    ),
  }),
];

export default TimeOffTableConfiguration;
