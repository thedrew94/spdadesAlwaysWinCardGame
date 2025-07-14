import avatar1 from "../assets/avatar_1.png";
import playingCards from "../assets/playing_card_256.png";

export default function PlayerInfoPanel() {
  return (
    <div className="player_panel">
      <div className="player_panel_img">
        <img src={avatar1} alt="" width="48px" height="48px" draggable="false" />
      </div>
      <div className="player_panel_info">1 / 3</div>
      <h6>Mariano della scala</h6>
      <img src={playingCards} alt="" width="48px" height="48px" draggable="false" className="player_panel_decoration" />
    </div>
  );
}
