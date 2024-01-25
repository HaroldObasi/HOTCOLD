import {toast} from "react-toastify";
import {
  changeGameState,
  changeGameTimer,
  changePlayerRoles
} from "../state/GameSlice";

const handleGameStarted = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleTimerTick = (dispatch: any, room: any) => {
  console.log("tick tock: ", room);
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
  UPDATE_PLAYER_ROLES: handlePlayerRolesUpdate
};