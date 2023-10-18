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
  const isPlayerAddedToRoom = RoomList.addPlayerToRoomWithId(
    data.roomId,
    newPlayer,
    socket
  );

  if (!isPlayerAddedToRoom) {
    socket.emit("room_join_with_id_error", {
      message: "Player has already joined the room"
    });
    return;
  }
  socket.emit("room_join_with_id_success", data.roomId);
};

export const handleCreateRoom = (data: RoomChangeData, socket: Socket) => {
  const newPlayer = new Player(socket.id, data.userName);
  try {
    const room = RoomList.createRoom(
      newPlayer,
      socket,
      data.roomMaxCapacity,
      data.isPrivateRoom,
      data.roomId
    );
    socket.emit("room_create_success", room.id);
  } catch (error) {
    socket.emit("room_create_error", {message: error.message});
  }
};

export const handleRoomMessage = (data: Message) => {
  const room = RoomList.rooms[data.roomId];

  room.sendMessage(data);
};
