import {Socket} from "socket.io";

export class Player {
  id: string;
  userName: string;
  role: "WORD_GUESSER" | "WORD_PICKER";
  score: number;
  roomId: string;

  constructor(id: string, userName: string) {
    this.id = id;
    this.userName = userName;
    this.role = "WORD_GUESSER";
    this.score = 0;
    this.roomId = "";
  }
  fromInstance(
    id: string,
    userName: string,
    role: Player["role"],
    score: number,
    roomId: string
  ) {
    this.id = id;
    this.userName = userName;
    this.role = role;
    this.score = score;
    this.roomId = roomId;
  }

  scream() {
    console.log("Scream!");
  }

  incrementScore(score: number) {
    this.score += score;
  }
}
