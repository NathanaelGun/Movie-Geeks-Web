"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { addOrUpdateRating, getRating, removeFromWatchlist } from "@/lib/watchlist";

export type MovieDetails = {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Poster?: string;
  imdbRating?: string;
  imdbID?: string;
  Type?: string;
  totalSeasons?: string;
  Response?: string;
};

type MovieDetailProps = {
  movie: MovieDetails;
  onClose: () => void;
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [savedRating, setSavedRating] = useState(0);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const hasPoster = movie.Poster && movie.Poster !== "N/A";
  const title = movie.Title || "Unknown Title";
  const year = movie.Year || "N/A";
  const genre = movie.Genre || "N/A";
  const runtime = movie.Runtime || "N/A";
  const director = movie.Director || "N/A";
  const actors = movie.Actors || "N/A";
  const plot = movie.Plot || "No plot available.";
  const rating = movie.imdbRating || "N/A";

  // Load existing rating from localStorage on mount
  useEffect(() => {
    if (movie.imdbID) {
      const existing = getRating(movie.imdbID);
      setUserRating(existing);
      setSavedRating(existing);
      setInWatchlist(existing > 0);
    }
  }, [movie.imdbID]);

  const handleRate = (stars: number) => {
    setUserRating(stars);
    if (movie.imdbID && movie.Title) {
      addOrUpdateRating({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year || "N/A",
        Poster: movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://placehold.co/500x750/131313/f2ca50?text=No+Poster",
        userRating: stars,
      });
      setSavedRating(stars);
      setInWatchlist(true);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const handleRemoveFromWatchlist = () => {
    if (movie.imdbID) {
      removeFromWatchlist(movie.imdbID);
      setUserRating(0);
      setSavedRating(0);
      setInWatchlist(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-[100] p-4 overflow-y-auto animate-fade-in">
      <div className="bg-surface-container-low/95 border border-outline-variant/30 text-on-surface rounded-2xl shadow-2xl w-full max-w-4xl my-8 relative overflow-hidden max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary z-10 transition-colors duration-200"
          aria-label="Close details"
        >
          <span className="material-symbols-outlined text-2xl select-none">close</span>
        </button>

        {/* Ambient top gold light */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>

        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-10px)]">
          {/* Poster Image */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-64 h-96 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/20 shadow-lg">
              {hasPoster && !imageError ? (
                <Image
                  src={movie.Poster!}
                  alt={`Poster for ${title}`}
                  fill
                  sizes="256px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                  unoptimized={movie.Poster?.includes("placehold.co")}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-surface-container text-on-surface-variant p-4">
                  <span className="material-symbols-outlined text-5xl mb-2 text-primary opacity-60">movie</span>
                  <p className="text-xs font-semibold text-center">No Poster Available</p>
                </div>
              )}
            </div>

            {/* Watchlist status below poster */}
            {inWatchlist && (
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-primary font-semibold">
                <span className="material-symbols-outlined text-sm select-none" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                In your Watchlist
                <button
                  onClick={handleRemoveFromWatchlist}
                  className="ml-1 text-on-surface-variant hover:text-error transition-colors"
                  title="Remove from watchlist"
                >
                  <span className="material-symbols-outlined text-sm select-none">close</span>
                </button>
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-background tracking-tight leading-tight">
                {title}
              </h2>
              <div className="flex flex-wrap gap-2 items-center mt-3 text-xs md:text-sm text-on-surface-variant font-medium">
                <span className="px-2.5 py-0.5 rounded bg-surface-container-highest/80 border border-outline-variant/20 text-on-surface">
                  {year}
                </span>
                <span>•</span>
                <span>{runtime}</span>
                <span>•</span>
                <span className="text-primary">{genre}</span>
              </div>
            </div>

            {/* Plot */}
            <div className="bg-surface-container/30 border border-outline-variant/10 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Plot Summary</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base font-light">
                {plot}
              </p>
            </div>

            {/* Credits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-outline-variant/10">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Director</p>
                <p className="font-semibold text-sm text-on-surface mt-0.5">{director}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Starring</p>
                <p className="font-semibold text-sm text-on-surface mt-0.5">{actors}</p>
              </div>
            </div>

            {/* Ratings and Star Ratings */}
            <div className="bg-surface-container-high/40 border border-outline-variant/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">TMDB Rating</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary select-none fill-primary">star</span>
                  <p className="text-2xl font-bold text-primary">
                    {rating === "N/A" ? "N/A" : `${rating}/10`}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-outline-variant/20 pt-4 sm:pt-0 sm:pl-6 flex flex-col items-start">
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-2">Your Rating</p>
                <StarRating rating={userRating} onRate={handleRate} />
                {justSaved && (
                  <p className="text-xs text-primary mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm select-none" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Added to Watchlist!
                  </p>
                )}
                {savedRating > 0 && !justSaved && (
                  <p className="text-xs text-on-surface-variant mt-2">
                    You rated this <span className="text-primary font-semibold">{savedRating}/5 ★</span>
                  </p>
                )}
              </div>
            </div>

            {/* Additional Info Footer */}
            <div className="text-[10px] text-on-surface-variant/70 flex flex-wrap gap-4 pt-4 border-t border-outline-variant/10 justify-between">
              {movie.Rated && <p>Rated: <span className="font-semibold">{movie.Rated}</span></p>}
              {movie.Released && <p>Released: <span className="font-semibold">{movie.Released}</span></p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function StarRating({ rating, onRate }: { rating: number; onRate?: (rating: number) => void }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform duration-150 transform hover:scale-125 focus:outline-none"
            type="button"
            aria-label={`Rate ${star} stars`}
          >
            <span
              className={`text-2xl material-symbols-outlined select-none ${
                isActive ? "text-primary fill-primary" : "text-on-surface-variant/40"
              }`}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              star
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MovieDetail;