import React, {
  useEffect, useRef, useState,
} from 'react';
import moment, { Moment } from 'moment';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { calenderViewConstants } from '../../constants';
import {
  handleLongPressCalender, handleMouseMoveCalender, handleMouseReleaseCalender,
} from '../../utils/longPressHelpers';
import { HoverInfoType, setSelectedDates } from '../../feature/calender/calenderSlice';

interface CalendarHeaderProps {
  dateHeaders: Moment[][];
}

function CalendarHeader({ dateHeaders }:CalendarHeaderProps) {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const { calenderType, selectedDates } = useAppSelector((state) => state.calender);
  const dispatch = useAppDispatch();

  const registered = useRef(false);
  const calenderTypeRef = useRef(calenderViewConstants[calenderType]);
  const today = moment();
  const isLongPress = useRef(false);
  const longPressTimer = useRef<any>(0);
  const hoverArea = useRef<HoverInfoType>({
    start: 0,
    end: 0,
    total: 0,
  });
  const [areaSelected, setAreaSelected] = useState(false);
  const [hoverAreaState, setHoverAreaState] = useState<HoverInfoType>({
    start: 0,
    end: 0,
    total: 0,
  });

  useEffect(() => {
    calenderTypeRef.current = calenderViewConstants[calenderType];
  }, [calenderType]);
  useEffect(() => {
    if (hoverAreaState.total !== 0) {
      dispatch(setSelectedDates(hoverAreaState));
    } else {
      dispatch(setSelectedDates(null));
    }
  }, [hoverAreaState]);

  useEffect(() => {
    if (stackRef.current && !registered.current) {
      registered.current = true;
      stackRef.current.addEventListener('mousedown', (e) => {
        if (e.button === 0
           && (e.target as HTMLElement).classList.contains('date-item-single')) {
          longPressTimer.current = setTimeout(
            () => handleLongPressCalender(
              e,
              isLongPress,
              hoverArea,
              calenderTypeRef,
              setHoverAreaState,
              setAreaSelected,
            ),
            500,
          );
        }
      });
      // Add event listener for mouse move
      stackRef.current.addEventListener(
        'mousemove',
        (e:any) => handleMouseMoveCalender(
          e,
          isLongPress,
          hoverArea,
          calenderTypeRef,
          setHoverAreaState,
          longPressTimer,
          setAreaSelected,
        ),
      );
      // Add event listener for mouse up
      stackRef.current.addEventListener(
        'mouseup',
        () => handleMouseReleaseCalender(
          longPressTimer,
          isLongPress,
          setAreaSelected,
        ),
      );
    }
  }, [stackRef]);

  useEffect(() => {
    if (selectedDates !== null) {
      hoverArea.current = selectedDates;
      setAreaSelected(true);
      setHoverAreaState(selectedDates);
    }
  }, [selectedDates]);

  const handleSelectionReset = () => {
    hoverArea.current = {
      start: 0,
      end: 0,
      total: 0,
    };
    setHoverAreaState(hoverArea.current);
    setAreaSelected(false);
  };
  useEffect(() => {
    handleSelectionReset();
    dispatch(setSelectedDates(null));
  }, [calenderType]);

  return (
    <div ref={stackRef} data-testid="calendar-header" className="date-container ml-[250px]">
      {dateHeaders.map((week, index) => (
        <div
          key={`${week[0].day()}-${week[0].date()}-${week[0].local()}`}
          style={{ width: `${calenderViewConstants[calenderType] * week.length}px` }}
          className="date-header-container transition-all duration-700"
        >
          <div className="month-header">
            <div
              style={{
                fontSize: '10px',
                height: '80%',
                borderLeft: '2px solid rgba(0,0,0,0.8)',
                paddingLeft: '2px',
              }}
            >
              {index + 1}
            </div>
            <div>
              {week[0].format('MMM') === week[week.length - 1].format('MMM')
                ? week[0].format('MMM')
                : `${week[0].format('MMM')} - ${week[week.length - 1].format('MMM')}`}

            </div>
          </div>
          <div className="date-header select-none">
            {week.map((date) => (
              <div
                data-day={`${date.dayOfYear()}`}
                className="date-header-body date-item-single"
                key={`${date.date()}-${date.locale()}`}
                style={{ fontSize: '10px' }}
              >
                <div data-day={`${date.dayOfYear()}`} className="date-header-body-date font-light cursor-pointer date-item-single">
                  <div
                    data-day={`${date.dayOfYear()}`}
                    className={`${moment(date).isSame(today, 'day') ? 'bg-indigo-300  font-semibold  text-white ' : ''}
                     date-item-single z-[9999] rounded py-[2px] text-center ml-1  w-full`}
                  >

                    {date.format(calenderType === 'Months' ? 'dd D' : 'ddd D')}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        data-hover="hover-data"
        style={{
          width: `${calenderViewConstants[calenderType] * hoverAreaState.total}px`,
          marginLeft: hoverAreaState.start + 4,
        }}
        className={`h-[20px]  rounded absolute bottom-[5px] transition-all border-x-2 group ${areaSelected ? 'bg-indigo-200/90 rounded-b-none border-x-indigo-500' : 'bg-indigo-200/60'}`}
      >
        {areaSelected && (
        <div
          date-testid="reset-selection"
          onClick={handleSelectionReset}
          className=" bg-black/50 z-[9999] h-4 w-4 rounded-full hover:bg-black absolute  items-center justify-center right-1 top-[10%] flex text-white"
        >
          <X size={12} />
        </div>
        )}
      </div>
    </div>
  );
}

export default CalendarHeader;
