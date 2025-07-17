import { useState } from "react";
import { svgSelector } from "../utils/svgSelector";
import GameInfoBoard from "./GameInfoBoard";
import GameInitialPhase from "./GameInitialPhase";
import GameplayArea from "./GameplayArea";
import GameSettingsMenu from "./GameSettingsMenu";
import { useGlobal } from "./GlobalProvider";
import PlayerCardsHand from "./PlayerCardsHand";
import PlayersInfoPanel from "./PlayersInfoPanel";
import ErrorPage from "./ErrorPage";
// import avatar2 from "../assets/7C.png";
// import avatar3 from "../assets/12S.png";
// import avatar4 from "../assets/11D.png";
// import avatar5 from "../assets/4H.png";
// import avatar6 from "../assets/10S.png";
// import avatar7 from "../assets/1S.png";
// import avatar8 from "../assets/11H.png";
const validStatuses = ["awaitingPlayers", "gameStarted", "initialPhase"];

export default function GameplayPage({ socket }) {
  const { userData, setUserData } = useGlobal();
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  socket.on("waitPlayerTargetPoints", (receivedData) => {
    const hasInvalidPlayerTarget = receivedData.data.roomPlayers.some(
      (p) => p.playerTarget === null || p.playerTarget === undefined
    );
    if (!hasInvalidPlayerTarget) {
      setUserData((prev) => {
        return { ...prev, gameStatus: "gameStarted" };
      });
    }
  });

  console.log("userData.gameStatus", userData.gameStatus);

  return (
    <>
      {!validStatuses.includes(userData.gameStatus) ? (
        <ErrorPage />
      ) : (
        <div className="gameplaypage">
          <GameSettingsMenu settingsMenuOpen={settingsMenuOpen} setSettingsMenuOpen={setSettingsMenuOpen} />
          <div className="settings_btn_container">
            <button
              className="game_btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSettingsMenuOpen(true);
              }}
            >
              {svgSelector({ svgName: "settings", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
          </div>
          <GameInfoBoard />
          <PlayersInfoPanel />
          <GameplayArea />
          <PlayersInfoPanel />
          {userData.gameStatus === "initialPhase" && <GameInitialPhase socket={socket} userData={userData} />}
          <PlayerCardsHand isInitialPhase={userData.gameStatus !== "gameStarted"} />
        </div>
      )}
    </>
  );
}
