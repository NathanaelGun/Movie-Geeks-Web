"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (!query.trim()) return; // Don't search if the input is empty
    router.push(`/movies?search=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center w-full gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full max-w-md px-4 py-2 text-black bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-red-500"
      />
      <button
        type="submit"
        className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;