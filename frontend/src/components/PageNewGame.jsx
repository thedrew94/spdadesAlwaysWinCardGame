import { useState } from "react";
import { svgSelector } from "../utils/svgSelector";
import AvatarSelection from "./AvatarSelection";

export default function PageNewGame({ setPage = () => {} }) {
  const [formData, setFormData] = useState({
    username: "",
    playerCount: 2,
    selectedAvatar: 1,
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    setPage(4);
  }

  return (
    <form
      className="game_btns_new"
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <fieldset className="input_username">
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          placeholder="Player username"
          className="input_text_default"
          value={formData.username}
          onChange={(e) => {
            setFormData((curr) => {
              return { ...curr, username: e.target.value };
            });
          }}
        />
        {svgSelector({ svgName: "pen", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
      </fieldset>

      <fieldset className="input_players">
        <button
          type="button"
          onClick={() =>
            setFormData((curr) => {
              return { ...curr, playerCount: curr.playerCount <= 2 ? curr.playerCount : curr.playerCount - 1 };
            })
          }
        >
          {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
        </button>
        <span>{formData.playerCount} players</span>
        <button
          type="button"
          onClick={() => {
            setFormData((curr) => {
              return { ...curr, playerCount: curr.playerCount >= 8 ? curr.playerCount : curr.playerCount + 1 };
            });
          }}
        >
          {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
        </button>
      </fieldset>
      <AvatarSelection formData={formData} setFormData={setFormData} />
      <button type="submit" className="game_btn">
        START GAME{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
      <button type="button" className="game_btn" onClick={() => setPage(2)}>
        GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </form>
  );
}
