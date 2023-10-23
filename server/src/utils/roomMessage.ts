type RoomMessageFunction = (
  type: string,
  message: string,
  payload: unknown,
  status: "success" | "fail"
) => {
  type: string;
  message: string;
  payload: unknown;
  status: "success" | "fail";
};

export const roomMessage: RoomMessageFunction = (
  type,
  message,
  payload,
  status
) => ({
  type,
  message,
  payload,
  status
});
