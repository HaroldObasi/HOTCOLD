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

    changeGameStarted: (state, action: PayloadAction<any>) => {
      state.room.started = action.payload;
    },

    addMessage: (state, action: PayloadAction<any>) => {
      state.room.messages = [...state.room.messages, action.payload];
    },

    addPickerMessage: (state, action: PayloadAction<any>) => {
      state.room.pickerMessages = [
        ...state.room.pickerMessages,
        action.payload
      ];
    },

    updatePickerMessage: (state, action: PayloadAction<any>) => {
      state.room.pickerMessages[action.payload.index] = action.payload.message;
    },

    updatePlayers: (state, action: PayloadAction<any>) => {
      state.room.players = action.payload;
    },

    updateMesssages: (state, action: PayloadAction<any>) => {
      state.room.messages = action.payload;
    },

    resetPickerMessages: (state) => {
      state.room.pickerMessages = [];
    },

    changeGameTimer: (state, action: PayloadAction<any>) => {
      state.room.timer = action.payload.timer;

      // Also uses the opportunity to update the round just incase:
      state.room.currentRound = action.payload.currentRound;

      //Also update the state of the players just in case the player changes :)
    },

    updateTargetWord: (state, action: PayloadAction<any>) => {
      state.room.targetWord = action.payload;
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
  changeGameStarted,
  changeGameTimer,
  changePlayerRoles,
  addMessage,
  addPickerMessage,
  resetPickerMessages,
  updateTargetWord,
  updatePlayers,
  updateMesssages,
  updatePickerMessage
} = gameSlice.actions;

export default gameSlice.reducer;
