import { svgSelector } from "../utils/svgSelector";
import FastAccessButton from "./FastAccessButton";
import { useGlobal } from "./GlobalProvider";
import Loader from "./Loader";
import { config } from "../utils/config";
import { useTranslation } from "react-i18next";

export default function PageWaitingForGame({ setPage = () => {} }) {
  const { userData, setUserData } = useGlobal();
  const { t } = useTranslation();

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
      setPage(1);
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
          {t("text_join_room_1")}
          <br />
          {t("text_join_room_2")}
          <br />
          {t("text_join_room_3")}
        </h6>
        <FastAccessButton
          btnText={t("btn_quit")}
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
