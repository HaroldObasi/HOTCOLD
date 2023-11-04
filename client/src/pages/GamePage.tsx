import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../state/PlayerStore";
import Background from "../components/Background";

type Props = {};

const GamePage = (props: Props) => {
  const room = useSelector((state: RootState) => state.game.room);

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
            <ul>
              {room.messages.map((item: any) => {
                return <li>{item.message}</li>;
              })}
            </ul>
            <div className="absolute bottom-0">
              <input type="text" />
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
};

export default GamePage;
