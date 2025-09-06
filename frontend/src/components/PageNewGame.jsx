import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { config } from "../utils/config";
import { svgSelector } from "../utils/svgSelector";
import AvatarSelection from "./AvatarSelection";
import { useGlobal } from "./GlobalProvider";

export default function PageNewGame({ socket, setPage = () => {} }) {
  const { setUserData } = useGlobal();
  const [formData, setFormData] = useState({
    username: { status: "default", value: "" },
    playerCount: 2,
    selectedAvatar: 1,
  });
  const { t } = useTranslation();

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (formData.username.status !== "correct") {
      setFormData((prevState) => {
        return { ...prevState, username: { status: "error", value: prevState.username.value } };
      });
      return;
    }
    setPage(4);
    const response = await fetch(`${config.rootUrl}api/newRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, username: formData.username.value, socketID: socket.id }),
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
        <span>
          {formData.playerCount} {t("placeholder_players")}
        </span>
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
      <fieldset className={`input_username ${formData.username.status === "error" && "input_error"}`}>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          placeholder={t("placeholder_username")}
          className="input_text_default"
          value={formData.username.value}
          onChange={(e) => {
            const isValid = e.target.value.length > 3;
            setFormData((curr) => {
              return { ...curr, username: { status: isValid ? "correct" : "error", value: e.target.value } };
            });
          }}
        />
        {svgSelector({
          svgName: "pen",
          svgWidth: "28px",
          svgHeight: "28px",
          svgFill: formData.username.status === "error" ? "#851818" : "#3f200b",
        })}
      </fieldset>
      {formData.username.status === "error" && (
        <div className="error_msg">
          {svgSelector({ svgName: "error", svgWidth: "22px", svgHeight: "22px", svgFill: "#851818" })}Please provide a
          valid username
        </div>
      )}

      <AvatarSelection formData={formData} setFormData={setFormData} />

      <div className="fast_game_btn_container">
        <button type="submit" className="fast_game_btn">
          <span className="fast_game_btn_content">1</span>
        </button>
        <button type="submit" className="game_btn">
          {t("btn_start")}
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
          {t("btn_back")}
          {svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
      </div>
    </form>
  );
}
