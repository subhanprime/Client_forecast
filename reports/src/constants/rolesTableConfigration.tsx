import { Render, Table } from '@tanstack/react-table';
import React, { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import Roles from '../interface/rolesInterface';
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

const RolesTableConfiguration = (table:Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}>, setSelectedRoleData: React.Dispatch<React.SetStateAction<Roles | undefined>>, dispatch: Dispatch<AnyAction>) => [
  table.createDataColumn((row: any) => row.name, {
    id: personHeader.id,
    header: personHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      cellButton(props, setSelectedRoleData, dispatch)
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
export default RolesTableConfiguration;
