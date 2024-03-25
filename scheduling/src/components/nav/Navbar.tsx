import React from 'react';
import {
  ChevronLeft, ChevronRight,
  Calendar, LayoutPanelTop, Plus, ExternalLink,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeCalenderType, changeRowsType, changeViewType, scrollCalender,
} from '../../feature/calender/calenderSlice';
import Dropdown from '../dropdown/Dropdown';
import {
  AddButtonDropData,
  CalenderType,
  DropdownData,
  ExternalLinksData, GridDropdownData, Modals, OptionActions, RowsType, SchedulerDropdown,
  ScrollDir, TimeSpanDropdown,
  ViewType,
  filters as sampleFilters,
} from '../../constants';
import { openModal } from '../../feature/modal/modalSlice';
import Filter from '../filter/Filter';
import {
  SavedFilterType,
  SavedFilterTypeEnum,
  SelectedFilterType, addSelectedFilterState,
  deleteSavedFilterState, deleteSelectedFilterState, setFilters,
  setSavedFilterState,
  setSelectedFilterState,
  updateSavedFilterState,
  updateSelectedFilterState,
} from '../../feature/filter/filterSlice';

function Navbar() {
  const dispatch = useAppDispatch();
  const { viewType } = useAppSelector((state) => state.calender);
  const sheduler = useAppSelector((state) => state.sheduler);
  const {
    filters, selectedFilter,
    selectedSavedFilter, savedFilter,
  } = useAppSelector((state) => state.filter);

  const handleScroll = (dir:ScrollDir) => {
    dispatch(scrollCalender(dir));
  };

  const handleViewChange = (data:DropdownData) => {
    dispatch(changeViewType(data.name as ViewType));
  };
  const handleCalenderChange = (data:DropdownData) => {
    dispatch(changeCalenderType(data.name as CalenderType));
  };
  const handleRowsChange = (data:DropdownData) => {
    dispatch(changeRowsType(data.name as RowsType));
  };
  const handleModalOpen = (data:DropdownData) => {
    if (data.name === 'Alocation Time') {
      dispatch(openModal({ isOpen: true, name: Modals.Alloc }));
    }
  };
  const handleExport = (data:DropdownData) => {
    if (data.name === 'Email this schedule') {
      dispatch(openModal({ isOpen: true, name: Modals.Email }));
    }
    if (data.name === 'Export (.CSV for Excel)') {
      dispatch(openModal({ isOpen: true, name: Modals.Export }));
    }
    if (data.name === 'Print') {
      setTimeout(() => window.print(), 500);
    }
  };

  // For filters
  const resetFilters = () => {
    dispatch(setFilters(sampleFilters));
  };

  const clearSelectedFilters = () => {
    dispatch(setSelectedFilterState([]));
    dispatch(setSavedFilterState(null));
  };
  const updateSelectedFilter = (index:number, data:SelectedFilterType) => {
    dispatch(updateSelectedFilterState({ filter: data, index }));
  };
  const addSelectedFilter = (data:SelectedFilterType) => {
    dispatch(addSelectedFilterState(data));
  };
  const deleteSelectedFilter = (index:number) => {
    dispatch(deleteSelectedFilterState(index));
  };
  const onSaveFilter = () => {
    dispatch(openModal({ isOpen: true, name: Modals.Filter }));
  };
  const onSetSavedFilter = (filter:SavedFilterType) => {
    dispatch(setSavedFilterState(filter));
  };
  const onSavedFilterActions = (optionAction:OptionActions, filter:SavedFilterType) => {
    if (optionAction === OptionActions.Edit) {
      dispatch(openModal({ isOpen: true, name: Modals.Filter, filter }));
    } else if (optionAction === OptionActions.Change) {
      dispatch(updateSavedFilterState(
        {
          filter: {
            ...filter,
            type: filter.type === SavedFilterTypeEnum.Personal
              ? SavedFilterTypeEnum.Shared : SavedFilterTypeEnum.Personal,
          },
          name: filter.name,
        },
      ));
    } else if (optionAction === OptionActions.Delete) {
      dispatch(openModal({
        isOpen: true,
        name: Modals.Delete,
        onDelete: () => {
          dispatch(deleteSavedFilterState(filter.name));
        },
        type: 'View',
        title: filter.name,
      }));
    }
  };

  return (
    <nav data-testid="navbar" className="absolute z-50 bg-[#F3F2F5]  top-0 w-full max-h-[60px] py-4 pr-4 pl-2">

      <div className="h-8 w-full flex items-center mb-0">
        <div className="relative flex-[0.75]">
          <div className="flex gap-2 items-center">
            <Dropdown
              defaultName={viewType}
              data={SchedulerDropdown}
              icon={null}
              className="flex items-center text-md font-semibold py-1 px-3 rounded gap-1 cursor-pointer text-xl border-transparent"
              dropSize="large"
              onSelection={handleViewChange}
            />
            <Filter
              sheduler={sheduler}
              filters={filters}
              selectedFilter={selectedFilter}
              savedFilter={savedFilter}
              selectedSavedFilter={selectedSavedFilter}
              resetFilters={resetFilters}
              clearSelectedFilters={clearSelectedFilters}
              addSelectedFilter={addSelectedFilter}
              updateSelectedFilter={updateSelectedFilter}
              deleteSelectedFilter={deleteSelectedFilter}
              onSaveFilter={onSaveFilter}
              onSetSavedFilter={onSetSavedFilter}
              onSavedFilterActions={onSavedFilterActions}
            />
          </div>
        </div>
        <div className="flex-[0.25] flex justify-between">
          <div className="flex gap-2">
            <button type="button" data-testid="navigateLeft" id="navigateLeft" onClick={() => handleScroll(ScrollDir.Left)} className="active:bg-gray-400 active:scale-90 transition-all duration-150 rounded px-1 py-1 flex items-center hover:bg-gray-300">
              <ChevronLeft size={17} color="black" />
            </button>
            <button type="button" data-testid="navigateRight" id="navigateRight" onClick={() => handleScroll(ScrollDir.Right)} className="active:bg-gray-400 active:scale-90  rounded px-1 py-1 flex items-center hover:bg-gray-300">
              <ChevronRight size={17} color="black" />
            </button>
            <button type="button" onClick={() => handleScroll(ScrollDir.Today)} className=" active:bg-gray-400 h-7 active:scale-95 border border-gray-300 rounded px-2 py-1  text-xs hover:bg-gray-300">
              Today
            </button>
          </div>
          <div className="flex gap-2">

            <Dropdown
              defaultName="Weeks"
              data={TimeSpanDropdown}
              icon={<Calendar size={13} color="black" />}
              className="border border-gray-300 rounded px-1 py-1 h-7 items-center justify-center hover:bg-gray-300 text-xs flex gap-1 cursor-pointer select-none"
              dropSize="small"
              onSelection={handleCalenderChange}
            />

            <Dropdown
              defaultName="Compact"
              hasChevron={false}
              data={GridDropdownData}
              icon={<LayoutPanelTop size={17} color="black" />}
              isNameShown={false}
              className="border border-gray-300 rounded px-1 py-1 h-7 text-xs hover:bg-gray-300 cursor-pointer select-none"
              dropSize="small"
              onSelection={handleRowsChange}
            />
          </div>
          <div className="flex gap-2">
            <Dropdown
              defaultName="Print"
              hasChevron={false}
              data={ExternalLinksData}
              icon={<ExternalLink size={17} color="black" />}
              isNameShown={false}
              className="border border-gray-300 rounded px-1 py-1 h-7 text-xs hover:bg-gray-300 cursor-pointer select-none"
              dropSize="small"
              selectable={false}
              onSelection={handleExport}
            />
            <Dropdown
              testid="add-button"
              defaultName="Add Button"
              hasChevron={false}
              data={AddButtonDropData}
              icon={<Plus size={17} color="white" />}
              isNameShown={false}
              className="bg-sky-500 rounded px-1 py-1 h-7  text-xs hover:bg-sky-600 cursor-pointer select-none"
              dropSize="small"
              selectable={false}
              hoverClasses="hover:text-indigo-600 hover:bg-indigo-100"
              onSelection={handleModalOpen}
            />

          </div>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;
