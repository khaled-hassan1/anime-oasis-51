import { c as createLucideIcon } from "./router-Zht4mv2_.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const API_KEY = "c11da6e9f5f8b8907c3456fcec009196";
const BASE_URL = "https://api.themoviedb.org/3";
const hasApiKey = Boolean(API_KEY);
if (typeof window !== "undefined" && !hasApiKey) {
  console.warn("VITE_TMDB_API_KEY is not configured. The app will not function properly. Please add your TMDB API key to the .env file.");
}
const IMG = (path, size = "w500") => path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
async function tmdb(path, params = {}, lang = "en-US") {
  if (!hasApiKey) {
    console.warn("Cannot make API request - TMDB API key is not configured");
    return { results: [] };
  }
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", lang);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}
const ANIME_TV_PARAMS = {
  with_genres: 16,
  with_original_language: "ja",
  sort_by: "popularity.desc"
};
const getTrendingAnime = (lang = "en-US") => tmdb("/discover/tv", { ...ANIME_TV_PARAMS, page: 1 }, lang).then(
  (r) => r.results.map((m) => ({ ...m, media_type: "tv" }))
);
const getTopRatedAnime = (lang = "en-US") => tmdb(
  "/discover/tv",
  { ...ANIME_TV_PARAMS, sort_by: "vote_average.desc", "vote_count.gte": 100 },
  lang
).then((r) => r.results.map((m) => ({ ...m, media_type: "tv" })));
const getNewReleases = (lang = "en-US") => tmdb(
  "/discover/tv",
  {
    ...ANIME_TV_PARAMS,
    sort_by: "first_air_date.desc",
    "first_air_date.lte": (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  },
  lang
).then((r) => r.results.map((m) => ({ ...m, media_type: "tv" })));
const getAnimatedMovies = (lang = "en-US") => tmdb(
  "/discover/movie",
  { with_genres: 16, sort_by: "popularity.desc" },
  lang
).then(
  (r) => r.results.map((m) => ({ ...m, media_type: "movie" }))
);
const getDetails = (type, id, lang = "en-US") => tmdb(`/${type}/${id}`, { append_to_response: "videos,credits,recommendations" }, lang);
const getSeasonDetails = (tvId, seasonNumber, lang = "en-US") => tmdb(`/tv/${tvId}/season/${seasonNumber}`, {}, lang);
const getDetailsAuto = async (id, lang = "en-US") => {
  try {
    const data = await getDetails("tv", id, lang);
    return { type: "tv", data };
  } catch {
    const data = await getDetails("movie", id, lang);
    return { type: "movie", data };
  }
};
const search = (query, lang = "en-US") => tmdb("/search/multi", { query }, lang).then(
  (r) => r.results.filter(
    (m) => (m.media_type === "tv" || m.media_type === "movie") && m.genre_ids?.includes(16)
  )
);
const discoverByFilters = (params) => {
  const q = {
    with_genres: params.genre ? `16,${params.genre}` : 16,
    sort_by: "popularity.desc",
    page: params.page ?? 1
  };
  if (params.year) {
    if (params.type === "tv") q["first_air_date_year"] = params.year;
    else q["primary_release_year"] = params.year;
  }
  return tmdb(
    `/discover/${params.type}`,
    q,
    params.lang ?? "en-US"
  ).then((r) => ({
    page: r.page,
    total_pages: r.total_pages,
    results: r.results.map((m) => ({ ...m, media_type: params.type }))
  }));
};
const ANIME_GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi & Fantasy" }
];
export {
  ANIME_GENRES as A,
  IMG as I,
  Play as P,
  Star as S,
  getTrendingAnime as a,
  getTopRatedAnime as b,
  getNewReleases as c,
  discoverByFilters as d,
  getAnimatedMovies as e,
  getSeasonDetails as f,
  getDetails as g,
  getDetailsAuto as h,
  search as s
};
