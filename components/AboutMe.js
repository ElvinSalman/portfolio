import React from "react";
import userData from "@constants/data";

import { useTranslation } from "react-i18next";


export default function AboutMe() {
  const { t, ready } = useTranslation("common");
  if (!ready) return null;

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold py-20 text-center md:text-left">
          {t("aboutMe")}
        </h1>
      </div>
      <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
        <div className="text-container max-w-6xl mx-auto pt-20">
          <p
            className="leading-loose text-2xl md:text-4xl font-semibold  mx-4"
            style={{ lineHeight: "3rem" }}
          >
            {t("aboutTitle")}. {t("")}{" "}
            {t("currentlyWorking")}
            <br/>
            <a
              className="bg-red-500 rounded-md px-2 py-1 text-white"
              href={userData.about.currentPositionUrl}
            >
              {t("currentPosition")} ✈️
            </a>
          </p>
        </div>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4">
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
          {/* Social Buttons */}
          <div className="inline-flex flex-col">
            <div>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {t("contact")}
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                {t("aboutContact1")}{" "}
                <a
                  href={`mailto:${userData.email}`}
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  {t("mail")}
                </a>{" "}
                {t("aboutContact2")}
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {t("aboutJobTitle")}
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                {t("aboutJob1")}{" "}
                <a
                  href={userData.resumeUrl}
                  target="__blank"
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  CV
                </a>{" "}
                {t("aboutJob2")}
              </p>
            </div>
            {/* Social Links */}
            <h1 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
              {t("socialLinks")}
            </h1>
            <div className="mt-4 ml-4">

              <div className="wow animate__animated animate__fadeInLeft flex flex-row justify-start items-center ">
                <a
                  target="_blank"
                  href={userData.socialLinks.facebook}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    Facebook
                  </div>
                </a>
              </div>
              <div className="wow animate__animated animate__fadeInLeft flex flex-row justify-start items-center">
                <a
                  target="_blank"
                  href={userData.socialLinks.twitter}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    Twitter
                  </div>
                </a>
              </div>
              <div className="wow animate__animated animate__fadeInLeft flex flex-row justify-start items-center">
                <a
                  target="_blank"
                  href={userData.socialLinks.github}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    GitHub
                  </div>
                </a>
              </div>
              <div className="wow animate__animated animate__fadeInLeft flex flex-row justify-start items-center">
                <a
                  target="_blank"
                  href={userData.socialLinks.linkedin}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    LinkedIn
                  </div>
                </a>
              </div>
              <div className="wow animate__animated animate__fadeInLeft flex flex-row justify-start items-center">
                <a
                  target="_blank"
                  href={userData.socialLinks.instagram}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-28 group-hover:translate-x-0 transition duration-300"></div>
                    Instagram
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* Text area */}
          <div className="col-span-1 md:col-span-2">
            <p
              className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
            >
              {t("about1")}
            </p>
            <p
              className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
            >
              {t("about2")}
            </p>
            <p
              className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
            >
              {t("about3")}
            </p>
            <p
              className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
            >
              {t("about4")}
            </p>

            {/* {userData.about.description?.map((desc, idx) => (
              <p
                key={idx}
                className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
              >
                {desc}
              </p>
            ))} */}

            <h1 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              {t("techStack")}
            </h1>
            <div className="flex flex-row flex-wrap mt-8">
              {/* wow animate-animated animate__heartBeat  */}
              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />

              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://vitejs.dev/logo.svg"
                alt="Vite"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://assets.vercel.com/image/upload/v1662130559/front/favicon/vercel/180x180.png"
                alt="Vercel"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/master/topics/tailwind/tailwind.png"
                alt="Tailwind CSS"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/main/topics/bootstrap/bootstrap.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />

              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/01ea2a586e5da744792d0ccfce2f68b861f29301/topics/docker/docker.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/main/topics/redux/redux.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
                alt="Next.js"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/main/topics/jquery/jquery.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/main/topics/devops/devops.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/main/topics/kubernetes/kubernetes.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/java/java.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
              <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png"
                className="h-20 w-20 mx-4 my-4 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
