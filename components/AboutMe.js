import userData from "@constants/data";
import { useTranslation } from "next-i18next";
const technologies = [
  "React",
  "JavaScript",
  "TypeScript",
  "Vite",
  "Vercel",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Bootstrap",
  "Git",
  "Docker",
  "Redux",
  "Next.js",
  "jQuery",
  "DevOps",
  "Kubernetes",
  "Java",
  "MySQL",
];
export default function AboutMe() {
  const { t } = useTranslation("common");
  return (
    <section className="page-shell">
      <h1 className="page-title">{t("aboutMe")}</h1>
      <p className="about-lead">{t("aboutTitle")}.</p>
      <p className="current-position">
        {t("currentlyWorking")}
        <a className="text-link" href={userData.about.currentPositionUrl}>
          {t("currentPosition")}
        </a>
        .
      </p>
      <div className="about-grid">
        <aside>
          <h2>{t("contact")}</h2>
          <p>
            {t("aboutContact1")}{" "}
            <a className="text-link" href={"mailto:" + userData.email}>
              {t("mail")}
            </a>{" "}
            {t("aboutContact2")}
          </p>
          <h2>{t("aboutJobTitle")}</h2>
          <p>
            {t("aboutJob1")}{" "}
            <a
              className="text-link"
              href={userData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>{" "}
            {t("aboutJob2")}
          </p>
          <h2>{t("socialLinks")}</h2>
          <div className="social-links">
            {Object.entries(userData.socialLinks).map(([name, url]) => (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={name}
              >
                {name} ↗
              </a>
            ))}
          </div>
        </aside>
        <div className="about-copy">
          {["about1", "about2", "about3", "about4"].map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
          <h2>{t("techStack")}</h2>
          <ul className="tech-list">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
