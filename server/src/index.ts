import express, {Application, Request, Response} from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import morgan from "morgan";
import cors from "cors";

import {roomRoutes} from "./routes/room.js";
import {initializeSocketEvents} from "./sockets/index.js";

const app: Application = express();
const httpServer = createServer(app);
app.use(morgan("dev"));

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["*"]
  }
});

app.use(cors());
app.use("/api/rooms", roomRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.send("hello fro");
});

initializeSocketEvents(io);

const PORT: number = 5001;
httpServer.listen(PORT, () => {
  console.log("http server on port: ", PORT);
});
