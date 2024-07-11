import {toast} from "react-toastify";
import {
  changeGameState,
  changeGameTimer,
  changePlayerRoles
} from "../state/GameSlice";
import {Dispatch} from "react";

const handleGameStarted = (dispatch: Dispatch<any>, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleTimerTick = (dispatch: any, room: any) => {
  dispatch(
    changeGameTimer({
      timer: room.timer,
      currentRound: room.roomInfo.currentRound
    })
  );
};

const handlePlayerRolesUpdate = (dispatch: any, room: any) => {
  dispatch(
    changePlayerRoles({
      players: room.roomInfo.players,
      currentRound: room.roomInfo.currentRound
    })
  );
  toast.success(room.message);
};

const handleRoomMessage = (dispatch: any, room: any) => {
  dispatch(changeGameState(room.roomInfo));
};

const handleCorrectGuess = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleRoomUpdate = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleGuessRated = (dispatch: any, room: any) => {
  dispatch(changeGameState(room.roomInfo));
};

const handlePickTargetWord = (dispatch: Dispatch<any>, event: any) => {
  //trigger the modal
  //show the options on the modal for the word picker to select from
  console.log("pick a word: ", event);
};

type Events = {
  [key: string]: (dispatch: any, room: any) => void;
};

export const events: Events = {
  GAME_STARTED: handleGameStarted,
  GAME_TIMER_TICK: handleTimerTick,
  ROOM_UPDATE: handleRoomUpdate,
  NEW_ROOM_MESSAGE: handleRoomMessage,
  GUESS_RATING_UPDATE: handleGuessRated,
  NEW_ROOM_MESSAGE_WINNER: handleCorrectGuess,
  UPDATE_PLAYER_ROLES: handlePlayerRolesUpdate,
  PICK_TARGET_WORD: handlePickTargetWord
};