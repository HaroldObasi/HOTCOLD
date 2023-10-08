import express, { Router } from "express";
import { getAllRooms } from "../controllers/roomControllers.js";

const route: Router = express.Router();

route.get("/all", getAllRooms);

export { route as roomRoutes };
