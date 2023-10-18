import {useEffect, useState} from "react";
import StyledButton from "../LandingPage/Button";
import PlayModal from "../LandingPage/PlayModal";
import {socket} from "../../socket";

type JoinRoomModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function JoinRoomModal({open, onClose}: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    socket.on("room_join_with_id_success", (data: string) => {
      alert("Room Joined Successfully :-" + data);
    //  navigate to game page
    });
    socket.on("room_join_with_id_error", (data: {message:string}) => {
      alert("Error in joining room :-" + data.message);
    });
    return () => {
      socket.off("room_join_with_id_success");
      socket.off("room_join_with_id_error");
    };
  }, []);

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
      <div className="py-4  w-1/2 mx-auto font-denk">
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
    </PlayModal>
  );
}
