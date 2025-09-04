import { useNavigate } from "react-router-dom";
import FastAccessButton from "./FastAccessButton";

export default function GameWinModal() {
  const navigate = useNavigate();

  return (
    <div className="winning_page">
      <h6 className="curr_play_header">GAME WINNER</h6>
      <h6 className="curr_play_name">Andrea</h6>
      <div className="player_panel_img">
        <img src="" alt="" width="100%" height="100%" draggable="false" />
      </div>
      <FastAccessButton
        btnText="MAIN MENU"
        btnSvg="back"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
