import { svgSelector } from "../utils/svgSelector";

export default function PageJoinGame({ setPage = () => {} }) {
  return (
    <div className="game_btns_join">
      <ul className="available_games_join">
        <li className="available_romm_li">
          <h6>HKJSA123</h6>
          <span>1 / 4</span>
          <button>{svgSelector({ svgName: "enter", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}</button>
        </li>
        <li className="available_romm_li">
          <h6>4324SADA</h6>
          <span>1 / 4</span>
          <button>{svgSelector({ svgName: "enter", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}</button>
        </li>
      </ul>

      <button className="game_btn" onClick={() => setPage(2)}>
        GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </div>
  );
}
