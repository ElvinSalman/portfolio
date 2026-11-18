import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import { getStaticProps as getTranslations } from "../lib/pageTranslations";

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Elvin Salmanov - Developer, Writer, Creator"
      description="A modern portfolio showcasing my journey as a software developer, featuring my projects, experience, and passion for creating innovative web solutions."
    >
      <Hero />
      <FavouriteProjects />
      <LatestCode repositories={repositories} />
    </ContainerBlock>
  );
}

export async function getStaticProps({ locale }) {
  const token = process.env.GITHUB_AUTH_TOKEN;
  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories,
      ...(await getTranslations({ locale })).props,
    },
    revalidate: 60,
  };
}
