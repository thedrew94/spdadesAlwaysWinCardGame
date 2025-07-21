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
import WinningScreen from "./WinningScreen";
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
  const [winningModalOpen, setWinningModalOpen] = useState(false);

  socket.on("waitPlayerTargetPoints", (receivedData) => {
    // const hasInvalidPlayerTarget = receivedData.data.roomPlayers.some(
    //   (p) => p.playerTarget === null || p.playerTarget === undefined
    // );
    // if (!hasInvalidPlayerTarget) {
    //   setUserData((prev) => {
    //     return { ...prev, gameStatus: "gameStarted", roomPlayers: receivedData.data.roomPlayers };
    //   });
    // }
  });

  socket.on("gameCanStart", (receivedData) => {
    const me = receivedData.data.roomPlayers.find((p) => p.socketID === userData.socketID);

    setUserData((prev) => {
      return {
        ...prev,
        gameStatus: "gameStarted",
        roomPlayers: receivedData.data.roomPlayers,
        amICurrentlyPlaying: me.playerPlaying,
      };
    });
  });

  socket.on("newCardPlayed", (receivedData) => {
    const me = receivedData.data.roomPlayers.find((p) => p.socketID === userData.socketID);
    setUserData((prev) => {
      return {
        ...prev,
        roomPlayers: receivedData.data.roomPlayers,
        gameFieldCards: receivedData.data.gameFieldCards,
        roundWinningSuit: receivedData.data.roundWinningSuit,
        amICurrentlyPlaying: me.playerPlaying,
      };
    });
  });

  socket.on("roundEnd", (receivedData) => {
    console.log("ROUND ended ✅✅✅", receivedData.data);
    const me = receivedData.data.roomPlayers.find((p) => p.socketID === userData.socketID);

    setUserData((prev) => {
      return {
        ...prev,
        roomPlayers: receivedData.data.roomPlayers,
        gameFieldCards: receivedData.data.gameFieldCards,
        roundWinningSuit: receivedData.data.roundWinningSuit,
        lastRoundData: receivedData.data.lastRoundData,
        amICurrentlyPlaying: me.playerPlaying,
      };
    });

    setWinningModalOpen(true);
  });

  return (
    <>
      {!validStatuses.includes(userData.gameStatus) ? (
        <ErrorPage />
      ) : (
        <div className="gameplaypage">
          {winningModalOpen && <WinningScreen userData={userData} setWinningModalOpen={setWinningModalOpen} />}
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
          <GameInfoBoard userData={userData} />
          <PlayersInfoPanel roomPlayers={userData.roomPlayers.filter((_, index) => index % 2 === 0)} />
          <GameplayArea userData={userData} />
          <PlayersInfoPanel roomPlayers={userData.roomPlayers.filter((_, index) => index % 2 !== 0)} />
          {userData.gameStatus === "initialPhase" && <GameInitialPhase socket={socket} userData={userData} />}
          <PlayerCardsHand socket={socket} isInitialPhase={userData.gameStatus !== "gameStarted"} />
        </div>
      )}
    </>
  );
}
