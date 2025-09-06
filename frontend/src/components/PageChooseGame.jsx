import { useTranslation } from "react-i18next";
import FastAccessButton from "./FastAccessButton";

export default function PageChooseGame({ setPage = () => {} }) {
  const { t } = useTranslation();

  return (
    <div className="game_btns_start">
      <FastAccessButton
        btnText={t("btn_new_game")}
        btnSvg="play"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setPage(3);
        }}
      />
      <FastAccessButton
        btnText={t("btn_join_game")}
        btnSvg="join"
        fastBtnText="2"
        fastBtnTrigger="2"
        cbFunc={() => {
          setPage(5);
        }}
      />
      <FastAccessButton
        btnText={t("btn_back")}
        btnSvg="back"
        fastBtnText="3"
        fastBtnTrigger="3"
        cbFunc={() => {
          setPage(1);
        }}
      />
    </div>
  );
}
