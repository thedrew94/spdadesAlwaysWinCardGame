import { useState } from "react";
import { svgSelector } from "../utils/svgSelector";

export default function GameInitialPhase({ targetPoints, setTargetPoints, setUserData }) {
  const [targetPoints, setTargetPoints] = useState(1);

  return (
    <div className="cards_layer">
      <h6 className="start_info">
        Check your cards. <br /> Choose the number of hands you aim to win accordingly <br />
        Once you are happy with your decision click the play button.
      </h6>
      <div className="input_players">
        <button onClick={() => setTargetPoints((curr) => (curr <= 0 ? curr : curr - 1))}>
          {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
        </button>
        <span>{targetPoints} POINTS</span>
        <button onClick={() => setTargetPoints((curr) => (curr >= 8 ? curr : curr + 1))}>
          {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
        </button>
      </div>
      <button className="game_btn">
        PLAY{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </div>
  );
}
