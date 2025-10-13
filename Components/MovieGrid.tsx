'use client';

import React from 'react';
import MovieCard from '@/Components/MovieCard';

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
  const handleMovieSelect = async (id: string) => {
    const res = await fetch(`/api/movies?i=${id}`);
    const data = await res.json();
    if (data.movie) {
      console.log('Selected movie:', data.movie);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          imdbID={movie.imdbID}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          onClick={handleMovieSelect}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
