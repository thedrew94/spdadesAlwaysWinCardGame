import { useTranslation } from "react-i18next";
import FastAccessButton from "./FastAccessButton";

export default function PageHome({ setPage = () => {} }) {
  const { t } = useTranslation();

  return (
    <div className="game_btns_home">
      <FastAccessButton
        btnText={t("btn_play")}
        btnSvg="play"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setPage(2);
        }}
      />
      <FastAccessButton btnText={t("btn_rules")} btnSvg="rules" fastBtnText="2" fastBtnTrigger="2" cbFunc={() => {}} />
      <FastAccessButton
        btnText={t("btn_support")}
        btnSvg="love"
        fastBtnText="3"
        fastBtnTrigger="3"
        cbFunc={() => {
          setPage(6);
        }}
      />
    </div>
  );
}
