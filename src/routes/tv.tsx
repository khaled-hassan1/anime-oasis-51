import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { MediaGrid } from "@/components/MediaGrid";
import { discoverByFilters, type Media } from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/tv")({
  head: () => ({
    meta: [
      { title: "Animedia — عالم الأنمي والرسوم المتحركة" },
      { name: "description", content: "استمتع بمشاهدة أحدث حلقات الأنمي والأفلام العالمية بجودة عالية وسيرفرات سريعة." },
      { property: "og:title", content: "Animedia — وجهتك الأولى للأنمي" },
      { property: "og:description", content: "شاهد أفلامك ومسلسلاتك المفضلة في مكان واحد مع تجربة مشاهدة فريدة." },
      { property: "og:image", content: "/og-image.png" },
    ],
  }),
  component: TvPage,
});

function TvPage() {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<Media[]>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [genre, setGenre] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();

  useEffect(() => {
    let cancelled = false;
    setItems(undefined);
    setError(false);
    setPage(1);
    discoverByFilters({ type: "tv", genre, year, page: 1, lang })
      .then((r) => {
        if (cancelled) return;
        setItems(r.results);
        setTotalPages(r.total_pages);
      })
      .catch(() => !cancelled && setError(true));
    return () => { cancelled = true; };
  }, [genre, year, lang]);

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    try {
      const next = page + 1;
      const r = await discoverByFilters({ type: "tv", genre, year, page: next, lang });
      setItems((prev) => [...(prev ?? []), ...r.results]);
      setPage(r.page);
      setTotalPages(r.total_pages);
    } catch {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <motion.div
      key={lang}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-24 pb-12"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{t("tv")}</h1>
        <p className="text-muted-foreground">{t("discoverTv")}</p>
      </div>
      <FilterBar genre={genre} year={year} onGenre={setGenre} onYear={setYear} />
      <MediaGrid items={items} loading={!items || loadingMore} />
      {error && <p className="text-center text-destructive mt-6">{t("error")}</p>}
      {items && items.length === 0 && !error && (
        <p className="text-center text-muted-foreground mt-6">{t("noResults")}</p>
      )}
      {items && items.length > 0 && page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("loadMore")}
          </button>
        </div>
      )}
    </motion.div>
  );
}
