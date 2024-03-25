import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateCount } from '../../features/nav/navSlice';

function Dropdown({ setShownData, accountAccessData, peopleData }:any) {
  const ref = useRef<any>(null);
  const [dropdownStatus, setDropdownStatus] = useState(['Active']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checked, setChecked] = useState({
    active: true,
    archived: false,
    access: false,
  });

  const dispatch = useAppDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle tab click
  const closeOpenMenus = (e: MouseEvent) => {
    if (ref.current && isDropdownOpen && !ref.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // console.log(checked);
    const status = [];
    if (checked.active) {
      status.push('Active');
    }
    if (checked.archived) {
      status.push('Archived');
    }
    if (checked.access) {
      status.push('Account Access');
      dispatch(updateCount(accountAccessData.length));

      setShownData(accountAccessData);
    } else {
      const filteredData = peopleData.filter((peep:any) => {
        if (checked.active && peep.active === 1) {
          return true;
        }
        if (checked.archived && peep.active === 0) {
          return true;
        }
        return false;
      });
      dispatch(updateCount(filteredData.length));

      setShownData(filteredData);
    }

    setDropdownStatus(status);
  }, [checked]);

  useEffect(() => {
    document.addEventListener('click', closeOpenMenus);
    return () => { document.removeEventListener('click', closeOpenMenus); };
  }, [isDropdownOpen]);

  const handleCheckboxChange = (checkboxName:any) => {
    setChecked((prevState:any) => {
      const newState = {
        ...prevState,
        [checkboxName]: !prevState[checkboxName],
      };

      // Ensure at least one checkbox is always checked
      const isAtLeastOneChecked = Object.values(newState).some(
        (isChecked) => isChecked,
      );

      // If all checkboxes are unchecked, prevent unchecking the current one
      if (!isAtLeastOneChecked) {
        newState[checkboxName] = true;
      }

      return newState;
    });
  };

  return (
    <div
      ref={ref}
      className="relative inline-block w-80"
    >

      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        data-dropdown-toggle="dropdownDefaultCheckbox"
        className="border-b-2 border-black/50 border-dashed font-medium text-base ml-2 px-3 py-1 text-center inline-flex items-center text-blue-500 hover:text-black"
        type="button"
      >
        {dropdownStatus.map((stat:any, index:number) => (
          <div key={stat}>
            {index > 0 ? ', ' : ''}
            {stat}
          </div>
        ))}
        {' '}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div
        id="dropdownDefaultCheckbox"
        data-testid="dropdown"
        className={`${
          isDropdownOpen ? '' : 'hidden'
        } z-10 absolute top-full left-10 w-320 px-6 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 grid grid-rows-2 grid-flow-col gap-2 py-2`}
      >
        <div className="flex items-center whitespace-nowrap">
          <input
            id="checkbox-item-1"
            type="checkbox"
            data-testid="active"
            checked={checked.active}
            onChange={
              () => handleCheckboxChange('active')
            }
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
        </div>
        <div className="flex items-center whitespace-nowrap">
          <input
            id="checkbox-item-2"
            type="checkbox"
            data-testid="archive"
            checked={checked.archived}
            onChange={() => handleCheckboxChange('archived')}
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Archived</label>
        </div>
        <div className="flex items-center whitespace-nowrap">
          <input
            id="checkbox-item-3"
            type="checkbox"
            data-testid="access"
            checked={checked.access}
            onChange={() => handleCheckboxChange('access')}
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Account Access</label>
        </div>
      </div>
    </div>

  );
}

export default Dropdown;
