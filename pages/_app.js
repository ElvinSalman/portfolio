// pages/_app.js
import "../styles/globals.css";
import "animate.css/animate.min.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { useEffect } from "react"; // ✅ добавили
import { appWithTranslation } from "next-i18next";
import i18n from "../lib/i18n"; // ✅ подключаем инициализацию i18n

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.WOW) {
            new window.WOW({
              animateClass: "animate__animated",
              offset: 100,
              mobile: true,
              live: true,
            }).init();
          }
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
