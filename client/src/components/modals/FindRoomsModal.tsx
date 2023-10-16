import PlayModal from "../LandingPage/PlayModal";
import Room from "../Room/Room";

type FindRoomsModalProps = {
  open: boolean;
  onClose: () => void;
  handleGoBack: () => void;
};
export default function FindRoomsModal({open, onClose,handleGoBack}: FindRoomsModalProps) {
  return (
    <PlayModal open={open} onClose={onClose}>
      <div className=" p-3 flex items-center">
        <div className=" self-start">
          <button
            type="button"
            className="mr-2 text-xl text-white drop-shadow-lg"
            onClick={handleGoBack}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div className=" flex-grow ">
          <div className=" flex items-center justify-between text-white ">
            <h2 className=" text-xl ">
              <span className=" underline decoration-4 underline-offset-4">
                Browse
              </span>
              Rooms
            </h2>
            <div className=" flex items-center">
              <button
                type="button"
                className=" text-black text-3xl mr-3"
                onClick={() => {}}
              >
                <i className="fa-solid fa-rotate-right"></i>
              </button>
              <span className=" text-gray-700 drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)] text-sm ">
                Refresh
              </span>
            </div>
          </div>
          <div className="mt-3 h-60 overflow-auto game-scrollbar pr-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((room) => (
              <Room
                key={room}
                room={{
                  roomName: "Room " + room.toString(),
                  roomSize: 5,
                  joinedPlayersCount: room,
                  isFull: room === 5
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PlayModal>
  );
}
