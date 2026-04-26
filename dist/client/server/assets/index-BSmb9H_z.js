import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CKMMbsXz.js";
import { c as createLucideIcon, m as motion, L as Link, u as useLanguage } from "./router-B6-WEqMk.js";
import { I as IMG, S as Star, P as Play, g as getDetails, a as getTrendingAnime, b as getTopRatedAnime, c as getNewReleases, e as getAnimatedMovies } from "./tmdb-BpKqFkOO.js";
import { A as AnimatePresence } from "./index-Dyya3tGO.js";
import { M as MediaCardSkeleton, a as MediaCard } from "./MediaCard-Ct51KRxv.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function Hero({ items }) {
  const [idx, setIdx] = reactExports.useState(0);
  const slides = items.slice(0, 5);
  reactExports.useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6e3);
    return () => clearInterval(t);
  }, [slides.length]);
  if (slides.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[70vh] md:h-[85vh] shimmer" });
  }
  const current = slides[idx];
  const title = current.title || current.name || "";
  const year = (current.release_date || current.first_air_date || "").slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[75vh] md:h-[90vh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 1.05 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1 },
        className: "absolute inset-0",
        children: [
          current.backdrop_path && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: IMG(current.backdrop_path, "original"),
              alt: title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: { background: "var(--gradient-hero)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" })
        ]
      },
      current.id
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 h-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-end md:items-center pb-20 md:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.6 },
        className: "max-w-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-xs font-bold mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
            "FEATURED ANIME"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[0.95]", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4 text-sm font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: current.vote_average.toFixed(1) })
            ] }),
            year && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded border border-border", children: "HD" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground line-clamp-3 mb-6 max-w-xl", children: current.overview }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/watch/$id",
                params: { id: String(current.id) },
                search: { type: "tv" },
                className: "inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-xl font-bold text-primary-foreground transition-transform hover:scale-105",
                style: { background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 fill-current" }),
                  "Play Now"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/watch/$id",
                params: { id: String(current.id) },
                search: { type: "tv" },
                className: "inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-xl font-bold glass border border-border hover:bg-secondary transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5" }),
                  "Details"
                ]
              }
            )
          ] })
        ]
      },
      current.id
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 right-4 md:right-8 z-10 flex gap-2", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setIdx(i),
        "aria-label": `Slide ${i + 1}`,
        className: `h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-4 bg-muted-foreground/40"}`
      },
      i
    )) })
  ] });
}
function MediaRow({
  title,
  items,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-6 md:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4", children: loading || !items ? Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MediaCardSkeleton, {}, i)) : items.slice(0, 12).map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MediaCard, { media: m, index: i }, m.id)) })
  ] }) });
}
const FEATURED_ANIME_IDS = [
  318774,
  // One Piece
  95479,
  // Jujutsu Kaisen
  30983,
  // Detective Conan
  46260,
  // Naruto
  31910,
  // Naruto ship
  12971,
  // Dragon Ball Z
  127532,
  // Solo Leveling
  46298,
  // Hunter x Hunter
  30984,
  // Bleach
  9026,
  // Yu-Gi-Oh! Duel Monsters
  1429,
  // Attack on Titan
  85937
  // Demon Slayer
];
function HomePage() {
  const {
    lang,
    t
  } = useLanguage();
  const [featured, setFeatured] = reactExports.useState([]);
  const [trending, setTrending] = reactExports.useState();
  const [topRated, setTopRated] = reactExports.useState();
  const [newReleases, setNewReleases] = reactExports.useState();
  const [movies, setMovies] = reactExports.useState();
  reactExports.useEffect(() => {
    setFeatured([]);
    setTrending(void 0);
    setTopRated(void 0);
    setNewReleases(void 0);
    setMovies(void 0);
    Promise.all(FEATURED_ANIME_IDS.map((id) => getDetails("tv", id, lang).catch((err) => {
      console.error(`Error fetching ID ${id}:`, err);
      return null;
    }))).then((results) => {
      const validData = results.filter((item) => item !== null);
      console.log("Featured Data Loaded:", validData);
      setFeatured(validData);
    }).catch((err) => console.error("General Promise.all error:", err));
    getTrendingAnime(lang).then(setTrending).catch(() => setTrending([]));
    getTopRatedAnime(lang).then(setTopRated).catch(() => setTopRated([]));
    getNewReleases(lang).then(setNewReleases).catch(() => setNewReleases([]));
    getAnimatedMovies(lang).then(setMovies).catch(() => setMovies([]));
  }, [lang]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    featured && featured.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { items: featured }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[75vh] md:h-[90vh] shimmer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaRow, { title: t("trending"), items: trending, loading: !trending }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaRow, { title: t("topRated"), items: topRated, loading: !topRated }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaRow, { title: t("newReleases"), items: newReleases, loading: !newReleases }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaRow, { title: t("animatedMovies"), items: movies, loading: !movies })
  ] });
}
export {
  HomePage as component
};
