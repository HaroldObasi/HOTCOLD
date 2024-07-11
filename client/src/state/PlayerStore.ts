import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './PlayerSlice';
import gameReducer from "./GameSlice";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
    ui: uiSlice
  }
});

export type RootState = ReturnType<typeof store.getState>