module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "az"],
    localeDetection: true, // автоматически определяет язык
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
