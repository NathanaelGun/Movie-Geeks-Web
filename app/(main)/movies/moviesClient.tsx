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

  const handleMovieClick = async (movie: Movie) => {
    setLoadingMovieId(movie.imdbID);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
      );
      const data = await res.json();
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
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchInput onSearch={handleSearch} initialValue={search} />
      </div>

      {/* Movies Grid */}
      <div className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
        {initialMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {initialMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onCardClick={() => handleMovieClick(movie)}
                isLoading={loadingMovieId === movie.imdbID}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isPending}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
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
                  className={`px-3 py-2 rounded border ${
                    pageNum === page
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:bg-gray-100"
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
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {totalPages > 0 && (
        <p className="text-center mt-4 text-sm text-gray-600">
          Page {page} of {totalPages} • Total results: {totalResults}
        </p>
      )}

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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
  return (
    <button
      onClick={onCardClick}
      disabled={isLoading}
      className="focus:outline-none"
    >
      <div
        className={`
          bg-gradient-to-br from-blue-500 to-purple-600
          w-full rounded-2xl flex items-center justify-center 
          font-bold text-white text-lg
          cursor-pointer 
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg hover:brightness-70
          aspect-[3/4]
          overflow-hidden
          relative
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-300 flex items-end p-3">
          <div className="text-left">
            <h3 className="font-bold text-sm line-clamp-2">{movie.Title}</h3>
            <p className="text-xs text-gray-300">{movie.Year}</p>
          </div>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </button>
  );
}