import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

const PlayerList = () => {
  const room = useSelector((state: RootState) => state.game.room);
  return (
    <div className=" w-48">
      <h3 className="mb-3 ">Players</h3>
      <ul>
        {room.players.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={`font-light text-center mb-5 bg-sky-100 rounded-md px-2 text-darkgray bg-[rgba(255,255,255,.6)] py-[.8rem] w-full ${
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
