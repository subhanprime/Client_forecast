import React, { useState } from 'react';
import { BulkField } from '../constant/enums';
import { IBudgetField } from '../constant/bulkActions';

function BudgetFields(
  {
    hoursByProject,
    setHoursByProject,
    isDifferentRate,
    setIsDifferentRate,
    selectedBudget,
    setSelectedBudget,
    totalProjectHours,
    setTotalProjectHours,
  }: IBudgetField,
) {
  const options = [
    'No budget',
    'Hours by project',
    'Fee by project',
    'Hourly fee',
    // 'Fee by phase',
    // 'Hours by phase',
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBudget(event.target.value);
  };

  return (
    <div>

      <div className="flex items-center gap-2 my-2 flex-1">
        <div className="flex-grow w-full">
          <h2 className="text-xs font-semibold my-2">{BulkField.Budget}</h2>
          <select
            id="selectInput"
            value={selectedBudget}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none w-full h-[47px] cursor-pointer"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {
          selectedBudget === options[1] && (
            <div className="flex-grow flex-1 ">
              <h2 className="text-xs font-semibold my-2">{BulkField.Hours}</h2>
              <input min={0} onChange={(e) => setTotalProjectHours(Number(e.target.value))} type="number" placeholder="$000" className="border border-gray-300 rounded-md p-2 cursor-pointer h-[47px]" />
            </div>
          )
        }

        {
          selectedBudget === options[2] && (
            <div className="flex-grow flex-1 ">
              <h2 className="text-xs font-semibold my-2">{BulkField.Total}</h2>
              <input min={0} onChange={(e) => setHoursByProject(Number(e.target.value))} type="number" placeholder="$000" className="border border-gray-300 rounded-md p-2 cursor-pointer h-[47px]" />
            </div>
          )
        }

      </div>
      {
        selectedBudget === options[2] && (
          <div className="flex w-full my-3 gap-3">
            <div>
              <h2 className="text-xs font-semibold my-2">{BulkField.Rate}</h2>
              <select
                id="selectInput"
                // value={selectedBudget}
                onChange={(e) => setIsDifferentRate(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none w-full h-[47px] cursor-pointer"
              >
                <option value="true">Different hourly rates per team member</option>
                <option value="false">Same hourly rate for everyone</option>
              </select>
            </div>
            {
              isDifferentRate === 'false' && (
                <div className="flex-grow flex-1 ">
                  <h2 className="text-xs font-semibold my-2">{BulkField?.PerHour}</h2>
                  <input min={0} onChange={(e) => setHoursByProject(Number(e.target.value))} type="number" placeholder="$000" className="border border-gray-300 rounded-md p-2 cursor-pointer h-[47px]" />
                </div>
              )
            }
          </div>
        )
      }
    </div>

  );
}

export default BudgetFields;
