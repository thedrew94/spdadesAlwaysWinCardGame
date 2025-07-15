import { useState } from "react";
import Copyright from "./Copyright";
import LanguageSelector from "./LanguageSelector";
import PageChooseGame from "./PageChooseGame";
import PageHome from "./PageHome";
import PageJoinGame from "./PageJoinGame";
import PageNewGame from "./PageNewGame";
import PageSupport from "./PageSupport";
import PageWaitingForGame from "./PageWaitingForGame";
import RoundInfo from "./RoundInfo";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "./GlobalProvider";

export default function Homepage({ socket }) {
  const navigate = useNavigate();
  const { setUserData } = useGlobal();
  const [page, setPage] = useState(1);

  socket.on("gameStart", (receivedData) => {
    setUserData((prev) => {
      return { ...prev, roomID: receivedData.data.roomID, rommPlayers: receivedData.data.roomPlayers };
    });
    navigate(`/game`);
  });

  return (
    <div className="homepage">
      <LanguageSelector />
      <RoundInfo />
      {/* <button className="keycap_btn">
                  <span className="keycap_btn_letter">OK</span>
                </button> */}
      <div className="homepage_game_home">
        {page === 1 && <PageHome setPage={setPage} />}
        {page === 2 && <PageChooseGame setPage={setPage} />}
        {page === 3 && <PageNewGame socket={socket} setPage={setPage} />}
        {page === 4 && <PageWaitingForGame setPage={setPage} />}
        {page === 5 && <PageJoinGame setPage={setPage} />}
        {page === 6 && <PageSupport setPage={setPage} />}
        <Copyright />
      </div>
    </div>
  );
}
