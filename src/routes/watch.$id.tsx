import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Calendar, Play, ArrowLeft, Loader2, PlayCircle } from "lucide-react";
import { z } from "zod";
import { getDetails, getDetailsAuto, IMG, type MediaType } from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";
import { myList, type SavedItem } from "@/lib/myList";
import { MediaCard } from "@/components/MediaCard";
import { VidSrcPlayer } from "@/components/VidSrcPlayer";
import { EpisodeList } from "@/components/EpisodeList";

const searchSchema = z.object({
  type: z.enum(["tv", "movie"]).optional(),
});

export const Route = createFileRoute("/watch/$id")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Animedia — عالم الأنمي والرسوم المتحركة" },
      { name: "description", content: "استمتع بمشاهدة أحدث حلقات الأنمي والأفلام العالمية بجودة عالية وسيرفرات سريعة." },
      { property: "og:title", content: "Animedia — وجهتك الأولى للأنمي" },
      { property: "og:description", content: "شاهد أفلامك ومسلسلاتك المفضلة في مكان واحد مع تجربة مشاهدة فريدة." },
      { property: "og:image", content: "/og-image.png" },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const { id } = Route.useParams();
  const { type: typeParam } = Route.useSearch();
  const { lang, t, dir } = useLanguage();
  const [data, setData] = useState<any>();
  const [type, setType] = useState<MediaType | undefined>(typeParam);
  const [error, setError] = useState(false);
  const [, force] = useState(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const numericId = Number(id);

  useEffect(() => {
    let cancelled = false;
    setData(undefined);
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
    return () => { cancelled = true; };
  }, [numericId, typeParam, lang]);

  // Initialize season to first non-special season once details load (TV only)
  useEffect(() => {
    if (data && (type === "tv") && Array.isArray(data.seasons)) {
      const valid = data.seasons.filter((s: any) => s.season_number > 0);
      const first = valid[0]?.season_number ?? data.seasons[0]?.season_number ?? 1;
      setActiveSeason(first);
      setActiveEpisode(1);
    }
  }, [data, type]);

  // Listen for my-list change events to update the heart toggle UI
  useEffect(() => {
    const onChange = () => force((n) => n + 1);
    window.addEventListener("mylist:change", onChange);
    return () => window.removeEventListener("mylist:change", onChange);
  }, []);

  if (error) {
    return (
      <div className="pt-32 px-4 text-center">
        <p className="text-destructive mb-4">{t("error")}</p>
        <Link to="/" className="underline">{t("home")}</Link>
      </div>
    );
  }

  if (!data || !type) {
    return (
      <div className="pt-32 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const title = data.title || data.name || "Untitled";
  const year = (data.release_date || data.first_air_date || "").slice(0, 4);
  const trailer = data.videos?.results?.find(
    (v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  const cast = (data.credits?.cast ?? []).slice(0, 12);
  const recs = (data.recommendations?.results ?? []).slice(0, 12);
  const inList = myList.has(numericId, type);

  const toggleList = () => {
    if (inList) {
      myList.remove(numericId, type);
    } else {
      const item: SavedItem = {
        id: numericId,
        media_type: type,
        title,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average ?? 0,
        overview: data.overview ?? "",
        release_date: data.release_date,
        first_air_date: data.first_air_date,
      };
      myList.add(item);
    }
  };

  return (
    <motion.div
      key={`${lang}-${id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      dir={dir}
    >
      {/* Hero backdrop */}
      <div className="relative h-[55vh] md:h-[75vh] overflow-hidden">
        {data.backdrop_path && (
          <img
            src={IMG(data.backdrop_path, "original")}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

        <div className="absolute top-24 start-4 md:start-8 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass-solid text-sm font-medium hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t("home")}
          </Link>
        </div>
      </div>

      {/* Player + meta */}
      <div className="relative -mt-32 md:-mt-48 z-10 max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 md:gap-8">
          <div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl">
              {trailer ? (
                <iframe
                  key={trailer.key}
                  src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                  title={`${title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <Play className="w-12 h-12" />
                  <p>{t("noResults")}</p>
                </div>
              )}
            </div>

          <button
            onClick={() => setPlayerOpen(true)}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:scale-[1.01] transition-all shadow-lg shadow-primary/30"
          >
            <PlayCircle className="w-6 h-6" />
            {t("watchNow")}
            {type === "tv" && (
              <span className="text-xs font-medium opacity-80 ms-2">
                S{activeSeason} · E{activeEpisode}
              </span>
            )}
          </button>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">{title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-foreground font-semibold">
                  {(data.vote_average ?? 0).toFixed(1)}
                </span>
              </span>
              {year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {year}
                </span>
              )}
              <span className="px-2 py-0.5 rounded border border-border">HD</span>
            </div>

            {data.genres?.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {t("genres")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((g: any) => (
                    <span
                      key={g.id}
                      className="px-3 py-1 rounded-full text-xs font-semibold glass border border-border"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {t("overview")}
              </p>
              <p className="text-sm md:text-base leading-relaxed text-foreground/90">
                {data.overview || "—"}
              </p>
            </div>

            <button
              onClick={toggleList}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] ${
                inList
                  ? "bg-primary text-primary-foreground"
                  : "glass border border-border hover:bg-secondary"
              }`}
            >
              <Heart className={`w-5 h-5 ${inList ? "fill-current" : ""}`} />
              {inList ? t("inList") : t("addToList")}
            </button>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4">{t("cast")}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
              {cast.map((c: any) => (
                <div key={c.cast_id ?? c.credit_id} className="text-center">
                  <div className="aspect-square rounded-xl overflow-hidden bg-card mb-2">
                    {c.profile_path ? (
                      <img
                        src={IMG(c.profile_path, "w300")}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary" />
                    )}
                  </div>
                  <p className="text-xs font-semibold line-clamp-1">{c.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{c.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Seasons & Episodes (TV only) */}
        {type === "tv" && Array.isArray(data.seasons) && data.seasons.length > 0 && (
          <section className="mt-12">
            <EpisodeList
              tvId={numericId}
              seasons={data.seasons}
              activeSeason={activeSeason}
              activeEpisode={activeEpisode}
              onSelect={(s, e) => {
                setActiveSeason(s);
                setActiveEpisode(e);
                setPlayerOpen(true);
              }}
            />
          </section>
        )}

        {/* Recommendations */}
        {recs.length > 0 && (
          <section className="mt-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">{t("recommendations")}</h2>
            <AnimatePresence>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {recs.map((r: any, i: number) => (
                  <MediaCard
                    key={r.id}
                    media={{ ...r, media_type: type }}
                    index={i}
                  />
                ))}
              </div>
            </AnimatePresence>
          </section>
        )}
      </div>

      {/* VidSrc Player overlay */}
      {playerOpen && type && (
        <VidSrcPlayer
          type={type}
          id={numericId}
          season={activeSeason}
          episode={activeEpisode}
          onClose={() => setPlayerOpen(false)}
        />
      )}
    </motion.div>
  );
}
