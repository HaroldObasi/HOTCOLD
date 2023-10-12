import { Socket } from "socket.io";
import { io } from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {Player} from "../custom-classes/Player.js";

type RoomJoinData = {
  userName: string;
};

export const handleNewMessageEvent = (data, socket: Socket) => {
  io.emit("recieve_message", data);
};

export const handleRoomJoin = (data: RoomJoinData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);

  const freeRoom = RoomList.addPlayerToRoom(newPlayer);

  socket.join(freeRoom.id);
  io.to(freeRoom.id).emit("room_message", {
    type: "ROOM_UPDATE",
    message: `User: ${newPlayer.userName} has joined ${freeRoom.id}`,
    roomInfo: RoomList.rooms[freeRoom.id]
  });

  console.log("Rooms: ", RoomList.rooms);
};
