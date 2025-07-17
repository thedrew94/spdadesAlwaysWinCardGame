import { useEffect, useRef, useState } from "react";
import { svgSelector } from "../utils/svgSelector";
import { useNavigate } from "react-router-dom";

export default function GameSettingsMenu({ settingsMenuOpen = false, setSettingsMenuOpen = () => {} }) {
  const navigate = useNavigate();
  const settingsMenu = useRef(null);

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
        <button className="game_btn" onClick={() => navigate(`/`)}>
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
