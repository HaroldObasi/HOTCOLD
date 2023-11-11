import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './PlayerSlice';
import gameReducer from "./GameSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer
  }
});

export type RootState = ReturnType<typeof store.getState>