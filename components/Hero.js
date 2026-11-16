import Image from "next/image";
import Link from "next/link";
import userData from "@constants/data";
import { useTranslation } from "next-i18next";
export default function Hero() {
  const { t } = useTranslation("common");
  return (
    <section className="hero page-shell">
      <div>
        <p className="eyebrow">
          {t("name")} · {t("contactAddress")}
        </p>
        <h1>
          <span>Frontend.</span>
          <br />
          <span className="hero-accent">React.</span>
          <br />
          React Native.
          <br />
          <span className="hero-role">{t("developer")}</span>
        </h1>
        <p className="hero-description">{t("aboutTitle")}.</p>
        <div className="button-row">
          <Link className="button-primary" href="/projects">
            {t("projects")} <span aria-hidden="true">↗</span>
          </Link>
          <Link className="button-secondary" href="/contact">
            {t("contact")}
          </Link>
        </div>
      </div>
      <figure className="hero-portrait">
        <Image
          src={userData.avatarUrl}
          alt={t("name")}
          width={640}
          height={800}
          priority
          sizes="(max-width: 767px) 90vw, 40vw"
        />
        <figcaption>
          {t("thatsme")} <span aria-hidden="true">↗</span>
        </figcaption>
      </figure>
    </section>
  );
}
