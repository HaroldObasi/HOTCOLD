import { Server, Socket } from "socket.io";
import {RoomList} from "../custom-classes/RoomList.js";
import {
  handleRoomJoin,
  handleRoomJoinWithID,
  handleCreateRoom,
  handleRoomMessage
} from "./socketEventHandlers.js";

export const initializeSocketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket id: ${socket.id} has connected to the socket`);

    socket.on("join_room", (data) => handleRoomJoin(data, socket));

    socket.on("create_room", (data) => handleCreateRoom(data, socket));

    socket.on("join_room_with_id", (data) =>
      handleRoomJoinWithID(data, socket)
    );

    socket.on("send_message", (data) => handleRoomMessage(data));

    socket.on("disconnect", (reason:string) => {
      const leftRoom = RoomList.removePlayer(socket.id);
      console.log('Reason:- ',reason);
      if (leftRoom === undefined) {
        console.log("Room not found");
      } else {
        io.to(leftRoom.id).emit("room_message", {
          type: "ROOM_UPDATE",
          message: `${socket.id}, has left the room`,
          roomInfo: leftRoom
        });
      }

      console.log(`Socket id: ${socket.id} has disconnected from the socket`);
      console.log("Rooms: ", RoomList.rooms);
    });
  });
};
