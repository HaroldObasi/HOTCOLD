import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";

type Props = {
  senderId: string;
  senderName: string;
  message: string;
  rating: string | null;
  correct: boolean;
};

const Message = (props: Props) => {
  const player = useSelector((state: RootState) => state.player);

  const isMessageFromPlayer = player.id === props.senderId;
  return (
    <div className="flex ">
      <p className="basis-1/3 ">{props.senderName}</p>
      <p className="basis-1/3 text-center">
        {isMessageFromPlayer ? props.message : "HIDDEN"}
      </p>

      {props.correct ? (
        <p className="basis-1/3 text-end">Correct</p>
      ) : (
        <p className="basis-1/3 text-end">
          {isMessageFromPlayer
            ? props.rating === null
              ? "Pending"
              : props.rating
            : "HIDDEN"}
        </p>
      )}
    </div>
  );
};

export default Message;
