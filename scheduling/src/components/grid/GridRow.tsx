import React, { useEffect, useRef, useState } from 'react';
import { GridItemHTMLElement, GridStack, GridStackNode } from 'gridstack';
import { Moment } from 'moment';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import GridItem from './GridItem';
import '../../year.css';
import * as GridCallbacks from '../../utils/gridEvents';
import * as PressHelper from '../../utils/longPressHelpers';
import * as Factory from '../../utils/factoryHelpers';
import helpers from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ContextSelectedType, calenderViewConstants, rowsViewConstants } from '../../constants';
import GridHeader from './GridHeader';
import { deleteTask } from '../../firebase';
import { deleteTaskState } from '../../feature/scheduler/schedulerSlice';

interface Prop {
  daysArray : Moment[];
  person:PeopleTasks;
  projects:ProjectsMap;
  scrolled:boolean;
  scrollPosition:{
    top:number, left:number
  },
  projectId?:number;
  projectColor?:string;
}

function GridRow({
  daysArray, person, projects, scrolled, scrollPosition, projectId, projectColor,
}:Prop) {
  const { rowsType, selectedContext, calenderType } = useAppSelector((state) => state.calender);
  const gridRef = useRef<GridStack | null>(null);
  const [gridStack, setGridStack] = useState<null | GridStack>(null);
  const containerRef = useRef(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const placeHolderRef = useRef<HTMLDivElement | null>(null);
  const isLongPress = useRef(false);
  const longPressTimer = useRef<any>(0);
  const contectSelected = useRef<ContextSelectedType>(selectedContext);

  const calenderTypeRef = useRef(calenderViewConstants[calenderType]);

  const [items, setItems] = useState<TaskSlot[] | null>(null);
  const itemsRef = useRef<TaskSlot[] | null>(null);

  const placeholderInfo = useRef({
    start: 0, end: 0,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (person) {
      const item:TaskSlot[] = person.tasks.map(
        (task) => Factory.createTaskSlots(task, projects, person),
      );
      const updatedY = helpers.sortAndAssignY(item);
      if (items) {
        gridRef.current = null;
      }
      setItems(updatedY);
    }
  }, [person]);

  useEffect(() => {
    if (gridStack && gridRef.current) {
      gridRef.current.cellHeight(rowsViewConstants[rowsType].single, true);
    }
  }, [rowsType]);
  useEffect(() => {
    calenderTypeRef.current = calenderViewConstants[calenderType];
  }, [calenderType]);

  useEffect(() => {
    itemsRef.current = items;
    if (!items || gridRef.current) {
      return;
    }
    // Update the items in the event listeners
    const serializedData = items.map(Factory.createSerializedTask);
    const grid = (gridRef.current = GridStack.init(
      {
        minRow: 8,
        maxRow: 8,
        cellHeight: rowsViewConstants[rowsType].single,
        column: daysArray.length,
        itemClass: 'sub',
        acceptWidgets: '.grid-stack-item.sub',
        disableOneColumnMode: true,
      },
      gridContainerRef.current!,
    ))
      .load(serializedData)
      .on('drag', (e: Event, el: GridItemHTMLElement) => GridCallbacks.handleDrag(el, daysArray))
      .on('dragstop', (e: Event, el: GridItemHTMLElement) => GridCallbacks.handleDragStop(el, daysArray, itemsRef))
      .on('resizestop', (e: Event, el: GridItemHTMLElement) => GridCallbacks.handleResizeStop(el, daysArray, items))
      .on('dropped', (e: Event, previousWidget: GridStackNode, newWidget: GridStackNode) => GridCallbacks.handleElDropped(previousWidget, newWidget));

    setGridStack(grid);
  }, [items]);
  useEffect(() => {
    contectSelected.current = selectedContext;
  }, [selectedContext]);

  useEffect(() => {
    PressHelper.addListeners(
      gridContainerRef,
      itemsRef,
      contectSelected,
      longPressTimer,
      isLongPress,
      placeHolderRef,
      placeholderInfo,
      dispatch,
      person,
      calenderTypeRef,
      projectId,
    );
  }, [gridContainerRef]);

  const handleDelete = async (item:TaskSlot) => {
    const filtered = items?.filter((i) => (i.id !== item.id));
    if (filtered) {
      try {
        await deleteTask(item.id);
        dispatch(deleteTaskState(item.id));
        toast('Task Deleted!', {
          icon: <div className="bg-rose-500 h-6 w-6 flex items-center justify-center rounded-full"><Trash2 color="white" fontWeight="900" size={15} /></div>,
        });
      } catch (error) {
        toast.error('Error deleting task!');
      }
    }
  };

  return (
    <div ref={containerRef} style={{ minHeight: `${rowsViewConstants[rowsType].full + 2}px` }} className=" w-full border-b">
      <GridHeader
        person={person}
        scrollPosition={scrollPosition}
        scrolled={scrolled}
        color={projectColor}
      />

      <div
        data-testid="grid-row"
        gs-column={`${daysArray.length}`}
        id={`${person.people_id}`}
        data-id={`${person.people_id}`}
        style={{ display: 'flex', minHeight: `${rowsViewConstants[rowsType].full + 2}px` }}
        className={`grid-stack ${person.name} ml-[250px] w-[calc(100%-250px)]`}
        ref={gridContainerRef}
      >
        <div ref={placeHolderRef} gs-x={345} gs-y={0} gs-h={8} className="pointer-events-none bg-indigo-100/70 ">
          <div className=" " />
        </div>

        {items && items.map((item) => (
          <GridItem
            key={item.id}
            task={item}
            handleMouseEnter={(id:string) => GridCallbacks.onMouseEnter(id, gridStack)}
            handleMouseLeave={(id:string) => GridCallbacks.onMouseLeave(id, gridStack)}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default GridRow;
