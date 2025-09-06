import { useTranslation } from "react-i18next";

export default function Copyright() {
  const { t } = useTranslation();

  return (
    <a href="#" className="game_link">
      {t("text_copyright_1")}
      <br />
      {t("text_copyright_2")}
    </a>
  );
}
