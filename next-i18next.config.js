// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "az"],
    localeDetection: true, // автоматически определяет язык пользователя
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
