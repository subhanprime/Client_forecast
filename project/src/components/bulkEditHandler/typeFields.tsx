import React, { useState } from 'react';
import { BulkField } from '../constant/enums';
import { IBillType } from '../constant/bulkActions';

function TypeFields(
  {
    isBillable,
    setIsBillable,
    isTentative,
    setIsTentative,
  }: IBillType,
) {
  const handleToggle = () => {
    setIsBillable((prevState) => !prevState);
  };

  return (
    <div className="flex items-center my-5">
      <button
        type="button"
        onClick={handleToggle}
        className={
          `transition-colors duration-300 ease-in-out px-4 py-2 focus:outline-none font-medium rounded-s ${!isBillable ? 'bg-blue-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`
        }
      >
        {BulkField.NonBillable}
      </button>
      <button
        type="button"
        onClick={handleToggle}
        className={
          `transition-colors duration-300 ease-in-out px-4 py-2 focus:outline-none font-medium rounded-e ${isBillable ? 'bg-blue-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`
        }
      >
        {BulkField.Billable}
      </button>

      <button
        type="button"
        onClick={() => setIsTentative(!isTentative)}
        className={
          `mx-4 transition-colors duration-300 ease-in-out px-4 py-2 focus:outline-none font-medium rounded ${!isTentative ? 'bg-blue-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`
        }
      >
        {BulkField.Tentative}
      </button>

    </div>
  );
}

export default TypeFields;
