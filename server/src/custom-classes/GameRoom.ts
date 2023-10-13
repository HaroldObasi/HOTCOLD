import {Player} from "./Player.js";


//TODO create a new method that can randomly pick someone to be be the WORD_PICKER.
//obviously keeping in mind who has already been a WORD_PICKER for that round
//that way if the current word WORD_PICKER is removed another can be easily picked

//TODO create a new method that will randomly pick a new host, if a host disconnets

//TODO create a new method that will only allow a game to progress if the game only
//3 or more players.

export class GameRoom {
  id: string;
  players: Player[];
  host: Player;
  targetWord: string;
  roomMaxCapacity: number;

  constructor(id: string, players: Player[], roomMaxCapcity?: number) {
    this.id = id;
    this.players = players;
    this.roomMaxCapacity = typeof roomMaxCapcity === "undefined"? 5 : roomMaxCapcity;
    if (players.length > 0) {
      this.host = players[0];
    }
  }

  addPlayer(player: Player): boolean {
    if (this.players.length >= this.roomMaxCapacity) {
      return false;
    }
    if (this.players.length === 0) {
      player.role = "WORD_PICKER";
      this.host = player;
    }
    player.roomId = this.id;
    this.players.push(player);
    return true;
  }

  removePlayer(playerId: string): GameRoom | undefined {
    let found: boolean = false;

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

  setRoomMaxCapacity(newCapacity: number) {
    if (newCapacity < 3 || newCapacity > 5) return;

    if (this.players.length > newCapacity) return;

    this.roomMaxCapacity = newCapacity;
  }
}
