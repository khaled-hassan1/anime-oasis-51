import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles, Menu, X, Languages, Heart } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("home") },
    { to: "/movies", label: t("movies") },
    { to: "/tv", label: t("tv") },
    { to: "/my-list", label: t("myList") },
  ] as const;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate({ to: "/search", search: { q } });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass-solid border-b border-border/50" : "glass"
        }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center gap-3 md:gap-6 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div
          >
            {/* استبدلنا Sparkles بصورة اللوجو الجديد */}
            <img
              src="logo-icon.png"
              alt="Animedia Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tight hidden sm:block uppercase">
            ANIME<span className="text-gradient">DIA</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Search bar - desktop */}
        <form onSubmit={onSubmit} className="hidden md:flex flex-1 max-w-md ms-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full ps-10 pe-3 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-sm"
              aria-label={t("search")}
            />
          </div>
        </form>

        <div className="flex items-center gap-2 ms-auto md:ms-0">
          <button
            onClick={() => setLang(lang === "en-US" ? "ar-SA" : "en-US")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm font-bold"
            aria-label="Toggle language"
            title={lang === "en-US" ? "العربية" : "English"}
          >
            <Languages className="w-4 h-4" />
            <span>{lang === "en-US" ? "EN" : "AR"}</span>
          </button>
          <Link
            to="/my-list"
            className="hidden sm:inline-flex p-2.5 rounded-lg hover:bg-secondary transition-colors"
            aria-label={t("myList")}
          >
            <Heart className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2.5 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden glass-solid border-t border-border/50 overflow-hidden"
        >
          <div className="px-4 py-3 flex flex-col gap-2">
            <form onSubmit={onSubmit}>
              <div className="relative">
                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full ps-10 pe-3 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-sm"
                />
              </div>
            </form>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-4 py-3 rounded-lg text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
