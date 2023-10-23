import {Socket} from "socket.io";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {Player} from "../custom-classes/Player.js";
import {Message} from "custom-classes/GameRoom.js";
import {roomMessage} from "../utils/roomMessage.js";

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
    socket.emit(
      "ROOM_MESSAGE",
      roomMessage("room_join_with_id", "Player has already joined the room", {}, "fail")
    );
    return;
  }
  socket.emit(
    "ROOM_MESSAGE",
    roomMessage(
      "room_join_with_id",
      "Player joined the room",
      RoomList.rooms[data.roomId],
      "success"
    )
  );
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
  if (!room) {
    socket.emit(
      "ROOM_MESSAGE",
      roomMessage("room_create", "Room already exists", {}, "fail")
    );
    return;
  }
  socket.emit(
    "ROOM_MESSAGE",
    roomMessage("room_create", "Room created", room, "success")
  );
};

export const handleRoomMessage = (data: Message) => {
  const room = RoomList.rooms[data.roomId];

  room.sendMessage(data);
};
