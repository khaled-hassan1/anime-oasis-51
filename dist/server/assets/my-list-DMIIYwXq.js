import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CLqvgKKB.js";
import { c as createLucideIcon, u as useLanguage, m as motion, H as Heart, L as Link } from "./router-BWQ-Pk1J.js";
import { m as myList } from "./myList-AQCtOnBJ.js";
import { P as Play, I as IMG, S as Star } from "./tmdb-CAXpkaUt.js";
import { A as AnimatePresence } from "./index-DSvXE451.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function MyListPage() {
  const {
    t,
    lang,
    dir
  } = useLanguage();
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const sync = () => setItems(myList.getAll());
    sync();
    window.addEventListener("mylist:change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mylist:change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.35
  }, className: "pt-24 pb-16", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8 mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-7 h-7 text-primary fill-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-black tracking-tight", children: t("myList") })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: t("myListEmpty") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-primary-foreground", style: {
        background: "var(--gradient-primary)",
        boxShadow: "var(--shadow-glow)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" }),
        t("home")
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
      opacity: 0,
      y: 16
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      scale: 0.9
    }, transition: {
      duration: 0.3,
      delay: Math.min(i * 0.02, 0.2)
    }, className: "group relative aspect-[2/3] rounded-xl overflow-hidden bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/watch/$id", params: {
        id: String(m.id)
      }, search: {
        type: m.media_type
      }, className: "block w-full h-full", children: [
        m.poster_path ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMG(m.poster_path, "w500"), alt: m.title, loading: "lazy", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm p-4 text-center", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 start-2 flex items-center gap-1 px-2 py-1 rounded-md glass-solid text-xs font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }),
          m.vote_average.toFixed(1)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm line-clamp-2", children: m.title }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => myList.remove(m.id, m.media_type), className: "absolute top-2 end-2 p-2 rounded-md glass-solid hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-0 group-hover:opacity-100", "aria-label": t("remove"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
    ] }, `${m.media_type}-${m.id}`)) }) }) })
  ] }, lang);
}
export {
  MyListPage as component
};
