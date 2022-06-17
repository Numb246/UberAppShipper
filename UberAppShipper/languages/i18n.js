import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import vietnam from "./vietnam.json";
import * as Localization from "expo-localization";

i18n.use(initReactI18next).init({
  lng: Localization.locale,
  fallbackLng: "en",
  resources: {
    en: english,
    vi: vietnam,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
