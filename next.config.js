/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ru", "az"],
    defaultLocale: "en",
    localeDetection: true, // автоматически определяет язык пользователя
  },
};

module.exports = nextConfig;