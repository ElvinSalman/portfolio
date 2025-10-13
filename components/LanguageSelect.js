"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import i18n from "i18next";

const LANGUAGES = [
  { code: "en", label: "English", countryCode: "GB" },
  { code: "ru", label: "Русский", countryCode: "RU" },
  { code: "az", label: "Azərbaycanca", countryCode: "AZ" },
];

export default function LanguageSelect() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  useEffect(() => {
    setMounted(true);

    // После монтирования определяем язык
    const lang = LANGUAGES.find((l) => l.code === router.locale) || LANGUAGES[0];
    setCurrentLang(lang);
  }, [router.locale]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    router.push({ pathname, query }, asPath, { locale: code });
    setOpen(false);
  };

  // ✅ Пока компонент не смонтировался, не рендерим вообще ничего
  if (!mounted) return null;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          width: "150px",
          height: "40px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "0 10px",
          background: "#fff",
          cursor: "pointer",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          fontSize: "14px",
        }}
      >
        <ReactCountryFlag
          countryCode={currentLang.countryCode}
          svg
          style={{ width: "22px", height: "22px", borderRadius: "3px" }}
        />
        <span style={{ flex: 1, textAlign: "center" }}>{currentLang.label}</span>
        <Globe size={16} style={{ opacity: 0.7 }} />
      </button>

      {open && (
        <ul
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "150px",
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: "12px",
            listStyle: "none",
            padding: 0,
            margin: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 10,
            animation: "fadeIn 0.2s ease",
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
  );
}
