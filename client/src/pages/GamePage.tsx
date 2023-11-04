import React, {useState} from "react";
import {socket} from "../socket";
import {useSelector} from "react-redux";
import {RootState} from "../state/PlayerStore";
import Background from "../components/Background";
import Message from "../components/GamePage/Message";

type Props = {};

const GamePage = (props: Props) => {
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
    <div className="font-dela">
      <Background className="h-screen">
        <h1
          className="text-center pt-24 p-3 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-50 
                       md:text-5xl lg:text-6xl underline underline-offset-[12px]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-gray-50">
            HOT
          </span>
          OR
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-gray-50">
            COLD
          </span>
        </h1>

        <div className="flex gap-x-2 mx-3 h-[300px] max-h-[300px]">
          <div className=" w-[150px]">
            <h3 className="mb-3">Player list</h3>
            <ul>
              {room.players.map((item: any) => {
                return (
                  <li className="font-light text-center mb-2 bg-sky-100 rounded-md px-2 py-1 text-black">
                    {item.userName}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-slate-200 basis-1/2">guesses</div>

          <div className="bg-slate-200 flex-1 relative">
            chat
            <ul className="font-denk">
              {room.messages.map((item: any) => {
                return (
                  <li>
                    <Message
                      senderName={item.sender.userName}
                      rating={item.rating}
                      message={item.message}
                    />
                  </li>
                );
              })}
            </ul>
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
          </div>
        </div>
      </Background>
    </div>
  );
};

export default GamePage;
