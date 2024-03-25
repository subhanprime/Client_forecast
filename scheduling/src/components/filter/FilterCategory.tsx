import React, { useEffect, useState } from 'react';
import {
  FilterDataMap,
  FilterOperation,
  FilterOption, FilterType, ForeignFilteredData, SelectedFilter,
} from '../../constants';
import { SelectedFilterType } from '../../feature/filter/filterSlice';

interface FilterCatProp {
  filter:FilterType;
  filteredData: FilterDataMap;
  flag: boolean;
  setSelectedFilterType: React.Dispatch<React.SetStateAction<SelectedFilter | null>>;
  isSearch:boolean;
  selectedIndex:null | number;
  addSelectedFilter: (data: SelectedFilterType) => void;
  updateSelectedFilter: (index: number, data: SelectedFilterType) => void;
}

function FilterCategory({
  filter, setSelectedFilterType, isSearch, selectedIndex,
  addSelectedFilter, updateSelectedFilter, filteredData, flag,
}:FilterCatProp) {
  const [isIconDisplayed, setIsIconDisplayed] = useState(!isSearch);

  useEffect(() => {
    if (isSearch) {
      setIsIconDisplayed(false);
    }
  }, [flag]);

  const setIcon = () => {
    if (!isIconDisplayed) {
      setIsIconDisplayed(true);
    }
    return null;
  };

  const handleSetSelectedState = (f:FilterOption, data:ForeignFilteredData) => {
    if (selectedIndex !== null) {
      updateSelectedFilter(
        selectedIndex,
        {
          filter: f,
          fiterName: filter.name,
          color: filter.color,
          icon: filter.icon,
          included: true,
          selectedItem: data,
          operation: FilterOperation.And,
        },
      );
      return;
    }
    addSelectedFilter({
      filter: f,
      fiterName: filter.name,
      color: filter.color,
      icon: filter.icon,
      included: true,
      selectedItem: data,
      operation: FilterOperation.And,
    });
  };

  return (
    <div className="flex gap-4 items-start">
      {isIconDisplayed && <div>{filter.icon(18)}</div>}
      {!isSearch ? (
        <div className="flex flex-wrap gap-2">
          {filter.filters.map((f:FilterOption) => (
            <div
              key={f.name}
              onClick={() => setSelectedFilterType({
                filter: f,
                fiterName: filter.name,
                color: filter.color,
                icon: filter.icon,
                included: true,
              })}
              style={{ backgroundColor: filter.color }}
              className="rounded px-2 py-1 hover:brightness-90 cursor-pointer"
            >
              {f.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {filter.filters.map((f:FilterOption) => {
            if (filteredData[f.foreignData].length === 0) { return null; }
            return (
              <div
                key={f.name}
                className="w-full flex flex-col gap-2 items-start"
              >
                {setIcon()}
                <div
                  onClick={() => setSelectedFilterType({
                    filter: f,
                    fiterName: filter.name,
                    color: filter.color,
                    icon: filter.icon,
                    included: true,
                  })}
                  style={{ backgroundColor: filter.color }}
                  className="rounded px-2 py-1 hover:brightness-90 cursor-pointer"
                >
                  {' '}
                  {f.name}

                </div>

                <div className="w-full">

                  {filteredData[f.foreignData].map((data, index) => (
                    <div
                      onClick={() => handleSetSelectedState(f, data)}
                      key={index}
                      className="flex justify-between rounded-lg px-3 py-2 hover:bg-gray-200 group items-center text-sm cursor-pointer overflow-auto w-full"
                    >
                      <div>{Array.isArray(data) ? data[1].name : data.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterCategory;
