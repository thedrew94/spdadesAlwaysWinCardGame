import { useNavigate } from "react-router-dom";
import FastAccessButton from "./FastAccessButton";

export default function ErrorPage({ errMsg }) {
  const navigate = useNavigate();
  return (
    <div className="error_page">
      {!errMsg && (
        <div className="err_msg">
          Sometimes unexpected
          <br /> errors can occur...
        </div>
      )}

      {errMsg && typeof errMsg === "string" && <div className="err_msg">{errMsg}</div>}

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
