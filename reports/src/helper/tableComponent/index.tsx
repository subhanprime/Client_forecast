import React, { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { getHeaderNameSection } from '../../constants/headerSectionName';
import { getTaskDataManually } from '../../services/taskTableService';
import { TaskTableData } from '../../components/tables/tableComponent/taskTableInterface';
import { RightArrowSvg, DownArrowSvg } from '../../constants/svg';
import { setFilterSelectedType } from '../../redux/store/features/tableDataSlics';
import PeopleFilter from '../../interface/peopleFilterInterface';
import People from '../../interface/peopleListInterface';
import Task from '../../interface/taskInterface';

export const createHeaderAndId = (id: string) => ({
  id,
  header: (props: any) => getHeaderNameSection(props, id),
  mainHeader: (props: { instance: { getToggleAllRowsExpandedHandler: () => React.MouseEventHandler<HTMLButtonElement> | undefined; getIsAllRowsExpanded: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
    <div className="flex">
      <button
        type="button"
        onClick={props.instance.getToggleAllRowsExpandedHandler()}
      >
        {
          !props.instance.getIsAllRowsExpanded() ? (
            <div className="pl-3">
              {RightArrowSvg({ height: '13', width: '13' })}
            </div>
          )
            : (
              <div className="pl-3">
                {DownArrowSvg({ height: '13', width: '13' })}

              </div>
            )
        }

        <div className="px-5">
          {props.instance.getIsAllRowsExpanded()}
        </div>
      </button>
      {getHeaderNameSection(props, id)}
    </div>
  ),
});
export const cellButton = (props:any, setState?: React.Dispatch<React.SetStateAction<any>> | undefined, dispatch?:Dispatch<AnyAction>) => (
  <div className={`flex px-[${props.row.depth * 100}] hover:underline cursor-pointer`}>
    <button
      type="button"
      onClick={props.row.getToggleExpandedHandler()}
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
          if (setState) {
            setState(props.row.original);
            if (dispatch) {
              dispatch(setFilterSelectedType({ type: 'roles', selectedEntry: props.row.original }));
            }
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
      <div className="flex px-5 justify-around pl-[50px] text-gray-500">
        {props.getValue()}
      </div>
    )}
  </div>
);
export const getTaskBasedOnPeopleId = async (peopleId:number, taskData:Task, peopleFilterData:PeopleFilter, peopleData:People) => {
  const taskTableData:TaskTableData[] = await getTaskDataManually(taskData, peopleFilterData, peopleData[0]);
  const tasks: { billable: number; scheduled: number; nonbillable: number; billableperct: number; name: string; }[] = [];
  console.log('WAS IC ALLED', tasks);
  if (taskTableData.length > 0) {
    taskTableData.forEach((dataForTask:TaskTableData) => {
      let totalBillable = 0;
      let totalNonBillable = 0;
      let totalScheduled = 0;

      const taskObject = {
        billable: 0, scheduled: 0, nonbillable: 0, billableperct: 0, name: dataForTask.name, client: '',
      };
      dataForTask.people.forEach((e) => {
        if (e.person_id === peopleId) {
          totalBillable = e.billable + totalBillable;
          totalNonBillable = e.nonbillable + totalNonBillable;
          totalScheduled = e.scheduled + totalScheduled;
        }
        taskObject.billable = totalBillable;
        taskObject.nonbillable = totalNonBillable;
        taskObject.scheduled = totalScheduled;
        taskObject.billableperct = (totalBillable / totalScheduled) * 100;
      });
      tasks.push(taskObject);
    });
  }
  return tasks;
};
