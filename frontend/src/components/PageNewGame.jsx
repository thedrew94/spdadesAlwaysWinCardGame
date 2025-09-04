import { useEffect, useState } from "react";
import { svgSelector } from "../utils/svgSelector";
import AvatarSelection from "./AvatarSelection";
import { useGlobal } from "./GlobalProvider";
import { config } from "../utils/config";

export default function PageNewGame({ socket, setPage = () => {} }) {
  const { setUserData } = useGlobal();

  const [formData, setFormData] = useState({
    username: "",
    playerCount: 2,
    selectedAvatar: 1,
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    setPage(4);
    const response = await fetch(`${config.rootUrl}api/newRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, socketID: socket.id }),
      credentials: "include",
    });

    const fetchedData = await response.json();

    setUserData((prev) => {
      return { ...prev, gameStatus: "awaitingplayers", roomID: fetchedData.data.roomID };
    });
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "1") {
        handleFormSubmit(event);
      }
      if (event.key === "2") {
        setPage(2);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <form
      className="game_btns_new"
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
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

      <AvatarSelection formData={formData} setFormData={setFormData} />

      <div className="fast_game_btn_container">
        <button type="submit" className="fast_game_btn">
          <span className="fast_game_btn_content">1</span>
        </button>
        <button type="submit" className="game_btn">
          START GAME
          {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
      </div>
      <div className="fast_game_btn_container">
        <button type="button" className="fast_game_btn">
          <span className="fast_game_btn_content" onClick={() => setPage(2)}>
            2
          </span>
        </button>
        <button type="button" className="game_btn" onClick={() => setPage(2)}>
          GO BACK
          {svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
      </div>
    </form>
  );
}
