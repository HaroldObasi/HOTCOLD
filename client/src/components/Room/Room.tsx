type RoomProps = {
  room: RoomType;
};

type RoomType = {
  roomName: string;
  roomSize: number;
  joinedPlayersCount: number;
  isFull: boolean;
};

export default function Room({room}: RoomProps) {
  return (
    <div className=" flex items-center justify-between drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)] p-2 bg-gray-200/70  my-2 rounded-md">
      <h3 className=" text-[#3E3E3E]  font-bold md:text-xl">{room.roomName}</h3>
      <div className=" text-[#2D2D2D] text-[12px] md:text-base">
        {room.isFull ? (
          <span>Full</span>
        ) : (
          <span className="">
            {room.joinedPlayersCount}/{room.roomSize} players
          </span>
        )}
      </div>
      <button
        type="button"
        disabled={room.isFull}
        onClick={() => {}} //handleJoinRoom
        className=" bg-white text-[#2D2D2D] py-1 px-4 text-sm shadow shadow-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed uppercase"
      >
        Join
      </button>
    </div>
  );
}
