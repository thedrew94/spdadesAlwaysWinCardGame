import { svgSelector } from "../utils/svgSelector";

export default function PageSupport({ setPage = () => {} }) {
  return (
    <div className="game_btns_home">
      <button className="game_btn" onClick={() => setPage(1)}>
        BUYME A COFFEE
        {svgSelector({ svgName: "coffee", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn">
        PAYPAL{svgSelector({ svgName: "rules", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn">
        FOLLOW ME{svgSelector({ svgName: "linkedin", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button className="game_btn" onClick={() => setPage(1)}>
        GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </div>
  );
}
