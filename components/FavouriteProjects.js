import Link from "next/link";
import { useTranslation } from "next-i18next";
import userData from "@constants/data";
import { ProjectCard } from "./Projects";
export default function FavouriteProjects() {
  const { t } = useTranslation("common");
  const projects = ["Naftalan Products", "YOUnified mobile app", "YOUnified"]
    .map((title) =>
      userData.projects.find((project) => project.title === title),
    )
    .filter(Boolean);
  return (
    <section className="section-tinted">
      <div className="page-shell">
        <div className="section-heading">
          <h2>{t("favouriteProjects")}</h2>
          <Link className="text-link" href="/projects">
            {t("viewAll")} ↗
          </Link>
        </div>
        <div className="project-grid featured-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.link} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
