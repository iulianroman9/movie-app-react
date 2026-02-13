import { useState, useEffect } from "react";
import { useWatchlist } from "../../utils/storage";
import MovieCard from "../MovieCard";
import "./MovieList.css";

function MovieList({ view, filters }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [watchlist, isWatchlisted, toggleWatchlist] = useWatchlist();

  useEffect(() => {
    fetch("movies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API call error, status: ${response.status}`);
        }
        return response.json();
      })
      .then((arr) => setMovies(arr))
      .catch((error) => {
        console.error(`Error fetching movies: ${error}`);
        setApiError("Failed to load movies. Try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="fetching-data">Fetching movies...</div>;
  if (apiError) return <div className="error-message">{apiError}</div>;

  const listToRender = view === "home" ? movies : watchlist;

  if (listToRender.length === 0 || !listToRender)
    return <div className="movie-list-empty">No movies to list.</div>;

  const filteredMovieList = filterByQuery(listToRender, filters);

  const movieList = filteredMovieList.map((movie) => {
    const isInWatchlist = isWatchlisted(movie.id);

    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        isWatchlisted={isInWatchlist}
        toggleWatchlist={toggleWatchlist}
      />
    );
  });

  return <div className="movie-list">{movieList}</div>;
}

function filterByQuery(movieList, filters) {
  let filteredMovieList = movieList;

  if (filters.genre !== "all") {
    filteredMovieList = filteredMovieList.filter(
      (movie) => movie.genre === filters.genre,
    );
  }

  filteredMovieList = filteredMovieList.filter((movie) =>
    movie.title.toLowerCase().includes(filters.query.toLowerCase()),
  );

  switch (filters.title) {
    case "asc":
      return filteredMovieList.toSorted((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
    case "desc":
      return filteredMovieList.toSorted((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
      );
    default:
      break;
  }

  switch (filters.rating) {
    case "asc":
      return filteredMovieList.toSorted(
        (a, b) => parseFloat(a.rating) - parseFloat(b.rating),
      );
    case "desc":
      return filteredMovieList.toSorted(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
      );
    default:
      break;
  }

  return filteredMovieList;
}

export default MovieList;
