import { Link } from "@tanstack/react-router";
import { Star, Play, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { IMG, type Media } from "@/lib/tmdb";

export function MediaCard({ media, index = 0 }: { media: Media; index?: number }) {
  const title = media.title || media.name || "Untitled";
  const year = (media.release_date || media.first_air_date || "").slice(0, 4);
  const type = media.media_type || "tv";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        to="/watch/$id"
        params={{ id: String(media.id) }}
        search={{ type }}
        className="group block relative aspect-[2/3] rounded-xl overflow-hidden bg-card hover:z-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{ ["--tw-shadow-color" as never]: "var(--primary)" }}
      >
        {media.poster_path ? (
          <img
            src={IMG(media.poster_path, "w500")}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
            {title}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md glass-solid text-xs font-bold">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {media.vote_average.toFixed(1)}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="font-bold text-sm leading-tight line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            {year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {year}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3 mb-2">{media.overview}</p>
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-foreground px-2 py-1.5 rounded-md w-fit" style={{ background: "var(--gradient-primary)" }}>
            <Play className="w-3 h-3 fill-current" />
            Watch
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function MediaCardSkeleton() {
  return <div className="aspect-[2/3] rounded-xl shimmer" />;
}