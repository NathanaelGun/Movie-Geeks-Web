export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import MoviesClient from "./moviesClient";
import { searchTMDBMovies } from "../../api/movies/tmdbHelper";

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

  const { movies, totalResults } = await searchTMDBMovies(search, page);

  return (
    <div className="min-h-screen bg-background">
      <MoviesClient
        initialMovies={movies}
        totalResults={totalResults}
        search={search}
        page={page}
      />
    </div>
  );
}


