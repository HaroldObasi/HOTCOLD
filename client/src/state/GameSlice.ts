import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// give room an acctual type bot
interface State {
  room: any;
}

const initialState: State = {
  room: {
    pickerMessages: []
  }
};

export const gameSlice = createSlice({
  name: "game state",
  initialState,
  reducers: {
    changeGameState: (state, action: PayloadAction<any>) => {
      state.room = {...state.room, ...action.payload};
    },

    updateMessages: (state, action: PayloadAction<any>) => {
      state.room.messages = [...state.room.messages, action.payload];
    },

    updatePickerMessages: (state, action: PayloadAction<any>) => {
      state.room.pickerMessages = [
        ...state.room.pickerMessages,
        action.payload
      ];
    },

    resetPickerMessages: (state, action: PayloadAction<any>) => {
      state.room.pickerMessages = [];
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

export const {
  changeGameState,
  changeGameTimer,
  changePlayerRoles,
  updateMessages,
  updatePickerMessages,
  resetPickerMessages
} = gameSlice.actions;

export default gameSlice.reducer;
