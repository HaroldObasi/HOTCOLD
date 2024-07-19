import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Button from "./Button";

const PickerBox = () => {
  const room = useSelector((state: RootState) => state.game.room);
  return (
    <ul className="font-denk">
      {room.pickerMessages.map((item: any) => {
        return (
          <li className="w-full px-5 py-3">
            <div className="w-full flex items-center justify-between">
              <Button messageIndex={item.index} rating="COLDER" />
              <Button messageIndex={item.index} rating="COLD" />
              {item.message}
              <Button messageIndex={item.index} rating="HOT" />
              <Button messageIndex={item.index} rating="WARMER" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PickerBox;
