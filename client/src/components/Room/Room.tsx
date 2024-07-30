import {useSelector} from "react-redux";
import {socket} from "../../socket";
import {RootState} from "../../state/PlayerStore";
import {useState} from "react";


type RoomProps = {
  room: RoomType;
  roomName: string;
};

type RoomType = {
  id: string;
  players: {[key: string]: string};
  roomMaxCapacity: number;
  host: string;
};

export default function Room({room, roomName}: RoomProps) {
  const playerName = useSelector((state: RootState) => state.player.userName);
  const isRoomFull = Object.keys(room.players).length === room.roomMaxCapacity;
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);

  function handleJoinRoom() {
    setIsJoiningRoom(true);
    const data = {roomId: room.id, userName: playerName};
    socket.emit("join_room_with_id", data);
  }

  return (
    <div className=" flex items-center justify-between drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)] p-2 bg-gray-200/70  my-2 rounded-md">
      <h3 className=" text-[#3E3E3E]  font-bold md:text-xl">{roomName}</h3>
      <div className=" text-[#2D2D2D] text-[12px] md:text-base">
        {isRoomFull ? (
          <span>Full</span>
        ) : (
          <span className="">
            {Object.keys(room.players).length}/{room.roomMaxCapacity} players
          </span>
        )}
      </div>
      <button
        type="button"
        disabled={isRoomFull || isJoiningRoom}
        onClick={handleJoinRoom}
        className=" bg-white text-[#2D2D2D] py-1 px-4 text-sm shadow shadow-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed uppercase"
      >
        Join
      </button>
    </div>
  );
}
