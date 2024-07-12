import {Player} from "./Player.js";
import {io} from "../index.js";
import {Socket} from "socket.io";
import wordBank from "../data/wordBank.json";

//TODO create a new method that can randomly pick someone to be be the WORD_PICKER.
//obviously keeping in mind who has already been a WORD_PICKER for that round
//that way if the current word WORD_PICKER is removed another can be easily picked

//TODO create a new method that will randomly pick a new host, if a host disconnets

//TODO create a new method that will only allow a game to progress if the game only
//3 or more players.

export type Message = {
  index: number;
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
  currentRound: number;
  maxRounds: number;
  started: boolean = false;
  paused: boolean = false;
  targetWordOptions: string[];
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
    this.currentRound = 1;
    this.maxRounds = 3;
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

    // WHY ????
    // Sending the state of the player to the player that joined the room lol
    io.to(player.id).emit("player_update", {
      player: player
    });

    io.to(this.id).emit("room_message", {
      type: "ROOM_UPDATE",
      message: `User: ${player.userName} has joined ${this.id}`,
      roomInfo: this
    });

    if (this.players.length > 1 && !this.targetWord) {
      this.startGame();
    }

    return true;
  }

  resetGameRoom() {
    this.players = [];
    this.host = null;
    this.messages = [];
    this.targetWord = "";
    this.started = false;
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

    if (this.players.length < 1) {
      console.log("The room is empty");
      this.resetGameRoom();
    }

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

  verifyGuess(word: string): Boolean {
    if (word.toLowerCase().trim() === this.targetWord) {
      return true;
    }

    return false;
  }

  sendMessage(message: Message) {
    const isCorrect = this.verifyGuess(message.message);

    if (isCorrect) {
      message.correct = true;
      this.messages.push(message);

      console.log("THE GUESS IS CORRECT");
      io.to(this.id).emit("room_message", {
        type: "NEW_ROOM_MESSAGE_WINNER",
        message: `${message.sender.userName} guessed the word correctly`,
        roomInfo: this
      });
    } else {
      message.index = this.messages.length;
      this.messages.push(message);

      io.to(this.id).emit("room_message", {
        type: "NEW_ROOM_MESSAGE",
        message: `${message.sender.userName} sent a message: ${message.message}`,
        messageData: message
        // roomInfo: this,
      });
    }
  }

  // This function takes a cb, which will be run every 1s for length number of seconds
  async serialRunner(cb: (i: number) => void, length: number, interval = 1000) {
    while (length >= 0) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(cb(length));
        }, interval);
      });
      length--;
    }
  }

  sendTimerTick(i: number) {
    io.to(this.id).emit("room_message", {
      type: "GAME_TIMER_TICK",
      message: "Timer Ticking",
      timer: i,
      roomInfo: this
    });
  }

  //method to shuffle target words array
  shuffleTargetWordOptions() {
    const getRandomWords = (words: string[], count: number): string[] => {
      // Shuffle array
      const shuffled = words.sort(() => 0.5 - Math.random());
      // Get sub-array of first n elements after shuffled
      return shuffled.slice(0, count);
    };

    this.targetWordOptions = getRandomWords(wordBank, 4);
    console.log("Target Word options: ", this.targetWordOptions);
    this.paused = true;
  }

  // create method to pause / unpause game
  selectTargetWord(index: number) {
    console.log("Target Word options: ", this.targetWordOptions);

    this.targetWord = this.targetWordOptions[index];

    console.log("selected word: ", this.targetWord);
    this.paused = false;
  }

  async startGame() {
    //
    this.started = true;
    io.to(this.id).emit("room_message", {
      type: "GAME_STARTED",
      message: `Round ${this.currentRound} has started`,
      timer: "40s",
      roomInfo: this
    });

    while (this.currentRound <= this.maxRounds) {
      //Loop through all the players in the room and give them a chance to be the WORD_PICKER

      for (let i = 0; i < this.players.length; i++) {
        const currentPlayer = this.players[i];
        this.host = currentPlayer;

        currentPlayer.role = "WORD_PICKER";
        this.players[i] = currentPlayer; // replacing the old instance of the player, with the up

        //Inform all players of new roles after rep
        io.to(this.id).emit("room_message", {
          type: "UPDATE_PLAYER_ROLES",
          message: `New picker is ${currentPlayer.userName}`,
          roomInfo: this
        });

        //Give options to host to pick words
        //select random 6 words

        //Inform concerned player with new role
        io.to(currentPlayer.id).emit("player_update", {
          player: currentPlayer
        });

        // Give player chance to choose a word, use an infinite loop, or timer, break when game state changes ?
        this.shuffleTargetWordOptions();

        io.to(currentPlayer.id).emit("room_message", {
          type: "PICK_TARGET_WORD",
          message: {
            message: "Pick a target word",
            words: this.targetWordOptions
          }
        });

        console.log("GAME PAUSED, AWAITING USER TARGET WORD SELECTION");
        await new Promise<void>((resolve) => {
          const checkPaused = () => {
            if (!this.paused) {
              resolve();
            } else {
              setTimeout(checkPaused, 100); // Check every 100ms
            }
          };
          checkPaused();
        });
        console.log("GAME UNPAUSED");

        // Start Timer
        await this.serialRunner(this.sendTimerTick.bind(this), 20);

        // update users with current scores

        currentPlayer.role = "WORD_GUESSER";
        this.players[i] = currentPlayer;
        //Inform concerned player with new role
        io.to(currentPlayer.id).emit("player_update", {
          player: currentPlayer
        });
      }
      this.currentRound++;
    }

    console.log("The game has ended");

    //choose new game host / word picker

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
