import GuesserBox from "./GuesserBox";
import PickerBox from "./PickerBox";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

const GuessBox = () => {
  const room = useSelector((state: RootState) => state.game.room);
  const player = useSelector((state: RootState) => state.player);

  return (
    <div className="bg-graybg text-darkgray border border-white px-3 text-center overflow-auto w-full rounded-xl">
      <p className="text-center my-2 text-black">
        Word to guess: {room.targetWord}
      </p>
      {player.role === "WORD_GUESSER" ? (
        <GuesserBox />
      ) : player.role === "WORD_PICKER" ? (
        <PickerBox />
      ) : (
        <></>
      )}
    </div>
  );
};

export default GuessBox;
