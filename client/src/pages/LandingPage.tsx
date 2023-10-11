import { useState } from "react";
import PlayModal from "../components/LandingPage/PlayModal";
import StyledButton from "../components/LandingPage/Button";
import Footer from "../components/LandingPage/Footer";

const LandingPage = () => {
  const [playModalOpen, setPlayModalOpen] = useState<boolean>(false);

  return (
    <main className="p-3 bg-[#49C3EA] justify-center font-dela">
        <div className="min-h-screen">
        <h1 className="text-center p-3 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-50 
                    md:text-5xl lg:text-6xl underline underline-offset-[12px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-gray-50">
                HOT{" "}
            </span>
            OR
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-gray-50"> 
                {" "}COLD
            </span>
        </h1>
        <div className="py-6" />
        <div className="flex justify-center">
            <StyledButton ClickEvent={() => setPlayModalOpen(true)}>
                PLAY!
            </StyledButton>
        </div>
        <div className="py-12"/>
        <div className="flex flex-col justify-center max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-24 ">
                <div className="text-white drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)]">
                    <h3 className="pb-6 text-4xl lg:text-5xl xl:text-6xl font-bold">How to play?</h3>
                    <div className="text-l lg:text-2xl xl:text-2xl">
                        <p className="leading-relaxed">Browse open rooms below, once you find one click "join".</p>
                        <p className="pt-6 leading-relaxed">Then simply enter a name you'd like to go by and click "play".</p>
                        <p className="pt-6 leading-relaxed">Win rounds by guessing the word before everyone else!</p>
                    </div>
                </div>
                <div className="text-white drop-shadow-[3px_6px_4px_rgba(0,0,0,0.5)]">
                    <h3 className="pb-6 text-4xl lg:text-5xl xl:text-6xl font-bold">About</h3>
                    <div className="text-l lg:text-2xl xl:text-2xl">
                        <p className="leading-relaxed">Hot or Cold is a classic party game that involves one person choosing a secret word and providing hints to others by saying "hot" or "cold" based on how close their guesses are to the correct answer!</p>
                    </div>
                </div>
            </div>
        </div>

        <PlayModal open={playModalOpen} onClose={() => setPlayModalOpen(false)}>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl text-black font-denk">PLAY!</h2>
            <div className="p-2">
                <StyledButton ClickEvent={() => {}}>
                    FIND ROOM
                </StyledButton>
                <StyledButton ClickEvent={() => {}}>
                    CREATE ROOM
                </StyledButton>
                <StyledButton ClickEvent={() => {}}>
                    JOIN ROOM
                </StyledButton>    
            </div>
        </PlayModal>
        </div>
        <Footer />
    </main>
  )
}

export default LandingPage;