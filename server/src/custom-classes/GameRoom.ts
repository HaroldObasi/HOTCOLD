import {Player} from "./Player.js";
import {io} from "../index.js";
import {Socket} from "socket.io";
import wordBank from "../data/wordBank.json";
import {v4 as uuidv4} from "uuid";

//TODO create a new method that can randomly pick someone to be be the WORD_PICKER.
//obviously keeping in mind who has already been a WORD_PICKER for that round
//that way if the current word WORD_PICKER is removed another can be easily picked

//TODO create a new method that will randomly pick a new host, if a host disconnets

//TODO create a new method that will only allow a game to progress if the game only
//3 or more players.

export enum RatingEnum {
  HOT = "HOT",
  COLD = "COLD",
  COLDER = "COLDER",
  WARMER = "WARMER"
}

export class Message {
  public index: number;
  public sender: {
    id: string;
    userName: string;
  };
  public message: string;
  public timeSent: string;
  public rating: null | RatingEnum;
  public correct: boolean;
  public roomId: string;
  constructor(
    index: number,
    sender: {id: string; userName: string},
    message: string,
    timeSent: string,
    rating: null | RatingEnum,
    correct: boolean,
    roomId: string
  ) {
    this.sender = sender;
    this.message = message;
    this.timeSent = timeSent;
    this.rating = rating;
    this.correct = correct;
    this.roomId = roomId;
  }
}

export class GameRoom {
  id: string;
  roomName: string;
  players: {
    [playerId: string]: Player;
  };
  host: Player;
  isPrivateRoom: boolean;
  targetWord: string | null;
  roomMaxCapacity: number;
  messages: Message[];
  currentRound: number;
  maxRounds: number;
  started: boolean;
  paused: boolean;
  targetWordOptions: string[];
  roundTime: number;
  playersNeededToStart: number;

  constructor(
    id?: string,
    players?: {
      [playerId: string]: Player;
    },
    roomMaxCapcity?: number,
    isPrivateRoom?: boolean,
    maxRounds?: number,
    playersNeededToStart?: number,
    roundTime?: number,
    roomName?: string
  ) {
    this.id = id || uuidv4();
    this.players = players || {};
    this.messages = [];
    this.isPrivateRoom = isPrivateRoom || false;
    this.roomMaxCapacity = roomMaxCapcity || 5;
    this.currentRound = 1;
    this.maxRounds = maxRounds || 3;
    this.playersNeededToStart = playersNeededToStart || 2;
    this.roundTime = roundTime || 60;
    this.started = false;
    this.paused = false;
    this.targetWord = null;
    this.roomName = roomName || "Room Name";
  }

  //send's info of the class that i want to send, as opposed to all
  toJson(withTargetWord: boolean = false) {
    const serializedRoom = {
      id: this.id,
      players: this.players,
      host: this.host,
      messages: this.messages,
      currentRound: this.currentRound,
      maxRounds: this.maxRounds,
      started: this.started,
      targetWordOptions: this.targetWordOptions,
      paused: this.paused
    };

    if (withTargetWord) {
      serializedRoom["targetWord"] = this.targetWord;
    }
    return serializedRoom;
  }

  // adds a player to a game room,
  // should update the clients player list with this.players
  // should send the player calling this thier player object
  addPlayer(player: Player, socket: Socket): boolean {
    const playerListSize = Object.keys(this.players).length;

    if (playerListSize >= this.roomMaxCapacity) {
      return false;
    }

    if (playerListSize === 0) {
      player.role = "WORD_PICKER";
      this.host = player;
    }
    player.roomId = this.id;

    // avoid adding the same player twice
    if (this.players[player.id]) {
      return false;
    }
    this.players[player.id] = player;

    socket.join(this.id);

    // WHY ????
    // Sending the state of the player to the player that joined the room lol
    io.to(player.id).emit("player_update", {
      player: player
    });

    io.to(this.id).emit("room_message", {
      type: "PLAYER_JOINED",
      message: `User: ${player.userName} has joined ${this.id}`,
      roomInfo: this.toJson()
    });

    if (
      Object.keys(this.players).length >= this.playersNeededToStart &&
      !this.started
    ) {
      this.startGame();
    }

    return true;
  }

  //Resets the state of the game room
  resetGameRoom() {
    this.players = {};
    this.host = null;
    this.messages = [];
    this.targetWord = "";
    this.currentRound = 1;
    this.started = false;
    this.paused = false;
  }

  //removes a player from a room
  //should update the clients player list with this.players
  removePlayer(playerId: string): GameRoom | undefined {
    const playerListSize = Object.keys(this.players).length;

    const foundPlayer = this.players[playerId];

    if (!foundPlayer) {
      return;
    } else {
      delete this.players[playerId];
      if (playerListSize <= 1) {
        this.resetGameRoom();
      }
      return this;
    }
  }

  verifyGuess(word: string): Boolean {
    if (word.toLowerCase().trim() === this.targetWord) {
      return true;
    }

    return false;
  }

