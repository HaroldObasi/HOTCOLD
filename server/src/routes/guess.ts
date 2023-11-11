import express, {Router} from "express";
import {rateGuess} from "../controllers/guessControllers.js";

const route: Router = express.Router();

route.post("/all", (req, res) => {
  console.log("heloo world");
});

route.post("rateGuess", rateGuess);

export {route as guessRoutes};
