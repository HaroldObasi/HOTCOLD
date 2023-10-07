import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import morgan from "morgan";
import cors from "cors";
const PORT: number = 5000;

const app: Application = express();
const httpServer = createServer(app);
app.use(morgan("dev"));
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.send("hello fro");
});

io.on("connection", (socket) => {
  console.log(`Socket id: ${socket.id} has connected to the socket`);

  socket.on("new_message", (data) => {
    console.log("Data recieved: ", data);
    io.emit("recieve_message", data);
  });
});

io.on("disconnection", (socket) => {
  console.log(`Socket id: ${socket.id} has disconnected from the socket`);
});

httpServer.listen(PORT, () => {
  console.log("http server on port 3000");
});

// console.log("hello from harold");
