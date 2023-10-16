import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface states {
  name: string;
}

const initialState: states = {
  name: ""
};

export const playerSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action:PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export const {setName} = playerSlice.actions;

export default playerSlice.reducer;
