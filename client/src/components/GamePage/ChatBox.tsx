import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Message from "./Message";
import {socket} from "../../socket";

type Props = {};

const ChatBox = (props: Props) => {
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
    <div className="bg-slate-200 flex-1 flex flex-col relative">
      <div className="px-3 overflow-auto">
        <p className="text-center my-2">Chat</p>
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
        <div className="absolute bottom-0 w-full flex gap-x-1">
          <input
            className="font-denk font-light py-2 px-2 ring-0 outline-none w-full"
            type="text"
            onChange={(e) => {
              setGuess(e.target.value);
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-3 bg-emerald-400 hover:bg-emerald-700 text-white"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
