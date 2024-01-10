import {useSelector} from "react-redux";
import {RootState} from "../state/PlayerStore";
import Background from "../components/Background";
import PlayerList from "../components/GamePage/PlayerList";
import ChatBox from "../components/GamePage/ChatBox";
import GuessBox from "../components/GamePage/GuessBox";

const GamePage = () => {
  const room = useSelector((state: RootState) => state.game.room);

  return (
    <div className="font-dela">
      <Background className="h-screen">
        <h1
          className="text-center  p-3 mb-4  text-4xl font-extrabold leading-none tracking-wide 
                       md:text-5xl lg:text-[2rem] lg:tracking-tight text-white 
                       w-full  lg:pt-16 2xl:pt-40
                       "
        >
          <span className="text-transparent  bg-clip-text  bg-gradient-to-b from-orange via-orange to-lightorange">
            HOT
          </span>

          <span className="m-5 lg:m-2">OR</span>

          <span className=" text-transparent bg-clip-text bg-gradient-to-b from-darkblue via-darkblue to-white ">
            COLD
          </span>
        </h1>

        <div className="px-3 max-w-screen-2xl mx-auto">
          <div className=" mb-2 py-1 p-2 w-full text-center ">
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
              <div className="flex-1 bg-graybg flex justify-center items-center rounded-xl">
                <p className="md:text-2xl text-darkgray">
                  Waiting for players to join
                </p>
              </div>
            )}
          </div>
        </div>
      </Background>
    </div>
  );
};

export default GamePage;
