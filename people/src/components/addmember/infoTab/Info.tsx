import React, { useEffect, useState } from 'react';
import Select from '../../reuseableComponents/select';
import { useAppSelector } from '../../../app/hooks';

function Info({ onClose, isEdit, selected }:any) {
  const { departments } = useAppSelector((state) => state.data);
  const [selectedDep, setSelectedDep] = useState({ label: ' ', value: '' });
  const roleOptions = [
    { label: ' ', value: '' },
    { label: 'Member', value: 'MEMBER' },
    { label: 'Manager', value: 'MANAGER' },
    { label: 'Admin', value: 'ADMIN' },
  ];

  const [departmentOptions, setDepOptions] = useState([
    { label: 'No Department', value: '' },
  ]);

  const typeOptions = [
    { label: 'Select Type', value: '' },
    { label: 'Employee', value: 'EMPLOYEE' },
    { label: 'Manager', value: 'MANAGER' },
    { label: 'Engineer', value: 'ENGINEER' },
  ];

  useEffect(() => {
    const temp = departments.map((dep) => ({ label: dep.name, value: `${dep.department_id}` }));
    setDepOptions([departmentOptions[0], ...temp]);
    if (selected && isEdit) {
      const tempDep = departments.filter((dep) => dep.department_id === selected.department_id);
      if (tempDep.length > 0 && selectedDep) {
        setSelectedDep({ value: `${tempDep[0].department_id}`, label: tempDep[0].name });
      }
    }
  }, [departments, selected]);

  return (
    <div className="flex flex-col px-2 pb-5 gap-5">
      {/* Role Select */}
      <Select id="roles" label="Role" options={roleOptions} />
      {/* Department Select */}
      <Select id="department" label="Department" options={departmentOptions} />
      {/* Tags Input */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
        <input
          type="text"
          id="tags"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* Type and Hourly Rate Selects */}
      <div className="flex items-center gap-4 w-full">
        {/* Type Select */}
        <div className="flex-[0.8]">
          <Select id="typeofperson" label="Type" options={typeOptions} />

        </div>
        {/* Hourly Rate Input */}
        <div className="flex-[0.2]">
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">Hourly Rate</label>
          <input
            type="text"
            id="hourlyRate"
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* border-none bg-transparent outline-none */}
        </div>
      </div>
      <div className="flex gap-2 mt-5">
        <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm">Add Person</button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
      </div>
    </div>
  );
}

export default Info;
