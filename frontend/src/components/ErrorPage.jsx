import { Link } from "react-router-dom";
import { svgSelector } from "../utils/svgSelector";

export default function ErrorPage() {
  return (
    <div className="error_page">
      <div className="err_msg">
        Sometimes unexpected
        <br /> errors can occur...
      </div>

      {/* <div>currently playing player</div> */}
      <Link to="/" className="game_btn">
        GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </Link>
    </div>
  );
}
