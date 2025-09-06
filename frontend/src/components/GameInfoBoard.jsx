import s4 from "../assets/4S_test.png";
import avatar1 from "../assets/avatar_1.png";
import avatar2 from "../assets/avatar_2.png";
import avatar3 from "../assets/avatar_3.png";
import avatar4 from "../assets/avatar_4.png";
import avatar5 from "../assets/avatar_5.png";
import avatar6 from "../assets/avatar_6.png";
import avatar7 from "../assets/avatar_7.png";
import avatar8 from "../assets/avatar_8.png";
import dSymbol from "../assets/DSymbol.png";
import cSymbol from "../assets/CSymbol.png";
import sSymbol from "../assets/SSymbol.png";
import hSymbol from "../assets/HSymbol.png";
import cardBack from "../assets/BACK.png";

const avatarsCollections = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
  7: avatar7,
  8: avatar8,
};

export default function GameInfoBoard({ userData }) {
  const playingPlayerData = userData.roomPlayers.find((p) => p.playerPlaying);
  const roundWinningSymbolImgPath =
    userData.roundWinningSuit === "D"
      ? dSymbol
      : userData.roundWinningSuit === "C"
      ? cSymbol
      : userData.roundWinningSuit === "S"
      ? sSymbol
      : userData.roundWinningSuit === "H"
      ? hSymbol
      : cardBack;

  return (
    <div className="top_info_container">
      <div className="top_info_container_upper">
        <div className="round_counter">ROUND 1</div>
        <div className="gameplayarea_card">
          <img src={roundWinningSymbolImgPath} alt="" draggable="false" />
        </div>
      </div>
      <div className="currently_playing">
        <div className="currently_playing_loader" style={{ "--loader-percentage": "60%" }}>
          <div className="currently_playing_loader_inner"></div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="player_panel_img">
            <img
              src={playingPlayerData ? avatarsCollections[playingPlayerData.playerAvatar] || "" : ""}
              alt=""
              width="100%"
              height="100%"
              draggable="false"
            />
          </div>
          <div>
            <h6 className="curr_play_header">Currently playing...</h6>
            <h6 className="curr_play_name">
              {playingPlayerData ? playingPlayerData.playerUsername || "undefined_name" : "undefined_name"}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
