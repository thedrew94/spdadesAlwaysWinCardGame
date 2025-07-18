import playingCards from "../assets/playing_card_256.png";

import avatar1 from "../assets/avatar_1.png";
import avatar2 from "../assets/avatar_2.png";
import avatar3 from "../assets/avatar_3.png";
import avatar4 from "../assets/avatar_4.png";
import avatar5 from "../assets/avatar_5.png";
import avatar6 from "../assets/avatar_6.png";
import avatar7 from "../assets/avatar_7.png";
import avatar8 from "../assets/avatar_8.png";

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

export default function PlayerInfoPanel({ playerData }) {
  return (
    <div className="player_panel">
      <div className="player_panel_img">
        <img src={avatarsCollections[playerData.playerAvatar]} alt="" width="48px" height="48px" draggable="false" />
      </div>
      <div className="player_panel_info">
        {playerData.playerCurrentPoints || 0} / {playerData.playerTarget || 0}
      </div>
      <h6>{playerData.playerUsername || "undefined_name"}</h6>
      <img src={playingCards} alt="" width="48px" height="48px" draggable="false" className="player_panel_decoration" />
    </div>
  );
}
