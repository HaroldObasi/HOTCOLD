import {Request, Response} from "express";
import {io} from "../index.js";
import {RoomList} from "../custom-classes/RoomList.js";
import {GameRoom} from "custom-classes/GameRoom.js";

type Rooms = Pick<
  GameRoom,
  "id" | "players" | "roomMaxCapacity" | "host" | "isPrivateRoom"
>;
export const getAllRooms = (req: Request, res: Response) => {
  const rooms: Rooms[] = Object.entries(RoomList.rooms)
    .map(([id, room]) => ({
      id,
      players: room.players,
      roomMaxCapacity: room.roomMaxCapacity,
      host: room.host,
      isPrivateRoom: room.isPrivateRoom
    }))
    .filter((room) => !room.isPrivateRoom && !(room.players.length === room.roomMaxCapacity))
    .slice(0, 10);//only ten rooms we can paginate later

  res.json({rooms});
};
