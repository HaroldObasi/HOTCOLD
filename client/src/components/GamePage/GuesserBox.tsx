import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import Button from "./Button";

type Props = {};

const GuesserBox = (props: Props) => {
  const room = useSelector((state: RootState) => state.game.room);
  return (
    <ul className="font-denk">
      {room.messages.map((item: any) => {
        return <li>{item.message}</li>;
      })}
    </ul>
  );
};

export default GuesserBox;
