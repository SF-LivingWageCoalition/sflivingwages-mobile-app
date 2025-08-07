import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  name: string;
  email: string;
}

const initialState: DataState = {
  name: "",
  email: "",
};

// NOTE: this is an exmaple of a data slice
//TODO: Remove or modify this file as needed

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
