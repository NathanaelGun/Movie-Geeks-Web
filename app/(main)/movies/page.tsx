export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import Hero from "@/Components/Hero";
import MoviesClient from "./moviesClient";

// ✅ Ganti interface ini dengan tipe inline bawaan
export default async function MoviesPage({
  searchParams,
}: {
  // Match Next's generated PageProps: searchParams may be a Promise<any> or undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Promise<any> | undefined;
}) {
  // Await if it's a promise (Next may pass a Promise wrapper)
  const resolvedSearchParams =
    searchParams && typeof (searchParams as { then?: unknown })?.then === 'function'
      ? await (searchParams as Promise<Record<string, unknown> | undefined>)
      : (searchParams as Record<string, unknown> | undefined);

  // Normalize possible string[] values
  const rawSearch = Array.isArray(resolvedSearchParams?.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams?.search;
  const rawPage = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams?.page;

  const search = rawSearch || '';
  const page = Number(rawPage || '1');

  const { movies, totalResults } = await getMovies(search, page);

  return (
    <div>
      <Hero
        title="Movie Collection"
        subtitle="Browse through our vast collection or search for a specific title."
      />
      <MoviesClient
        initialMovies={movies}
        totalResults={totalResults}
        search={search}
        page={page}
      />
    </div>
  );
}

async function getMovies(search: string, page: number) {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const searchTerm = search || "life";
  const url = `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${apiKey}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (data.Search) {
      return { movies: data.Search, totalResults: parseInt(data.totalResults) };
    } else {
      return { movies: [], totalResults: 0 };
    }
  } catch (err) {
    console.error("Error fetching movies:", err);
    return { movies: [], totalResults: 0 };
  }
}
