import { ANIME_GENRES } from "@/lib/tmdb";
import { useLanguage } from "@/lib/language";

export function FilterBar({
  genre,
  year,
  onGenre,
  onYear,
}: {
  genre?: number;
  year?: number;
  onGenre: (g?: number) => void;
  onYear: (y?: number) => void;
}) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex flex-wrap gap-3">
      <select
        value={genre ?? ""}
        onChange={(e) => onGenre(e.target.value ? Number(e.target.value) : undefined)}
        className="px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-sm font-medium"
      >
        <option value="">{t("allGenres")}</option>
        {ANIME_GENRES.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <select
        value={year ?? ""}
        onChange={(e) => onYear(e.target.value ? Number(e.target.value) : undefined)}
        className="px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-sm font-medium"
      >
        <option value="">{t("allYears")}</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      {(genre || year) && (
        <button
          onClick={() => { onGenre(undefined); onYear(undefined); }}
          className="px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition"
        >
          {t("clear")}
        </button>
      )}
    </div>
  );
}
