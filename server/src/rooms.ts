import {v4 as uuidv4} from "uuid";

export type Member = {
  id: string;
  userName: string;
};

export type Room = {
  id: string;
  members: Array<Member>;
};

export class Rooms {
  static rooms: Array<Room> = [
    {id: "b88c5e73-1501-452b-bd82-ce380ec137ad", members: []},
    {id: "cd51e87c-6985-4b1d-9936-770b8f4ce185", members: []},
    {id: "0ab84221-5908-4b24-b8c8-1fc4c5402b2d", members: []}
  ];
  static ROOM_MAX_LENGTH: number = 5;

  static addRoom(room: Room) {
    Rooms.rooms.push(room);
  }

  /**
   * Adds a member into the first free room (room with less than 5 members)
   */
  static addMember(member: Member): Room {
    const freeRoomIndex = Rooms.rooms.findIndex(
      (room) => room.members.length < Rooms.ROOM_MAX_LENGTH
    );

    // Creates new room if there is no free room
    if (freeRoomIndex === -1) {
      const newRoom: Room = {id: uuidv4(), members: [member]};
      Rooms.addRoom(newRoom);
      console.log(Rooms.rooms);
      return newRoom;
    }

    const prevRoom = Rooms.rooms[freeRoomIndex];
    prevRoom.members.push(member);
    Rooms.rooms[freeRoomIndex] = prevRoom;

    return prevRoom;
  }

  static removeMember(memberId: string) {
    let foundRoomId: Room | undefined;
    const updatedRooms = Rooms.rooms.map((item) => ({
      ...item,
      members: item.members.filter((member) => {
        if (member.id === memberId) {
          foundRoomId = item;
          return false;
        }
        return true;
      })
    }));

    Rooms.rooms = updatedRooms;

    return foundRoomId;
  }
}
