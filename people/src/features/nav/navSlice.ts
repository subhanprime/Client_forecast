import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavSlice {
  itemsCount : number
}

const initialState : NavSlice = { itemsCount: 0 };

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    updateCount(state, action:PayloadAction<number>) {
      state.itemsCount = action.payload;
    },
  },
});

export const { updateCount } = navSlice.actions;

export default navSlice.reducer;
