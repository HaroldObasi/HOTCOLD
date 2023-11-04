import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import {RootState} from "./state/PlayerStore";
import GamePage from "./pages/GamePage";
import {useSelector, useDispatch} from "react-redux";
import {changeGameState} from "./state/GameSlice";
import {socket} from "./socket";

function App() {
  const room = useSelector((state: RootState) => state.game.room);
  const dispatch = useDispatch();

  useEffect(() => {
    function onRoomMessage(value: any) {
      console.log("room message: ", value);
      dispatch(changeGameState(value.roomInfo));
    }

    socket.on("room_message", onRoomMessage);

    return () => {
      socket.off("room_message");
    };
  }, [room]);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={room === null ? <LandingPage /> : <GamePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
