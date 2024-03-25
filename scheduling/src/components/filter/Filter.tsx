import React, { useEffect, useRef, useState } from 'react';
import { Layers2, Plus, SearchSlash } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import {
  FilterDataMap,
  FilterType,
  OptionActions,
  SelectedFilter, foreignDataArray, initialFilterData,
} from '../../constants';
import FilterSelected from './FilterSelected';
import FilterScreen from './FilterScreen';
import FilterSearch from './FilterSearch';
import FilterSelectedDisplay from './FilterSelectedDisplay';
import { SavedFilterType, SelectedFilterType } from '../../feature/filter/filterSlice';
import FilterDropdown from './FilterDropdown';
import SaveFilter from './SaveFilter';

interface Data {
  tasks: TaskMap | null;
  projects: ProjectsAllMap | null;
  people: PeopleMap | null,
  peopleTasks:PeopleTasks[] | null;
  projectTasks: ProjectTask[] | null;
  roles: Role[] | null;
  department: Department[] | null;
  tags: Tag[] | null;
  projectOwner:People[] | null;
  managers:People[] | null;
  peopleType:PeopleType[] | null;
}

interface FilterProps {
  sheduler:Data;
  filters: FilterType[];
  selectedFilter: SelectedFilterType[];
  savedFilter: SavedFilterType[];
  selectedSavedFilter: SavedFilterType | null
  resetFilters:()=>void;
  clearSelectedFilters: () => void;
  addSelectedFilter: (data: SelectedFilterType) => void;
  updateSelectedFilter: (index: number, data: SelectedFilterType) => void;
  deleteSelectedFilter: (index: number) => void;
  onSaveFilter: () => void;
  onSetSavedFilter: (filter: SavedFilterType) => void;
  onSavedFilterActions: (optionAction: OptionActions, filter: SavedFilterType) => void;
}

