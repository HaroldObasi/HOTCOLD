import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

const PlayerList = () => {
  const room = useSelector((state: RootState) => state.game.room);
  return (
    <div className=" w-[150px]">
      <h3 className="mb-3">Player list</h3>
      <ul>
        {room.players.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={`font-light text-center mb-2 bg-sky-100 rounded-md px-2 py-1 text-black ${
                item.role === "WORD_PICKER" && "border-4 border-[#FFF500]"
              }`}
            >
              {item.userName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlayerList;
