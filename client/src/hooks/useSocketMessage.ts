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
export default function useSocketMessage(event:string,casesToHandle: Cases) {
  const casesToHandleRef = useRef(casesToHandle);
  useEffect(() => {
    function handleSocketMessage(data: ResponseData) {
      if (!casesToHandleRef.current[data.type]) return;
      casesToHandleRef.current[data.type](data);
    }

    socket.on(event, handleSocketMessage);
    return () => {
      socket.off(event, handleSocketMessage);
    };
  }, [event]);
}
