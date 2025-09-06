import { useTranslation } from "react-i18next";
import FastAccessButton from "./FastAccessButton";

export default function RulesPage({ setPage }) {
  const { t } = useTranslation();

  return (
    <div className="game_btns_home">
      <div className="game_rules">
        <p>
          {t("rules_1")}
          <br /> <br />
          {t("rules_2")}
          <br /> <br />
          {t("rules_3")}
          <br /> <br />
          {t("rules_4")}
          <br />
          <br />
          <br />- {t("rules_5")}
          <br /> <br />- {t("rules_6")}
          <br /> <br />- {t("rules_7")}
          <br /> <br />- {t("rules_8")}
          <br /> <br />- {t("rules_9")}
          <br />
          {t("rules_10")}
        </p>
      </div>
      <FastAccessButton
        btnText={t("btn_back")}
        btnSvg="back"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setPage(1);
        }}
      />
    </div>
  );
}
