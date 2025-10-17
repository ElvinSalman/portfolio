"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Globe, Loader2 } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import i18n from "../lib/i18n";

const LANGUAGES = [
  { code: "en", label: "English", countryCode: "GB" },
  { code: "ru", label: "Русский", countryCode: "RU" },
  { code: "az", label: "Azərbaycanca", countryCode: "AZ" },
];

export default function LanguageSelect() {
  const router = useRouter();
  const { pathname, query, asPath, locale } = router;

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  // ✅ Синхронизация с URL (если в ссылке /az, /ru, /en — обновляем селект)
  useEffect(() => {
    if (!router.isReady) return;

    const pathLang = asPath.split("/")[1]; // первый сегмент URL
    const detectedLang =
      LANGUAGES.find((l) => l.code === pathLang) ||
      LANGUAGES.find((l) => l.code === locale) ||
      LANGUAGES[0];

    setCurrentLang(detectedLang);
    localStorage.setItem("lang", detectedLang.code);

    if (i18n.language !== detectedLang.code) {
      i18n.changeLanguage(detectedLang.code);
    }

    setMounted(true);
  }, [asPath, locale, router.isReady]);

  const changeLanguage = async (code) => {
    if (loading) return;
    const lang = LANGUAGES.find((l) => l.code === code);
    if (!lang) return;

    setLoading(true);

    try {
      // Меняем язык в i18next
      await i18n.changeLanguage(code);
      // Сохраняем в localStorage
      localStorage.setItem("lang", code);
      // Обновляем URL с новой локалью
      await router.push({ pathname, query }, asPath, { locale: code });
      setCurrentLang(lang);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* 🌀 Фуллскрин загрузка при смене языка */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Loader2
            size={60}
            className="animate-spin"
            style={{ color: "#3b82f6" }}
          />
        </div>
      )}

      {/* Выпадающий список */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            width: "170px",
            height: "40px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "0 10px",
            background: "#fff",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            fontSize: "14px",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          <ReactCountryFlag
            countryCode={currentLang.countryCode}
            svg
            style={{ width: "22px", height: "22px", borderRadius: "3px" }}
          />
          <span style={{ flex: 1, textAlign: "center" }}>
            {currentLang.label}
          </span>
          <Globe size={16} style={{ opacity: 0.7 }} />
        </button>

        {open && (
          <ul
            style={{
              position: "absolute",
              overflow: "hidden",
              top: "110%",
              left: 0,
              width: "170px",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "12px",
              listStyle: "none",
              padding: 0,
              margin: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 10,
              animation: "fadeIn 0.2s ease",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            {LANGUAGES.map((lang) => (
              <li
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  background:
                    currentLang.code === lang.code ? "#f3f4f6" : "transparent",
                }}
              >
                <ReactCountryFlag
                  countryCode={lang.countryCode}
                  svg
                  style={{ width: "22px", height: "22px", borderRadius: "3px" }}
                />
                <span>{lang.label}</span>
              </li>
            ))}
          </ul>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
