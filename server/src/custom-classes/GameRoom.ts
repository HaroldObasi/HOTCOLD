import {Player} from "./Player.js";

export class GameRoom {
  id: string;
  players: Player[];
  targetWord: string;

  constructor(id: string, players: Player[]) {
    this.id = id;
    this.players = players;
  }

  addPlayer(player: Player) {
    if (this.players.length === 0) {
      player.role = "WORD_PICKER";
    }
    player.roomId = this.id;
    this.players.push(player);
  }

  removePlayer(playerId: string): GameRoom | undefined {
    let found: boolean = false;
    //TODO create a new method that can randomly pick someone to be be the WORD_PICKER.
    //obviously keeping in mind who has already been a WORD_PICKER for that round
    //that way if the current word WORD_PICKER is removed another can be easily picked

    this.players = this.players.filter((player) => {
      if (playerId === player.id) {
        found = true;
        return false;
      }
      return true;
    });

    if (found) {
      return this;
    } else {
      return;
    }
  }
}
