import {Request, Response} from "express";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {GameRoom} from "custom-classes/GameRoom.js";

export const rateGuess = (req: Request, res: Response) => {
  //we need to get the room that the chat was sent in
  //body = {
  // "messageIndex" : 0,
  // "rating": "COLDER",
  // "roomId" : "2828-2929"
  //   }

  const {messageIndex, rating, roomId} = req.body;
  const targetRoom = RoomList.rooms[roomId];

  if (!targetRoom) {
    return res.status(404).json({
      message: "Room Not Found"
    });
  }

  //we need the index of the message to check the messages array in the Game
  //we need to change the rating of the message
  targetRoom.messages[messageIndex].rating = rating;

  //we need to send the updated room to all the clients in that room

  io.to(targetRoom.id).emit("room_message", {
    type: "GUESS_RATING_UPDATE",
    message: `Rating Changed`,
    roomInfo: targetRoom
  });
};
