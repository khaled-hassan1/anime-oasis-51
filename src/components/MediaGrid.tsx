import { MediaCard, MediaCardSkeleton } from "./MediaCard";
import type { Media } from "@/lib/tmdb";

export function MediaGrid({
  items,
  loading,
  skeletonCount = 12,
}: {
  items?: Media[];
  loading?: boolean;
  skeletonCount?: number;
}) {
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {loading && (!items || items.length === 0)
          ? Array.from({ length: skeletonCount }).map((_, i) => <MediaCardSkeleton key={`s-${i}`} />)
          : items?.map((m, i) => (
              <MediaCard key={`${m.media_type}-${m.id}`} media={m} index={i} />
            ))}
        {loading && items && items.length > 0 &&
          Array.from({ length: 6 }).map((_, i) => <MediaCardSkeleton key={`ls-${i}`} />)}
      </div>
    </div>
  );
}
