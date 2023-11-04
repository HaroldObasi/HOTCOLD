import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
  room: any;
}

const initialState: State = {
  room: null
};

export const gameSlice = createSlice({
  name: "game state",
  initialState,
  reducers: {
    changeGameState: (state, action: PayloadAction<any>) => {
      state.room = action.payload;
    }
  }
});

export const {changeGameState} = gameSlice.actions;

export default gameSlice.reducer;
