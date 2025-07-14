import { svgSelector } from "../utils/svgSelector";

export default function PageHome({ setPage = () => {} }) {
  return (
    <div className="game_btns_home">
      <button className="game_btn" onClick={() => setPage(2)}>
        PLAY{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn">
        RULES{svgSelector({ svgName: "rules", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn" onClick={() => setPage(6)}>
        SUPPORT{svgSelector({ svgName: "love", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </div>
  );
}
