"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWatchlist, removeFromWatchlist, WatchlistMovie } from "@/lib/watchlist";
import MovieDetail from "@/Components/MovieDetail";
import { MovieDetails } from "@/Components/MovieDetail";

export default function MyListPage() {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Load from localStorage after hydration
  useEffect(() => {
    setWatchlist(getWatchlist());
    setMounted(true);
  }, []);

  const handleRemove = (id: string) => {
    removeFromWatchlist(id);
    setWatchlist(getWatchlist());
  };

  const handleOpenDetail = async (movie: WatchlistMovie) => {
    setLoadingId(movie.imdbID);
    try {
      const res = await fetch(`/api/movies?i=${movie.imdbID}`);
      const data = await res.json();
      if (data?.movie) {
        setSelectedMovie(data.movie as MovieDetails);
      } else {
        // Fallback to basic info if detail fetch fails
        setSelectedMovie({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
        });
      }
    } catch {
      setSelectedMovie({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
    // Refresh watchlist in case user changed rating inside modal
    setWatchlist(getWatchlist());
  };

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin select-none">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 md:px-16 max-w-[1280px] mx-auto w-full flex flex-col relative">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

      {/* Detail modal */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
      )}

      {watchlist.length > 0 ? (
        <div className="relative z-10 w-full flex-grow flex flex-col">
          <header className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-on-background">
              My Watchlist
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Movies you&apos;ve rated — your personal cinematic archive.
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.imdbID}
                className="group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(242,202,80,0.15)] cursor-pointer"
                onClick={() => handleOpenDetail(movie)}
              >
                {/* Poster */}
                <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={movie.Poster.includes("placehold.co")}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/500x750/131313/f2ca50?text=No+Poster";
                    }}
                  />

                  {/* Loading overlay */}
                  {loadingId === movie.imdbID && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-primary animate-spin select-none">progress_activity</span>
                    </div>
                  )}

                  {/* Gold hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(movie.imdbID);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-error hover:border-error transition-all opacity-0 group-hover:opacity-100"
                    title="Remove from watchlist"
                    aria-label="Remove from watchlist"
                  >
                    <span className="material-symbols-outlined text-sm select-none">close</span>
                  </button>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="font-semibold text-sm text-on-surface truncate leading-tight">{movie.Title}</p>
                  <p className="text-xs text-on-surface-variant">{movie.Year}</p>
                  {/* User star rating */}
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined text-sm select-none"
                        style={{
                          color: star <= movie.userRating ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                          fontVariationSettings: star <= movie.userRating ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty Watchlist State */
        <section className="relative z-10 flex flex-col items-center text-center p-8 max-w-2xl bg-surface-container-low/40 backdrop-blur-md rounded-xl border border-surface-container shadow-2xl mx-auto my-auto">
          <div className="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant select-none">
              movie_filter
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Your watchlist is empty.
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant mb-8 max-w-md leading-relaxed">
            Rate any movie to add it here automatically. Start discovering and building your personal cinema archive.
          </p>
          <Link
            href="/movies"
            className="bg-gradient-to-r from-primary-container to-primary text-on-primary font-semibold px-8 py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(242,202,80,0.2)]"
          >
            <span className="material-symbols-outlined text-[20px] select-none">explore</span>
            Start Exploring
          </Link>
        </section>
      )}
    </div>
  );
}
