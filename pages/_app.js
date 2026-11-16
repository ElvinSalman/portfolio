import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default appWithTranslation(MyApp);
