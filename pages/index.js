import ContainerBlock from "../components/ContainerBlock";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Elvin Salmanov - Developer, Writer, Creator"
      description="A modern portfolio showcasing my journey as a software developer."
    >
      <Hero />
      <FavouriteProjects />
      <LatestCode repositories={repositories} />
    </ContainerBlock>
  );
}

// Подгружаем переводы на этапе сборки
export async function getStaticProps({ locale }) {
  const token = process.env.GITHUB_AUTH_TOKEN;
  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
