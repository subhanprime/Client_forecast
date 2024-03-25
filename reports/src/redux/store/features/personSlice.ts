import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import PeopleTableInterface from '../../../components/tables/tableComponent/propleInterface';

interface PeopleState {
  peopleTableData: PeopleTableInterface[];
}
const initialState: PeopleState = {
  peopleTableData: [],
};

export const PersonTableSlice = createSlice({
  name: 'personTable',
  initialState,
  reducers: {
    addPeopleTableData: (state:any, action:PayloadAction<PeopleTableInterface[]>) => {
      state.peopleTableData.push(action.payload);
    },
  },
});

export const getPeopleTableDataList = (state:
{ peopleTableList: PeopleTableInterface[] }) => state.peopleTableList;
export default PersonTableSlice.reducer;
export const { addPeopleTableData } = PersonTableSlice.actions;
