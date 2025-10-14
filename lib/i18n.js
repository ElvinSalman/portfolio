// lib/i18n.js
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// Важно: не использовать if (!i18n.isInitialized)
// Потому что на клиенте после SSR это может вызвать повторную инициализацию

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
      useSuspense: false, // 🔥 обязательно при SSR
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
