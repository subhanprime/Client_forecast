import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  filters as fil, FilterOperation, FilterType, ForeignFilteredData, SelectedFilter,
} from '../../constants';

export enum SavedFilterTypeEnum {
  Shared = 'shared',
  Personal = 'personal',
}
export interface SelectedFilterType extends SelectedFilter {
  selectedItem: ForeignFilteredData,
  operation:FilterOperation
}
export interface SavedFilterType {
  name:string;
  filter:SelectedFilterType[];
  type:SavedFilterTypeEnum;
}

interface FilterSlice {
  filters:FilterType[];
  selectedFilter:SelectedFilterType[];
  savedFilter:SavedFilterType[];
  selectedSavedFilter:SavedFilterType | null;
}

const initialState :FilterSlice = {
  filters: fil,
  selectedFilter: [],
  savedFilter: [],
  selectedSavedFilter: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action:PayloadAction<FilterType[]>) {
      state.filters = action.payload;
    },
    setSelectedFilterState(state, action:PayloadAction<SelectedFilterType[]>) {
      state.selectedFilter = (action.payload);
    },
    addSelectedFilterState(state, action:PayloadAction<SelectedFilterType>) {
      state.selectedFilter.push(action.payload);
    },
    updateSelectedFilterState(
      state,
      action:PayloadAction<{ filter:SelectedFilterType, index:number }>,
    ) {
      if (state.selectedFilter[action.payload.index]) {
        state.selectedFilter[action.payload.index] = action.payload.filter;
      }
    },
    deleteSelectedFilterState(
      state,
      action:PayloadAction< number >,
    ) {
      if (state.selectedFilter[action.payload]) {
        state.selectedFilter.splice(action.payload, 1);
      }
    },
    addSavedFilterState(
      state,
      action:PayloadAction< SavedFilterType >,
    ) {
      state.savedFilter.push(action.payload);
    },
    updateSavedFilterState(
      state,
      action:PayloadAction<{ filter: SavedFilterType, name:string }>,
    ) {
      const index = state.savedFilter.findIndex((item) => item.name === action.payload.name);
      if (index !== -1) {
        // Item not found, handle accordingly
        const updatedItems = [...state.savedFilter];
        updatedItems[index] = action.payload.filter;
        state.savedFilter = updatedItems;
      }
    },
    deleteSavedFilterState(
      state,
      action:PayloadAction< string >,
    ) {
      const temp = state.savedFilter.filter((t) => t.name !== action.payload);
      state.savedFilter = temp;
    },
    setSavedFilterState(
      state,
      action:PayloadAction< SavedFilterType | null >,
    ) {
      state.selectedSavedFilter = action.payload;
    },
  },
});

export const {
  setFilters,
  setSelectedFilterState,
  addSelectedFilterState,
  updateSelectedFilterState,
  deleteSelectedFilterState,
  addSavedFilterState,
  updateSavedFilterState,
  deleteSavedFilterState,
  setSavedFilterState,
} = filterSlice.actions;
export default filterSlice.reducer;
