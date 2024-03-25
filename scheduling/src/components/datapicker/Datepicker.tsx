import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';

interface DateProps {
  date?: string
}

function Datepicker({ date }:DateProps) {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (date) {
      setSelected(new Date(date));
    }
  }, [date]);

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
  }, [ref]);

  return (
    <div ref={ref} data-testid="date-picker" className="cursor-pointer select-none">
      <div onClick={() => { setIsOpen(!isOpen); }}>

        {moment(selected).format('MMM DD yyyy')}
      </div>
      {isOpen && (
      <div className="absolute bg-white z-50 shadow-lg rounded">

        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
        />
      </div>
      )}
    </div>
  );
}

export default Datepicker;
