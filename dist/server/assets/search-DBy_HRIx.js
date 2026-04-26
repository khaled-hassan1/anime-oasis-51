import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CLqvgKKB.js";
import { R as Route, a as useNavigate, u as useLanguage, m as motion, S as Search } from "./router-BWQ-Pk1J.js";
import { s as search } from "./tmdb-CAXpkaUt.js";
import { M as MediaGrid } from "./MediaGrid-GaSyHnnM.js";
import { L as LoaderCircle } from "./loader-circle-D4xi6Tfs.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./MediaCard-BAWr5jVj.js";
function SearchPage() {
  const {
    q
  } = Route.useSearch();
  const navigate = useNavigate({
    from: "/search"
  });
  const {
    lang,
    t,
    dir
  } = useLanguage();
  const [query, setQuery] = reactExports.useState(q ?? "");
  const [results, setResults] = reactExports.useState();
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setQuery(q ?? "");
  }, [q]);
  reactExports.useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults(void 0);
      setError(false);
      return;
    }
    setLoading(true);
    setError(false);
    const handle = setTimeout(() => {
      search(term, lang).then((r) => setResults(r)).catch(() => setError(true)).finally(() => setLoading(false));
    }, 350);
    return () => clearTimeout(handle);
  }, [query, lang]);
  reactExports.useEffect(() => {
    const term = query.trim();
    navigate({
      search: term ? {
        q: term
      } : {},
      replace: true
    });
  }, [query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.35
  }, className: "pt-24 pb-16", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 md:px-8 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-black tracking-tight mb-4", children: t("search") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 absolute top-1/2 -translate-y-1/2 start-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: t("searchPlaceholder"), className: "w-full ps-12 pe-4 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none text-base" }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 absolute top-1/2 -translate-y-1/2 end-4 animate-spin text-muted-foreground" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-destructive mb-4", children: t("error") }),
    query.trim() === "" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: t("searchPlaceholder") }) : results && results.length === 0 && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: t("noResults") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MediaGrid, { items: results, loading: loading && !results })
  ] }, lang);
}
export {
  SearchPage as component
};
