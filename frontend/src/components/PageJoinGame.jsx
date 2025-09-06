import { useEffect } from "react";
import { svgSelector } from "../utils/svgSelector";
import { getFetch } from "../utils/getFetch";
import { useState } from "react";
import { useGlobal } from "./GlobalProvider";
import AvatarSelection from "./AvatarSelection";
import FastAccessButton from "./FastAccessButton";
import { config } from "../utils/config";
import { useTranslation } from "react-i18next";

export default function PageJoinGame({ setPage = () => {} }) {
  const { userData, setUserData } = useGlobal();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    selectedAvatar: 1,
  });
  const { t } = useTranslation();

  async function handleFormSubmit(e, roomID) {
    e.preventDefault();
    setPage(4);
    const response = await fetch(`${config.rootUrl}api/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, socketID: userData.socketID, roomID }),
      credentials: "include",
    });

    const fetchedData = await response.json();
    if (fetchedData.status !== "success") {
      setUserData((prev) => {
        return { ...prev, gameStatus: "error", roomID: null };
      });
      return console.log("error occured", fetchedData);
    }

    if (!fetchedData || !fetchedData.data) return;

    setUserData((prev) => {
      return { ...prev, gameStatus: "awaitingplayers", roomID: fetchedData.data.roomID };
    });
  }

  useEffect(() => {
    async function fetchAvailableRooms() {
      const fetchedData = await getFetch({ url: `${config.rootUrl}api/room` });
      setAvailableRooms(fetchedData.data);
    }

    fetchAvailableRooms();
  }, []);

  return (
    <div className="game_btns_join">
      <form
        className="game_btns_new"
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <fieldset className="input_username">
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            placeholder={t("placeholder_username")}
            className="input_text_default"
            value={formData.username}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, username: e.target.value };
              });
            }}
          />
          {svgSelector({ svgName: "pen", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
        </fieldset>

        <AvatarSelection formData={formData} setFormData={setFormData} />

        <ul className="available_games_join">
          {availableRooms &&
            availableRooms.length > 0 &&
            availableRooms.map((ar) => {
              return (
                <li key={`room_${ar.roomID}`} className="available_romm_li">
                  <h6>{ar.roomID.toUpperCase()}</h6>
                  <span>
                    {ar.roomPlayers} / {ar.roomMaxPlayers}
                  </span>
                  <button type="submit" onClick={(e) => handleFormSubmit(e, ar.roomID)}>
                    {svgSelector({ svgName: "enter", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
                  </button>
                </li>
              );
            })}
        </ul>
        <FastAccessButton
          btnText={t("btn_back")}
          btnSvg="back"
          fastBtnText="1"
          fastBtnTrigger="1"
          cbFunc={() => {
            setPage(2);
          }}
        />
      </form>
    </div>
  );
}
