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
      picker
      {room.messages.map((item: any) => {
        return (
          <li>
            <div>
              <Button rating="COLDER" />
              <Button rating="COLD" />
              {item.message}
              <Button rating="HOT" />
              <Button rating="WARMER" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PickerBox;
