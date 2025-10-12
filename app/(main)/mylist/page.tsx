import React from 'react';
import Hero from '@/Components/Hero';
import MovieCard from '@/Components/MovieCard';

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

// This function fetches details for a list of specific movie IDs
async function getMyListMovies() {
  const apiKey = process.env.OMDB_API_KEY;
  // A hardcoded list of IMDb IDs to represent the user's saved movies
  const movieIds = ['tt1375666', 'tt1160419', 'tt0816692']; // Inception, Dune, Interstellar

  try {
    // Create an array of fetch requests
    const moviePromises = movieIds.map(async (id) => {
      const url = `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
      const res = await fetch(url);
      return res.json();
    });

    // Wait for all fetch requests to complete
    const movies = await Promise.all(moviePromises);
    return movies.filter(movie => movie.Response === "True"); // Filter out any errors
  
  } catch (error) {
    console.error("Failed to fetch watchlist:", error);
    return [];
  }
}

const MyListPage = async () => {
  const myListMovies: Movie[] = await getMyListMovies();

  return (
    <div>
      <Hero
        title="My Watchlist"
        subtitle="Your curated list of movies to watch."
      />

      <div className="container mx-auto px-4 py-8">
        {myListMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {myListMovies.map((movie) => (
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
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">Your watchlist is empty.</h2>
            <p className="text-gray-400 mt-2">
              In a real app, you would add movies here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListPage;