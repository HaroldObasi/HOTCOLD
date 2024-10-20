import {FormEvent, useState, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Message from "./Message";
import {socket} from "../../socket";

const ChatBox = () => {
  const room = useSelector((state: RootState) => state.game.room);
  const player = useSelector((state: RootState) => state.player);
  const [guess, setGuess] = useState<string>("");

  const chatRef = useRef<HTMLUListElement>(null);

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    const data = {
      sender: {
        id: player.id,
        userName: player.userName
      },
      message: guess,
      timeSent: Date.now(),
      rating: null,
      correct: false,
      roomId: player.roomId
    };
    socket.emit("send_message", data);

    const chat = chatRef.current;

    console.log(chat?.scrollHeight);

    chat?.scrollTo(0, chat.scrollHeight + 100);
    setGuess("");
  }
  return (
    <div className="bg-slate-200 flex-1 h-full flex flex-col relative">
      <div className="px-3 flex h-full flex-col">
        <p className="text-center my-2">Chat</p>
        <ul ref={chatRef} className="font-denk flex-1 overflow-y-auto pb-20">
          {room.messages.map((item: any) => {
            return (
              <li key={item.index}>
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
        <div className="">
          <form
            className="absolute bottom-0 w-full flex gap-x-1"
            action=""
            onSubmit={handleSendMessage}
          >
            <input
              className="font-denk font-light py-2 px-2 ring-0 outline-none w-full"
              type="text"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
              }}
            />
            <button
              type="submit"
              className="px-3 bg-emerald-400 hover:bg-emerald-700 text-white"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
