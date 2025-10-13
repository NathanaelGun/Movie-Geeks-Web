import React, { useState } from 'react';
import Image from 'next/image';
import { useRef } from 'react';

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

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  const title = movie.Title || "Unknown Title";
  const year = movie.Year || "N/A";
  const genre = movie.Genre || "N/A";
  const runtime = movie.Runtime || "N/A";
  const director = movie.Director || "N/A";
  const actors = movie.Actors || "N/A";
  const plot = movie.Plot || "No plot available.";
  const rating = movie.imdbRating || "N/A";

  return (
    <section className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-4xl my-8 relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-white z-10 transition"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Poster Image */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-96 rounded-lg overflow-hidden bg-gray-700">
              {hasPoster && !imageError ? (
                <Image
                  src={movie.Poster!}
                  alt={`Poster for ${title}`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-600 text-gray-400">
                  <div className="text-center">
                    <p className="text-4xl mb-2">🎬</p>
                    <p>No Poster Available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-4xl font-bold">{title}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {year} • {genre} • {runtime}
              </p>
            </div>

            {/* Plot */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Plot</h3>
              <p className="text-gray-300 leading-relaxed">{plot}</p>
            </div>

            {/* Credits */}
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-400">Director</p>
                <p className="font-semibold">{director}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Actors</p>
                <p className="font-semibold text-sm">{actors}</p>
              </div>
            </div>

            {/* Ratings */}
            <div className="bg-gray-700 rounded-lg p-4 mt-6 flex items-center gap-8">
              <div>
                <p className="text-sm text-gray-300 mb-1">IMDb Rating</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {rating === "N/A" ? "N/A" : `${rating}/10`}
                </p>
              </div>
              <div className="border-l border-gray-600"></div>
              <div>
                <p className="text-sm text-gray-300 mb-2">Your Rating</p>
                <StarRating />
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
              {movie.Rated && <p>Rated: {movie.Rated}</p>}
              {movie.Released && <p>Released: {movie.Released}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function StarRating({ onRate }: { onRate?: (rating: number) => void }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const handleClick = (rating: number) => {
    setUserRating(rating);
    onRate?.(rating);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition transform hover:scale-110"
        >
          <span
            className={`text-2xl ${
              star <= (hoverRating || userRating)
                ? "text-yellow-400"
                : "text-gray-500"
            }`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default MovieDetail;