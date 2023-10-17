import {Socket} from "socket.io";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {Player} from "../custom-classes/Player.js";
import {Message} from "custom-classes/GameRoom.js";

//TODO add handlers for removing a player

type RoomChangeData = {
  userName: string;
  roomId?: string;
  roomMaxCapacity?: number;
  isPrivateRoom?: boolean;
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
    return;
  }
  socket.emit("room_join_with_id_success", data.roomId);
};

export const handleCreateRoom = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);
  const room = RoomList.createRoom(
    newPlayer,
    socket,
    data.roomMaxCapacity,
    data.isPrivateRoom,
    data.roomId
  );
  console.log(room);
  socket.emit("room_create_success", room.id);
};

export const handleRoomMessage = (data: Message) => {
  const room = RoomList.rooms[data.roomId];

  room.sendMessage(data);
};
