import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import {RootState} from "./state/PlayerStore";
import GamePage from "./pages/GamePage";
import {useSelector, useDispatch} from "react-redux";
import {changePlayerObject} from "./state/PlayerSlice";
import {socket} from "./socket";
import {events} from "./utils/handle-events";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const room = useSelector((state: RootState) => state.game.room);
  const dispatch = useDispatch();

  useEffect(() => {
    function onRoomMessage(value: any) {
      const func = events[value.type];

      if (!func) {
        console.log("Message not handled: ", value);
      } else{
        func(dispatch, value);
      }
    }

    function onPlayerUpdate(value: any) {
      console.log("player obj: ", value);
      dispatch(changePlayerObject(value.player));
    }

    socket.on("room_message", onRoomMessage);
    socket.on("player_update", onPlayerUpdate);

    return () => {
      socket.off("room_message");
      socket.off("player_update");
    };
  }, [room]);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!room.id ? <LandingPage /> : <GamePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </main>
  );
}

export default App;
