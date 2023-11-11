import {Request, Response} from "express";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";

export const rateGuess = (req: Request, res: Response) => {
  const {messageIndex, rating, roomId} = req.body;
  const targetRoom = RoomList.rooms[roomId];

  if (!targetRoom) {
    return res.status(404).json({
      message: "Room Not Found"
    });
  }

  //we need the index of the message to access the message from the messages array in the Game
  //we need to change the rating of the message
  targetRoom.messages[messageIndex].rating = rating;

  //we need to send the updated room to all the clients in that room
  io.to(targetRoom.id).emit("room_message", {
    type: "GUESS_RATING_UPDATE",
    message: `Rating Changed`,
    roomInfo: targetRoom
  });

  return res.status(200).json({
    message: "Rating changed successfully!"
  });
};
