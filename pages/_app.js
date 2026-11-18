import "../styles/globals.css";
import "animate.css/animate.min.css";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import i18nConfig from "../next-i18next.config";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" strategy="afterInteractive" onLoad={() => {
        if (window.WOW) new window.WOW({ animateClass: "animate__animated", offset: 100, mobile: true, live: true }).init();
      }} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default appWithTranslation(MyApp, i18nConfig);
