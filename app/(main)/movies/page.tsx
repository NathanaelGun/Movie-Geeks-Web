"use client"; // 1. Convert to a Client Component
export const dynamic = "force-dynamic"; 

import React, { useState, useEffect } from 'react';
import Hero from '@/Components/Hero';
import MovieCard from '@/Components/MovieCard';
import SearchBar from '@/Components/SearchBar';
import PaginationControls from '@/Components/PaginationControls';
import MovieDetail, { MovieDetails } from '@/Components/MovieDetail'; // Import the new component and type
import { useSearchParams } from 'next/navigation';

// Type for the list of movies from a search
type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const MoviesPage = () => {
  // 2. Manage state with hooks
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  // 3. Fetch movies when search or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const searchTerm = searchQuery || "life";
      const url = `/api/movies?s=${searchTerm}&page=${page}`; // Use an API route
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.movies) {
        setMovies(data.movies);
        setTotalResults(data.totalResults);
      }
      setIsLoading(false);
    };
    fetchMovies();
  }, [searchQuery, page]);

  const handleMovieSelect = async (id: string) => {
    const url = `/api/movies?i=${id}`; // Use an API route
    const res = await fetch(url);
    const data = await res.json();
    if (data.movie) {
      setSelectedMovie(data.movie);
    }
  };

  const hasPrevPage = page > 1;
  const hasNextPage = page * 10 < totalResults;

  return (
    <div>
      <Hero
        title="Movie Collection"
        subtitle="Browse through our vast collection or search for a specific title."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {isLoading ? <p className="text-center">Loading movies...</p> : (
          movies.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie: Movie) => (
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
              <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
            </div>
          ) : <p className="text-center text-gray-400">No movies found.</p>
        )}
      </div>

      {/* 5. Conditionally render the MovieDetail component */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default MoviesPage;