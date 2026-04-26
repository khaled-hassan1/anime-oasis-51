import { T as jsxRuntimeExports } from "./worker-entry-CLqvgKKB.js";
import { M as MediaCardSkeleton, a as MediaCard } from "./MediaCard-BAWr5jVj.js";
function MediaGrid({
  items,
  loading,
  skeletonCount = 12
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4", children: [
    loading && (!items || items.length === 0) ? Array.from({ length: skeletonCount }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MediaCardSkeleton, {}, `s-${i}`)) : items?.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MediaCard, { media: m, index: i }, `${m.media_type}-${m.id}`)),
    loading && items && items.length > 0 && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MediaCardSkeleton, {}, `ls-${i}`))
  ] }) });
}
export {
  MediaGrid as M
};
