import {useEffect, useRef} from "react";
import {socket} from "../socket";

export type ResponseData = {
  type: string;
  status: "success" | "fail";
  message: string;
  payload: unknown;
};

type Cases = {
  [key: string]: (data: ResponseData) => void;
};
export default function useRoomMessage(casesToHandle: Cases) {
  const casesToHandleRef = useRef(casesToHandle);
  useEffect(() => {
    console.log("rendering useRoomMessage:-");
    function handleRoomMessage(data: ResponseData) {
      if (!casesToHandleRef.current[data.type]) return;
      casesToHandleRef.current[data.type](data);
    }

    socket.on("ROOM_MESSAGE", handleRoomMessage);
    return () => {
      socket.off("ROOM_MESSAGE", handleRoomMessage);
    };
  }, []);
}
