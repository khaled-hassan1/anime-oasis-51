import { MediaCard, MediaCardSkeleton } from "./MediaCard";
import type { Media } from "@/lib/tmdb";

export function MediaRow({
  title,
  items,
  loading,
}: {
  title: string;
  items?: Media[];
  loading?: boolean;
}) {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {loading || !items
            ? Array.from({ length: 12 }).map((_, i) => <MediaCardSkeleton key={i} />)
            : items.slice(0, 12).map((m, i) => <MediaCard key={m.id} media={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}