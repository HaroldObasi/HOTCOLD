import {GameRoom} from "./GameRoom.js";
import {Player} from "./Player.js";
import {v4 as uuidv4} from "uuid";
import {Socket} from "socket.io";


export class RoomList {
  static rooms: {[roomId: string]: GameRoom} = RoomList.generateDefaultRooms(3);

  static generateDefaultRooms(length: number) {
    const defaultRooms = {};
    for (let i = 1; i <= length; i++) {
      const roomId = uuidv4();
      defaultRooms[roomId] = new GameRoom(roomId, []);
    }
    return defaultRooms;
  }

  static createRoom(
    player: Player,
    socket: Socket,
    roomMaxCapacity = 5,
    isPrivateRoom = false,
    roomId = uuidv4()
  ): GameRoom | boolean {
    const newRoom = new GameRoom(roomId, [], roomMaxCapacity, isPrivateRoom);
    const isPlayerAdded = newRoom.addPlayer(player, socket);
    if (RoomList.rooms.hasOwnProperty(newRoom.id)) {
      return false;
    }
    RoomList.rooms[newRoom.id] = newRoom;
    return newRoom;
  }

  static addPlayerToFirstAvailableRoom(
    player: Player,
    socket: Socket
  ): GameRoom {
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
    freeRoom.addPlayer(player, socket);
    return freeRoom;
  }

  static addPlayerToRoomWithId(
    roomId: string,
    player: Player,
    socket: Socket
  ): GameRoom | undefined | null {
    if (!RoomList.rooms.hasOwnProperty(roomId)) return;

    const targetRoom = RoomList.rooms[roomId];

    if (targetRoom.addPlayer(player, socket)) {
      return targetRoom;
    }
    console.log("Player already in room");
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
