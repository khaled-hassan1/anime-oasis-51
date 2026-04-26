import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-2TdCFKDf.js";
import { c as createLucideIcon, u as useLanguage, m as motion, X, b as Route, L as Link, H as Heart } from "./router-Zht4mv2_.js";
import { f as getSeasonDetails, I as IMG, P as Play, S as Star, g as getDetails, h as getDetailsAuto } from "./tmdb-C9zxnJOb.js";
import { m as myList } from "./myList-AQCtOnBJ.js";
import { C as Calendar, a as MediaCard } from "./MediaCard-CiEZrhkq.js";
import { A as AnimatePresence } from "./index-BiOrfjL3.js";
import { L as LoaderCircle } from "./loader-circle-C9_Sq5wd.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
      key: "kmsa83"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$1);
const __iconNode = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode);
const SERVERS = [
  "vidsrcme.ru",
  "vidsrcme.su",
  "vidsrc-me.ru",
  "vidsrc-me.su",
  "vidsrc-embed.ru",
  "vidsrc-embed.su",
  "vsrc.su"
];
function VidSrcPlayer({ type, id, season, episode, onClose }) {
  const { t } = useLanguage();
  const [server, setServer] = reactExports.useState("vidsrcme.ru");
  const url = type === "movie" ? `https://${server}/embed/movie/${id}` : `https://${server}/embed/tv/${id}/${season ?? 1}/${episode ?? 1}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 md:p-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm overflow-x-auto no-scrollbar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground hidden sm:inline whitespace-nowrap", children: [
              t("server"),
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: SERVERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setServer(s),
                className: `px-3 py-1 rounded-md text-[10px] md:text-xs font-semibold transition whitespace-nowrap ${server === s ? "bg-primary text-primary-foreground" : "glass border border-border hover:bg-secondary"}`,
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: onClose,
              className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg glass-solid text-sm font-medium hover:bg-secondary shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("closePlayer") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-2 pb-4 md:px-6 md:pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full max-w-[1600px] mx-auto aspect-video md:aspect-auto md:h-full rounded-xl overflow-hidden bg-black border border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: url,
            title: "Player",
            allow: "autoplay; fullscreen; encrypted-media; picture-in-picture",
            allowFullScreen: true,
            referrerPolicy: "no-referrer",
            className: "w-full h-full"
          },
          url
        ) }) })
      ]
    }
  ) });
}
function EpisodeList({ tvId, seasons, activeSeason, activeEpisode, onSelect }) {
  const { lang, t } = useLanguage();
  const [episodes, setEpisodes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const validSeasons = seasons.filter((s) => s.season_number > 0);
  const seasonsToShow = validSeasons.length ? validSeasons : seasons;
  reactExports.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getSeasonDetails(tvId, activeSeason, lang).then((d) => {
      if (!cancelled) setEpisodes(d.episodes ?? []);
    }).catch(() => {
      if (!cancelled) setEpisodes([]);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [tvId, activeSeason, lang]);
  const currentIdx = episodes.findIndex((e) => e.episode_number === activeEpisode);
  const prevEp = currentIdx > 0 ? episodes[currentIdx - 1] : null;
  const nextEp = currentIdx >= 0 && currentIdx < episodes.length - 1 ? episodes[currentIdx + 1] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-3", children: t("seasons") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin", children: seasonsToShow.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onSelect(s.season_number, 1),
          className: `shrink-0 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${s.season_number === activeSeason ? "bg-primary text-primary-foreground shadow-lg" : "glass border border-border hover:bg-secondary"}`,
          children: [
            s.name,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70 ms-1 font-normal", children: [
              "(",
              s.episode_count,
              ")"
            ] })
          ]
        },
        s.id
      )) })
    ] }),
    (prevEp || nextEp) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: !prevEp,
          onClick: () => prevEp && onSelect(activeSeason, prevEp.episode_number),
          className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg glass border border-border text-sm font-medium hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 rtl:rotate-180" }),
            t("prevEpisode")
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: !nextEp,
          onClick: () => nextEp && onSelect(activeSeason, nextEp.episode_number),
          className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg glass border border-border text-sm font-medium hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed",
          children: [
            t("nextEpisode"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rtl:rotate-180" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black mb-3", children: [
        t("episodes"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
          "(",
          episodes.length,
          ")"
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        episodes.map((ep, i) => {
          const isActive = ep.episode_number === activeEpisode;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.25, delay: Math.min(i * 0.02, 0.3) },
              onClick: () => onSelect(activeSeason, ep.episode_number),
              className: `group flex gap-3 md:gap-4 p-2 md:p-3 rounded-xl text-start transition-all border ${isActive ? "bg-primary/10 border-primary shadow-lg" : "border-border/40 hover:bg-secondary/50 hover:border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 w-32 md:w-44 aspect-video rounded-lg overflow-hidden bg-card", children: [
                  ep.still_path ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: IMG(ep.still_path, "w300"),
                      alt: ep.name,
                      loading: "lazy",
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-secondary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white fill-white" }) }),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 h-1 bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-1/3 bg-primary-foreground/60" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`, children: isActive ? t("nowPlaying") : `E${ep.episode_number}` }),
                    ep.runtime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "• ",
                      ep.runtime,
                      "m"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm md:text-base line-clamp-1", children: ep.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1", children: ep.overview || "—" })
                ] })
              ]
            },
            ep.id
          );
        }),
        !episodes.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: t("empty") })
      ] })
    ] })
  ] });
}
function WatchPage() {
  const {
    id
  } = Route.useParams();
  const {
    type: typeParam
  } = Route.useSearch();
  const {
    lang,
    t,
    dir
  } = useLanguage();
  const [data, setData] = reactExports.useState();
  const [type, setType] = reactExports.useState(typeParam);
  const [error, setError] = reactExports.useState(false);
  const [, force] = reactExports.useState(0);
  const [playerOpen, setPlayerOpen] = reactExports.useState(false);
  const [activeSeason, setActiveSeason] = reactExports.useState(1);
  const [activeEpisode, setActiveEpisode] = reactExports.useState(1);
  const numericId = Number(id);
  reactExports.useEffect(() => {
    let cancelled = false;
    setData(void 0);
    setError(false);
    const load = async () => {
      try {
        if (typeParam) {
          const d = await getDetails(typeParam, numericId, lang);
          if (!cancelled) {
            setData(d);
            setType(typeParam);
          }
        } else {
          const r = await getDetailsAuto(numericId, lang);
          if (!cancelled) {
            setData(r.data);
            setType(r.type);
          }
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [numericId, typeParam, lang]);
  reactExports.useEffect(() => {
    if (data && type === "tv" && Array.isArray(data.seasons)) {
      const valid = data.seasons.filter((s) => s.season_number > 0);
      const first = valid[0]?.season_number ?? data.seasons[0]?.season_number ?? 1;
      setActiveSeason(first);
      setActiveEpisode(1);
    }
  }, [data, type]);
  reactExports.useEffect(() => {
    const onChange = () => force((n) => n + 1);
    window.addEventListener("mylist:change", onChange);
    return () => window.removeEventListener("mylist:change", onChange);
  }, []);
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-32 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive mb-4", children: t("error") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline", children: t("home") })
    ] });
  }
  if (!data || !type) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-32 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) });
  }
  const title = data.title || data.name || "Untitled";
  const year = (data.release_date || data.first_air_date || "").slice(0, 4);
  const trailer = data.videos?.results?.find((v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
  const cast = (data.credits?.cast ?? []).slice(0, 12);
  const recs = (data.recommendations?.results ?? []).slice(0, 12);
  const inList = myList.has(numericId, type);
  const toggleList = () => {
    if (inList) {
      myList.remove(numericId, type);
    } else {
      const item = {
        id: numericId,
        media_type: type,
        title,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average ?? 0,
        overview: data.overview ?? "",
        release_date: data.release_date,
        first_air_date: data.first_air_date
      };
      myList.add(item);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, transition: {
    duration: 0.4
  }, dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[55vh] md:h-[75vh] overflow-hidden", children: [
      data.backdrop_path && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMG(data.backdrop_path, "original"), alt: title, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-24 start-4 md:start-8 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg glass-solid text-sm font-medium hover:bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rtl:rotate-180" }),
        t("home")
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative -mt-32 md:-mt-48 z-10 max-w-[1600px] mx-auto px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[2fr_1fr] gap-6 md:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl", children: trailer ? /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: `https://www.youtube.com/embed/${trailer.key}?rel=0`, title: `${title} trailer`, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "w-full h-full" }, trailer.key) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-12 h-12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("noResults") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPlayerOpen(true), className: "mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:scale-[1.01] transition-all shadow-lg shadow-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6" }),
            t("watchNow"),
            type === "tv" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium opacity-80 ms-2", children: [
              "S",
              activeSeason,
              " · E",
              activeEpisode
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-black tracking-tight leading-tight", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: (data.vote_average ?? 0).toFixed(1) })
            ] }),
            year && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              " ",
              year
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded border border-border", children: "HD" })
          ] }),
          data.genres?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: t("genres") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.genres.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full text-xs font-semibold glass border border-border", children: g.name }, g.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: t("overview") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base leading-relaxed text-foreground/90", children: data.overview || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleList, className: `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] ${inList ? "bg-primary text-primary-foreground" : "glass border border-border hover:bg-secondary"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-5 h-5 ${inList ? "fill-current" : ""}` }),
            inList ? t("inList") : t("addToList")
          ] })
        ] })
      ] }),
      cast.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-4", children: t("cast") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4", children: cast.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-card mb-2", children: c.profile_path ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMG(c.profile_path, "w300"), alt: c.name, loading: "lazy", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold line-clamp-1", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: c.character })
        ] }, c.cast_id ?? c.credit_id)) })
      ] }),
      type === "tv" && Array.isArray(data.seasons) && data.seasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EpisodeList, { tvId: numericId, seasons: data.seasons, activeSeason, activeEpisode, onSelect: (s, e) => {
        setActiveSeason(s);
        setActiveEpisode(e);
        setPlayerOpen(true);
      } }) }),
      recs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-4", children: t("recommendations") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4", children: recs.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MediaCard, { media: {
          ...r,
          media_type: type
        }, index: i }, r.id)) }) })
      ] })
    ] }),
    playerOpen && type && /* @__PURE__ */ jsxRuntimeExports.jsx(VidSrcPlayer, { type, id: numericId, season: activeSeason, episode: activeEpisode, onClose: () => setPlayerOpen(false) })
  ] }, `${lang}-${id}`);
}
export {
  WatchPage as component
};
