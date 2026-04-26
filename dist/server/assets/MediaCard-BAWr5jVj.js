import { T as jsxRuntimeExports } from "./worker-entry-CLqvgKKB.js";
import { c as createLucideIcon, m as motion, L as Link } from "./router-BWQ-Pk1J.js";
import { I as IMG, S as Star, P as Play } from "./tmdb-CAXpkaUt.js";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function MediaCard({ media, index = 0 }) {
  const title = media.title || media.name || "Untitled";
  const year = (media.release_date || media.first_air_date || "").slice(0, 4);
  const type = media.media_type || "tv";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: Math.min(index * 0.03, 0.3) },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/watch/$id",
          params: { id: String(media.id) },
          search: { type },
          className: "group block relative aspect-[2/3] rounded-xl overflow-hidden bg-card hover:z-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl",
          style: { ["--tw-shadow-color"]: "var(--primary)" },
          children: [
            media.poster_path ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: IMG(media.poster_path, "w500"),
                alt: title,
                loading: "lazy",
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm p-4 text-center", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md glass-solid text-xs font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }),
              media.vote_average.toFixed(1)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm leading-tight line-clamp-2 mb-1", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-2", children: year && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                year
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-3 mb-2", children: media.overview }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-semibold text-primary-foreground px-2 py-1.5 rounded-md w-fit", style: { background: "var(--gradient-primary)" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 fill-current" }),
                "Watch"
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function MediaCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] rounded-xl shimmer" });
}
export {
  Calendar as C,
  MediaCardSkeleton as M,
  MediaCard as a
};
