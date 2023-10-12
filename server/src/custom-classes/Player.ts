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
}
