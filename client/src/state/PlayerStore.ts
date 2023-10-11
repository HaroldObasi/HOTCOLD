import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './PlayerSlice';

export default configureStore({
  reducer: {
    player: playerReducer,
  }
});