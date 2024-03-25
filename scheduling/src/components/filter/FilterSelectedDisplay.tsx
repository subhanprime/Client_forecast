import React from 'react';
import { X } from 'lucide-react';
import {
  SelectedFilterType,
} from '../../feature/filter/filterSlice';
import { FilterOperation } from '../../constants';

interface SelectedDisplayProps {
  filter:SelectedFilterType;
  index:number;
  handleOpen:(type: 'full' | 'selected' | 'new', ind?: number) => void;
  updateSelectedFilter: (index: number, data: SelectedFilterType) => void;
  deleteSelectedFilter: (index: number) => void;
  isViewOnly?:boolean;
  showOperation0?:boolean;

}

function FilterSelectedDisplay({
  filter, index, handleOpen, updateSelectedFilter, deleteSelectedFilter, isViewOnly = false,
  showOperation0 = false,
}:SelectedDisplayProps) {
  const updateFilterOperationState = () => {
    updateSelectedFilter(index, {
      ...filter,
      operation: filter.operation === FilterOperation.And
        ? FilterOperation.Or : FilterOperation.And,
    });
  };

  return (
    <div className="flex gap-[1px] text-[13px] h-6 select-none">
      {(index !== 0 || showOperation0) && (
      <div className="flex w-12 items-center rounded-md cursor-pointer h-full mr-1">
        <div
          data-testid="filter-operation"
          onClick={() => updateFilterOperationState()}
          className="px-3 hover:brightness-95 h-full flex items-center text-center w-full rounded-md capitalize text-indigo-700 font-medium hover:bg-gray-200/40"
        >
          {filter.operation}

        </div>
      </div>
      )}
      <div
        onClick={() => handleOpen('full', index)}
        style={{ backgroundColor: filter.color }}
        className="flex items-center gap-2 px-2 rounded-l-md cursor-pointer hover:brightness-95 h-full"
      >
        <div>{filter.icon(17)}</div>
        {filter.filter.name}
      </div>
      <div className="flex items-center rounded-md cursor-pointer h-full">
        <div
          data-testid="filter-included"
          onClick={() => updateSelectedFilter(index, { ...filter, included: !filter.included })}
          style={{ backgroundColor: filter.color }}
          className="px-3 hover:brightness-95 h-full flex items-center"
        >
          {filter.included ? 'is' : 'is not'}

        </div>
      </div>
      <div onClick={() => handleOpen('selected', index)} className="flex items-center rounded-md cursor-pointer h-full">
        <div style={{ backgroundColor: filter.color }} className={`px-3 hover:brightness-95 h-full flex items-center w-full ${isViewOnly ? 'rounded-r-md' : ''}`}>
          {Array.isArray(filter.selectedItem)
            ? filter.selectedItem[1].name : filter.selectedItem.name}
        </div>
      </div>
      {!isViewOnly && (
      <div data-testid="close-filter" onClick={() => deleteSelectedFilter(index)} className="flex items-center rounded-md cursor-pointer h-full">
        <div style={{ backgroundColor: filter.color }} className="px-3 hover:brightness-95 rounded-r-md h-full flex items-center">
          <X size={15} />
        </div>
      </div>
      )}

    </div>
  );
}

export default FilterSelectedDisplay;
