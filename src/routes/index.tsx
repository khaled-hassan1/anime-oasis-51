import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { MediaRow } from "@/components/MediaRow";
import {
  getTrendingAnime,
  getTopRatedAnime,
  getNewReleases,
  getAnimatedMovies,
  getDetails, // تأكد من استيراد هذه الدالة لجلب تفاصيل الأنميات المحددة
  type Media,
} from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";

// قائمة الـ IDs للأنميات التي طلبتها (One Piece, Naruto, Bleach, Conan, etc.)
const FEATURED_ANIME_IDS = [
  318774, // One Piece
  95479, // Jujutsu Kaisen
  30983, // Detective Conan
  46260,  // Naruto
  31910,  // Naruto ship
  12971,  // Dragon Ball Z
  127532,   // Solo Leveling
  46298,  // Hunter x Hunter
  30984,   // Bleach
  9026,   // Yu-Gi-Oh! Duel Monsters
  1429,   // Attack on Titan
  85937,  // Demon Slayer
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Animedia — عالم الأنمي والرسوم المتحركة" },
      { name: "description", content: "استمتع بمشاهدة أحدث حلقات الأنمي والأفلام العالمية بجودة عالية وسيرفرات سريعة." },
      { property: "og:title", content: "Animedia — وجهتك الأولى للأنمي" },
      { property: "og:description", content: "شاهد أفلامك ومسلسلاتك المفضلة في مكان واحد مع تجربة مشاهدة فريدة." },
      { property: "og:image", content: "/og-image.png" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { lang, t } = useLanguage();
  const [featured, setFeatured] = useState<Media[]>([]); // حالة خاصة للـ Hero
  const [trending, setTrending] = useState<Media[]>();
  const [topRated, setTopRated] = useState<Media[]>();
  const [newReleases, setNewReleases] = useState<Media[]>();
  const [movies, setMovies] = useState<Media[]>();

  useEffect(() => {
    // إعادة تعيين الحالات عند تغيير اللغة
    setFeatured([]);
    setTrending(undefined);
    setTopRated(undefined);
    setNewReleases(undefined);
    setMovies(undefined);

    // 1. جلب الأنميات المحددة للـ Hero (التبديل بينها في السلايد)
    Promise.all(
      FEATURED_ANIME_IDS.map((id) =>
        getDetails("tv", id, lang).catch(err => {
          console.error(`Error fetching ID ${id}:`, err);
          return null; // نرجع null بدل الفشل الكامل
        })
      )
    )
      .then((results) => {
        // نصفي النتائج من أي null ونحدث الـ State
        const validData = results.filter((item): item is Media => item !== null);
        console.log("Featured Data Loaded:", validData);
        setFeatured(validData);
      })
      .catch((err) => console.error("General Promise.all error:", err));

    // 2. جلب باقي الأقسام العادية
    getTrendingAnime(lang).then(setTrending).catch(() => setTrending([]));
    getTopRatedAnime(lang).then(setTopRated).catch(() => setTopRated([]));
    getNewReleases(lang).then(setNewReleases).catch(() => setNewReleases([]));
    getAnimatedMovies(lang).then(setMovies).catch(() => setMovies([]));
  }, [lang]);

  return (
    <div>
      {/* الـ Hero الآن يعرض فقط القائمة التي اخترتها */}
      {featured && featured.length > 0 ? (
        <Hero items={featured} />
      ) : (
        <div className="h-[75vh] md:h-[90vh] shimmer" />
      )}

      <MediaRow title={t("trending")} items={trending} loading={!trending} />
      <MediaRow title={t("topRated")} items={topRated} loading={!topRated} />
      <MediaRow title={t("newReleases")} items={newReleases} loading={!newReleases} />
      <MediaRow title={t("animatedMovies")} items={movies} loading={!movies} />
    </div>
  );
}