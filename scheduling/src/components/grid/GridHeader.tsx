import React, { useEffect, useRef, useState } from 'react';
import moment, { Moment } from 'moment';
import { useAppSelector } from '../../app/hooks';
import { calenderViewConstants, rowsViewConstants } from '../../constants';
import helpers from '../../utils/helpers';

interface GHeaderProps {
  person:PeopleTasks;
  scrolled:boolean;
  scrollPosition:{
    top:number, left:number
  },
  color?:string;
}
interface DateRange {
  start:Moment,
  end:Moment
}
function getWeekendsBetweenDates(startDate: Moment | string, endDate: Moment | string): number {
  let count = 0;
  let currentDay = moment(startDate);
  const endDay = moment(endDate);

  while (currentDay.isSameOrBefore(endDay)) {
    if (currentDay.day() === 0 || currentDay.day() === 6) {
      count++;
    }
    currentDay = currentDay.add(1, 'day');
  }

  return count;
}
function GridHeader({
  person, scrolled, scrollPosition, color,
}:GHeaderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { rowsType, selectedDates, calenderType } = useAppSelector((state) => state.calender);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [schedHours, setSchedHours] = useState(0);
  const startPos = useRef<null | number>(null);
  const currentPos = useRef<number>(0);

  function getInitials(name:string) {
    const nameArray = name.split(' ');
    return nameArray.map((word:any) => word[0]).join('').toUpperCase();
  }
  useEffect(() => {
    if (selectedDates) {
      const temp = calenderViewConstants[calenderType];
      setDateRange({
        start: moment().dayOfYear((selectedDates.start / temp) + 1),
        end: moment().dayOfYear((selectedDates.end / temp) + 1),
      });
    } else {
      setDateRange(null);
    }
  }, [selectedDates]);

  useEffect(() => {
    // console.log(dateRange);
    if (dateRange) {
      const weekEndCount = getWeekendsBetweenDates(dateRange.start, dateRange.end);
      let hours = dateRange.end.diff(dateRange.start, 'days') + 1;
      hours = (hours - weekEndCount) * 8;
      person.tasks.forEach((task) => {
        const weekC = getWeekendsBetweenDates(task.start_date, task.end_date);
        const intersection = helpers
          .getIntersectionCount(task.start_date, task.end_date, dateRange.start, dateRange.end);
        const tasksHours = (intersection - weekC) * task.hours;
        hours -= tasksHours;
      });
      setSchedHours(hours);
    }
  }, [dateRange]);

  useEffect(() => {
    if (ref.current && !startPos.current) {
      startPos.current = ref.current.getBoundingClientRect().top;
      currentPos.current = startPos.current;
    }
  }, [ref.current]);
  useEffect(() => {
    if (ref.current) {
      currentPos.current = ref.current.getBoundingClientRect().top;
    }
  }, [ref.current, scrollPosition, scrollPosition]);

  return (
    <div
      ref={ref}
      style={{
        left: !scrolled ? scrollPosition.left : 0,
        top: scrolled ? currentPos.current : 'auto',
      }}
      className={`${scrolled ? 'fixed' : 'absolute'} remove-drag w-[250px] border-b custom-shadow border-black/20 bg-white select-none pointer-events-none z-[999]`}
    >

      <div style={{ borderLeft: color ? `5px solid #${color}` : 'none', minHeight: `${rowsViewConstants[rowsType].full + 2}px` }} className=" w-[250px] bg-white  z-50 px-3 py-3">
        <div className="h-full w-full flex items-center">
          <div className="flex-[0.2]">

            <div
              className="w-8 h-8 flex items-center
                justify-center rounded-full bg-blue-400 text-white mr-3"
            >
              {getInitials(person.name)}
            </div>

          </div>
          {dateRange
          && (
          <div className="absolute right-2 top-3 text-xs rounded-md bg-gray-200/50 font-medium text-black/70 px-2 py-1">
            {schedHours}
            <span className="text-[9px]">h</span>
          </div>
          )}
          <div className=" text-[13px] flex-[0.7] flex flex-col">
            <div className="font-medium">{person.name}</div>
            {person.job_title && <div className="text-[10px]">{person.job_title}</div>}
            {person.department && <div className="text-[9px]">{person.department}</div>}
            {person.tags.length > 0 && (
              <div className="overflow-hidden flex gap-1">
                {person.tags.map((tag) => (
                  <div key={tag.name} className="bg-gray-200 px-1 rounded-lg text-[9px]">{tag.name}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridHeader;
