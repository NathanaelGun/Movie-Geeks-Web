export interface MovieDetails {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Poster?: string;
  imdbRating?: string;
  imdbID: string;
  Type: string;
  Response?: string;
}

export const mockDatabase: MovieDetails[] = [
  {
    imdbID: "tt0241527",
    Title: "Harry Potter and the Sorcerer's Stone",
    Year: "2001",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjdeMjExOTk1OF5BMl5BanBnXkFtZTgwNDA0MjkyNTE@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Adventure, Family, Fantasy",
    Runtime: "152 min",
    Director: "Chris Columbus",
    Actors: "Daniel Radcliffe, Rupert Grint, Richard Harris",
    Plot: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    imdbRating: "7.6",
    Rated: "PG",
    Released: "16 Nov 2001"
  },
  {
    imdbID: "tt0295297",
    Title: "Harry Potter and the Chamber of Secrets",
    Year: "2002",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg",
    Type: "movie",
    Genre: "Adventure, Family, Fantasy",
    Runtime: "161 min",
    Director: "Chris Columbus",
    Actors: "Daniel Radcliffe, Rupert Grint, Emma Watson",
    Plot: "An ancient prophecy foretells of a chamber containing a monster that can only be controlled by the Heir of Slytherin. Harry Potter finds himself at the center of the mystery.",
    imdbRating: "7.4",
    Rated: "PG",
    Released: "15 Nov 2002"
  },
  {
    imdbID: "tt0304141",
    Title: "Harry Potter and the Prisoner of Azkaban",
    Year: "2004",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTYyNzg3NjMyN15BMl5BanBnXkFtZTcwOTYzMzQxNw@@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Adventure, Family, Fantasy",
    Runtime: "142 min",
    Director: "Alfonso Cuarón",
    Actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
    Plot: "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner.",
    imdbRating: "7.9",
    Rated: "PG",
    Released: "04 Jun 2004"
  },
  {
    imdbID: "tt0330373",
    Title: "Harry Potter and the Goblet of Fire",
    Year: "2005",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Adventure, Family, Fantasy",
    Runtime: "157 min",
    Director: "Mike Newell",
    Actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
    Plot: "Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.",
    imdbRating: "7.7",
    Rated: "PG-13",
    Released: "18 Nov 2005"
  },
  {
    imdbID: "tt1160419",
    Title: "Dune",
    Year: "2021",
    Poster: "https://m.media-amazon.com/images/M/MV5BN2FjYjhjN2UtYjlkYi00YTYwLWYyYjgtYWVkODFmYjQyODgxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Action, Adventure, Sci-Fi",
    Runtime: "155 min",
    Director: "Denis Villeneuve",
    Actors: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
    Plot: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes plagued by visions of a dark future.",
    imdbRating: "8.0",
    Rated: "PG-13",
    Released: "22 Oct 2021"
  },
  {
    imdbID: "tt15239678",
    Title: "Dune: Part Two",
    Year: "2024",
    Poster: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00NTU2LWIyY2UtZWY3MjQ3MTUwZjg4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    Type: "movie",
    Genre: "Action, Adventure, Sci-Fi",
    Runtime: "166 min",
    Director: "Denis Villeneuve",
    Actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
    Plot: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    imdbRating: "8.6",
    Rated: "PG-13",
    Released: "01 Mar 2024"
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Action, Sci-Fi, Adventure",
    Runtime: "148 min",
    Director: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imdbRating: "8.8",
    Rated: "PG-13",
    Released: "16 Jul 2010"
  },
  {
    imdbID: "tt0816692",
    Title: "Interstellar",
    Year: "2014",
    Poster: "https://m.media-amazon.com/images/M/MV5BYl5hZDY5MDktNzg3Yi00Nzg0LTkwOTItZWY2ODRlM2M0NDFmXkEyXkFqcGdeQXVyMTAzMDM4MjM0._V1_SX300.jpg",
    Type: "movie",
    Genre: "Adventure, Drama, Sci-Fi",
    Runtime: "169 min",
    Director: "Christopher Nolan",
    Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    Plot: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    imdbRating: "8.7",
    Rated: "PG-13",
    Released: "07 Nov 2014"
  },
  {
    imdbID: "tt0076759",
    Title: "Star Wars: Episode IV - A New Hope",
    Year: "1977",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTA5NjQ1MTI5NV5BMl5BanBnXkFtZTgwNTcxNTk2MTE@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Action, Adventure, Fantasy",
    Runtime: "121 min",
    Director: "George Lucas",
    Actors: "Mark Hamill, Harrison Ford, Carrie Fisher",
    Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    imdbRating: "8.6",
    Rated: "PG",
    Released: "25 May 1977"
  },
  {
    imdbID: "tt0080684",
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Year: "1980",
    Poster: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzg5MC00MGE2LTk5NDgtNzk4MWI2YWUzMTU3XkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_SX300.jpg",
    Type: "movie",
    Genre: "Action, Adventure, Fantasy",
    Runtime: "124 min",
    Director: "Irvin Kershner",
    Actors: "Mark Hamill, Harrison Ford, Carrie Fisher",
    Plot: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett in all corners of the galaxy.",
    imdbRating: "8.7",
    Rated: "PG",
    Released: "20 Jun 1980"
  }
];

export function getMockMovies(query: string, page: number = 1) {
  const searchTerm = (query || "life").toLowerCase();
  
  // Filter search matches
  let results = mockDatabase.filter(m => 
    m.Title.toLowerCase().includes(searchTerm) || 
    m.Genre?.toLowerCase().includes(searchTerm) ||
    m.Actors?.toLowerCase().includes(searchTerm)
  );

  // If no match found, fallback to return a small generic list so page doesn't look completely empty on generic queries
  if (results.length === 0 && !query) {
    results = mockDatabase.slice(0, 5);
  }

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = results.slice(startIndex, startIndex + itemsPerPage);

  return {
    movies: paginated,
    totalResults: results.length
  };
}

export function getMockMovieById(id: string): MovieDetails | null {
  const movie = mockDatabase.find(m => m.imdbID === id);
  return movie || null;
}
