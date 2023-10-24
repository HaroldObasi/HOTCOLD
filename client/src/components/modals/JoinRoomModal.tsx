import {useState} from "react";
import StyledButton from "../LandingPage/Button";
import PlayModal from "../LandingPage/PlayModal";
import {socket} from "../../socket";
import useSocketMessage, {ResponseData} from "../../hooks/useSocketMessage";

type JoinRoomModalProps = {
  open: boolean;
  onClose: () => void;
  handleGoBack: () => void;
};

export default function JoinRoomModal({
  open,
  onClose,
  handleGoBack
}: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState("");
  const casesToHandle = {
    join_room_with_id: (data: ResponseData) =>
      console.log("join_room_with_id", data.status)
  };

  useSocketMessage("ROOM_MESSAGE", casesToHandle);

  function handleRoomJoin() {
    if (roomCode.trim().length === 0) {
      alert("Please enter a room name!");
      return;
    }
    const data = {
      roomId: roomCode,
      userName: "playerName"
    };
    socket.emit("join_room_with_id", data);
  }

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
        <div className="w-3/4 mx-auto font-denk">
          <h2 className="  uppercase md:text-4xl text-[#2D2D2D] font-bold drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] text-center">
            join room
          </h2>
          <div className=" my-8  text-sm text-[#282828] text-center">
            <label
              htmlFor="room_id"
              className=" uppercase block mb-4 font-bold text-xl"
            >
              enter code
            </label>
            <input
              type="text"
              name="room_id"
              id="room_id"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter Code"
              className=" py-1 px-3 w-full rounded h-8"
            />
          </div>
          <div className=" text-center mt-4">
            <StyledButton
              ClickEvent={handleRoomJoin}
              width="w-full"
              paddingY="py-3"
            >
              <span className=" text-[#2D2D2D] uppercase">join</span>
            </StyledButton>
          </div>
        </div>
      </div>
    </PlayModal>
  );
}
