import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTranslation } from "next-i18next";
import LanguageSelect from "./LanguageSelect";
export default function Navbar() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [router.asPath, router.locale]);
  return (
    <header className="site-header">
      <nav
        className="navigation"
        aria-label={t("navigation")}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <Link href="/" className="brand">
          <strong>{t("name")}</strong>
          <span>{t("designation")}</span>
        </Link>
        <div className="nav-controls">
          <LanguageSelect />
          <button
            type="button"
            className="icon-button"
            aria-label={t("toggleTheme")}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            disabled={!mounted}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
          <button
            ref={toggle}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="navigation-links"
            aria-label={t(open ? "closeMenu" : "openMenu")}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div
          id="navigation-links"
          className={"nav-links " + (open ? "is-open" : "")}
        >
          {["about", "experience", "projects", "contact"].map((page) => (
            <Link
              key={page}
              href={"/" + page}
              aria-current={router.pathname === "/" + page ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t(page)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
