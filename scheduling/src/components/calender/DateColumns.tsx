import { Moment } from 'moment';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { calenderViewConstants } from '../../constants';

interface Props {
  daysArray: Moment[];
}

function DateColumns({ daysArray }:Props) {
  const { calenderType, selectedDates } = useAppSelector((state) => state.calender);
  return (
    <div data-testid="date-columns" className="w-full absolute h-full grid grid-flow-col pl-[250px]">
      {daysArray.map((day) => (
        <div
          key={`${day.date()}-${day.local()}`}
          style={{ width: `${calenderViewConstants[calenderType]}px` }}
          className={`h-full border w-[100px]  transition-all duration-700 ${
            day.day() === 6
              ? 'weekend-gradient z-[20] '
              : day.day() === 0
                ? 'weekend-gradient week-border  z-[20] '
                : ''
          } ${
            selectedDates
            && day.dayOfYear() === ((selectedDates.start / calenderViewConstants[calenderType]) + 1)
              ? ' border-l-indigo-500' : ''
          }  ${
            selectedDates
            && day.dayOfYear() === ((selectedDates.end / calenderViewConstants[calenderType]) + 1)
              ? ' border-r-indigo-500' : ''
          }`}
        />
      ))}
    </div>
  );
}

export default DateColumns;
