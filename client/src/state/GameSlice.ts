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
      state.room.timer = action.payload.timer;

      // Also uses the opportunity to update the round just incase:
      state.room.currentRound = action.payload.currentRound;

      //Also update the state of the players just in case the player changes :)
    },

    //Handles an event where a players
    changePlayerRoles: (state, action: PayloadAction<any>) => {
      state.room.players = action.payload.players;

      // Also uses the opportunity to update the round just incase:
      state.room.currentRound = action.payload.currentRound;
    }
  }
});

export const {changeGameState, changeGameTimer, changePlayerRoles} =
  gameSlice.actions;

export default gameSlice.reducer;
