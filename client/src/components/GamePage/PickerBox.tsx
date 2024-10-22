import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Button from "./Button";

const PickerBox = () => {
  const room = useSelector((state: RootState) => state.game.room);
  return (
    <ul className="font-denk">
      {room.pickerMessages.map((item: any, index: number) => {
        return (
          <li
            key={item.index}
            className={`w-full px-5 py-3 ${
              item.rating !== null ? "hidden" : ""
            }`}
          >
            <div className="w-full flex items-center justify-between">
              <Button
                pickerListIndex={index}
                messageIndex={item.index}
                rating="COLDER"
              />
              <Button
                pickerListIndex={index}
                messageIndex={item.index}
                rating="COLD"
              />
              {item.message}
              <Button
                pickerListIndex={index}
                messageIndex={item.index}
                rating="HOT"
              />
              <Button
                pickerListIndex={index}
                messageIndex={item.index}
                rating="WARMER"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PickerBox;
