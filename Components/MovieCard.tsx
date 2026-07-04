import React from "react";

type MovieCardProps = {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
  onClick: (id: string) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({
  Poster,
  Title,
  Year,
  imdbID,
  onClick,
}) => {
  const imageUrl =
    Poster && Poster !== "N/A"
      ? Poster
      : "https://placehold.co/500x750?text=No+Image";

  return (
    <button
      onClick={() => onClick(imdbID)}
      className="focus:outline-none w-full relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/5 hover:border-primary/30 aspect-[2/3]"
    >
      <img
        src={imageUrl}
        alt={`Poster for ${Title}`}
        className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
      />
      {/* Bottom Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-95 transition-opacity duration-300"></div>

      {/* Info card title sliding up on hover */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end text-left z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-surface-variant/85 backdrop-blur-md text-on-surface-variant text-[10px] font-bold">
            {Year}
          </span>
        </div>
        <h3 className="font-bold text-sm md:text-base text-on-surface line-clamp-2 leading-snug drop-shadow-md group-hover:text-primary transition-colors duration-200">
          {Title}
        </h3>
      </div>
    </button>
  );
};

export default MovieCard;