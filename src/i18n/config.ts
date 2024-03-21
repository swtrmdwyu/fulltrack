import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationPTBR from "./pt-br/translation.json";
import translationES from "./es/translation.json";

i18next.use(initReactI18next).init({
  lng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        ...translationEN
      }
    },
    pt: {
      translation: {
        ...translationPTBR
      }
    },
    es: {
      translation: {
        ...translationES
      }
    }
  },
});