import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Info, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IMG, type Media } from "@/lib/tmdb";

export function Hero({ items }: { items: Media[] }) {
  const [idx, setIdx] = useState(0);
  const slides = items.slice(0, 5);

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) {
    return <div className="h-[70vh] md:h-[85vh] shimmer" />;
  }

  const current = slides[idx];
  const title = current.title || current.name || "";
  const year = (current.release_date || current.first_air_date || "").slice(0, 4);

  return (
    <div className="relative h-[75vh] md:h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {current.backdrop_path && (
            <img
              src={IMG(current.backdrop_path, "original")}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-end md:items-center pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              FEATURED ANIME
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[0.95]">
              {title}
            </h1>
            <div className="flex items-center gap-4 mb-4 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-foreground">{current.vote_average.toFixed(1)}</span>
              </span>
              {year && <span>{year}</span>}
              <span className="px-2 py-0.5 rounded border border-border">HD</span>
            </div>
            <p className="text-base md:text-lg text-muted-foreground line-clamp-3 mb-6 max-w-xl">
              {current.overview}
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/watch/$id"
                params={{ id: String(current.id) }}
                search={{ type: "tv" as const }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-xl font-bold text-primary-foreground transition-transform hover:scale-105"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </Link>
              <Link
                to="/watch/$id"
                params={{ id: String(current.id) }}
                search={{ type: "tv" as const }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-xl font-bold glass border border-border hover:bg-secondary transition-colors"
              >
                <Info className="w-5 h-5" />
                Details
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-4 md:right-8 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-primary" : "w-4 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}