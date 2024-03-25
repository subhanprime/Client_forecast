import { Render, Table } from '@tanstack/react-table';
import React from 'react';
import { getHeaderNameSection } from './headerSectionName';
import { DownArrowSvg, RightArrowSvg } from './svg';
import { cellButton, createHeaderAndId } from '../helper/tableComponent';

const scheduledHeader = createHeaderAndId('Scheduled');
const billableHeader = createHeaderAndId('Billable');
const nonBillableHeader = createHeaderAndId('Non-Billable');
const billablePerctHeader = createHeaderAndId('BillablePerct');
const nameHeader = createHeaderAndId('Name');

const TaskTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>, isPeopleSelected:boolean, isProjectSelected:boolean) => [
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
      //     // onClick={() => { filter(props.row.original); }}
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
  table.createDataColumn((row: any) => row.scheduled, {
    id: scheduledHeader.id,
    header: scheduledHeader.header,
    cell: (props) => (
      <div className="items-center">
        {props.getValue()}
      </div>

    ),
  }),
  table.createDataColumn((row: any) => row.billable, {
    id: billableHeader.id,
    header: (isPeopleSelected === true && isProjectSelected === false) ? billableHeader.header : '',
    cell: (props) => (
      (isPeopleSelected === true && isProjectSelected === false)
      && (
        <div className="items-center">
          {props.getValue()}
        </div>
      )
    ),
  }),
  table.createDataColumn((row: any) => row.nonbillable, {
    id: nonBillableHeader.id,
    header: (isPeopleSelected === true && isProjectSelected === false) ? nonBillableHeader.header : '',
    cell: (props) => (
      (isPeopleSelected === true && isProjectSelected === false)
      && (
        <div className="items-center">
          {props.getValue()}
        </div>
      )
    ),
  }),
  table.createDataColumn((row: any) => row.billablepert, {
    id: billablePerctHeader.id,
    header: (isPeopleSelected === true && isProjectSelected === false) ? billablePerctHeader.header : '',
    cell: (props) => (
      (isPeopleSelected === true && isProjectSelected === false)
      && (
        <div className="items-center">
          {`${props.getValue()}%`}
        </div>
      )
    ),
  }),
];

export default TaskTableConfiguration;
