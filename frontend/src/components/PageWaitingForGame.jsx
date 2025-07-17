import { svgSelector } from "../utils/svgSelector";
import FastAccessButton from "./FastAccessButton";
import { useGlobal } from "./GlobalProvider";
import Loader from "./Loader";

export default function PageWaitingForGame({ setPage = () => {} }) {
  const { userData, setUserData } = useGlobal();

  async function quitGame() {
    const response = await fetch("http://localhost:5175/api/room", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomID: userData.roomID }),
      credentials: "include",
    });

    const fetchedData = await response.json();
    if (fetchedData.status === "success") {
      setUserData((prev) => {
        return { ...prev, roomID: null };
      });
      setPage(1);

      console.log("room deleted", fetchedData);
    }
  }

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
        <FastAccessButton
          btnText="QUIT"
          btnSvg="back"
          fastBtnText="1"
          fastBtnTrigger="1"
          cbFunc={() => {
            quitGame();
          }}
        />
      </div>
    </Loader>
  );
}
