import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('s');
  const id = searchParams.get('i');
  const page = searchParams.get('page');
  const apiKey = process.env.OMDB_API_KEY;

  let url = 'http://www.omdbapi.com/?';

  if (id) {
    url += `i=${id}&apikey=${apiKey}`;
    const res = await fetch(url);
    const movie = await res.json();
    return NextResponse.json({ movie });
  }

  url += `s=${search}&page=${page}&type=movie&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  
  return NextResponse.json({
    movies: data.Search,
    totalResults: parseInt(data.totalResults, 10),
  });
}