import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { getSeasonDetails, IMG } from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";

interface SeasonSummary {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  poster_path: string | null;
}

interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string | null;
  runtime?: number;
  air_date?: string;
  vote_average?: number;
}

interface Props {
  tvId: number;
  seasons: SeasonSummary[];
  activeSeason: number;
  activeEpisode: number;
  onSelect: (season: number, episode: number) => void;
}

export function EpisodeList({ tvId, seasons, activeSeason, activeEpisode, onSelect }: Props) {
  const { lang, t } = useLanguage();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter out specials (season 0) unless that's the only one available
  const validSeasons = seasons.filter((s) => s.season_number > 0);
  const seasonsToShow = validSeasons.length ? validSeasons : seasons;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getSeasonDetails(tvId, activeSeason, lang)
      .then((d) => {
        if (!cancelled) setEpisodes(d.episodes ?? []);
      })
      .catch(() => {
        if (!cancelled) setEpisodes([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tvId, activeSeason, lang]);

  const currentIdx = episodes.findIndex((e) => e.episode_number === activeEpisode);
  const prevEp = currentIdx > 0 ? episodes[currentIdx - 1] : null;
  const nextEp = currentIdx >= 0 && currentIdx < episodes.length - 1 ? episodes[currentIdx + 1] : null;

  return (
    <div className="space-y-6">
      {/* Season selector */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black mb-3">{t("seasons")}</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
          {seasonsToShow.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.season_number, 1)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                s.season_number === activeSeason
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "glass border border-border hover:bg-secondary"
              }`}
            >
              {s.name} <span className="opacity-70 ms-1 font-normal">({s.episode_count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick prev/next */}
      {(prevEp || nextEp) && (
        <div className="flex items-center justify-between gap-2">
          <button
            disabled={!prevEp}
            onClick={() => prevEp && onSelect(activeSeason, prevEp.episode_number)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass border border-border text-sm font-medium hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            {t("prevEpisode")}
          </button>
          <button
            disabled={!nextEp}
            onClick={() => nextEp && onSelect(activeSeason, nextEp.episode_number)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass border border-border text-sm font-medium hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("nextEpisode")}
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      )}

      {/* Episodes */}
      <div>
        <h3 className="text-xl font-black mb-3">
          {t("episodes")} <span className="text-muted-foreground font-normal">({episodes.length})</span>
        </h3>
        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-3">
            {episodes.map((ep, i) => {
              const isActive = ep.episode_number === activeEpisode;
              return (
                <motion.button
                  key={ep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.3) }}
                  onClick={() => onSelect(activeSeason, ep.episode_number)}
                  className={`group flex gap-3 md:gap-4 p-2 md:p-3 rounded-xl text-start transition-all border ${
                    isActive
                      ? "bg-primary/10 border-primary shadow-lg"
                      : "border-border/40 hover:bg-secondary/50 hover:border-border"
                  }`}
                >
                  <div className="relative shrink-0 w-32 md:w-44 aspect-video rounded-lg overflow-hidden bg-card">
                    {ep.still_path ? (
                      <img
                        src={IMG(ep.still_path, "w300")}
                        alt={ep.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-primary">
                        <div className="h-full w-1/3 bg-primary-foreground/60" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {isActive ? t("nowPlaying") : `E${ep.episode_number}`}
                      </span>
                      {ep.runtime && (
                        <span className="text-xs text-muted-foreground">• {ep.runtime}m</span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm md:text-base line-clamp-1">{ep.name}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1">
                      {ep.overview || "—"}
                    </p>
                  </div>
                </motion.button>
              );
            })}
            {!episodes.length && (
              <p className="text-sm text-muted-foreground py-8 text-center">{t("empty")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
