import { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [userData, setUserData] = useState({
    // default | awaitingPlayers | initialPhase | gameStarted
    gameStatus: "default",
    roomID: "",
    playerUsername: "",
    playerSelectedAvatar: "",
    playerCards: [],
    gameplayAreaCards: [],
    roomPlayers: [],
    roundWinningSuit: null,
    amICurrentlyPlaying: false,
  });

  return <GlobalContext.Provider value={{ userData, setUserData }}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an GlobalProvider");
  }
  return context;
}
