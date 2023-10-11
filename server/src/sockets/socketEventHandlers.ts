import { Socket } from "socket.io";
import { io } from "../index.js";
import { Rooms } from "../rooms.js";

type RoomJoinData = {
  userName: string;
};

export const handleNewMessageEvent = (data, socket: Socket) => {
  io.emit("recieve_message", data);
};

export const handleRoomJoin = (data: RoomJoinData, socket: Socket) => {
  const freeRoom = Rooms.addMember({
    id: socket.id,
    userName: data.userName
  });

  socket.join(freeRoom.id);
  io.to(freeRoom.id).emit("room_message", {
    type: "ROOM_UPDATE",
    message: `User: ${socket.id} has joined ${freeRoom.id}`,
    roomInfo: Rooms.rooms.find((item) => item.id === freeRoom.id)
  });

  console.log("Rooms: ", Rooms.rooms);
};
