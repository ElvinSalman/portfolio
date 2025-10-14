import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { redirect } from "next/navigation";

export default function Home({ repositories }) {
  // redirect("/en");
  return (
    <ContainerBlock
      title="Elvin Salmanov - Developer, Writer, Creator"
      description="A modern portfolio showcasing my journey as a software developer, featuring my projects, experience, and passion for creating innovative web solutions."
    >
      {/* <Hero /> */}
      {/* <FavouriteProjects /> */}
      {/* <LatestCode repositories={repositories} /> */}
    </ContainerBlock>
  );
}

export async function getStaticProps({ locale }) {
  const token = process.env.GITHUB_AUTH_TOKEN;
  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories,
      ...(await serverSideTranslations(locale, ["common"])), // подгрузка переводов
    },
    revalidate: 60,
  };
}
