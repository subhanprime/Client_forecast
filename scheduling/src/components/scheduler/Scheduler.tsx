import React, { useEffect, useRef, useState } from 'react';
import { Moment } from 'moment';

import 'gridstack/dist/gridstack.min.css';

import CalendarHeader from '../calender/CalenderHeader';
import GridRow from '../grid/GridRow';
import DateColumns from '../calender/DateColumns';
import SidebarHeader from '../sidebar/SidebarHeader';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import helpers from '../../utils/helpers';
import ProjectGridRow from '../grid/ProjectGridRow';
import {
  CursorTypes, ScrollDir, SortType, ViewType, calenderViewConstants,
} from '../../constants';
import { sortData } from '../../feature/scheduler/schedulerSlice';

interface Prop {
  weeksArray: Moment[][];
  daysInYear: number;
  daysArray: Moment[];
}

function Scheduler({ daysArray, weeksArray, daysInYear }:Prop) {
  const {
    scrollDirection, viewType, calenderType,
    sortOrder, sortType, selectedContext, selectedDates,
  } = useAppSelector((state) => state.calender);
  const [stackWidth, setStackWidth] = useState(`${(daysInYear * calenderViewConstants[calenderType]) + 255}px`); // Adjust the width as needed
  const { projects, peopleTasks, projectTasks } = useAppSelector((state) => state.sheduler);
  const { selectedFilter, selectedSavedFilter } = useAppSelector((state) => state.filter);

  const [peopleTaskState, setPeopleTaskState] = useState<PeopleTasks[]>(peopleTasks || []);
  const [projectTaskState, setProjectTaskState] = useState<ProjectTask[]>(projectTasks || []);

  const dispatch = useAppDispatch();
  const [scrollSet, setScrollSet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sorted, setSorted] = useState(false);
  const ref = useRef(null);
  const scrollPositions = useRef({
    left: 0, top: 0,
  });

  useEffect(() => {
    if (selectedFilter.length === 0 && selectedSavedFilter === null) {
      setPeopleTaskState(peopleTasks || []);
      setProjectTaskState(projectTasks || []);
    } else if (selectedFilter.length > 0
      || (selectedSavedFilter && selectedSavedFilter.filter.length > 0)) {
      const { peopleTask, projectTask } = helpers.applyFilters(
        selectedFilter,
        selectedSavedFilter,
        peopleTasks || [],
        projectTasks || [],
        viewType,
        dispatch,
      );
      setPeopleTaskState(peopleTask);
      setProjectTaskState(projectTask);
    }
    setScrolled(false);
  }, [selectedFilter, viewType, peopleTasks, projectTasks, selectedSavedFilter]);

  useEffect(() => {
    setStackWidth(`${(daysInYear * calenderViewConstants[calenderType]) + 255}px`);
    setTimeout(() => {
      helpers.handlenNavigation(
        ref,
        dispatch,
        ScrollDir.Today,
        calenderViewConstants[calenderType],
      );
    }, 1000);
  }, [calenderType]);

  useEffect(() => {
    if (ref.current && !scrollSet) {
      helpers.handleUpdateScroll(ref, setScrollSet, scrollPositions);
      (ref.current as HTMLElement).addEventListener('scroll', (e:Event) => helpers.scrollHandler(e, scrollPositions, setScrolled));
    }
  }, [ref]);

  useEffect(() => {
    if (scrollDirection !== 'none') {
      helpers.handlenNavigation(
        ref,
        dispatch,
        scrollDirection,
        calenderViewConstants[calenderType],
      );
    }
  }, [scrollDirection]);
  useEffect(() => {
    if (selectedDates && ref.current) {
      const element = ref.current as HTMLElement;
      element.scroll({ left: selectedDates.start - calenderViewConstants[calenderType], behavior: 'smooth' });
    }
  }, [selectedDates]);

  useEffect(() => {
    dispatch(sortData({
      data: viewType === ViewType.Schedule ? 'peopleTasks' : 'projectTasks',
      sortOrder,
      sortType: viewType === ViewType.ProjectPlan ? SortType.Name : sortType,
    }));
    // change to index
    setSorted(!sorted);
  }, [sortOrder, sortType]);

  return (
    <div ref={ref} data-testid="scheduler" className="overflow-auto w-full h-full scrollbar relative">
      <CalendarHeader dateHeaders={weeksArray} />
      <SidebarHeader />

      {viewType === ViewType.Schedule && (
      <div
        style={{ width: stackWidth }}
        className={`grid-container z-10 transition-all duration-700 ${CursorTypes[selectedContext]}`}
      >
        <DateColumns daysArray={daysArray} />
        <div>

          {projects && peopleTaskState && peopleTaskState.map((person) => (
            <GridRow
              scrolled={scrolled}
              scrollPosition={scrollPositions.current}
              key={`${person.people_id}-${sorted}-${person.tasks.length}`}
              daysArray={daysArray}
              person={person}
              projects={projects}
            />
          ))}
        </div>

      </div>
      )}
      {viewType === ViewType.ProjectPlan && (
      <div style={{ width: stackWidth }} className="grid-container z-10 transition-all duration-700">
        <DateColumns daysArray={daysArray} />
        <div>
          {projects && projectTaskState && projectTaskState.map((project) => (
            <ProjectGridRow
              key={`${project.project_id}-${sorted}`}
              daysArray={daysArray}
              project={project}
              projects={projects}
              scrollPosition={scrollPositions.current}
              scrolled={scrolled}
            />

          ))}

        </div>

      </div>
      )}
    </div>
  );
}

export default Scheduler;
