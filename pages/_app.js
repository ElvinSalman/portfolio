import "../styles/globals.css";
import "animate.css/animate.min.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";
import i18n from "../lib/i18n";

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  if (!mounted) {
    // 🔹 SSR-safe: не рендерим ничего, пока тема не применилась
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
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
