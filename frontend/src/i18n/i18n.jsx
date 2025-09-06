import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en_translation from "./locales/en_translation.json";
import it_translation from "./locales/it_translation.json";
import jp_translation from "./locales/jp_translation.json";

const resources = {
  en: {
    translation: en_translation,
  },
  it: {
    translation: it_translation,
  },
  jp: {
    translation: jp_translation,
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind i18next to React
  .init({
    resources,
    fallbackLng: "en", // Default language if detection fails
    debug: true, // Enable debug in development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });
export default i18n;
