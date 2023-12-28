import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Message from "./Message";
import Button from "./Button";

type Props = {};

const PickerBox = (props: Props) => {
  const room = useSelector((state: RootState) => state.game.room);
  return (
    <ul className="font-denk">
      {room.messages.map((item: any, index: number) => {
        return (
          <li className="w-full px-5 py-3">
            <div className="w-full flex items-center justify-between">
              <Button messageIndex={index} rating="COLDER" />
              <Button messageIndex={index} rating="COLD" />
              {item.message}
              <Button messageIndex={index} rating="HOT" />
              <Button messageIndex={index} rating="WARMER" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PickerBox;
