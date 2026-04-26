import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CKMMbsXz.js";
import { F as FilterBar } from "./FilterBar-CmJyKAtj.js";
import { M as MediaGrid } from "./MediaGrid-1mLGZdc1.js";
import { d as discoverByFilters } from "./tmdb-BpKqFkOO.js";
import { u as useLanguage, m as motion } from "./router-B6-WEqMk.js";
import { L as LoaderCircle } from "./loader-circle-DKFhMDxw.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./MediaCard-Ct51KRxv.js";
function MoviesPage() {
  const {
    lang,
    t
  } = useLanguage();
  const [items, setItems] = reactExports.useState();
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [loadingMore, setLoadingMore] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const [genre, setGenre] = reactExports.useState();
  const [year, setYear] = reactExports.useState();
  reactExports.useEffect(() => {
    let cancelled = false;
    setItems(void 0);
    setError(false);
    setPage(1);
    discoverByFilters({
      type: "movie",
      genre,
      year,
      page: 1,
      lang
    }).then((r) => {
      if (cancelled) return;
      setItems(r.results);
      setTotalPages(r.total_pages);
    }).catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [genre, year, lang]);
  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    try {
      const next = page + 1;
      const r = await discoverByFilters({
        type: "movie",
        genre,
        year,
        page: next,
        lang
      });
      setItems((prev) => [...prev ?? [], ...r.results]);
      setPage(r.page);
      setTotalPages(r.total_pages);
    } catch {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.35
  }, className: "pt-24 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-black tracking-tight mb-2", children: t("movies") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("discoverMovies") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBar, { genre, year, onGenre: setGenre, onYear: setYear }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaGrid, { items, loading: !items || loadingMore }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-destructive mt-6", children: t("error") }),
    items && items.length === 0 && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground mt-6", children: t("noResults") }),
    items && items.length > 0 && page < totalPages && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: loadMore, disabled: loadingMore, className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60", style: {
      background: "var(--gradient-primary)",
      boxShadow: "var(--shadow-glow)"
    }, children: [
      loadingMore && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
      t("loadMore")
    ] }) })
  ] }, lang);
}
export {
  MoviesPage as component
};
