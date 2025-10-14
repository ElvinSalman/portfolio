/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru", "az"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
