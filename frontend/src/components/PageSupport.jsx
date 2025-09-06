import { useTranslation } from "react-i18next";
import FastAccessButton from "./FastAccessButton";

export default function PageSupport({ setPage = () => {} }) {
  const { t } = useTranslation();

  return (
    <div className="game_btns_home">
      <FastAccessButton
        btnText={t("btn_coffee")}
        btnSvg="coffee"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {}}
      />
      <FastAccessButton btnText={t("btn_paypal")} btnSvg="rules" fastBtnText="2" fastBtnTrigger="2" cbFunc={() => {}} />
      <FastAccessButton
        btnText={t("btn_follow")}
        btnSvg="linkedin"
        fastBtnText="3"
        fastBtnTrigger="3"
        cbFunc={() => {
          window.open("https://www.linkedin.com/in/laurentiu-andrei-tornyai-502655310/", "_blank");
        }}
      />
      <FastAccessButton
        btnText={t("btn_back")}
        btnSvg="back"
        fastBtnText="4"
        fastBtnTrigger="4"
        cbFunc={() => {
          setPage(1);
        }}
      />
    </div>
  );
}
