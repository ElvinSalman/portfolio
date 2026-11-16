import userData from "@constants/data";
import { useTranslation } from "next-i18next";
export default function Footer() {
  const { t } = useTranslation("common");
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>{t("name")}</strong>
          <p>
            © {new Date().getFullYear()} {t("allRightsReserved")}.
          </p>
          <p>
            {t("developedBy")}{" "}
            <a href={userData.socialLinks.linkedin}>Elvin Salmanov</a>
          </p>
        </div>
        <div className="social-links">
          {Object.entries(userData.socialLinks).map(([name, url]) => (
            <a href={url} target="_blank" rel="noopener noreferrer" key={name}>
              {name} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
