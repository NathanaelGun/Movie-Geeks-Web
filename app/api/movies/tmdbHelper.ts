import { getMockMovies, getMockMovieById } from "./mockDatabase";

interface TMDBSearchResultItem {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
}

interface TMDBRecordCrew {
  job: string;
  name: string;
}

interface TMDBRecordCast {
  name: string;
}

interface TMDBRecordGenre {
  name: string;
}

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;

  const queryParams = new URLSearchParams(params);
  if (apiKey) {
    queryParams.set("api_key", apiKey);
  }

  const url = `https://api.themoviedb.org/3${endpoint}?${queryParams.toString()}`;
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, { headers, cache: "no-store" });
  if (!res.ok) {
    throw new Error(`TMDB returned status ${res.status}`);
  }
  return res.json();
}

export async function searchTMDBMovies(query: string, page: number = 1) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;

  if (!accessToken && !apiKey) {
    return getMockMovies(query, page);
  }

  try {
    const data = await fetchFromTMDB("/search/movie", {
      query: query || "a",
      page: page.toString(),
    });

    const movies = (data.results || []).map((item: TMDBSearchResultItem) => ({
      imdbID: item.id.toString(),
      Title: item.title,
      Year: item.release_date ? item.release_date.split("-")[0] : "N/A",
      Poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://placehold.co/500x750?text=No+Image",
      Type: "movie",
    }));

    return {
      movies,
      totalResults: data.total_results || 0,
    };
  } catch (error) {
    console.error("Failed to fetch from TMDB, using mock fallback:", error);
    return getMockMovies(query, page);
  }
}

export async function getTMDBMovieById(id: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;

  // Map legacy OMDb watchlist IDs to TMDB numeric IDs for compatibility
  let numericId = id;
  if (id.startsWith("tt")) {
    const idMap: Record<string, string> = {
      tt1375666: "27205", // Inception
      tt1160419: "438631", // Dune
      tt0816692: "157336", // Interstellar
    };
    numericId = idMap[id] || id;
  }

  if (!accessToken && !apiKey) {
    return getMockMovieById(numericId);
  }

  try {
    const data = await fetchFromTMDB(`/movie/${numericId}`, {
      append_to_response: "credits",
    });

    const director = data.credits?.crew
      ? data.credits.crew.find((c: TMDBRecordCrew) => c.job === "Director")?.name || "N/A"
      : "N/A";
    const actors = data.credits?.cast
      ? data.credits.cast
          .slice(0, 3)
          .map((c: TMDBRecordCast) => c.name)
          .join(", ")
      : "N/A";

    return {
      Title: data.title,
      Year: data.release_date ? data.release_date.split("-")[0] : "N/A",
      Rated: "PG-13",
      Released: data.release_date || "N/A",
      Runtime: data.runtime ? `${data.runtime} min` : "N/A",
      Genre: data.genres ? data.genres.map((g: TMDBRecordGenre) => g.name).join(", ") : "N/A",
      Director: director,
      Actors: actors,
      Plot: data.overview || "No plot available.",
      Poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "https://placehold.co/500x750?text=No+Image",
      imdbRating: data.vote_average ? data.vote_average.toFixed(1) : "N/A",
      imdbID: data.id.toString(),
      Type: "movie",
      Response: "True",
    };
  } catch (error) {
    console.error("Failed to fetch movie details from TMDB, using mock fallback:", error);
    return getMockMovieById(numericId);
  }
}

