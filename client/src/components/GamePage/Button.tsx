import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {updatePickerMessage} from "../../state/GameSlice";
import {RootState} from "../../state/PlayerStore";

type Props = {
  rating: "COLDER" | "COLD" | "HOT" | "WARMER";
  messageIndex: number;
  pickerListIndex: number;
};

const Button = (props: Props) => {
  const apiUrl = import.meta.env.VITE_SOCKET_IO_URL || "http://localhost:5000";
  const room = useSelector((state: RootState) => state.game.room);
  const dispatch = useDispatch();

  const handleRate = async () => {
    const response = await axios.post(`${apiUrl}/api/guess/rateGuess`, {
      messageIndex: props.messageIndex,
      rating: props.rating,
      roomId: room.id
    });

    if (response.status === 200) {
      dispatch(
        updatePickerMessage({
          index: props.pickerListIndex,
          message: response.data.message
        })
      );
    }
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
