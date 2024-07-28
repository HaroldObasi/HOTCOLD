import { Server, Socket } from "socket.io";
import {RoomList} from "../custom-classes/RoomList.js";
import {
  handleRoomJoin,
  handleRoomJoinWithID,
  handleCreateRoom,
  handleRoomMessage
} from "./socketEventHandlers.js";
import {Player} from "custom-classes/Player.js";
import {Message} from "custom-classes/GameRoom.js";

export const initializeSocketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket id: ${socket.id} has connected to the socket`);

    socket.on("join_room", (data) => handleRoomJoin(data, socket));

    socket.on("create_room", (data) => handleCreateRoom(data, socket));

    socket.on("join_room_with_id", (data) =>
      handleRoomJoinWithID(data, socket)
    );

    socket.on("send_message", (data: Message) => {
      const player = new Player(socket.id, "test");

      player.fromInstance(
        data.sender.id,
        data.sender.userName,
        data.sender.role,
        data.sender.score,
        data.sender.roomId
      );

      const message = new Message(
        data.index,
        player,
        data.message,
        data.timeSent,
        data?.rating,
        data?.correct,
        data.roomId
      );
      handleRoomMessage(message);
    });

    socket.on("disconnect", (reason: string) => {
      const leftRoom = RoomList.removePlayer(socket.id);
      console.log("Reason:- ", reason);
      if (leftRoom === undefined) {
        console.log("Room not found");
      } else {
        // send new players list to room
        io.to(leftRoom.id).emit("room_message", {
          type: "PLAYER_LEFT",
          message: `${socket.id}, has left the room`,
          roomInfo: leftRoom.toJson()
        });
      }

      console.log(`Socket id: ${socket.id} has disconnected from the socket`);
    });
  });
};
