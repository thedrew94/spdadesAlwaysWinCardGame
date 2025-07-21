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
import { renderCard } from "../utils/renderCard";
import FastAccessButton from "./FastAccessButton";

function reconstructCard(card) {
  const letter = card.slice(-1);
  const number = card.slice(0, -1);
  return `${letter}_${number}`;
}

export default function WinningScreen({ userData, setWinningModalOpen }) {
  function findWinner() {
    const winPlayerSocket = userData.lastRoundData.playerWinner;
    const winPlayer = userData.roomPlayers.find((rp) => rp.socketID === winPlayerSocket);

    return winPlayer;
  }

  return (
    <div className="winning_page">
      <h6 className="curr_play_header">ROUND WINNER</h6>
      <h6 className="curr_play_name">{findWinner().playerUsername}</h6>
      <div className="player_panel_img">
        <img src={avatarsCollections[findWinner().playerAvatar]} alt="" width="100%" height="100%" draggable="false" />
      </div>
      <div className="gameplayarea_cards">
        {userData?.lastRoundData?.gameFieldCards?.map((c, idx) => {
          return (
            <div key={`played_card_${idx}`} className="gameplayarea_card">
              {renderCard({ cardName: reconstructCard(c.card) })}
            </div>
          );
        })}
      </div>
      <FastAccessButton
        btnText="CONTINUE"
        btnSvg="play"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setWinningModalOpen(false);
        }}
      />
    </div>
  );
}
