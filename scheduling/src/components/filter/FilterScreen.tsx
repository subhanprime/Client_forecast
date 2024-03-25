import React from 'react';
import { motion } from 'framer-motion';
import {
  FilterDataMap,
  FilterType, SelectedFilter,
} from '../../constants';
import FilterCategory from './FilterCategory';
import { SelectedFilterType } from '../../feature/filter/filterSlice';

interface FilterScreenProps {
  filters: FilterType[];
  filteredData: FilterDataMap;
  flag: boolean;
  setSelectedFilterType: React.Dispatch<React.SetStateAction<SelectedFilter | null>>;
  search:string;
  selectedIndex:null | number;
  addSelectedFilter: (data: SelectedFilterType) => void;
  updateSelectedFilter: (index: number, data: SelectedFilterType) => void;
}

function FilterScreen({
  filters, setSelectedFilterType, search, filteredData, flag,
  selectedIndex, addSelectedFilter, updateSelectedFilter,
}:FilterScreenProps) {
  return (
    <motion.div
      id="screen"
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="overflow-auto scrollbar"
    >
      {search === '' ? (
        <div className="flex flex-col gap-4 text-xs">

          <div>Filter by</div>
          <div className="px-3 flex flex-col gap-7 text-[13px]">

            {filters.map((filter:FilterType) => (
              <FilterCategory
                key={filter.name}
                filter={filter}
                setSelectedFilterType={setSelectedFilterType}
                isSearch={false}
                selectedIndex={selectedIndex}
                addSelectedFilter={addSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
                filteredData={filteredData}
                flag={flag}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-3 flex flex-col gap-7 text-[13px] overflow-auto">

          {filters.map((filter:FilterType) => (
            <FilterCategory
              key={filter.name}
              filter={filter}
              setSelectedFilterType={setSelectedFilterType}
              isSearch
              selectedIndex={selectedIndex}
              addSelectedFilter={addSelectedFilter}
              updateSelectedFilter={updateSelectedFilter}
              filteredData={filteredData}
              flag={flag}
            />
          ))}
        </div>

      )}
    </motion.div>
  );
}

export default FilterScreen;
