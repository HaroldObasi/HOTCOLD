import {Request, Response} from "express";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {RatingEnum} from "custom-classes/GameRoom.js";
import {Player} from "custom-classes/Player.js";

const RatingScoreMap: {[K in RatingEnum]: number} = {
  COLD: 0,
  COLDER: 0,
  WARMER: 2,
  HOT: 4
};

// TODO THE SCORE ON THE TARGET PLAYER IS NOT BEING UPDATED FOR SOME REASON
// FIND OUT WHY
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

  let senderId = targetRoom.messages[messageIndex].sender.id;

  let sender = targetRoom.players[senderId];
  
  // assign points to guesser based on rating
  const score = RatingScoreMap[rating];

  sender.incrementScore(score);

  console.log("new score ", sender.score);
  //add to players score:

  // we need to send the room's updated messages to all the clients in that room
  // send GameRoom.messages to room
  // why not let the GameRoom class handle this ?
  io.to(targetRoom.id).emit("room_message", {
    type: "GUESS_RATING_UPDATE",
    message: `Rating Changed`,
    messages: targetRoom.messages,
    playerList: targetRoom.players
  });

  return res.status(200).json({
    message: "Rating changed successfully!"
  });
};

export const selectTargetWord = (req: Request, res: Response) => {
  const {wordIndex, roomId, playerId} = req.body;

  const targetRoom = RoomList.rooms[roomId];
  //verify that player exists in rooom at all

  if (!targetRoom) {
    return res.status(404).json({
      message: "Room Not Found"
    });
  }

  targetRoom.selectTargetWord(wordIndex, playerId);

  return res.status(200).json({
    message: "target word selected"
  });
};