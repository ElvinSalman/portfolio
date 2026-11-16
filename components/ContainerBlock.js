import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function ContainerBlock({ children }) {
  const { t } = useTranslation("common");
  const { pathname, locale } = useRouter();
  const origin = "https://elvinsalman.vercel.app";
  const path = pathname === "/" ? "" : pathname;
  const localizedUrl = (language) =>
    origin + (language === "en" ? "" : "/" + language) + path;
  const title =
    (pathname === "/" ? t("designation") : t(pathname.slice(1))) +
    " — " +
    t("name");
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("aboutTitle")} />
        <link rel="canonical" href={localizedUrl(locale)} />
        {["en", "ru", "az"].map((language) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={localizedUrl(language)}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={localizedUrl("en")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Elvin Salmanov" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={t("aboutTitle")} />
        <meta property="og:url" content={localizedUrl(locale)} />
        <meta property="og:image" content={origin + "/avatar.jpg"} />
        <meta
          property="og:locale"
          content={{ en: "en_US", ru: "ru_RU", az: "az_AZ" }[locale]}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={t("aboutTitle")} />
        <meta name="twitter:image" content={origin + "/avatar.jpg"} />
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </main>
    </>
  );
}
