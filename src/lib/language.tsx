import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en-US" | "ar-SA";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT["en-US"]) => string;
  dir: "ltr" | "rtl";
};

const DICT = {
  "en-US": {
    home: "Home",
    movies: "Movies",
    tv: "TV Shows",
    myList: "My List",
    search: "Search",
    searchPlaceholder: "Search anime & animation…",
    trending: "Trending Now",
    topRated: "Top Rated Anime",
    newReleases: "New Releases",
    animatedMovies: "Animated Movies",
    addToList: "Add to My List",
    inList: "In My List",
    loadMore: "Load More",
    loading: "Loading…",
    error: "Something went wrong. Please try again.",
    empty: "Nothing here yet.",
    noResults: "No results found.",
    overview: "Storyline",
    rating: "Rating",
    genres: "Genres",
    cast: "Cast",
    recommendations: "You may also like",
    play: "Play Now",
    details: "Details",
    allGenres: "All Genres",
    allYears: "All Years",
    clear: "Clear",
    discoverMovies: "Discover the best animated films.",
    discoverTv: "Discover the best anime & animated series.",
    myListEmpty: "Your list is empty. Add titles you love to find them here.",
    remove: "Remove",
    featured: "FEATURED ANIME",
    watchNow: "Watch Now",
    closePlayer: "Close Player",
    seasons: "Seasons",
    episodes: "Episodes",
    season: "Season",
    episode: "Episode",
    nextEpisode: "Next Episode",
    prevEpisode: "Previous Episode",
    server: "Server",
    nowPlaying: "Now Playing",
  },
  "ar-SA": {
    home: "الرئيسية",
    movies: "الأفلام",
    tv: "المسلسلات",
    myList: "قائمتي",
    search: "بحث",
    searchPlaceholder: "ابحث عن الأنمي والرسوم المتحركة…",
    trending: "الأكثر رواجاً",
    topRated: "الأعلى تقييماً",
    newReleases: "أحدث الإصدارات",
    animatedMovies: "أفلام الأنمي",
    addToList: "أضف إلى قائمتي",
    inList: "في قائمتي",
    loadMore: "تحميل المزيد",
    loading: "جارٍ التحميل…",
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    empty: "لا يوجد شيء هنا بعد.",
    noResults: "لا توجد نتائج.",
    overview: "القصة",
    rating: "التقييم",
    genres: "التصنيفات",
    cast: "طاقم العمل",
    recommendations: "قد يعجبك أيضاً",
    play: "تشغيل",
    details: "التفاصيل",
    allGenres: "كل التصنيفات",
    allYears: "كل السنوات",
    clear: "مسح",
    discoverMovies: "اكتشف أفضل أفلام الأنمي والرسوم المتحركة.",
    discoverTv: "اكتشف أفضل مسلسلات الأنمي.",
    myListEmpty: "قائمتك فارغة. أضف العناوين التي تحبها لتجدها هنا.",
    remove: "إزالة",
    featured: "أنمي مميز",
    watchNow: "شاهد الآن",
    closePlayer: "إغلاق المشغل",
    seasons: "المواسم",
    episodes: "الحلقات",
    season: "موسم",
    episode: "حلقة",
    nextEpisode: "الحلقة التالية",
    prevEpisode: "الحلقة السابقة",
    server: "الخادم",
    nowPlaying: "قيد التشغيل",
  },
} as const;

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en-US");

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("animedia:lang") as Lang | null;
      if (stored === "en-US" || stored === "ar-SA") setLangState(stored);
    } catch { }
  }, []);

  // Reflect to <html> element + persist
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "ar-SA" ? "ar" : "en";
      document.documentElement.dir = lang === "ar-SA" ? "rtl" : "ltr";
    }
    try { localStorage.setItem("animedia:lang", lang); } catch { }
  }, [lang]);

  const value: Ctx = {
    lang,
    setLang: setLangState,
    t: (key) => DICT[lang][key],
    dir: lang === "ar-SA" ? "rtl" : "ltr",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}