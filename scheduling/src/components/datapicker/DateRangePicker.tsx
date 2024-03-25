import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ChevronDown } from 'lucide-react';
import Dropdown from '../dropdown/Dropdown';
import {
  DateRangeEnum, DropdownData, DateRangeVars,
} from '../../constants';
import helpers from '../../utils/helpers';

interface DateRangeProps {
  DateRangeDrop:DropdownData[];
  onRangeUpdate?:(range:DateRange | undefined)=>void;
  showDateRange?:boolean,
  defaultDateRange?:DateRange;
}

function DateRangePicker({
  DateRangeDrop, onRangeUpdate, showDateRange = true, defaultDateRange = undefined,
}:DateRangeProps) {
  // console.log(defaultDateRange);
  const ref = useRef<HTMLDivElement | null>(null);
  const [range, setRange] = useState<DateRange | undefined>(
    defaultDateRange || helpers.getDateRangeWeeks(DateRangeVars[DateRangeEnum.Week]),
  );
  const [dropData, setDropdata] = useState<DropdownData[]>(DateRangeDrop);
  const [selected, setSelected] = useState<DateRangeEnum>(DateRangeEnum.Week);
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (data:DropdownData) => {
    setSelected(data.name as DateRangeEnum);
    if (data.name as DateRangeEnum !== DateRangeEnum.Custom) {
      setDropdata(DateRangeDrop);
    }
  };

  const onSelectDate = (dateRange:DateRange | undefined) => {
    setRange(dateRange);
    if (showDateRange) {
      if (dropData[0].name !== DateRangeEnum.Custom) {
        setDropdata([{
          name: DateRangeEnum.Custom,
          icon: null,
          symbol: null,
        }, ...dropData]);
      }
      setSelected(DateRangeEnum.Custom);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showDateRange && defaultDateRange) {
      setRange(defaultDateRange);
    }
  }, [defaultDateRange]);

  useEffect(() => {
    if (showDateRange && selected !== DateRangeEnum.Custom) {
      setRange(
        helpers.getDateRangeWeeks(DateRangeVars[selected]),
      );
    }
  }, [selected]);

  useEffect(() => {
    if (onRangeUpdate) {
      onRangeUpdate(range);
    }
  }, [range]);

  return (
    <div data-testid="date-range-picker" ref={ref} className="flex flex-col items-start relative">
      <div
        data-testid="date-range-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex gap-4  select-none ${showDateRange ? ' p-2  hover:border-indigo-500 hover:bg-indigo-100 font-semibold' : ''} rounded cursor-pointer
        ${isOpen && showDateRange ? 'border border-indigo-500 bg-indigo-100' : 'border border-transparent'}`}
      >
        {showDateRange && (
        <div>
          {selected}
          :
        </div>
        )}
        <div className={`${showDateRange ? 'text-indigo-500 gap-2' : 'gap-4'} flex `}>
          <div>{moment(range?.from).format('DD MMM YYYY')}</div>
          {range?.to
          && (
          <div className="flex gap-2">
            <div>{showDateRange ? '-' : '>'}</div>
            <div>{moment(range?.to).format('DD MMM YYYY')}</div>
          </div>
          )}
          {showDateRange && (
          <div>
            <ChevronDown />
          </div>
          )}
        </div>
      </div>
      {isOpen && (
      <div className="absolute top-10 rounded-lg px-5 py-4 z-[99999] shadow-lg bg-white">

        {showDateRange && (
        <div className="flex gap-4 items-center border-b pb-3">
          <div className="text-sm text-black/60">Date range:</div>
          <Dropdown
            data={dropData}
            className="py-2 px-3 w-40 bg-gray-200 cursor-pointer rounded text-sm font-medium items-center justify-between flex"
            hasChevron
            defaultName={selected}
            dropSize="large"
            icon={null}
            isSelect={false}
            adjustHeight={false}
            onSelection={handleSelect}
          />
        </div>
        )}
        <DayPicker
          numberOfMonths={2}
          mode="range"
          selected={range}
          onSelect={onSelectDate}
          styles={{
            head: {
              fontSize: '14px',
            },
            caption_label: {
              fontSize: '16px',
            },
          }}
          pagedNavigation
        />
      </div>
      )}
    </div>
  );
}

export default DateRangePicker;
