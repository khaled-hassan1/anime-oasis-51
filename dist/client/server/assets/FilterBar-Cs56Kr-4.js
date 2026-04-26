import { T as jsxRuntimeExports } from "./worker-entry-2TdCFKDf.js";
import { A as ANIME_GENRES } from "./tmdb-C9zxnJOb.js";
import { u as useLanguage } from "./router-Zht4mv2_.js";
function FilterBar({
  genre,
  year,
  onGenre,
  onYear
}) {
  const { t } = useLanguage();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex flex-wrap gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value: genre ?? "",
        onChange: (e) => onGenre(e.target.value ? Number(e.target.value) : void 0),
        className: "px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-sm font-medium",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("allGenres") }),
          ANIME_GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g.id, children: g.name }, g.id))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value: year ?? "",
        onChange: (e) => onYear(e.target.value ? Number(e.target.value) : void 0),
        className: "px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-sm font-medium",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("allYears") }),
          years.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y))
        ]
      }
    ),
    (genre || year) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          onGenre(void 0);
          onYear(void 0);
        },
        className: "px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition",
        children: t("clear")
      }
    )
  ] });
}
export {
  FilterBar as F
};
