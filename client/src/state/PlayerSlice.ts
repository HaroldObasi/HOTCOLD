import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface states {
  id?: string;
  userName?: string;
  role?: "WORD_GUESSER" | "WORD_PICKER";
  score?: number;
  roomId?: string;
}

const initialState: states = {
  userName: ""
};

export const playerSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    changePlayerObject: (state, action: PayloadAction<any>) => action.payload
  }
});

export const {setUserName, changePlayerObject} = playerSlice.actions;

export default playerSlice.reducer;
