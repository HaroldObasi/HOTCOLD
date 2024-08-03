import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ModalTypeEnum {
  NULL = "",
  INFO = "INFO",
  SELECT_WORD = "SELECT_WORD",
  LEADERBOARD = "LEADERBOARD"
}

interface State {
  modal: {
    open: boolean;
    type: ModalTypeEnum;
    info?: any;
  };
  targetWordOptions: string[];
}

const initialState: State = {
  modal: {
    open: false,
    type: ModalTypeEnum.NULL
  },
  targetWordOptions: []
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modal.open = action.payload;
    },
    setTargetWordOptions: (state, action: PayloadAction<string[]>) => {
      state.targetWordOptions = action.payload;
    },
    setModalType: (state, action: PayloadAction<ModalTypeEnum>) => {
      state.modal.type = action.payload;
    },
    setModalInfo: (state, action: PayloadAction<string>) => {
      state.modal.info = action.payload;
    }
  }
});

export const {setModal, setTargetWordOptions, setModalType, setModalInfo} =
  uiSlice.actions;

export default uiSlice.reducer;