function Filter({
  sheduler,
  filters,
  selectedFilter,
  savedFilter,
  selectedSavedFilter,
  resetFilters,
  clearSelectedFilters,
  addSelectedFilter,
  updateSelectedFilter,
  deleteSelectedFilter,
  onSaveFilter,
  onSetSavedFilter,
  onSavedFilterActions,
}:FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [iconFlag, setIconFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [indexValue, setIndexValue] = useState<null | number>(null);
  const [selectedFilterType, setSelectedFilterType] = useState<null | SelectedFilter>(null);
  const [filteredDataState, setFilteredDataState] = useState<FilterDataMap>(initialFilterData);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedFilterType(null);
        resetFilters();
        setSearch('');
        setIndexValue(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // map on data instead oof filters and attach it to and use lodash
  const updateFilters = () => {
    let filteredData:FilterDataMap = initialFilterData;
    foreignDataArray.forEach((f) => {
      const data = sheduler[f];
      if (data) {
        if (!Array.isArray(data) && !(data instanceof Map)) {
          return;
        }
        const newData = [...data].filter((d) => {
          if (Array.isArray(d)) {
            return d[1].name.toLowerCase().includes(search.toLowerCase());
          }
          return d.name.toLowerCase().includes(search.toLowerCase());
        });
        filteredData = {
          ...filteredData,
          [f]: newData,
        };
      }
    });
    setFilteredDataState(filteredData);
    setIconFlag(!iconFlag);
  };

  useEffect(() => {
    if (search !== '') {
      const searchData = setTimeout(() => {
        updateFilters();
      }, 0);

      return () => clearTimeout(searchData);
    }

    resetFilters();
    return () => {};
  }, [search]);
  useEffect(() => {
    setIsOpen(false);
  }, [selectedFilter]);

  const getLength = () => {
    if (selectedFilterType) {
      const data = sheduler[selectedFilterType.filter.foreignData];
      if (data) {
        if (Array.isArray(data) || (data instanceof Map)) {
          return `${[...data].length} ${selectedFilterType.filter.name}`;
        }
      }
    }
    return '';
  };

  const getElements = () => {
    if (selectedFilterType) {
      const data = sheduler[selectedFilterType.filter.foreignData];
      if (data) {
        if (!Array.isArray(data) && !(data instanceof Map)) {
          return [];
        }
        const temp = [...data];
        if (search !== '') {
          return temp.filter((d) => {
            if (Array.isArray(d)) {
              return d[1].name.toLowerCase().includes(search.toLowerCase());
            }
            return d.name.toLowerCase().includes(search.toLowerCase());
          });
        }
        return temp;
      }
    }
    return [];
  };
  const handleSelectNone = () => {
    setSelectedFilterType(null);
  };

  const handleSearchUpdate = (e:any) => {
    setSearch(e.target.value);
  };

  const handleOpen = (type:'full' | 'selected' | 'new', ind?:number) => {
    setIsSaveOpen(false);
    if (type === 'full' || type === 'new') {
      handleSelectNone();
      setIsOpen(true);
      if (selectedFilter && ind !== undefined && selectedFilter[ind] && type === 'full') {
        setIndexValue(ind);
      }
    } if (selectedFilter && type === 'selected' && ind !== undefined && selectedFilter[ind]) {
      setSelectedFilterType({
        filter: selectedFilter[ind].filter,
        fiterName: selectedFilter[ind].fiterName,
        color: selectedFilter[ind].color,
        icon: selectedFilter[ind].icon,
        included: selectedFilter[ind].included,
      });
      setIndexValue(ind);

      setIsOpen(true);
    }
    if (ind === undefined) {
      setIndexValue(null);
    }
  };
  const handleSaveOpen = (open:boolean) => {
    setIsSaveOpen(open);
    if (open) {
      setIsOpen(false);
    }
  };
  const clearAllFilters = () => {
    clearSelectedFilters();
    setSelectedFilterType(null);
    setIndexValue(null);
  };

  return (
    <div data-testid="filter" ref={ref} className="relative flex gap-2">

      <SaveFilter
        savedFilter={savedFilter}
        selectedSavedFilter={selectedSavedFilter}
        isOpen={isSaveOpen}
        setIsOpen={handleSaveOpen}
        handleOpen={handleOpen}
        onSetSavedFilter={onSetSavedFilter}
        onSavedFilterActions={onSavedFilterActions}
      />
      {selectedFilter.length === 0 ? (
        <div className="flex gap-2">
          <button onClick={() => handleOpen('new')} type="button" className="text-xs border border-gray-300 rounded px-2 py-1 flex gap-2 items-center hover:bg-gray-300 active:bg-gray-400 active:scale-95 transition-all  duration-200">
            <SearchSlash size={12} color="black" />
            <div>Filter</div>
          </button>
          {selectedFilter.length === 0 && selectedSavedFilter && (
            <div data-testid="close-all-filter" onClick={clearAllFilters} className="flex items-center rounded-lg text-[13px] h-6 select-none cursor-pointer ">
              <div className=" px-2 text-black/70 rounded-md h-full flex items-center hover:bg-gray-200 hover:text-black focus:bg-gray-300 focus:text-black ">
                Clear all
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 overflow-hidden">
          {selectedFilter.slice(0, 2).map((fil, index) => (
            <FilterSelectedDisplay
              key={`${fil.filter.name}-${index}`}
              filter={fil}
              index={index}
              handleOpen={handleOpen}
              updateSelectedFilter={updateSelectedFilter}
              deleteSelectedFilter={deleteSelectedFilter}
              showOperation0={!!selectedSavedFilter}
            />
          ))}
          {selectedFilter.length > 2 && (
          <FilterDropdown
            selectedFilter={selectedFilter}
            handleOpen={handleOpen}
            updateSelectedFilter={updateSelectedFilter}
            deleteSelectedFilter={deleteSelectedFilter}
          />
          )}
          <div data-testid="add-filter" onClick={() => handleOpen('new')} className="flex items-center rounded-lg text-[13px] h-6 select-none cursor-pointer">
            <div style={{ backgroundColor: selectedFilter[selectedFilter.length - 1].color }} className=" px-2 hover:brightness-95 rounded-md h-full flex items-center">
              <Plus size={15} />
            </div>
          </div>
          <div
            onClick={onSaveFilter}
            data-testid="save-filter"
            className="flex items-center rounded text-[13px] border hover:bg-gray-300 transition-all  duration-200 active:bg-gray-400 active:scale-95 border-black/60 h-6 select-none cursor-pointer"
          >
            <div className="text-xs rounded px-2 py-1 flex gap-2 items-center  ">
              <Layers2 size={15} color="black" />
              Save
            </div>
          </div>
          <div data-testid="close-all-filter" onClick={clearAllFilters} className="flex items-center rounded-lg text-[13px] h-6 select-none cursor-pointer ">
            <div className=" px-2 text-black/70 rounded-md h-full flex items-center hover:bg-gray-200 hover:text-black focus:bg-gray-300 focus:text-black ">
              Clear all
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="w-[450px] max-h-[500px] min-h-[300px] absolute top-7 bg-white shadow-lg z-[9999]  rounded-lg p-3 pb-10 flex flex-col gap-6">
          <AnimatePresence>

            <FilterSearch
              key="search"
              getLength={getLength}
              searchValue={search}
              onChange={handleSearchUpdate}
            />
            {!selectedFilterType ? (
              <FilterScreen
                key="screen"
                filters={filters}
                setSelectedFilterType={setSelectedFilterType}
                search={search}
                selectedIndex={indexValue}
                addSelectedFilter={addSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
                filteredData={filteredDataState}
                flag={iconFlag}
              />
            ) : (
              <FilterSelected
                key="screen"
                selectedFilterType={selectedFilterType}
                getElements={getElements}
                handleSelectNone={handleSelectNone}
                selectedIndex={indexValue}
                addSelectedFilter={addSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
              />
            )}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}

export default Filter;
