//import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
//import { socket } from "./socket";

// type Message = {
//   message: string;
// };

function App() {
  // const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  // const [text, setText] = useState<string>("");
  // const [messages, setMessages] = useState<Array<string>>([]);

  // const handleClick = () => {
  //   socket.emit("new_message", {
  //     message: text,
  //   });
  //   setText("");
  // };

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onMessageRecieved(data: Message) {
  //     setMessages((previous) => [...previous, data.message]);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("recieve_message", onMessageRecieved);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("recieve_message", onMessageRecieved);
  //   };
  // }, []);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}>

          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div className="">
        <label htmlFor="message" className="mr-2">
          Send message
        </label>
        <input
          className="border border-black rounded-sm p-2 focus:outline-none"
          name="message"
          id="message"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          onClick={handleClick}
          className="px-2 py-1 bg-red-400 hover:bg-red-600 focus:bg-red-600 rounded-md text-white font-bold"
        >
          Submit
        </button>

        {messages.length > 0 && (
          <ul>
            {messages.map((item, index) => (
              <li className="py-2" key={index}>
                Message: {item}
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </main>
  );
}

export default App;
