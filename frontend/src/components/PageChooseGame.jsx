import { svgSelector } from "../utils/svgSelector";

export default function PageChooseGame({ setPage = () => {} }) {
  return (
    <div className="game_btns_start">
      <button className="game_btn" onClick={() => setPage(3)}>
        NEW GAME{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn" onClick={() => setPage(5)}>
        JOIN GAME{svgSelector({ svgName: "join", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn" onClick={() => setPage(1)}>
        GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </div>
  );
}
