"use client";

import React, { useState } from "react";
import MovieCard from "@/Components/MovieCard";
import MovieDetail, { MovieDetails } from "@/Components/MovieDetail";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

type Props = {
  movies: Movie[];
};

const MovieGrid = ({ movies }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loadingMovieId, setLoadingMovieId] = useState<string | null>(null);

  const handleMovieSelect = async (id: string) => {
    setLoadingMovieId(id);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      let data;
      if (apiKey) {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        data = await res.json();
      } else {
        const res = await fetch(`/api/movies?i=${id}`);
        const result = await res.json();
        data = result.movie;
      }
      if (data) {
        setSelectedMovie(data);
      }
    } catch (err) {
      console.error("Error fetching movie details inside MovieGrid:", err);
    } finally {
      setLoadingMovieId(null);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="relative">
            <MovieCard
              imdbID={movie.imdbID}
              Title={movie.Title}
              Year={movie.Year}
              Poster={movie.Poster}
              onClick={handleMovieSelect}
            />
            {loadingMovieId === movie.imdbID && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl pointer-events-none">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default MovieGrid;

