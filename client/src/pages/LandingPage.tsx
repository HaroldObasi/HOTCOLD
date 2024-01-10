import {useState} from "react";
import {RootState} from "../state/PlayerStore";
import PlayModal from "../components/LandingPage/PlayModal";
import StyledButton from "../components/LandingPage/Button";
import Footer from "../components/LandingPage/Footer";
import Background from "../components/Background";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../state/PlayerSlice";
import FindRoomsModal from "../components/modals/FindRoomsModal";
import JoinRoomModal from "../components/modals/JoinRoomModal";
import CreateRoomModal from "../components/modals/CreateRoomModal";

const LandingPage = () => {
  const [selectedModal, setSelectedModal] = useState<
    "play" | "find" | "join" | "create" | null
  >(null);

  const playerName = useSelector((state: RootState) => state.player.userName!);
  const dispatch = useDispatch();

  function isValidName(name: string) {
    return name.trim().length > 0;
  }

  function handleFindRooms() {
    if (!isValidName(playerName)) {
      alert("Please enter a name!");
      return;
    }
    setSelectedModal("find");
  }

  function handleGoBack() {
    setSelectedModal("play");
  }

  function handleJoinRoom() {
    if (!isValidName(playerName)) {
      alert("Please enter your name!");
      return;
    }
    setSelectedModal("join");
  }

  function handleCreateRoom() {
    if (!isValidName(playerName)) {
      alert("Please enter your name!");
      return;
    }
    setSelectedModal("create");
  }

  return (
    <Background>
      <main className="font-dela">
        <div className="flex flex-col items-center min-h-screen">
          <h1
            className="text-center pt-24 p-3 mb-4 mt-2 text-4xl font-extrabold leading-none tracking-wide 
                       md:text-5xl lg:text-[4rem]  text-white w-fit
                       after:block  after:h-[8px] after:bg-white after:mt-[18px] after:rounded-lg after:shadow-[-1px_3px_7px_2px_rgba(0,0,0,0.25)]
                       "
          >
            <span className="text-transparent  bg-clip-text  bg-gradient-to-b from-orange via-orange to-lightorange">
              HOT
            </span>

            <span className="m-5">OR</span>

            <span className=" text-transparent bg-clip-text bg-gradient-to-b from-darkblue via-darkblue to-white ">
              COLD
            </span>
          </h1>
          <div className="py-6" />
          <div className="flex justify-center">
            <StyledButton
              paddingX={"px-24"}
              paddingY={"py-2"}
              width="240px"
              aspect="aspect-[60/13]"
              ClickEvent={() => setSelectedModal("play")}
            >
              PLAY!
            </StyledButton>
          </div>

          <div className="mt-10 animate-pulse">
            <img className="h-24" src="/calltoaction_arrow.png" alt="" />
          </div>

          <div className="py-8" />
          <div className="flex flex-col justify-center max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-52 ">
              <div className="text-darkgray drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)]">
                <h3 className="pb-6 text-4xl lg:text-5xl xl:text-4xl font-bold">
                  How to play?
                </h3>
                <div className="text-l lg:text-2xl xl:text-xl tracking-wider ">
                  <p className="leading-relaxed">
                    Browse open rooms below, once you find one click "join".
                  </p>
                  <p className="pt-6 leading-relaxed">
                    Then simply enter a name you'd like to go by and click
                    "play".
                  </p>
                  <p className="pt-6 leading-relaxed">
                    Win rounds by guessing the word before everyone else!
                  </p>
                </div>
              </div>

              <div className="text-darkgray drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)]">
                <h3 className="pb-6 text-4xl lg:text-5xl xl:text-4xl font-bold">
                  About
                </h3>
                <div className="text-l lg:text-2xl xl:text-xl">
                  <p className="leading-10 tracking-wider">
                    Hot or Cold is a classic party game that involves one person
                    choosing a secret word and providing hints to others by
                    saying "hot" or "cold" based on how close their guesses are
                    to the correct answer!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PlayModal
            open={selectedModal === "play"}
            onClose={() => setSelectedModal(null)}
            overlayClassName=" backdrop-blur"
          >
            <div className="py-4">
              <h2 className="text-center font-denk text-2xl md:text-3xl lg:text-4xl text-black">
                PLAY!
              </h2>
              <div className="p-2 flex flex-col justify-center px-[20%] space-y-8">
                <div className="mb-2">
                  <label
                    htmlFor="name-input"
                    className="block pt-4 pb-2 mx-0 text-lg font-medium text-white"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    placeholder="Enter Name"
                    value={playerName}
                    onChange={(e) => dispatch(setUserName(e.target.value))}
                    className="bg-sky-300 border-none text-darkgray text-md
                            outline-2 outline-none bg-lightblue
                            rounded-md block w-full p-2.5 placeholder:text-[rgba(64,64,64,.4)] "
                  />
                </div>
                <StyledButton paddingY={"py-3"} ClickEvent={handleFindRooms}>
                  FIND ROOM
                </StyledButton>
                <StyledButton paddingY={"py-3"} ClickEvent={handleCreateRoom}>
                  CREATE ROOM
                </StyledButton>
                <StyledButton paddingY={"py-3"} ClickEvent={handleJoinRoom}>
                  JOIN ROOM
                </StyledButton>
              </div>
            </div>
          </PlayModal>
          {selectedModal === "find" && (
            <FindRoomsModal
              open={true}
              onClose={() => setSelectedModal(null)}
              handleGoBack={handleGoBack}
            />
          )}
          {selectedModal === "join" && (
            <JoinRoomModal
              open={true}
              onClose={() => setSelectedModal(null)}
              handleGoBack={handleGoBack}
            />
          )}
          {selectedModal === "create" && (
            <CreateRoomModal
              open={true}
              onClose={() => setSelectedModal(null)}
              handleGoBack={handleGoBack}
            />
          )}
        </div>
        <Footer />
      </main>
    </Background>
  );
};

export default LandingPage;
