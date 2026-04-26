import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Heart, Star, Play } from "lucide-react";
import { myList, type SavedItem } from "@/lib/myList";
import { IMG } from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/my-list")({
   head: () => ({
    meta: [
      { title: "Animedia — عالم الأنمي والرسوم المتحركة" },
      { name: "description", content: "استمتع بمشاهدة أحدث حلقات الأنمي والأفلام العالمية بجودة عالية وسيرفرات سريعة." },
      { property: "og:title", content: "Animedia — وجهتك الأولى للأنمي" },
      { property: "og:description", content: "شاهد أفلامك ومسلسلاتك المفضلة في مكان واحد مع تجربة مشاهدة فريدة." },
      { property: "og:image", content: "/og-image.png" },
    ],
  }),
  component: MyListPage,
});

function MyListPage() {
  const { t, lang, dir } = useLanguage();
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(myList.getAll());
    sync();
    window.addEventListener("mylist:change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mylist:change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <motion.div
      key={lang}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-24 pb-16"
      dir={dir}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-6 flex items-center gap-3">
        <Heart className="w-7 h-7 text-primary fill-primary" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t("myList")}</h1>
      </div>

      {items.length === 0 ? (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="glass border border-border rounded-2xl p-10 text-center">
            <p className="text-muted-foreground mb-4">{t("myListEmpty")}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              <Play className="w-4 h-4 fill-current" />
              {t("home")}
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            <AnimatePresence>
              {items.map((m, i) => (
                <motion.div
                  key={`${m.media_type}-${m.id}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.2) }}
                  className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-card"
                >
                  <Link
                    to="/watch/$id"
                    params={{ id: String(m.id) }}
                    search={{ type: m.media_type }}
                    className="block w-full h-full"
                  >
                    {m.poster_path ? (
                      <img
                        src={IMG(m.poster_path, "w500")}
                        alt={m.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
                        {m.title}
                      </div>
                    )}
                    <div className="absolute top-2 start-2 flex items-center gap-1 px-2 py-1 rounded-md glass-solid text-xs font-bold">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {m.vote_average.toFixed(1)}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background to-transparent">
                      <p className="font-bold text-sm line-clamp-2">{m.title}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => myList.remove(m.id, m.media_type)}
                    className="absolute top-2 end-2 p-2 rounded-md glass-solid hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={t("remove")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}
