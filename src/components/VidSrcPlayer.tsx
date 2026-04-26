import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Server } from "lucide-react";
import { useLanguage } from "@/lib/language";

// تحديث قائمة الدومينات الجديدة بناءً على المصدر المقدم
type ServerDomain = 
  | "vidsrcme.ru" 
  | "vidsrcme.su" 
  | "vidsrc-me.ru" 
  | "vidsrc-me.su" 
  | "vidsrc-embed.ru" 
  | "vidsrc-embed.su" 
  | "vsrc.su";

const SERVERS: ServerDomain[] = [
  "vidsrcme.ru",
  "vidsrcme.su",
  "vidsrc-me.ru",
  "vidsrc-me.su",
  "vidsrc-embed.ru",
  "vidsrc-embed.su",
  "vsrc.su"
];

interface Props {
  type: "movie" | "tv";
  id: number;
  season?: number;
  episode?: number;
  onClose: () => void;
}

export function VidSrcPlayer({ type, id, season, episode, onClose }: Props) {
  const { t } = useLanguage();
  // تعيين أول دومين جديد كخيار افتراضي
  const [server, setServer] = useState<ServerDomain>("vidsrcme.ru");

  const url =
    type === "movie"
      ? `https://${server}/embed/movie/${id}`
      : `https://${server}/embed/tv/${id}/${season ?? 1}/${episode ?? 1}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
      >
        <div className="flex items-center justify-between p-3 md:p-4 gap-3">
          <div className="flex items-center gap-2 text-sm overflow-x-auto no-scrollbar">
            <Server className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground hidden sm:inline whitespace-nowrap">{t("server")}:</span>
            <div className="flex gap-1">
              {SERVERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setServer(s)}
                  className={`px-3 py-1 rounded-md text-[10px] md:text-xs font-semibold transition whitespace-nowrap ${
                    server === s
                      ? "bg-primary text-primary-foreground"
                      : "glass border border-border hover:bg-secondary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass-solid text-sm font-medium hover:bg-secondary shrink-0"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t("closePlayer")}</span>
          </button>
        </div>
        
        <div className="flex-1 px-2 pb-4 md:px-6 md:pb-6">
          <div className="w-full h-full max-w-[1600px] mx-auto aspect-video md:aspect-auto md:h-full rounded-xl overflow-hidden bg-black border border-border/30">
            <iframe
              key={url}
              src={url}
              title="Player"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}