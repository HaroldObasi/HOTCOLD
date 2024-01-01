type Props = {
  senderName: string;
  message: string;
  rating: string | null;
  correct: boolean;
};

const Message = (props: Props) => {
  return (
    <div className="flex ">
      <p className="basis-1/3 ">{props.senderName}</p>
      <p className="basis-1/3 text-center">{props.message}</p>

      {props.correct ? (
        <p className="basis-1/3 text-end">Correct</p>
      ) : (
        <p className="basis-1/3 text-end">
          {props.rating === null ? "Pending" : props.rating}
        </p>
      )}
    </div>
  );
};

export default Message;
