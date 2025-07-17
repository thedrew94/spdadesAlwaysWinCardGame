import PlayerInfoPanel from "./PlayerInfoPanel";

export default function GameInfoBoard() {
  return (
    <div className="top_info_container">
      <div className="top_info_container_upper">
        <div className="round_counter">ROUND 1</div>
      </div>
      <div className="currently_playing">
        <h6 className="curr_play_header">Currently playing...</h6>
        <PlayerInfoPanel />
      </div>
    </div>
  );
}
