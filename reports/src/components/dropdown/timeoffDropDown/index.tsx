import React, { useEffect, useRef, useState } from 'react';

function TimeoffDropDownFilter() {
  const catMenu = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checked, setChecked] = useState({
    approved: true,
    tentative: false,
    declined: false,
  });
  const [dropdownStatus, setDropdownStatus] = useState(['Approved']);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const status = [];
    if (checked.approved) {
      status.push('Approved');
    }
    if (checked.tentative) {
      status.push('Tentative');
    }
    if (checked.declined) {
      status.push('Declined');
    } else {
      // const filteredData = peopleData.filter((peep) => {
      //   if (checked.active && peep.active === 1) {
      //     return true;
      //   }
      //   if (checked.archived && peep.active === 0) {
      //     return true;
      //   }
      //   return false;
      // });
      // setShownData(filteredData);
    }
    if (Object.values(checked).every((value) => value)) {
      setDropdownStatus(['All']);
    } else {
      setDropdownStatus(status);
    }
  }, [checked]);

  const closeOpenMenus = (e: MouseEvent) => {
    if (catMenu.current && isDropdownOpen && !catMenu.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener('click', closeOpenMenus);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('click', closeOpenMenus);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={catMenu}>
      <div className="relative flex justify-start px-1">
        <button
          id="dropdownCheckboxButton"
          data-testid="dropdownDefaultCheckbox"
          onClick={toggleDropdown}
          data-dropdown-toggle="dropdownDefaultCheckbox"
          className="border-2 rounded-md border-blue-500 font-medium  px-5 py-[4px] text-center inline-flex justify-center items-center text-blue-500 hover:text-blue-500 hover:bg-blue-200"
          type="button"
        >
          <span className="flex text-[14px] font-semi-bold pr-1">Time off: </span>
          <div className="flex-wrap gap-x-1">
            {dropdownStatus.map((stat, index) => (
              <span
                className="text-[14px] font-semi-bold text-blue whitespace-nowrap"
              >
                {index > 0 ? ', ' : ''}
                {stat}
              </span>
            ))}
          </div>
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdownDefaultCheckbox"
          className={`
    ${isDropdownOpen ? '' : 'hidden'}
    z-10 absolute top-full left-10 px-6 bg-white
    divide-y divide-gray-100 rounded-md
    shadow-md py-2
  `}
        >
          <div className="py-1 text-gray-700">People:</div>
          <div className="grid grid-rows-3  grid-flow-col">
            <div className="flex items-center whitespace-nowrap">
              <input
                id="checkbox-item-1"
                data-testid="checkbox-item-1"
                type="checkbox"
                defaultChecked
                onChange={() => setChecked((prev) => ({ ...prev, approved: !prev.approved }))}
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-1"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Approved
              </label>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <input
                id="checkbox-item-2"
                data-testid="checkbox-item-2"
                type="checkbox"
                onChange={() => setChecked((prev) => ({ ...prev, tentative: !prev.tentative }))}
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-1"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Tentative
              </label>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <input
                id="checkbox-item-3"
                data-testid="checkbox-item-3"
                type="checkbox"
                onChange={() => setChecked((prev) => ({
                  ...prev,
                  declined: !prev.declined,
                }))}
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-1"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Declined
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeoffDropDownFilter;
