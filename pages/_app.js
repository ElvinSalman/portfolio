// pages/_app.js
import "../styles/globals.css";
import "animate.css/animate.min.css"; // <-- импорт animate.css через npm или CDN-версию в node_modules
import { ThemeProvider } from "next-themes";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      {/* Подключаем wow.js и инициализируем его в onLoad */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.WOW) {
            // Указываем WOW использовать классы animate.css v4 (animate__animated)
            new window.WOW({
              animateClass: "animate__animated",
              offset: 100, // по желанию: когда запускать (px до элемента)
              mobile: true, // разрешить анимации на мобильных
              live: true,
            }).init();
          }
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
