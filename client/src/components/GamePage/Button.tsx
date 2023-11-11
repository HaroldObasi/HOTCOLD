import React from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

type Props = {
  rating: "COLDER" | "COLD" | "HOT" | "WARMER";
  messageIndex: number;
};

const Button = (props: Props) => {
  const room = useSelector((state: RootState) => state.game.room);

  const handleRate = async () => {
    await axios.post("http://localhost:5000/api/guess/rateGuess", {
      messageIndex: props.messageIndex,
      rating: props.rating,
      roomId: room.id
    });
  };

  return (
    <button
      onClick={handleRate}
      className={`p-2 mx-1 rounded-md ${
        props.rating === "COLDER" || props.rating === "COLD"
          ? "bg-[#95EDF9]"
          : "bg-[#FFB774]"
      }`}
    >
      {props.rating}
    </button>
  );
};

export default Button;
