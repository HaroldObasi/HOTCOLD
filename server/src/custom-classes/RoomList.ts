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

  static createRoom(player: Player): GameRoom {
    const newRoom = new GameRoom(uuidv4(), []);
    newRoom.addPlayer(player);
    RoomList.rooms[newRoom.id] = newRoom;
    return newRoom;
  }

  static addPlayerToFirstAvailableRoom(player: Player): GameRoom {
    const gameRooms = Object.values(RoomList.rooms);
    const freeRoom = gameRooms.find(
      (room) => room.players.length < room.roomMaxCapacity
    );

    if (!freeRoom) {
      //create new room and add player
      const newRoom = new GameRoom(uuidv4(), [player]);
      RoomList.rooms[newRoom.id] = newRoom;
      return newRoom;
    }
    freeRoom.addPlayer(player);
    return freeRoom;
  }

  static addPlayerToRoomWithId(
    roomId: string,
    player: Player
  ): GameRoom | undefined | null {

    if (!RoomList.rooms.hasOwnProperty(roomId)) return;

    const targetRoom = RoomList.rooms[roomId];

    if (targetRoom.addPlayer(player)) {
      return targetRoom;
    } 
    return;
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
}
