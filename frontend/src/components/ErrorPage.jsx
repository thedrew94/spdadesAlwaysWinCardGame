import { Link, useNavigate } from "react-router-dom";

import FastAccessButton from "./FastAccessButton";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="error_page">
      <div className="err_msg">
        Sometimes unexpected
        <br /> errors can occur...
      </div>

      {/* <div>currently playing player</div> */}
      <FastAccessButton
        btnText="GO BACK"
        btnSvg="back"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          navigate("/");
        }}
      />
      {/* <Link to="/" className="game_btn">
        GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
      </Link> */}
    </div>
  );
}
