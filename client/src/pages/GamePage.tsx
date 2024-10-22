import {useSelector} from "react-redux";
import {RootState} from "../state/PlayerStore";
import Background from "../components/Background";
import PlayerList from "../components/GamePage/PlayerList";
import ChatBox from "../components/GamePage/ChatBox";
import GuessBox from "../components/GamePage/GuessBox";
import RootModal from "../components/modals/RootModal";

const GamePage = () => {
  const room = useSelector((state: RootState) => state.game.room);
  const player = useSelector((state: RootState) => state.player);

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
            <p>
              Round:{room.currentRound} of {room.maxRounds}
            </p>

            <p>Timer: {room.timer || (room.timer >= 0 && <>{room.timer}</>)}</p>
          </div>
          <div className="py-1">Room Id : {room.id}</div>
          <div className="flex gap-x-2  h-[500px] ">
            <PlayerList />

            {room.started === true ? (
              <div className="flex flex-1 gap-2 flex-col lg:flex-row">
                {player.role === "WORD_PICKER" && <GuessBox />}
                {player.role === "WORD_GUESSER" && <ChatBox />}
              </div>
            ) : (
              <div className="flex-1 bg-slate-200 flex justify-center items-center">
                <p className="md:text-2xl">Waiting for players to join</p>
              </div>
            )}
          </div>
        </div>
        {/* <SelectWordModal /> */}
        <RootModal />
      </Background>
    </div>
  );
};

export default GamePage;
