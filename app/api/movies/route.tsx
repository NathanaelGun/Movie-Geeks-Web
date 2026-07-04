import { NextResponse } from 'next/server';
import { searchTMDBMovies, getTMDBMovieById } from './tmdbHelper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('s') || '';
  const id = searchParams.get('i');
  const pageStr = searchParams.get('page') || '1';
  const page = parseInt(pageStr, 10) || 1;

  if (id) {
    const movie = await getTMDBMovieById(id);
    return NextResponse.json({ movie });
  }

  const { movies, totalResults } = await searchTMDBMovies(search, page);
  return NextResponse.json({ movies, totalResults });
}
