module.exports = {
  i18n: { defaultLocale: "en", locales: ["en", "ru", "az"] },
  ns: ["common"],
  defaultNS: "common",
  // Bundle resources for static builds, serverless ISR and client hydration alike.
  // Runtime functions cannot rely on public/locales being present on disk.
  resources: {
    en: { common: require("./public/locales/en/common.json") },
    ru: { common: require("./public/locales/ru/common.json") },
    az: { common: require("./public/locales/az/common.json") },
  },
  localePath: null,
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
