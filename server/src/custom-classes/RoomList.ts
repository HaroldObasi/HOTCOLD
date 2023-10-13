import {GameRoom} from "./GameRoom.js";
import {Player} from "./Player.js";
import {v4 as uuidv4} from "uuid";

export class RoomList {
  static rooms: {[roomId: string]: GameRoom} = RoomList.generateDefaultRooms(3);
  static ROOM_MAX_LENGTH: number = 5;

  static generateDefaultRooms(length: number) {
    const defaultRooms = {};
    for (let i = 1; i <= length; i++) {
      const roomId = uuidv4();
      defaultRooms[roomId] = new GameRoom(roomId, []);
    }
    return defaultRooms;
  }

  static addPlayerToRoom(player: Player): GameRoom {
    const gameRooms = Object.values(RoomList.rooms);
    const freeRoom = gameRooms.find(
      (room) => room.players.length < RoomList.ROOM_MAX_LENGTH
    );

    if (!freeRoom) {
      //create new room and add player
      const newRoom = new GameRoom(uuidv4(), []);
      newRoom.addPlayer(player);
      RoomList.rooms[newRoom.id] = newRoom;
      return newRoom;
    }
    freeRoom.addPlayer(player);
    RoomList.rooms[freeRoom.id] = freeRoom;
    return freeRoom;
  }

  static addPlayerToRoomWithId(
    roomId: string,
    player: Player
  ): GameRoom | undefined {
    const gameRooms = Object.values(RoomList.rooms);
    const targetRoom = gameRooms.find((room) => room.id === roomId);

    if (!targetRoom) return;

    targetRoom.addPlayer(player);
    RoomList.rooms[targetRoom.id] = targetRoom;
  }

  static removePlayer(playerId: string) {
    let foundRoom: GameRoom | undefined;

    for (const gameRoomId in RoomList.rooms) {
      const room = RoomList.rooms[gameRoomId];
      foundRoom = room.removePlayer(playerId);
      if (foundRoom) {
        break;
      }
    }

    return foundRoom;
  }

  static serializeRooms(): SerializedRoom[] {
    return Object.values(RoomList.rooms).map((room) => ({
      id: room.id,
      players: room.players.length,
      isFull: room.players.length >= RoomList.ROOM_MAX_LENGTH
    }));
  }
}

interface SerializedRoom {
  id: string;
  players: number;
  isFull: boolean;
}
