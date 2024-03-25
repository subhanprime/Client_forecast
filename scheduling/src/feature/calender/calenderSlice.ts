import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CalenderType, ContextSelectedType, RowsType, ScrollDir, SortOrder, SortType, ViewType,
} from '../../constants';

export interface HoverInfoType {
  start: number;
  end: number;
  total: number;
}
interface CalenderSlice {
  scrollDirection: ScrollDir;
  viewType:ViewType;
  calenderType:CalenderType;
  rowsType:RowsType;
  sortType:SortType;
  sortOrder:SortOrder;
  selectedContext:ContextSelectedType;
  selectedDates:HoverInfoType | null,
}

const initialState :CalenderSlice = {
  scrollDirection: ScrollDir.None,
  viewType: ViewType.Schedule,
  calenderType: CalenderType.Weeks,
  rowsType: RowsType.Compact,
  sortType: SortType.Name,
  sortOrder: SortOrder.Asc,
  selectedContext: ContextSelectedType.Add,
  selectedDates: null,
};

const calenderSlice = createSlice({
  name: 'calender',
  initialState,
  reducers: {
    scrollCalender(state, action:PayloadAction<ScrollDir>) {
      state.scrollDirection = action.payload;
    },
    changeViewType(state, action:PayloadAction<ViewType>) {
      state.viewType = action.payload;
    },
    changeCalenderType(state, action:PayloadAction<CalenderType>) {
      state.calenderType = action.payload;
    },
    changeRowsType(state, action:PayloadAction<RowsType>) {
      state.rowsType = action.payload;
    },
    changeSortType(state, action:PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    changeSortOrder(state, action:PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },
    changeContext(state, action:PayloadAction<ContextSelectedType>) {
      state.selectedContext = action.payload;
    },
    setSelectedDates(state, action:PayloadAction<HoverInfoType | null>) {
      state.selectedDates = action.payload;
    },
  },
});

export const {
  scrollCalender, changeViewType, changeCalenderType,
  changeRowsType, changeSortType, changeSortOrder, changeContext, setSelectedDates,
} = calenderSlice.actions;
export default calenderSlice.reducer;
