import { useEffect } from "react";
import { svgSelector } from "../utils/svgSelector";

export default function FastAccessButton({
  btnText = "",
  btnSvg = "",
  btnType = "button",
  fastBtnText = "",
  fastBtnTrigger = "",
  cbFunc = () => {},
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === fastBtnTrigger) {
        cbFunc();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cbFunc]);

  return (
    <div className="fast_game_btn_container">
      <button type={btnType} className="fast_game_btn" onClick={() => cbFunc()}>
        <span className="fast_game_btn_content">{fastBtnText}</span>
      </button>
      <button type={btnType} className="game_btn" onClick={() => cbFunc()}>
        {btnText}
        {svgSelector({ svgName: btnSvg, svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </button>
    </div>
  );
}
