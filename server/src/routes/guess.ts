import express, {Router} from "express";
import {rateGuess, selectTargetWord} from "../controllers/guessControllers.js";

const route: Router = express.Router();

route.post("/all", (req, res) => {
  console.log("heloo world");
});

route.post("/selectTargetWord", selectTargetWord);

route.post("/rateGuess", rateGuess);

export {route as guessRoutes};
