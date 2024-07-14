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

  // we need to send the room's updated messages to all the clients in that room
  // send GameRoom.messages to room
  // why not let the GameRoom class handle this ?
  io.to(targetRoom.id).emit("room_message", {
    type: "GUESS_RATING_UPDATE",
    message: `Rating Changed`,
    messages: targetRoom.messages
  });

  return res.status(200).json({
    message: "Rating changed successfully!"
  });
};

export const selectTargetWord = (req: Request, res: Response) => {
  const {wordIndex, roomId} = req.body;

  const targetRoom = RoomList.rooms[roomId];

  if (!targetRoom) {
    return res.status(404).json({
      message: "Room Not Found"
    });
  }

  targetRoom.selectTargetWord(wordIndex);

  return res.status(200).json({
    message: "target word selected"
  });
};