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
    username: { status: "default", value: "" },
    selectedAvatar: 1,
  });
  const { t } = useTranslation();

  async function handleFormSubmit(e, roomID) {
    e.preventDefault();
    if (formData.username.status !== "correct") {
      setFormData((prevState) => {
        return { ...prevState, username: { status: "error", value: prevState.username.value } };
      });
      return;
    }
    setPage(4);
    const response = await fetch(`${config.rootUrl}api/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, username: formData.username.value, socketID: userData.socketID, roomID }),
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
        <fieldset className={`input_username ${formData.username.status === "error" && "input_error"}`}>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            placeholder={t("placeholder_username")}
            className="input_text_default"
            value={formData.username.value}
            onChange={(e) => {
              const isValid = e.target.value.length > 3;
              setFormData((curr) => {
                return { ...curr, username: { status: isValid ? "correct" : "error", value: e.target.value } };
              });
            }}
          />
          {svgSelector({
            svgName: "pen",
            svgWidth: "28px",
            svgHeight: "28px",
            svgFill: formData.username.status === "error" ? "#851818" : "#3f200b",
          })}
        </fieldset>
        {formData.username.status === "error" && (
          <div className="error_msg">
            {svgSelector({ svgName: "error", svgWidth: "22px", svgHeight: "22px", svgFill: "#851818" })}Please provide a
            valid username
          </div>
        )}

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
