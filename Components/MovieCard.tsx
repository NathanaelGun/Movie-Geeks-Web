import React from 'react';
import Image from 'next/image';

type MovieCardProps = {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string; // Add imdbID to identify the movie
  onClick: (id: string) => void; // Add onClick handler
};

const MovieCard: React.FC<MovieCardProps> = ({ Poster, Title, Year, imdbID, onClick }) => {
  // ✅ If the Poster is "N/A" or missing, use a placeholder image
  const imageUrl = Poster && Poster !== "N/A" 
    ? Poster 
    : "https://placehold.co/500x750?text=No+Image";

  return (
    <div onClick={() => onClick(imdbID)} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-black/40">
      <Image
        src={imageUrl}
        alt={`Poster for ${Title}`}
        width={500}
        height={750}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-xl font-bold">{Title}</h3>
        <p className="text-sm text-gray-300">{Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;