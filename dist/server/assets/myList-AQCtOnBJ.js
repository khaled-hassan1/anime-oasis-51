const KEY = "animedia:myList";
function read() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("mylist:change"));
  } catch {
  }
}
const myList = {
  getAll: read,
  has(id, type) {
    return read().some((i) => i.id === id && i.media_type === type);
  },
  add(item) {
    const list = read();
    if (!list.some((i) => i.id === item.id && i.media_type === item.media_type)) {
      list.unshift(item);
      write(list);
    }
  },
  remove(id, type) {
    write(read().filter((i) => !(i.id === id && i.media_type === type)));
  },
  fromMedia(m) {
    return {
      id: m.id,
      media_type: m.media_type || "tv",
      title: m.title || m.name || "Untitled",
      poster_path: m.poster_path,
      backdrop_path: m.backdrop_path,
      vote_average: m.vote_average,
      overview: m.overview,
      release_date: m.release_date,
      first_air_date: m.first_air_date
    };
  }
};
export {
  myList as m
};
