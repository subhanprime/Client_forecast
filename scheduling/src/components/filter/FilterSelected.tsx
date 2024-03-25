import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterOperation, ForeignFilteredData, SelectedFilter } from '../../constants';
import {
  SelectedFilterType,
} from '../../feature/filter/filterSlice';

interface SelectedProps {
  selectedFilterType: SelectedFilter,
  handleSelectNone: () => void,
  getElements: () =>
  (PeopleType | Role | Department
  | Tag | [number, Project] | [number, People]
  | People | Project | Task)[],
  selectedIndex:null | number,
  addSelectedFilter: (data: SelectedFilterType) => void,
  updateSelectedFilter: (index: number, data: SelectedFilterType) => void,

}

function FilterSelected({
  selectedFilterType,
  handleSelectNone,
  getElements,
  selectedIndex,
  addSelectedFilter,
  updateSelectedFilter,
}:SelectedProps) {
  const [included, setIncluded] = useState(true);

  const handleSelect = (elem:ForeignFilteredData) => {
    if (selectedIndex !== null) {
      updateSelectedFilter(
        selectedIndex,
        {
          filter: selectedFilterType.filter,
          fiterName: selectedFilterType.fiterName,
          color: selectedFilterType.color,
          icon: selectedFilterType.icon,
          included,
          selectedItem: elem,
          operation: FilterOperation.And,
        },
      );
      return;
    }
    addSelectedFilter({
      filter: selectedFilterType.filter,
      fiterName: selectedFilterType.fiterName,
      color: selectedFilterType.color,
      icon: selectedFilterType.icon,
      included,
      selectedItem: elem,
      operation: FilterOperation.And,
    });
  };

  return (
    <motion.div
      id="select"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="h-full flex flex-col gap-4 overflow-hidden"
    >
      <div className="flex gap-4 text-[13px] h-8 select-none">
        <div onClick={handleSelectNone} className="cursor-pointer hover:bg-gray-200 rounded p-1 flex items-center h-full">
          <ArrowLeft size={20} />
        </div>
        <div onClick={handleSelectNone} style={{ backgroundColor: selectedFilterType.color }} className="flex items-center gap-2 px-2 rounded-md cursor-pointer hover:brightness-95 h-full">
          <div>{selectedFilterType.icon(17)}</div>
          {selectedFilterType.filter.name}
        </div>
        <div className="flex items-center rounded-md cursor-pointer h-full">
          <div
            onClick={() => setIncluded(true)}
            style={{ backgroundColor: included ? selectedFilterType.color : 'rgb(243 244 246 )' }}
            className="px-3 hover:brightness-95 rounded-l h-full flex items-center"
          >
            is

          </div>
          <div
            onClick={() => setIncluded(false)}
            style={{ backgroundColor: !included ? selectedFilterType.color : 'rgb(243 244 246 )' }}
            className="px-3  hover:brightness-95 rounded-r h-full flex items-center"
          >
            is not

          </div>
        </div>
      </div>
      <div className="h-full overflow-auto  scrollbar">
        {getElements().map((elem, index) => (
          <div
            onClick={() => handleSelect(elem)}
            key={index}
            data-testid={`${Array.isArray(elem) ? elem[1].name : elem.name}`}
            className="flex justify-between rounded-lg px-3 py-2 hover:bg-gray-200 group items-center text-sm cursor-pointer"
          >
            <div>{Array.isArray(elem) ? elem[1].name : elem.name}</div>
            <input type="checkbox" name="" id="" className="hidden group-hover:block h-4 w-4" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default FilterSelected;
