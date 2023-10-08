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
    { id: "1", members: [] },
    { id: "2", members: [] },
    { id: "3", members: [] },
  ];

  static addRoom(room: Room) {
    Rooms.rooms.push(room);
  }

  /**
   * Adds a member into the first free room (room with less than 5 members)
   */
  static addMember(member: Member): undefined | Room {
    const freeRoomIndex = Rooms.rooms.findIndex(
      (room) => room.members.length < 5
    );
    if (freeRoomIndex === -1) {
      console.log("There is no free room");
      return;
    }

    const prevRoom = Rooms.rooms[freeRoomIndex];
    prevRoom.members.push(member);
    Rooms.rooms[freeRoomIndex] = prevRoom;

    return prevRoom;
  }

  static removeMember(memberId) {
    let foundRoomId: Room | undefined;
    const updatedRooms = Rooms.rooms.map((item) => ({
      ...item,
      members: item.members.filter((member) => {
        if (member.id === memberId) {
          foundRoomId = item;
          return false;
        }
        return true;
      }),
    }));

    Rooms.rooms = updatedRooms;

    return foundRoomId;
  }
}
