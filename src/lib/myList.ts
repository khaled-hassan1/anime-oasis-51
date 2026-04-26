import type { Media } from "./tmdb";

const KEY = "animedia:myList";

export type SavedItem = {
  id: number;
  media_type: "tv" | "movie";
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
};

function read(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("mylist:change"));
  } catch { }
}

export const myList = {
  getAll: read,
  has(id: number, type: "tv" | "movie") {
    return read().some((i) => i.id === id && i.media_type === type);
  },
  add(item: SavedItem) {
    const list = read();
    if (!list.some((i) => i.id === item.id && i.media_type === item.media_type)) {
      list.unshift(item);
      write(list);
    }
  },
  remove(id: number, type: "tv" | "movie") {
    write(read().filter((i) => !(i.id === id && i.media_type === type)));
  },
  fromMedia(m: Media): SavedItem {
    return {
      id: m.id,
      media_type: (m.media_type || "tv") as "tv" | "movie",
      title: m.title || m.name || "Untitled",
      poster_path: m.poster_path,
      backdrop_path: m.backdrop_path,
      vote_average: m.vote_average,
      overview: m.overview,
      release_date: m.release_date,
      first_air_date: m.first_air_date,
    };
  },
};