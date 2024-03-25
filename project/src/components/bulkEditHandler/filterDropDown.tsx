import React, { useState, useRef, useEffect } from 'react';
import { ProjectInternalFilter } from '../constant/enums';
import { FilterDropDownProp } from '../constant/bulkActions';
import folderIcon from '../../media/svg/folder.svg';

function FilterDropDown({
  filterDropdownObj,
  setFilterDropdownObj,
  // unSelectAllCheckBox,
}: FilterDropDownProp) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleParentClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="text-gray-800 text-base font-medium relative flex items-center gap-2"
      onClick={handleParentClick}
      ref={dropdownRef}

    >
      <img src={folderIcon} alt="" />
      <div className="cursor-pointer p-1 px-2 border-b border-[#4a4aff] border-dashed min-w-[120px] ">
        {[
          filterDropdownObj.active && ProjectInternalFilter.Active,
          filterDropdownObj.archived && ProjectInternalFilter.Archived,
          filterDropdownObj.myProjects && ProjectInternalFilter.MyProject,
        ]
          .filter(Boolean) // Remove falsy values (undefined, false)
          .join(ProjectInternalFilter.Separator)}
      </div>
      {isOpen && (
        <div
          className="p-3 dropdownDiv absolute top-[34px] left-0 z-50 bg-white w-[350px] rounded-lg border shadow-xl"
          onClick={handleDropdownClick}
        >
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-1">
              <label htmlFor="archived-sdf33" className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  className="cursor-pointer"
                  checked={filterDropdownObj.archived}
                  type="checkbox"
                  id="archived-sdf33"
                  onClick={() => {
                    setFilterDropdownObj((prev) => ({ ...prev, archived: !prev.archived }));
                    // unSelectAllCheckBox();
                  }}
                />
                {ProjectInternalFilter.Archived}
              </label>
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="myProject-sdf33" className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  id="myProject-sdf33"
                  checked={filterDropdownObj.myProjects}
                  onClick={() => {
                    setFilterDropdownObj((prev) => ({ ...prev, myProjects: !prev.myProjects }));
                    // unSelectAllCheckBox();
                  }}
                />
                {ProjectInternalFilter.MyProject}
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <label htmlFor="active-sdf33" className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  id="active-sdf33"
                  checked={filterDropdownObj.active}
                  onClick={() => {
                    setFilterDropdownObj((prev) => ({ ...prev, active: !prev.active }));
                    // unSelectAllCheckBox();
                  }}
                />
                {ProjectInternalFilter.Active}
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