  // add a message item to this.messages list
  // update clients message list with this.messages
  sendMessage(message: Message) {
    const isCorrect = this.verifyGuess(message.message);

    if (isCorrect) {
      message.correct = true;

      const index = this.messages.length;

      message.index = index;
      this.messages.push(message);

      console.log("THE GUESS IS CORRECT");
      io.to(this.id).emit("room_message", {
        type: "NEW_ROOM_MESSAGE_WINNER",
        message: `${message.sender.userName} guessed the word correctly`,
        roomInfo: this.toJson()
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

  // sends timer (i) update to connected users
  sendTimerTick(i: number) {
    io.to(this.id).emit("room_message", {
      type: "GAME_TIMER_TICK",
      message: "Timer Ticking",
      timer: i,
      currentRound: this.currentRound
    });
  }

  // method to send leaderboard to clients

  sendLeaderboard() {
    //sort players by score
    const sortedPlayers = Object.values(this.players).sort(
      (a, b) => b.score - a.score
    );

    io.to(this.id).emit("room_message", {
      type: "LEADERBOARD",
      message: "The game has ended",
      leaderboard: sortedPlayers
    });
  }

  // method to shuffle target words array, pauses game ?
  // send this.targetWordOptions to clients ?
  sendTargetWordsToHost(playerId?: string) {
    const getRandomWords = (words: string[], count: number): string[] => {
      const shuffled = words.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    this.targetWordOptions = getRandomWords(wordBank, 4);
    this.paused = true;

    if (playerId) {
      io.to(playerId).emit("room_message", {
        type: "PICK_TARGET_WORD",
        message: "Pick a target word for the round",
        words: this.targetWordOptions
      });

      //send message to all players except the player picking the word
      io.in(this.id)
        .except(playerId)
        .emit("room_message", {
          type: "PLAYER_PICKING_WORD",
          message: `${this.host.userName} is picking a word`
        });
    }
  }

  // selects target word, pauses game ?
  selectTargetWord(index: number, playerId: string) {
    console.log("Target Word options: ", this.targetWordOptions);

    this.targetWord = this.targetWordOptions[index];

    //send message to word picker letting them know the word that they picked
    io.to(playerId).emit("room_message", {
      type: "UPDATE_TARGET_WORD",
      message: "The target word has been updated",
      targetWord: this.targetWord
    });

    //send message to all players letting them know the word that was picked
    io.to(this.id).emit("room_message", {
      type: "TARGET_WORD_PICKED",
      message: `The target word has been picked by ${this.host.userName}`
    });

    this.paused = false;
  }

  waitForGameToResume(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkPaused = () => {
        if (!this.paused) {
          resolve();
        } else {
          setTimeout(checkPaused, 100); // Check every 100ms
        }
      };
      checkPaused();
    });
  }

  // starts the game
  // small bug, players joining after round starts dont have the chance to be the word picker

  async startGame() {
    this.started = true;

    //game started, send this.started to client
    io.to(this.id).emit("room_message", {
      type: "GAME_STARTED",
      message: `Round ${this.currentRound} has started`,
      started: true
    });

    while (this.currentRound <= this.maxRounds) {
      //Loop through all the players in the room and give them a chance to be the WORD_PICKER

      let procesedKeys = new Set();
      while (true) {
        const currentKeys = Object.keys(this.players);

        console.log("Current Keys: ", currentKeys);
        const isKeysProcessed = false;

        // iterating through all the players in the room
        for (let key of currentKeys) {
          if (!procesedKeys.has(key)) {
            procesedKeys.add(key);
            const currentPlayer = this.players[key];
            this.host = currentPlayer;

            currentPlayer.role = "WORD_PICKER";
            this.players[key] = currentPlayer; // replacing the old instance of the player, with the up

            //Inform all players of new roles after rep
            //send this.host, this.players to clients
            io.to(this.id).emit("room_message", {
              type: "UPDATE_PLAYER_ROLES",
              message: `New picker is ${currentPlayer.userName}`,
              playerList: this.players,
              currentRound: this.currentRound
            });

            // Inform concerned player with new role
            io.to(currentPlayer.id).emit("player_update", {
              player: currentPlayer
            });

            // Give player chance to choose a word,
            // pauses game
            this.sendTargetWordsToHost(currentPlayer.id);
            console.log("GAME PAUSED, AWAITING USER TARGET WORD SELECTION");

            await this.waitForGameToResume();
            console.log("GAME UNPAUSED");

            // Start Timer
            await this.serialRunner(
              this.sendTimerTick.bind(this),
              this.roundTime
            );

            //End of round
            // update users with current scores

            currentPlayer.role = "WORD_GUESSER";
            this.players[key] = currentPlayer;
            //Inform concerned player with new role
            io.to(currentPlayer.id).emit("player_update", {
              player: currentPlayer
            });
          }
        }

        if (!isKeysProcessed) {
          break;
        }
      }

      this.currentRound++;
    }

    console.log("The game has ended");

    //send all players the game has ended, and a leaderboard
    this.sendLeaderboard();

    // maybe end game with a short timer, and then restart

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
