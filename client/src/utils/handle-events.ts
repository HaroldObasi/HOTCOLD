import {toast} from "react-toastify";
import {changeGameState, changeGameTimer} from "../state/GameSlice";

const handleGameStarted = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleTimerTick = (dispatch: any, room: any) => {
  console.log("ticker: ", room);
  dispatch(changeGameTimer(room.timer));
};

const handleRoomMessage = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleRoomUpdate = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

type Events = {
  [key: string]: (dispatch: any, room: any) => void;
};

export const events: Events = {
  GAME_STARTED: handleGameStarted,
  GAME_TIMER_TICK: handleTimerTick,
  ROOM_UPDATE: handleRoomUpdate,
  NEW_ROOM_MESSAGE: handleRoomMessage
};

const switchEvents = (message: {type: string; message: string}) => {
  switch (message.type) {
    case "GAME_STARTED":
      break;

    default:
      break;
  }
};
