import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
export default function LanguageSelect() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function changeLanguage(event) {
    setLoading(true);
    setError(false);
    try {
      await router.push(
        { pathname: router.pathname, query: router.query },
        router.asPath,
        { locale: event.target.value },
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <select
        className="language-select"
        aria-label={t("language")}
        value={router.locale}
        onChange={changeLanguage}
        disabled={loading}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="az">Azərbaycanca</option>
      </select>
      {error && <span role="alert">{t("languageError")}</span>}
    </div>
  );
}
