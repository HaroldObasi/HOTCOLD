import { Server, Socket } from "socket.io";
import { Rooms } from "../rooms.js";
import {
  handleNewMessageEvent,
  handleRoomJoin,
} from "./socketEventHandlers.js";

export const initializeSocketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket id: ${socket.id} has connected to the socket`);

    socket.on("new_message", (data) => handleNewMessageEvent(data, socket));

    socket.on("join_room", (data) => handleRoomJoin(data, socket));

    socket.on("disconnect", () => {
      const leftRoom = Rooms.removeMember(socket.id);

      if (leftRoom === undefined) {
        console.log("Room not found");
      } else {
        io.to(leftRoom.id).emit("room_message", {
          type: "ROOM_UPDATE",
          message: `${socket.id}, has left the room`,
          roomInfo: Rooms.rooms.find((item) => item.id === leftRoom.id),
        });
      }

      console.log(`Socket id: ${socket.id} has disconnected from the socket`);
      console.log("Rooms: ", Rooms.rooms);
    });
  });
};
