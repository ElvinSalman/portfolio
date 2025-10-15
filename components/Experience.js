import userData from "@constants/data";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Experience() {
  const { t, ready } = useTranslation("common");
  const experiences = t("experienceArr", { returnObjects: true }); // 👈 получаем массив из JSON
  const education = t("educationArr", { returnObjects: true }); // 👈 получаем массив из JSON

  if (!ready) return null;
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold py-20 text-center md:text-left">
          {t("experience")}
        </h1>
      </div>
      <div style={{ overflowX: 'hidden' }}  className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4 py-[25px]">
        <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-20">
          {/* Experience card */}
          {experiences.map((exp, idx) => (
        <div
          className="wow animate__animated animate__fadeInRight"
          key={idx}
        >
          <ExperienceCard
            title={exp.title}
            desc={exp.desc}
            year={exp.year}
            company={exp.company}
            companyLink={exp.companyLink}
          />

          {idx === experiences.length - 1 ? null : (
            <div className="divider-container flex flex-col items-center -mt-2">
              <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
              </div>
              <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
            </div>
          )}
        </div>
      ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold py-20 text-center md:text-left">
          {t("education")}
        </h1>
      </div>
      <div style={{ overflowX: 'hidden' }} className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4">
        <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-20">
          {/* Education card */}
          {education.map((exp, idx) => (
        <div
          className="wow animate__animated animate__fadeInRight"
          key={idx}
        >
          <ExperienceCard
            title={exp.title}
            desc={exp.desc}
            year={exp.year}
            company={exp.company}
            companyLink={exp.companyLink}
          />

          {idx === education.length - 1 ? null : (
            <div className="divider-container flex flex-col items-center -mt-2">
              <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
              </div>
              <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
            </div>
          )}
        </div>
      ))}
          {/* {userData.education.map((exp, idx) => {

            // console.log(idx);
            return (
              // <React.Fragment key={idx}>
              <div className="wow animate__animated animate__fadeInRight" key={idx}>
                <ExperienceCard
                  title={exp.title}
                  desc={exp.desc}
                  year={exp.year}
                  company={exp.company}
                  companyLink={exp.companyLink}
                />
                {idx === userData.education.length - 1 ? null : (
                  <div className="divider-container flex flex-col items-center -mt-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                      <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                    </div>
                    <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
                  </div>
                )}
              </div>
              //</React.Fragment>
            )
          })} */}
        </div>
      </div>
    </section>
  );
}

const ExperienceCard = ({ title, desc, year, company, companyLink }) => {
  return (
    <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4">
      <h1 className="absolute md:-left-10 md:-top-10 text-[16px] -left-0 -top-7 sm:-top-10 sm:text-3xl md:text-4xl text-gray-300 font-bold dark:text-gray-800">
        {year}
      </h1>
      <h1 className="font-semibold text-xl">{title}</h1>
      <a href={companyLink} className="text-gray-500">
        {company}
      </a>
      <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
    </div>
  );
};
