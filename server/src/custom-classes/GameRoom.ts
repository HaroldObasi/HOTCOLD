import {Player} from "./Player.js";
import {io} from "../index.js";
import {Socket} from "socket.io";

//TODO create a new method that can randomly pick someone to be be the WORD_PICKER.
//obviously keeping in mind who has already been a WORD_PICKER for that round
//that way if the current word WORD_PICKER is removed another can be easily picked

//TODO create a new method that will randomly pick a new host, if a host disconnets

//TODO create a new method that will only allow a game to progress if the game only
//3 or more players.

export type Message = {
  sender: Player;
  message: string;
  timeSent: string;
  rating: null | "HOT" | "COLD";
  correct: boolean;
  roomId: string;
};

export class GameRoom {
  id: string;
  players: Player[];
  host: Player;
  isPrivateRoom: boolean;
  targetWord: string | null;
  roomMaxCapacity: number;
  messages: Message[];
  rounds: number;
  started: boolean = false;
  private selected: Set<number> = new Set();

  constructor(
    id: string,
    players: Player[],
    roomMaxCapcity?: number,
    isPrivateRoom: boolean = false
  ) {
    this.id = id;
    this.players = players;
    this.isPrivateRoom = isPrivateRoom;
    this.roomMaxCapacity =
      typeof roomMaxCapcity === "undefined" ? 5 : roomMaxCapcity;
    if (players.length > 0) {
      this.host = players[0];
    }
    this.messages = [];
  }

  addPlayer(player: Player, socket: Socket): boolean {
    if (this.players.length >= this.roomMaxCapacity) {
      return false;
    }
    if (this.players.length === 0) {
      player.role = "WORD_PICKER";
      this.host = player;
    }
    player.roomId = this.id;
    // avoid adding the same player twice
    if (this.players.find((p) => p.id === player.id)) {
      return false;
    }

    this.players.push(player);
    socket.join(this.id);

    io.to(player.id).emit("player_update", {
      player
    });

    if (this.players.length > 1 && !this.targetWord) {
      this.startGame();
    }
    io.to(this.id).emit("room_message", {
      type: "ROOM_UPDATE",
      message: `User: ${player.userName} has joined ${this.id}`,
      roomInfo: this
    });

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

  sendMessage(message: Message) {
    this.messages.push(message);
    io.to(this.id).emit("room_message", {
      type: "NEW_ROOM_MESSAGE",
      message: `${message.sender.userName} sent a message: ${message.message}`,
      roomInfo: this
    });
  }

  chooseNewPicker() {}

  startGame() {
    this.targetWord = "apple";
    this.started = true;
    io.to(this.id).emit("room_message", {
      type: "GAME_STARTED",
      message: "Game has started",
      timer: "40s",
      roomInfo: this
    });

    var initTime = 20;
    const timerInterval = setInterval(() => {
      if (initTime <= 0) {
        clearInterval(timerInterval);
      }
      io.to(this.id).emit("room_message", {
        type: "GAME_TIMER_TICK",
        message: "Timer Ticking",
        timer: initTime,
        roomInfo: this
      });

      initTime--;
    }, 1000);

    //choose new game host / word picker

    console.log("The game has been started");
    //GENERAL GAME FLOW
    //decide who is going to be the word picker, should be this.host
    //give some words as options to the WordPicker,
    //let the WordGuessers know that word picker is picking the word
    //client chooses word and that word is the new target word
    //when the target word is set, inform the room that the word has been picked
    //now players can guess, submit messages,
    //all messages are relayed to the players
    //hosts can rate a message
    //when a message is rated the new messages array is sent to all the players again
    //this flow keeps happening till the word is guessed, the picker determines if a word is correct or not
    //when the word is guessed or when the timer is over, the round ends
    //a new word guesser is picked
    //a round has ended when everyone in the lobby has had a chance to be the word picker
  }
}
