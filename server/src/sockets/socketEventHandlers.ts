import {Socket} from "socket.io";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {Player} from "../custom-classes/Player.js";
import {Message} from "custom-classes/GameRoom.js";

//TODO add handlers for removing a player

type RoomChangeData = {
  userName: string;
  roomId?: string;
};

export const handleRoomJoin = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);
  const freeRoom = RoomList.addPlayerToFirstAvailableRoom(newPlayer, socket);
  console.log("Rooms: ", RoomList.rooms);
};

export const handleRoomJoinWithID = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);

  const room = RoomList.addPlayerToRoomWithId(data.roomId, newPlayer, socket);

  if (!room) {
    console.log("There is no such room");
  }
};

export const handleCreateRoom = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);
  RoomList.createRoom(newPlayer, socket);
};

export const handleRoomMessage = (data: Message) => {
  const room = RoomList.rooms[data.roomId];

  room.sendMessage(data);
};
