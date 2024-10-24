import PickerBox from "./PickerBox";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

const GuessBox = () => {
  const room = useSelector((state: RootState) => state.game.room);

  return (
    <div className="bg-slate-200 basis-1/2 flex-1 px-3 text-center overflow-auto">
      <p className="text-center my-2">Word to guess: {room.targetWord}</p>
      <PickerBox />
    </div>
  );
};

export default GuessBox;
