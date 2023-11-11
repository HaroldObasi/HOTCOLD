import React from "react";

type Props = {
  senderName: string;
  message: string;
  rating: string | null;
};

const Message = (props: Props) => {
  return (
    <div className="flex ">
      <p className="basis-1/3 ">{props.senderName}</p>
      <p className="basis-1/3 text-center">{props.message}</p>
      <p className="basis-1/3 text-end">
        {props.rating === null ? "Pending" : props.rating}
      </p>
    </div>
  );
};

export default Message;
