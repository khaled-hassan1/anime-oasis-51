import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { search, type Media } from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";
import { MediaGrid } from "@/components/MediaGrid";

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Animedia — عالم الأنمي والرسوم المتحركة" },
      { name: "description", content: "استمتع بمشاهدة أحدث حلقات الأنمي والأفلام العالمية بجودة عالية وسيرفرات سريعة." },
      { property: "og:title", content: "Animedia — وجهتك الأولى للأنمي" },
      { property: "og:description", content: "شاهد أفلامك ومسلسلاتك المفضلة في مكان واحد مع تجربة مشاهدة فريدة." },
      { property: "og:image", content: "/og-image.png" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { lang, t, dir } = useLanguage();
  const [query, setQuery] = useState(q ?? "");
  const [results, setResults] = useState<Media[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Sync URL -> input when user navigates
  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  // Debounced search
  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults(undefined);
      setError(false);
      return;
    }
    setLoading(true);
    setError(false);
    const handle = setTimeout(() => {
      search(term, lang)
        .then((r) => setResults(r))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, 350);
    return () => clearTimeout(handle);
  }, [query, lang]);

  // Reflect query into URL (replace, no history spam)
  useEffect(() => {
    const term = query.trim();
    navigate({ search: term ? { q: term } : {}, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <motion.div
      key={lang}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-24 pb-16"
      dir={dir}
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          {t("search")}
        </h1>
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 start-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full ps-12 pe-4 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none text-base"
          />
          {loading && (
            <Loader2 className="w-5 h-5 absolute top-1/2 -translate-y-1/2 end-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      {error && <p className="text-center text-destructive mb-4">{t("error")}</p>}

      {query.trim() === "" ? (
        <p className="text-center text-muted-foreground">{t("searchPlaceholder")}</p>
      ) : results && results.length === 0 && !loading ? (
        <p className="text-center text-muted-foreground">{t("noResults")}</p>
      ) : (
        <MediaGrid items={results} loading={loading && !results} />
      )}
    </motion.div>
  );
}
