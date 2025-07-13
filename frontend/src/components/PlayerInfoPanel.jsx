import avatar1 from "../assets/avatar_1.png";
import playingCards from "../assets/playing_card_256.png";

export default function PlayerInfoPanel() {
  return (
    <div className="player_panel">
      <img src={avatar1} alt="" width="48px" height="48px" draggable="false" />
      <img src={playingCards} alt="" width="48px" height="48px" draggable="false" className="player_panel_decoration" />
      <div className="player_panel_name">1 / 3</div>
    </div>
  );
}
