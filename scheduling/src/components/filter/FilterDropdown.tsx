import React, { useEffect, useRef, useState } from 'react';
import FilterSelectedDisplay from './FilterSelectedDisplay';
import { SelectedFilterType } from '../../feature/filter/filterSlice';

interface FilterDropdownProps {
  selectedFilter: SelectedFilterType[];
  handleOpen:(type: 'full' | 'selected' | 'new', ind?: number) => void;
  updateSelectedFilter: (index: number, data: SelectedFilterType) => void
  deleteSelectedFilter: (index: number) => void

}

function FilterDropdown({
  selectedFilter,
  handleOpen,
  updateSelectedFilter,
  deleteSelectedFilter,
}:FilterDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>

      <div className="flex items-center rounded-lg text-[13px] h-6 select-none cursor-pointer relative">
        <div onClick={() => { setIsDropdownOpen(!isDropdownOpen); }} className=" px-2 text-black/70 rounded-md h-full flex items-center hover:bg-gray-300 hover:text-black">
          +
          {selectedFilter.length - 2}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="max-w-80 max-h-[500px] absolute top-7 bg-white shadow-lg z-[99999]  rounded-lg p-3 flex flex-col gap-3 items-start">
          {selectedFilter.slice(2).map((fil, index) => (
            <FilterSelectedDisplay
              key={`${fil.filter.name}-${index}`}
              index={index + 2}
              filter={fil}
              handleOpen={handleOpen}
              updateSelectedFilter={updateSelectedFilter}
              deleteSelectedFilter={deleteSelectedFilter}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
