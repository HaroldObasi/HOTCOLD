import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

const PlayerList = () => {
  const {players} = useSelector((state: RootState) => state.game.room);

  return (
    <div className="w-[150px]">
      <h3 className="mb-3">Player list</h3>
      <ul>
        {Object.keys(players).map((playerId: string) => {
          return (
            <div key={playerId} className="flex items-center gap-x-2">
              <li
                key={playerId}
                className={`font-light text-center mb-2 bg-sky-100 rounded-md px-2 py-1 text-black ${
                  players[playerId].role === "WORD_PICKER" &&
                  "border-4 border-[#FFF500]"
                }`}
              >
                {players[playerId].userName}
              </li>

              <li>{players[playerId].score}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default PlayerList;
