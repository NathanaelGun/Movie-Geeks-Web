import React from 'react';
import Hero from '@/Components/Hero';
import MovieGrid from '@/Components/MovieGrid'; // Client Component

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

// Server-side fetch data dari OMDb API
async function getMyListMovies(): Promise<Movie[]> {
  const apiKey = process.env.OMDB_API_KEY;
  const movieIds = ['tt1375666', 'tt1160419', 'tt0816692']; // Inception, Dune, Interstellar

  try {
    const moviePromises = movieIds.map(async (id) => {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`, {
        next: { revalidate: 3600 }, // cache 1 jam
      });
      return res.json();
    });

    const movies = await Promise.all(moviePromises);
    return movies.filter((m) => m.Response === 'True');
  } catch (err) {
    console.error('Failed to fetch mylist movies:', err);
    return [];
  }
}

const MyListPage = async () => {
  const myListMovies = await getMyListMovies();

  return (
    <div>
      <Hero title="My Watchlist" subtitle="Your curated list of movies to watch." />

      <div className="container mx-auto px-4 py-8">
        {myListMovies.length > 0 ? (
          <MovieGrid movies={myListMovies} />
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
