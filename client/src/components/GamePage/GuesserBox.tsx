import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

const GuesserBox = () => {
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
