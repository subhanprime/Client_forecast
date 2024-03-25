import React, { useState } from 'react';
import { daysOfWeek } from '../../constansts/accessForm';

function WorkDays() {
  const [checkedDays, setCheckedDays] = useState<string[]>([]);
  const [inputChange, setInputChange] = useState<string>('8');

  const handleChange = (day: string) => {
    if (checkedDays.includes(day)) {
      // If the day is already checked, remove it from the array
      setCheckedDays(checkedDays.filter((checkedDay) => checkedDay !== day));
    } else {
      // If the day is not checked, add it to the array
      setCheckedDays([...checkedDays, day]);
    }
  };

  const handleInputChange = (value: string) => {
    setInputChange(value);
  };

  return (
    <div>
      {daysOfWeek.map((day, index) => (
        <div
          key={day}
          className={`flex justify-between mt-4 rounded ${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white' // Apply background color based on index
          }`}
        >
          <div className="flex gap-4 items-center ml-2">
            <input
              name="check-test"
              placeholder="Select Day"
              type="checkbox"
              data-testid={`${day}`}
              className="w-4 h-4"
              onChange={() => handleChange(day)}
              checked={checkedDays.includes(day)}
            />
            <div data-test-id="workdays">{day}</div>
          </div>
          <div role="textbox" className=" flex w-24 h-10 items-center">
            {checkedDays.includes(day) && (
              <input
                placeholder="time in hour"
                type="text"
                data-testid="text-input"
                value={`${inputChange}              h `}
                onChange={(e) => handleInputChange(e.target.value)}
                className="bg-gray-50 w-full h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkDays;
