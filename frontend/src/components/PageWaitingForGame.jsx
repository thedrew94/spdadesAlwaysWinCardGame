import { svgSelector } from "../utils/svgSelector";
import { useGlobal } from "./GlobalProvider";
import Loader from "./Loader";

export default function PageWaitingForGame({ setPage = () => {} }) {
  const { userData } = useGlobal();

  return (
    <Loader isLoading={true}>
      <div className="game_btns_loading_new">
        <div className="game_code_container">
          <h6 className="game_code">{userData.roomID || "generating code..."}</h6>
          <button>{svgSelector({ svgName: "copy", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}</button>
        </div>
        <h6 className="game_code_text">
          This is your game room code. <br />
          Share the code with your friends to play together
          <br /> or wait for other people to join the room.
        </h6>
        <button className="game_btn" onClick={() => setPage(1)}>
          GO BACK{svgSelector({ svgName: "back", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
      </div>
    </Loader>
  );
}
