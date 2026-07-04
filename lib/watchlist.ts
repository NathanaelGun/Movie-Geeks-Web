export interface WatchlistMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  userRating: number;
  ratedAt: string;
}

const WATCHLIST_KEY = "movgeek_watchlist";

export function getWatchlist(): WatchlistMovie[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? (JSON.parse(raw) as WatchlistMovie[]) : [];
  } catch {
    return [];
  }
}

export function addOrUpdateRating(movie: Omit<WatchlistMovie, "ratedAt">) {
  const list = getWatchlist();
  const idx = list.findIndex((m) => m.imdbID === movie.imdbID);
  const entry: WatchlistMovie = {
    ...movie,
    ratedAt: new Date().toISOString(),
  };
  if (idx >= 0) {
    list[idx] = entry;
  } else {
    list.unshift(entry); // newest first
  }
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  return entry;
}

export function getRating(imdbID: string): number {
  const list = getWatchlist();
  return list.find((m) => m.imdbID === imdbID)?.userRating ?? 0;
}

export function removeFromWatchlist(imdbID: string) {
  const list = getWatchlist().filter((m) => m.imdbID !== imdbID);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}
