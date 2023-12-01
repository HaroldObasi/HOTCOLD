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
    },
    changeGameTimer: (state, action: PayloadAction<any>) => {
      console.log("This is the action payloaf: ", action.payload);
      state.room.timer = action.payload;
    }
  }
});

export const {changeGameState, changeGameTimer} = gameSlice.actions;

export default gameSlice.reducer;
