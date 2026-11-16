import { useTranslation } from "next-i18next";
export default function Experience() {
  const { t } = useTranslation("common");
  return (
    <div className="page-shell">
      {["experience", "education"].map((section, index) => (
        <section className="career-section" key={section}>
          {index === 0 ? (
            <h1 className="page-title">{t(section)}</h1>
          ) : (
            <h2 className="page-title">{t(section)}</h2>
          )}
          <div className="timeline">
            {t(section + "Arr", { returnObjects: true }).map((item) => (
              <article
                className="experience-card"
                key={item.company + item.year}
              >
                <p className="career-date">{item.year}</p>
                <div>
                  <h3>{item.title}</h3>
                  <a
                    className="text-link"
                    href={item.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.company} ↗
                  </a>
                  <p className="career-description">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
