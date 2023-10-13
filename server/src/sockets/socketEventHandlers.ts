import { Socket } from "socket.io";
import { io } from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {Player} from "../custom-classes/Player.js";

//TODO add handlers for removing a player

type RoomChangeData = {
  userName: string;
  roomId?: string; 
};

export const handleNewMessageEvent = (data: RoomChangeData, socket: Socket) => {
  io.emit("recieve_message", data);
};

export const handleRoomJoin = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);

  const freeRoom = RoomList.addPlayerToFirstAvailableRoom(newPlayer);

  socket.join(freeRoom.id);
  io.to(freeRoom.id).emit("room_message", {
    type: "ROOM_UPDATE",
    message: `User: ${newPlayer.userName} has joined ${freeRoom.id}`,
    roomInfo: RoomList.rooms[freeRoom.id]
  });

  console.log("Rooms: ", RoomList.rooms);
};

export const handleRoomJoinWithID = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);

  const room = RoomList.addPlayerToRoomWithId(data.roomId, newPlayer);

  if (room) {
    socket.join(room.id);
    io.to(room.id).emit("room_message", {
      type: "ROOM_UPDATE",
      message: `User: ${newPlayer.userName} has joined ${room.id}`,
      roomInfo: RoomList.rooms[room.id]
    });
  } else {
    console.log("No such roomes exists");
  }
}

export const handleCreateRoom = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);

  const newRoom = RoomList.createRoom(newPlayer);
  socket.join(newRoom.id);

}