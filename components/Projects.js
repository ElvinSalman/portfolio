import Image from "next/image";
import userData from "@constants/data";
import { useTranslation } from "next-i18next";
export function ProjectCard({ project, index }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-image">
        <Image
          src={project.imgUrl}
          alt={project.title}
          fill
          sizes="(max-width: 767px) 90vw, 45vw"
        />
      </div>
      <div className="project-caption">
        <span className="project-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2>{project.title}</h2>
        <span aria-hidden="true">↗</span>
      </div>
    </a>
  );
}
export default function Projects() {
  const { t } = useTranslation("common");
  return (
    <section className="page-shell">
      <h1 className="page-title">{t("projects")}</h1>
      <div className="project-grid">
        {userData.projects.map((project, index) => (
          <ProjectCard key={project.link} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
