import { Render, Table } from '@tanstack/react-table';
import React from 'react';
import {
  getBillablePercentage,
} from '../helper/utils';
import { ProjectInterface } from '../components/tables/projectTable/interface';
import { getHeaderNameSection } from './headerSectionName';
import { DownArrowSvg, RightArrowSvg } from './svg';
import { cellButton, createHeaderAndId } from '../helper/tableComponent';

const scheduledHeader = createHeaderAndId('Scheduled');
const billableHeader = createHeaderAndId('Billable');
const nonBillableHeader = createHeaderAndId('Non-Billable');
const billablePerctHeader = createHeaderAndId('Billable %');
const clientHeader = createHeaderAndId('Client');
const managedByHeader = createHeaderAndId('Managed By');
const projectHeader = createHeaderAndId('Project');

const ProjectTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>, setSelectedProjectData?: React.Dispatch<React.SetStateAction<ProjectInterface | undefined>>) => [
  table.createDataColumn((row: any) => row.name, {
    id: projectHeader.id,
    header: projectHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      // <div className={`flex px-[${props.row.depth * 100}] hover:underline cursor-pointer`}>
      //   <button
      //     type="button"
      //     onClick={props.row.getToggleExpandedHandler()}
      //   >
      //     {!props.row.getIsExpanded() ? (
      //       <div className="pl-3">
      //         {props.row.depth === 0 && RightArrowSvg({ height: '13', width: '13', isDisabled: props.row.getCanExpand() }) }
      //       </div>
      //     ) : (
      //       <div className="pl-3">
      //         {props.row.depth === 0 && DownArrowSvg({ height: '13', width: '13' }) }
      //       </div>
      //     )}
      //   </button>
      //   {/* {cellButton(props)} */}
      //   {props.row.depth === 0 ? (
      //     <div
      //       role="button"
      //       tabIndex={0}
      //       onClick={() => {
      //         if (setSelectedProjectData) {
      //           setSelectedProjectData(props.row.original as ProjectInterface);
      //         }
      //       }}
      //       onKeyDown={(e) => {
      //         if (e.key === 'Enter') { /* empty */ }
      //       }}
      //       className="flex px-5 justify-around text-gray-600"
      //     >
      //       {props.getValue()}
      //     </div>
      //   ) : (
      //     <div className="flex px-5 justify-around pl-[50px] text-gray-500">
      //       {props.getValue()}
      //     </div>
      //   )}
      // </div>
      cellButton(props, setSelectedProjectData)
    ),
  }),
  table.createDataColumn((row: any) => row.client, {
    id: clientHeader.id,
    header: clientHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* No Client */}
        {props.getValue() === '' ? 'No Client' : props.getValue()}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.manager, {
    id: managedByHeader.id,
    header: managedByHeader.header,
    cell: (props) => (
      <div className="items-center">
        {JSON.stringify(props.getValue()?.name) === '' ? '' : JSON.stringify(props.getValue()?.name)}
        {/* {props.getValue()} */}
        {/* {JSON.stringify(props.getValue())} */}

      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.scheduled, {
    id: scheduledHeader.id,
    header: scheduledHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* {getScheduledHours(props)} */}
        {props.getValue()}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.billable, {
    id: billableHeader.id,
    header: billableHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* {getBillableHours(props)} */}
        {props.getValue()}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.nonbillable, {
    id: nonBillableHeader.id,
    header: nonBillableHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* {getNonBillableHours(props)} */}
        {props.getValue()}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.billablepert, {
    id: billablePerctHeader.id,
    header: billablePerctHeader.header,
    cell: (props) => (
      <div className="flex justify-around items-center">
        {/* {`${getBillablePercentage(props)}%`} */}
        {`${props.getValue() === null ? 0 : props.getValue()}%`}

      </div>
    ),
  }),
];

export default ProjectTableConfiguration;
