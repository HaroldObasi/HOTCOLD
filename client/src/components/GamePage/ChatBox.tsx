import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Message from "./Message";
import {socket} from "../../socket";

const ChatBox = () => {
  const room = useSelector((state: RootState) => state.game.room);
  const player = useSelector((state: RootState) => state.player);
  const [guess, setGuess] = useState<string>("");

  function handleSendMessage() {
    const data = {
      sender: player,
      message: guess,
      timeSent: Date.now(),
      rating: null,
      correct: false,
      roomId: player.roomId
    };
    socket.emit("send_message", data);
  }
  return (
    <div className="bg-graybg border border-white flex flex-col relative w-1/2 rounded-t-3xl border-b-0 text-darkgray">
      <div className="px-3 overflow-auto">
        <p className="text-center my-2 text-black">Chat</p>
        <ul className="font-denk">
          {room.messages.map((item: any) => {
            return (
              <li>
                <Message
                  senderName={item.sender.userName}
                  rating={item.rating}
                  message={item.message}
                  correct={item.correct}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {player.role === "WORD_GUESSER" && (
        <div className="absolute bottom-0 w-full flex ">
          <input
            className="font-denk font-light py-2 px-2 ring-0 outline-none w-full"
            type="text"
            onChange={(e) => {
              setGuess(e.target.value);
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-3  text-white bg-darkgray"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
