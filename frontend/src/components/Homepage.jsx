import { useState } from "react";
import { svgSelector } from "../utils/svgSelector";
import AvatarSelection from "./AvatarSelection";
import LanguageSelector from "./LanguageSelector";
import Loader from "./Loader";

export default function Homepage() {
  const [page, setPage] = useState(1);
  const [playersCount, setPlayersCount] = useState(2);

  return (
    <div className="homepage">
      <LanguageSelector />
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
      <div className="homepage_game_home">
        {page === 1 && (
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
        )}

        {page === 2 && (
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
        )}

        {page === 3 && (
          <div className="game_btns_new">
            <div className="input_username">
              <input
                type="text"
                name=""
                id=""
                placeholder="Player username"
                autoComplete="off"
                className="input_text_default"
              />
              {svgSelector({ svgName: "pen", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
            </div>

            <div className="input_players">
              <button onClick={() => setPlayersCount((curr) => (curr <= 2 ? curr : curr - 1))}>
                {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
              </button>
              <span>{playersCount} players</span>
              <button onClick={() => setPlayersCount((curr) => (curr >= 8 ? curr : curr + 1))}>
                {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
              </button>
            </div>
            <AvatarSelection />

            <button className="game_btn" onClick={() => setPage(4)}>
              START GAME{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
            <button className="game_btn" onClick={() => setPage(2)}>
              GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
          </div>
        )}

        {page === 4 && (
          <Loader isLoading={true}>
            <div className="game_btns_loading_new">
              <div className="game_code_container">
                <h6 className="game_code">HKJSA123</h6>
                <button>
                  {svgSelector({ svgName: "copy", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
                </button>
              </div>
              <h6 className="game_code_text">
                This is your game room code. <br />
                Share the code with your friends to play together or wait for other people to join the room.
              </h6>
              <button className="game_btn" onClick={() => setPage(1)}>
                GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
              </button>
            </div>
          </Loader>
        )}

        {page === 5 && (
          <div className="game_btns_join">
            <ul className="available_games_join">
              <li className="available_romm_li">
                <h6>HKJSA123</h6>
                <span>1 / 4</span>
                <button>
                  {svgSelector({ svgName: "enter", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
                </button>
              </li>
              <li className="available_romm_li">
                <h6>4324SADA</h6>
                <span>1 / 4</span>
                <button>
                  {svgSelector({ svgName: "enter", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
                </button>
              </li>
            </ul>

            <button className="game_btn" onClick={() => setPage(2)}>
              GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
          </div>
        )}

        {page === 6 && (
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
        )}

        <a href="#" className="game_link">
          This game was made with LOVE by <br />
          Tornyai Laurentiu Andrei
        </a>
      </div>
    </div>
  );
}
