import PlayerInfoPanel from "./PlayerInfoPanel";

export default function PlayersInfoPanel({ roomPlayers }) {
  return (
    <div className="player_info_panel_container">
      {roomPlayers &&
        roomPlayers.length > 0 &&
        roomPlayers.map((p, idx) => {
          return <PlayerInfoPanel key={`player_${idx}`} playerData={p} />;
        })}
    </div>
  );
}
