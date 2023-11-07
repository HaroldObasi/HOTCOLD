import React from "react";
import GuesserBox from "./GuesserBox";
import PickerBox from "./PickerBox";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

type Props = {};

const GuessBox = (props: Props) => {
  const room = useSelector((state: RootState) => state.game.room);
  const player = useSelector((state: RootState) => state.player);

  return (
    <div className="bg-slate-200 basis-1/2">
      guesses
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
