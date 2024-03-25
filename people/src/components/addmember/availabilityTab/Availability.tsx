import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DynamicDropdown, { DropdownData } from '../../dropdown/DynamicDropdown';
import WorkDays from '../../workdays/WorkDays';

function Availability({ onClose, isEdit, selectedData }:any) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<DropdownData | null>(null);
  const [selectedOption, setSelectedOption] = useState('full-time');
  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    if (selectedData && isEdit && selectedData.start_date) {
      setStartDate(new Date(selectedData.start_date));
    }
  }, [selectedData]);

  const accessOptions = [
    {
      name: 'Punjab', icon: null, symbol: null, subtext: null,
    },
    {
      name: `Quaid's Birth`, icon: null, symbol: null, subtext: null,
    },
  ];
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div className="mb-5 pb-2">
      <div data-testid="mock-select" className="flex flex-col gap-3 py-3">
        <div className="bg-gray-100 rounded flex flex-row gap-4 items-center p-4">
          <div>
            <div className="self-start font-light ">Start Date</div>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd MMM yyyy"
              className="p-2 border-b border-black bg-transparent outline-none"
            />
          </div>
          <div>
            <div className="self-start font-light">End Date</div>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd MMM yyyy"
              className="p-2 border-b border-black bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-3 text-sm cursor-pointer">
          <div
            onClick={() => handleOptionClick('full-time')}
            className={`rounded py-2 px-3 font-semibold ${
              selectedOption === 'full-time'
                ? 'bg-blue-200 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Full-Time
          </div>
          <div
            onClick={() => handleOptionClick('part-time')}
            className={`rounded py-2 px-3 font-semibold ${
              selectedOption === 'part-time'
                ? 'bg-blue-200 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Part-Time
          </div>
        </div>

        {selectedOption === 'part-time' && (
          <WorkDays />
        )}
      </div>
      <div>
        <div className="text-xs text-gray-600 font-semibold mt-5">Public Holidays</div>
        <DynamicDropdown
          data={accessOptions}
          defaultName="Select Holiday"
          icon={null}
          dropSize="large"
          hasChevron
          className="w-full border flex items-center justify-between px-4 py-2 text-gray-700 bg-white rounded selection-none mt-5"
          containerStyle="w-full rounded-lg"
          selected={selected}
          setSelected={setSelected}
          isCancelable
        />
        {/* <p className="font-semibold text-black/80">---</p> */}
      </div>
      <div>
        <div className="text-xs text-gray-600 font-semibold mt-5 mb-3">Notes</div>
        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {/* <p className="font-semibold text-black/80">---</p> */}
      </div>
      <div className="flex gap-2 mt-4 mb-4">
        <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm">Add Person</button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
      </div>
    </div>
  );
}

export default Availability;
