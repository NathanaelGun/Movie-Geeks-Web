"use client";

import { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl transition-colors"
          >
            <span
              className={starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-500'}
            >
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;