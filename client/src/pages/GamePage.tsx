import React, {useState} from "react";
import {socket} from "../socket";
import {useSelector} from "react-redux";
import {RootState} from "../state/PlayerStore";
import Background from "../components/Background";
import Message from "../components/GamePage/Message";
import PlayerList from "../components/GamePage/PlayerList";
import ChatBox from "../components/GamePage/ChatBox";
import GuessBox from "../components/GamePage/GuessBox";

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

        <div className="px-3 max-w-screen-2xl mx-auto">
          <div className="bg-slate-200 mb-2 py-1 p-2">
            Timer: {room.timer || (room.timer >= 0 && <>{room.timer}</>)}
          </div>
          <div className="flex gap-x-2  h-[500px] ">
            <PlayerList />

            {room.started === true ? (
              <div className="flex flex-1 gap-2 flex-col lg:flex-row">
                <GuessBox />
                <ChatBox />
              </div>
            ) : (
              <div className="flex-1 bg-slate-200 flex justify-center items-center">
                <p className="md:text-2xl">Waiting for players to join</p>
              </div>
            )}
          </div>
        </div>
      </Background>
    </div>
  );
};

export default GamePage;
