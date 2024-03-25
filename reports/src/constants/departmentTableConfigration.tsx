import { Render, Table } from '@tanstack/react-table';
import React from 'react';
import DepartmentInterface from '../interface/departmentInterface';
import { getHeaderNameSection } from './headerSectionName';
import { DownArrowSvg, RightArrowSvg } from './svg';
import { cellButton, createHeaderAndId } from '../helper/tableComponent';
import { scheduledColor } from './colors';

const timeOffHeader = createHeaderAndId('Time off');
const overTimeHeader = createHeaderAndId('OverTime');
const capacityHeader = createHeaderAndId('Capacity');
const scheduledHeader = createHeaderAndId('Scheduled');
const billableHeader = createHeaderAndId('Billable');
const nonBillableHeader = createHeaderAndId('Non-Billable');
const schedulePerctHeader = createHeaderAndId('Sched. %');
const personHeader = createHeaderAndId('Person');

const DepartmentTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>, setSelectedDepartmentData: React.Dispatch<React.SetStateAction<DepartmentInterface | undefined>>) => [
  table.createDataColumn((row: any) => row.name, {
    id: personHeader.id,
    header: personHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      cellButton(props, setSelectedDepartmentData)
      // <div className={`flex px-[${getRowDepth(props)}] hover:underline cursor-pointer`}>
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
      //     <div
      //       role="button"
      //       tabIndex={0}
      //       onClick={() => { setSelectedDepartmentData(props.row.original as DepartmentInterface); }}
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
    ),
  }),
  table.createDataColumn((row: any) => row.capacity, {
    id: capacityHeader.id,
    header: capacityHeader.header,
  }),
  table.createDataColumn((row: any) => row.scheduled, {
    id: scheduledHeader.id,
    header: scheduledHeader.header,
  }),
  table.createDataColumn((row: any) => row.billable, {
    id: billableHeader.id,
    header: billableHeader.header,
  }),
  table.createDataColumn((row: any) => row.nonbillable, {
    id: nonBillableHeader.id,
    header: nonBillableHeader.header,
  }),
  table.createDataColumn((row: any) => row.timeoff, {
    id: timeOffHeader.id,
    header: timeOffHeader.header,
  }),
  table.createDataColumn((row: any) => row.overtime, {
    id: overTimeHeader.id,
    header: overTimeHeader.header,
  }),
  table.createDataColumn((row: any) => row.schedulepercentage, {
    id: schedulePerctHeader.id,
    header: schedulePerctHeader.header,
    cell: (props) => (
      <div className="flex justify-around items-center">
        {`${props.getValue() === null ? 0 : props.getValue()}${'%'}`}
        <div className="flex w-[100px] h-[15px] border-[2px] border-gray-300 border-r-black">
          <div style={{ backgroundColor: scheduledColor, width: `${props.getValue()}px` }} />
        </div>
      </div>
    ),
  }),
];
export default DepartmentTableConfiguration;
