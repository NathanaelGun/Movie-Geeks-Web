"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieDetail, { MovieDetails } from "@/Components/MovieDetail";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MoviesClientProps {
  initialMovies: Movie[];
  totalResults: number;
  search: string;
  page: number;
}

export default function MoviesClient({
  initialMovies,
  totalResults,
  search,
  page,
}: MoviesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loadingMovieId, setLoadingMovieId] = useState<string | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      if (search) {
        params.set("search", search);
      }
      router.push(`?${params.toString()}`);
    });
  };

  const handleSearch = (searchTerm: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set("search", searchTerm);
      }
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearSearch = () => {
    startTransition(() => {
      router.push("/movies");
    });
  };

  const handleMovieClick = async (movie: Movie) => {
    setLoadingMovieId(movie.imdbID);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      let data;
      if (apiKey) {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
        );
        data = await res.json();
      } else {
        const res = await fetch(`/api/movies?i=${movie.imdbID}`);
        const result = await res.json();
        data = result.movie;
      }
      if (data) {
        setSelectedMovie(data);
      }
    } catch (err) {
      console.error("Error fetching movie details:", err);
    } finally {
      setLoadingMovieId(null);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-16 pt-32 pb-16 max-w-[1280px]">
      {/* Header and Search Section */}
      <div className="mb-12 text-center">
        {!search ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-primary">
              Welcome to MovGeek
            </h1>
            <p className="text-lg text-on-surface-variant font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Your hub for everything movies. Browse through our vast archives.
            </p>
          </>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-left">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                Results for <span className="text-primary">&quot;{search}&quot;</span>
              </h1>
              <span className="text-sm font-medium text-on-surface-variant">
                {totalResults} matches found
              </span>
            </div>
            {search && (
              <button
                onClick={handleClearSearch}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-outline-variant hover:border-primary hover:text-primary transition-colors bg-surface-container-high/40"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Custom Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchInput onSearch={handleSearch} initialValue={search} />
        </div>
      </div>

      {/* Movies Grid / Empty state */}
      <div className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
        {initialMovies.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {initialMovies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onCardClick={() => handleMovieClick(movie)}
                  isLoading={loadingMovieId === movie.imdbID}
                />
              ))}
            </div>

            {/* Redesigned Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-12 border-t border-outline-variant/15 pt-8">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || isPending}
                    className="px-4 py-2 text-sm font-medium border border-outline-variant/35 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container transition bg-surface-container-low/40"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum =
                        totalPages <= 5 ? i + 1 : Math.max(1, page - 2) + i;
                      if (pageNum > totalPages) return null;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={isPending}
                          className={`px-3.5 py-2 text-sm font-medium rounded-lg border ${
                            pageNum === page
                              ? "bg-primary text-on-primary border-primary font-bold shadow-[0_0_15px_rgba(242,202,80,0.25)]"
                              : "border-outline-variant/35 hover:bg-surface-container bg-surface-container-low/40"
                          } disabled:opacity-50`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || isPending}
                    className="px-4 py-2 text-sm font-medium border border-outline-variant/35 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container transition bg-surface-container-low/40"
                  >
                    Next
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant font-medium">
                  Page {page} of {totalPages} • Showing {initialMovies.length} of {totalResults} titles
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Redesigned Empty State matching Search results empty template */
          <div className="flex-grow flex flex-col items-center justify-center text-center py-12 max-w-xl mx-auto">
            <div className="relative w-48 h-48 mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px]"></div>
              <div className="relative z-10 w-full h-full glass-panel rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-surface-container-lowest/80 border border-white/5">
                <span className="material-symbols-outlined text-primary opacity-80" style={{ fontSize: "80px" }}>
                  movie_off
                </span>
              </div>
              <div className="absolute top-4 -left-4 w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center animate-bounce" style={{ animationDuration: "3s" }}>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">search_off</span>
              </div>
              <div className="absolute bottom-8 -right-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                <span className="material-symbols-outlined text-secondary opacity-50">question_mark</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-on-surface mb-2">The Archives are Empty</h2>
            <p className="text-base text-on-surface-variant mb-8 leading-relaxed">
              We couldn&apos;t find any films matching that specific title in our current screening room. Check your spelling or try a broader term.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <button
                onClick={handleClearSearch}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Clear Search
              </button>
            </div>
            
            {/* Suggested Tags */}
            <div className="mt-12">
              <p className="text-xs text-on-surface-variant mb-4 uppercase tracking-wider font-semibold">Suggested Queries</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Classic Noir", "Dune", "Inception", "Interstellar", "Star Wars"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs border border-outline-variant hover:border-primary hover:text-primary cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

function SearchInput({
  onSearch,
  initialValue,
}: {
  onSearch: (term: string) => void;
  initialValue: string;
}) {
  const [input, setInput] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative group mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">
          search
        </span>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies by titles..."
        className="w-full bg-surface-container-highest/40 backdrop-blur-md border border-outline-variant/30 rounded-full py-4 pl-12 pr-32 text-on-surface placeholder:text-outline/80 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-body-lg text-body-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      />
      <button
        type="submit"
        className="absolute inset-y-2 right-2 px-6 bg-gradient-to-r from-primary-container to-primary text-on-primary font-semibold text-sm rounded-full hover:opacity-90 transition-opacity"
      >
        Search
      </button>
    </form>
  );
}

function MovieCard({
  movie,
  onCardClick,
  isLoading,
}: {
  movie: Movie;
  onCardClick: () => void;
  isLoading: boolean;
}) {
  const imageUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/500x750?text=No+Image";

  return (
    <button
      onClick={onCardClick}
      disabled={isLoading}
      className={`focus:outline-none w-full relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/5 hover:border-primary/30 aspect-[2/3] ${
        isLoading ? "opacity-50 cursor-wait" : ""
      }`}
    >
      <img
        src={imageUrl}
        alt={movie.Title}
        className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
      />
      {/* Bottom Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-95 transition-opacity duration-300"></div>

      {/* Info card title sliding up on hover */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end text-left z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-surface-variant/85 backdrop-blur-md text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">
            {movie.Type}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-variant/85 backdrop-blur-md text-on-surface-variant text-[10px] font-bold">
            {movie.Year}
          </span>
        </div>
        <h3 className="font-bold text-sm md:text-base text-on-surface line-clamp-2 leading-snug drop-shadow-md group-hover:text-primary transition-colors duration-200">
          {movie.Title}
        </h3>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </button>
  );
}