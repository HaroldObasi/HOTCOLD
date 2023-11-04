import PlayModal from "../LandingPage/PlayModal";
import Room from "../Room/Room";
import useFindRooms from "../../hooks/useFindRooms";

type FindRoomsModalProps = {
  open: boolean;
  onClose: () => void;
  handleGoBack: () => void;
};
export default function FindRoomsModal({
  open,
  onClose,
  handleGoBack
}: FindRoomsModalProps) {
  const {roomsData, loading, refetchRoom} = useFindRooms(open);
  const noRoomsAvailable = roomsData.length === 0 && !loading;

  return (
    <PlayModal open={open} onClose={onClose} overlayClassName=" backdrop-blur">
      <div className="py-4 px-3 flex items-center">
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
                onClick={refetchRoom}
              >
                <i className="fa-solid fa-rotate-right"></i>
              </button>
              <span className=" text-gray-700 drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)] text-sm ">
                Refresh
              </span>
            </div>
          </div>
          <div className="mt-3 h-60 overflow-auto game-scrollbar pr-4">
            {noRoomsAvailable && (
              <h2 className="text-white text-xl text-center">No Rooms Found</h2>
            )}
            {loading && (
              <h2 className="text-white text-xl text-center animate-bounce">
                Loading...
              </h2>
            )}
            {!loading &&
              roomsData.map((room, i) => (
                <Room
                  key={room.id}
                  room={room}
                  roomName={`Room ${(i + 1).toString()}`}
                />
              ))}
          </div>
        </div>
      </div>
    </PlayModal>
  );
}
