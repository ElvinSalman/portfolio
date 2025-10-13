// lib/i18n.js
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "ru", "az"],
      ns: ["common"],
      defaultNS: "common",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
