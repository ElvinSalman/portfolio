import userData from "@constants/data";
import { useTranslation } from "next-i18next";
export default function LatestCode({ repositories = [] }) {
  const { t } = useTranslation("common");
  return (
    <section className="page-shell">
      <div className="section-heading">
        <h2>{t("latestCode")}</h2>
        <a
          className="text-link"
          href={userData.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("viewGitHub")} ↗
        </a>
      </div>
      {repositories.length ? (
        <div className="repo-grid">
          {repositories.map((repo) => (
            <article className="repo-card" key={repo.id}>
              <h3>{repo.name}</h3>
              {repo.description && <p>{repo.description}</p>}
              <a
                className="text-link"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("viewRepository")} ↗
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="muted">{t("reposUnavailable")}</p>
      )}
    </section>
  );
}
