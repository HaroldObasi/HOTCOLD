import {toast} from "react-toastify";
import {
  changeGameStarted,
  changeGameState,
  changeGameTimer,
  changePlayerRoles,
  resetPickerMessages,
  addMessage,
  addPickerMessage,
  updatePlayers,
  updateTargetWord,
  updateMesssages
} from "../state/GameSlice";
import {Dispatch} from "react";
import {
  setModal,
  setTargetWordOptions,
  setModalType,
  setModalInfo,
  ModalTypeEnum
} from "../state/uiSlice";

const handleGameStarted = (dispatch: Dispatch<any>, room: any) => {
  toast.success(room.message);
  dispatch(changeGameStarted(room.started));
};

const handleTimerTick = (dispatch: any, room: any) => {
  dispatch(
    changeGameTimer({
      timer: room.timer,
      currentRound: room.currentRound
    })
  );
};

const handlePlayerRolesUpdate = (dispatch: any, room: any) => {
  dispatch(
    changePlayerRoles({
      players: room.playerList,
      currentRound: room.currentRound
    })
  );
  toast.success(room.message);
};

const handleRoomMessage = (dispatch: any, room: any) => {
  // dispatch(changeGameState(room.roomInfo));

  //update admin message list
  dispatch(addMessage(room.messageData));
  dispatch(addPickerMessage(room.messageData));
};

const handleCorrectGuess = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handlePlayerJoined = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handlePlayerLeft = (dispatch: any, room: any) => {
  toast.success(room.message);
  dispatch(changeGameState(room.roomInfo));
};

const handleGuessRated = (dispatch: any, room: any) => {
  console.log("data: ", room);
  dispatch(updateMesssages(room.messages));
  // dispatch(addPickerMessage(room.messages));
  dispatch(updatePlayers(room.playerList));
};

const handlePlayerPickingWord = (dispatch: Dispatch<any>, event: any) => {
  console.log("player picking word: ", event.message);
  dispatch(setModal(true));
  dispatch(setModalType(ModalTypeEnum.INFO));
  dispatch(setModalInfo(event.message));
};

const handlePickTargetWord = (dispatch: Dispatch<any>, event: any) => {
  //trigger the modal
  //show the options on the modal for the word picker to select from
  dispatch(setModal(true));
  dispatch(setModalType(ModalTypeEnum.SELECT_WORD));
  dispatch(setModalInfo(event.message));
  dispatch(setTargetWordOptions(event.words));

  dispatch(resetPickerMessages(undefined));
};

const handleUpdateTargetWord = (dispatch: Dispatch<any>, event: any) => {
  dispatch(updateTargetWord(event.targetWord));
};

const handleLeaderBoard = (dispatch: Dispatch<any>, event: any) => {
  console.log("leaderboard: ", event);
  dispatch(setModal(true));
  dispatch(setModalType(ModalTypeEnum.LEADERBOARD));
  dispatch(setModalInfo(event.leaderboard));
};

const handleTargetWordPicked = (dispatch: Dispatch<any>, event: any) => {
  dispatch(setModal(false));
  dispatch(setModalType(ModalTypeEnum.NULL));
  dispatch(setModalInfo(""));
  console.log("target word picked: ", event);
};

type Events = {
  [key: string]: (dispatch: any, room: any) => void;
};

export const events: Events = {
  GAME_STARTED: handleGameStarted,
  GAME_TIMER_TICK: handleTimerTick,
  PLAYER_JOINED: handlePlayerJoined,
  PLAYER_LEFT: handlePlayerLeft,
  NEW_ROOM_MESSAGE: handleRoomMessage,
  GUESS_RATING_UPDATE: handleGuessRated,
  NEW_ROOM_MESSAGE_WINNER: handleCorrectGuess,
  UPDATE_PLAYER_ROLES: handlePlayerRolesUpdate,
  PICK_TARGET_WORD: handlePickTargetWord,
  PLAYER_PICKING_WORD: handlePlayerPickingWord,
  TARGET_WORD_PICKED: handleTargetWordPicked,
  LEADERBOARD: handleLeaderBoard,
  UPDATE_TARGET_WORD: handleUpdateTargetWord
};