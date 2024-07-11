import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
  modalOpen: boolean;
  targetWordOptions: string[];
}

const initialState: State = {
  modalOpen: false,
  targetWordOptions: []
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    setTargetWordOptions: (state, action: PayloadAction<string[]>) => {
      state.targetWordOptions = action.payload;
    }
  }
});

export const {setModal, setTargetWordOptions} = uiSlice.actions;

export default uiSlice.reducer;
