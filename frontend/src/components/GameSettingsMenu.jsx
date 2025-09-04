import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { svgSelector } from "../utils/svgSelector";
import { useGlobal } from "./GlobalProvider";
import { config } from "../utils/config";

export default function GameSettingsMenu({ settingsMenuOpen = false, setSettingsMenuOpen = () => {} }) {
  const { userData, setUserData } = useGlobal();
  const navigate = useNavigate();
  const settingsMenu = useRef(null);

  async function quitGame() {
    try {
      await fetch(`${config.rootUrl}api/room`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomID: userData.roomID }),
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUserData((prev) => {
        return { ...prev, roomID: null };
      });
      navigate("/");
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log("clicked", settingsMenu.current, settingsMenu.current.contains(event.target));
      if (settingsMenu.current && !settingsMenu.current.contains(event.target)) {
        setSettingsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === "Escape") {
        setSettingsMenuOpen(false);
      }
    };

    if (settingsMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [settingsMenuOpen]);

  if (!settingsMenuOpen) return null;

  return (
    <div className="game_settings_outter">
      <div className="game_settings" ref={settingsMenu}>
        <button className="game_btn">
          RULES{svgSelector({ svgName: "rules", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <button className="game_btn">
          SUPPORT{svgSelector({ svgName: "love", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <button className="game_btn" onClick={() => quitGame()}>
          QUIT GAME{svgSelector({ svgName: "quit", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <button className="game_btn" onClick={() => setSettingsMenuOpen(false)}>
          GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
        <a href="#" className="game_link">
          This game was made with LOVE by <br />
          Tornyai Laurentiu Andrei
        </a>
      </div>
    </div>
  );
}
