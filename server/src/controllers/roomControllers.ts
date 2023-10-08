import { Request, Response } from "express";
import { io } from "../index.js";

export const getAllRooms = (req: Request, res: Response) => {
  res.json({ message: "routes" });
};
