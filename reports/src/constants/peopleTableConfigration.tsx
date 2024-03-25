import { Render, Table } from '@tanstack/react-table';
import React, { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import PeopleTableInterface from '../components/tables/tableComponent/propleInterface';
import { ProjectData } from '../components/tables/tableComponent/projectInterface';
import { getHeaderNameSection } from './headerSectionName';
import { disableArrowColor, scheduledColor } from './colors';
import { DownArrowSvg, RightArrowSvg } from './svg';
import { createHeaderAndId } from '../helper/tableComponent';
import { setFilterSelectedType } from '../redux/store/features/tableDataSlics';

const timeOffHeader = createHeaderAndId('Time off');
const overTimeHeader = createHeaderAndId('OverTime');
const capacityHeader = createHeaderAndId('Capacity');
const scheduledHeader = createHeaderAndId('Scheduled');
const billableHeader = createHeaderAndId('Billable');
const nonBillableHeader = createHeaderAndId('Non-Billable');
const schedulePerctHeader = createHeaderAndId('Sched. %');
const departmentHeader = createHeaderAndId('Department');
const personHeader = createHeaderAndId('Person');

const tableConfiguration = (
  table:Table<{
    Renderer: Render;
    Rendered: React.ReactNode | JSX.Element;
  }>,
  setSelectedPeopleData:React.Dispatch<React.SetStateAction<ProjectData | undefined>>,
  dispatch: Dispatch<AnyAction>,
) => [
  table.createDataColumn((row: any) => row.name, {
    id: personHeader.id,
    header: personHeader.mainHeader,
    enableSorting: true,
    cell: (props) => (
      <div className={`flex px-[${props.row.depth * 100}] hover:underline`}>
        <button
          type="button"
          onClick={props.row.getToggleExpandedHandler()}
          disabled={!props.row.getCanExpand()}
        >
          {!props.row.getIsExpanded() ? (
            <div className="pl-3">
              {props.row.depth === 0 && RightArrowSvg({ height: '13', width: '13', isDisabled: props.row.getCanExpand() }) }
            </div>
          ) : (
            <div className="pl-3">
              {props.row.depth === 0 && DownArrowSvg({ height: '13', width: '13' }) }
            </div>
          )}
        </button>
        {props.row.depth === 0 ? (
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              if (props.row.getCanExpand()) {
                setSelectedPeopleData(props.row.original as ProjectData);
                dispatch(setFilterSelectedType({ type: 'people', selectedEntry: props.row.original as ProjectData }));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { /* empty */ }
            }}
            className="flex px-5 justify-around text-gray-600"
          >
            {props.getValue()}
          </div>
        ) : (
          <div
            className="flex px-5 justify-around pl-[50px] text-gray-500"
          >
            {props.getValue()}
          </div>
        )}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.department, {
    id: departmentHeader.id,
    header: departmentHeader.header,
    cell: (props) => (
      <div className="items-center hover:underline cursor-pointer">
        {/* {getScheduledHours(props)} */}
        {props.getValue()}
        {/* props.getValue()===""&&"No Department":props.getValue() */}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.capacity, {
    id: capacityHeader.id,
    header: capacityHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* {getScheduledHours(props)} */}
        {props.getValue()}
      </div>
    ),
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
  table.createDataColumn((row: any) => row.timeOff, {
    id: timeOffHeader.id,
    header: timeOffHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* {getScheduledHours(props)} */}
        {props.getValue() === null ? '0' : props.getValue()}
        {/* {props.getValue()} */}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.overtime, {
    id: overTimeHeader.id,
    header: overTimeHeader.header,
    cell: (props) => (
      <div className="items-center">
        {/* {getScheduledHours(props)} */}
        {props.getValue() === null ? '0' : props.getValue()}
        {/* {props.getValue()} */}
      </div>
    ),
  }),
  table.createDataColumn((row: any) => row.scheduledpercent, {
    id: schedulePerctHeader.id,
    header: schedulePerctHeader.header,
    cell: (props) => (
      <div className="flex justify-around items-center">
        {`${Number.isNaN(props.getValue()) ? 0 : Math.round(props.getValue())}${'%'}`}
        <div className="flex w-[100px] h-[15px] border-[2px] border-gray-300 border-r-black">
          <div
            style={{ width: `${props.getValue()}px`, backgroundColor: scheduledColor }}
          />
        </div>
      </div>
    ),
  }),
];
export default tableConfiguration;
