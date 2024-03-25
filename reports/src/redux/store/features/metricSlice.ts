import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MetricState {
  isPeopleSelected:boolean,
  isProjectSelected:boolean,
  totalCapacity:number,
  totalBillable:number,
  totalNonBillable:number,
  totalScheduled:number,
  totalOvertime:number,
  totalTimeOff:number,
  totalTentative:number,
}
const initialState: MetricState = {
  isPeopleSelected: true,
  isProjectSelected: false,
  totalCapacity: 0,
  totalBillable: 0,
  totalNonBillable: 0,
  totalScheduled: 0,
  totalOvertime: 0,
  totalTimeOff: 0,
  totalTentative: 0,
};

export const MetricSlice = createSlice({
  name: 'metricState',
  initialState,
  reducers: {
    setTotalCapacity: (state: MetricState, action: PayloadAction<number>) => {
      state.totalCapacity = action.payload;
    },
    setTotalBillable: (state: MetricState, action: PayloadAction<number>) => {
      state.totalBillable = action.payload;
    },
    setTotalNonBillable: (state: MetricState, action: PayloadAction<number>) => {
      state.totalNonBillable = action.payload;
    },
    setTotalScheduled: (state: MetricState, action: PayloadAction<number>) => {
      state.totalScheduled = action.payload;
    },
    setTotalTimeOff: (state: MetricState, action: PayloadAction<number>) => {
      state.totalTimeOff = action.payload;
    },
    setTotalOverTime: (state: MetricState, action: PayloadAction<number>) => {
      state.totalOvertime = action.payload;
    },
    setTotalTentative: (state: MetricState, action: PayloadAction<number>) => {
      state.totalTentative = action.payload;
    },
    setIsPeopleSelected: (state: MetricState, action: PayloadAction<boolean>) => {
      state.isPeopleSelected = action.payload;
    },
    setIsProjectSelected: (state: MetricState, action: PayloadAction<boolean>) => {
      state.isProjectSelected = action.payload;
    },
  },
});
export const getIsPeopleSelected = (state:
{ isPeopleSelected: boolean }) => state.isPeopleSelected;
export const getIsProjectSelected = (state:
{ isProjectSelected: boolean }) => state.isProjectSelected;
export default MetricSlice.reducer;
export const {
  setTotalCapacity, setTotalBillable, setTotalNonBillable, setTotalScheduled, setTotalTimeOff, setTotalOverTime, setTotalTentative, setIsPeopleSelected, setIsProjectSelected,
} = MetricSlice.actions;
