import React from 'react';
import Image from 'next/image';
import StarRating from './StarRatings';

// Define the shape of the detailed movie data from the API
export type MovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
};

type MovieDetailProps = {
  movie: MovieDetails;
  onClose: () => void; // Function to close the detail view
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose }) => {
  const imageUrl = movie.Poster && movie.Poster !== "N/A" 
    ? movie.Poster 
    : "https://placehold.co/500x750/333/FFF?text=No+Image";

  return (
    <section className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-white">&times;</button>
        <div className="flex flex-col md:flex-row">
          <Image
            src={imageUrl}
            alt={`Poster for ${movie.Title}`}
            width={300}
            height={450}
            className="object-cover rounded-l-lg"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold">{movie.Title} ({movie.Year})</h2>
            <p className="text-sm text-gray-400">{movie.Genre} &middot; {movie.Runtime}</p>
            <p className="mt-4">{movie.Plot}</p>
            
            <div className="mt-4">
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div>
                <p className="font-bold text-lg">IMDb Rating</p>
                <p className="text-2xl text-yellow-400">{movie.imdbRating} / 10</p>
              </div>
              <div>
                <p className="font-bold text-lg">Your Rating</p>
                <StarRating />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;