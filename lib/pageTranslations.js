import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "../next-i18next.config";
export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"], i18nConfig)) } };
}
