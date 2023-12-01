const handleGameStarted = () => {
  console.log("The game has been started");
};

const handleTimerTick = () => {
  console.log("The timer has been started");
};

const handleRoomMessage = () => {
  console.log("A new message has been sent by someone");
};

const handleRoomUpdate = () => {
  console.log("Someone has joined the room");
};

type Events = {
  [key: string]: any;
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
