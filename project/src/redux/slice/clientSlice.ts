import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClients } from '../../components/constant/bulkActions';

const initialState: IClients = {
  clients: [],
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addClients(state, action: PayloadAction<{ name: string }[]>) {
      state.clients.push(...action.payload);
    },
  },
});

export const { addClients } = clientSlice.actions;
export default clientSlice.reducer;
