import { svgSelector } from "../utils/svgSelector";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage_title">
        <span className="title_main_letter">S</span>
        <div className="title_side_letter">
          <span>pades</span>
          <span>always wins</span>
        </div>
        <img src="./src/assets/playing_card_256.png" alt="" width="256px" height="256px" draggable="false" />
      </div>
      {/* <button className="keycap_btn">
                  <span className="keycap_btn_letter">OK</span>
                </button> */}
      <div className="homepage_game_btns">
        <button className="game_btn">
          PLAY{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <button className="game_btn">
          RULES{svgSelector({ svgName: "rules", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <button className="game_btn">
          SUPPORT{svgSelector({ svgName: "love", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <a href="#" className="game_link">
          This game was made with LOVE by <br />
          Tornyai Laurentiu Andrei
        </a>
      </div>
    </div>
  );
}
