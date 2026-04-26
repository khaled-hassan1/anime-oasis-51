const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";

// Don't throw error at import time - handle it gracefully when making API calls
const hasApiKey = Boolean(API_KEY);

if (typeof window !== 'undefined' && !hasApiKey) {
  console.warn("VITE_TMDB_API_KEY is not configured. The app will not function properly. Please add your TMDB API key to the .env file.");
}

export type Lang = "en-US" | "ar-SA";

export const IMG = (path: string | null, size: "w200" | "w300" | "w500" | "w780" | "original" = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export type MediaType = "tv" | "movie";

export interface Media {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: MediaType;
}

async function tmdb<T>(
  path: string,
  params: Record<string, string | number> = {},
  lang: Lang = "en-US"
): Promise<T> {
  if (!hasApiKey) {
    console.warn("Cannot make API request - TMDB API key is not configured");
    // Return empty results structure
    return { results: [] } as T;
  }
  
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", lang);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

// Anime = Animation genre (16) + Japanese origin
const ANIME_TV_PARAMS = {
  with_genres: 16,
  with_original_language: "ja",
  sort_by: "popularity.desc",
};

const ANIMATION_TV_PARAMS = {
  with_genres: 16,
  sort_by: "popularity.desc",
};

export const getTrendingAnime = (lang: Lang = "en-US") =>
  tmdb<{ results: Media[] }>("/discover/tv", { ...ANIME_TV_PARAMS, page: 1 }, lang).then((r) =>
    r.results.map((m) => ({ ...m, media_type: "tv" as const }))
  );

export const getTopRatedAnime = (lang: Lang = "en-US") =>
  tmdb<{ results: Media[] }>(
    "/discover/tv",
    { ...ANIME_TV_PARAMS, sort_by: "vote_average.desc", "vote_count.gte": 100 },
    lang
  ).then((r) => r.results.map((m) => ({ ...m, media_type: "tv" as const })));

export const getNewReleases = (lang: Lang = "en-US") =>
  tmdb<{ results: Media[] }>(
    "/discover/tv",
    {
      ...ANIME_TV_PARAMS,
      sort_by: "first_air_date.desc",
      "first_air_date.lte": new Date().toISOString().split("T")[0],
    },
    lang
  ).then((r) => r.results.map((m) => ({ ...m, media_type: "tv" as const })));

export const getAnimatedMovies = (lang: Lang = "en-US") =>
  tmdb<{ results: Media[] }>(
    "/discover/movie",
    { with_genres: 16, sort_by: "popularity.desc" },
    lang
  ).then((r) =>
    r.results.map((m) => ({ ...m, media_type: "movie" as const }))
  );

export const getAnimationTV = (lang: Lang = "en-US") =>
  tmdb<{ results: Media[] }>("/discover/tv", { ...ANIMATION_TV_PARAMS, page: 1 }, lang).then((r) =>
    r.results.map((m) => ({ ...m, media_type: "tv" as const }))
  );

export const getDetails = (type: MediaType, id: number, lang: Lang = "en-US") =>
  tmdb<any>(`/${type}/${id}`, { append_to_response: "videos,credits,recommendations" }, lang);

export const getSeasonDetails = (tvId: number, seasonNumber: number, lang: Lang = "en-US") =>
  tmdb<any>(`/tv/${tvId}/season/${seasonNumber}`, {}, lang);

// Try TV first, fall back to movie. Useful for /watch/$id where type isn't in the URL.
export const getDetailsAuto = async (id: number, lang: Lang = "en-US") => {
  try {
    const data = await getDetails("tv", id, lang);
    return { type: "tv" as const, data };
  } catch {
    const data = await getDetails("movie", id, lang);
    return { type: "movie" as const, data };
  }
};

export const search = (query: string, lang: Lang = "en-US") =>
  tmdb<{ results: Media[] }>("/search/multi", { query }, lang).then((r) =>
    r.results.filter(
      (m: any) =>
        (m.media_type === "tv" || m.media_type === "movie") &&
        m.genre_ids?.includes(16)
    )
  );

export const discoverByFilters = (params: {
  type: MediaType;
  year?: number;
  genre?: number;
  page?: number;
  lang?: Lang;
}) => {
  const q: Record<string, string | number> = {
    with_genres: params.genre ? `16,${params.genre}` : 16,
    sort_by: "popularity.desc",
    page: params.page ?? 1,
  };
  if (params.year) {
    if (params.type === "tv") q["first_air_date_year"] = params.year;
    else q["primary_release_year"] = params.year;
  }
  return tmdb<{ results: Media[]; total_pages: number; page: number }>(
    `/discover/${params.type}`,
    q,
    params.lang ?? "en-US"
  ).then((r) => ({
    page: r.page,
    total_pages: r.total_pages,
    results: r.results.map((m) => ({ ...m, media_type: params.type })),
  }));
};

export const ANIME_GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
];