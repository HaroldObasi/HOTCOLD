import {useState} from "react";
import StyledButton from "../LandingPage/Button";
import PlayModal from "../LandingPage/PlayModal";
import {socket} from "../../socket";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import useRoomMessage, {ResponseData} from "../../hooks/useRoomMessage";

type JoinRoomModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateRoomModal({open, onClose}: JoinRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [playersSize, setPlayersSize] = useState(5);
  const playerName = useSelector((state: RootState) => state.player.name);
  const casesToHandle = {
    room_create: (data: ResponseData) => console.log("room_create", data.status)
  };

  useRoomMessage(casesToHandle);

  function handleCreateRoom() {
    if (roomName.trim().length === 0) {
      alert("Please enter a room name!");
      return;
    }
    const data = {
      roomId: roomName,
      userName: playerName,
      isPrivateRoom,
      roomMaxCapacity: playersSize
    };
    socket.emit("create_room", data);
  }

  return (
    <PlayModal open={open} onClose={onClose} overlayClassName=" backdrop-blur">
      <div className="py-4  w-1/2 mx-auto font-denk">
        <h2 className=" capitalize md:text-4xl text-[#2D2D2D] font-bold drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] text-center">
          create room
        </h2>
        <div className=" my-8  text-sm text-[#282828] ">
          <label
            htmlFor="room_name"
            className=" capitalize block mb-4 font-bold text-xl"
          >
            room name
          </label>
          <input
            type="text"
            name="room_name"
            id="room_name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter Name"
            className=" py-1 px-3 w-full rounded h-8"
          />

          <div className=" mt-4">
            <label htmlFor="max_players" className=" capitalize text-xl">
              max players
            </label>
            <select
              name="max_players"
              id="max_players"
              defaultValue={playersSize}
              onChange={(e) => setPlayersSize(+e.target.value)}
              className=" ml-2"
            >
              {[5, 6, 7, 8, 9, 10].map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className=" ">
            <label htmlFor="private_room" className=" capitalize text-xl">
              private
            </label>
            <input
              checked={isPrivateRoom}
              onChange={(e) => setIsPrivateRoom(e.target.checked)}
              id="private_room"
              type="checkbox"
              value=""
              className="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 rounded "
            />
          </div>
        </div>
        <div className=" text-center mt-4">
          <StyledButton
            ClickEvent={handleCreateRoom}
            width="w-full"
            paddingY="py-3"
          >
            <span className=" text-[#2D2D2D] uppercase">create</span>
          </StyledButton>
        </div>
      </div>
    </PlayModal>
  );
}
