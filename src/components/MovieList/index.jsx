import { useEffect, useMemo } from "react";
import { useWatchlist } from "../../utils/storage";
import MovieCard from "../MovieCard";
import "./MovieList.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../store/moviesSlice";

function MovieList({ view, filters }) {
  const dispatch = useDispatch();
  const [watchlist, isWatchlisted, toggleWatchlist] = useWatchlist();
  const { movies, isLoading, isApiError } = useSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    if (movies.length === 0) dispatch(fetchMovies());
  }, [movies.length]);

  const listToRender = view === "home" ? movies : watchlist;

  const filteredMovieList = useMemo(() => {
    if (listToRender.length === 0 || !listToRender) return [];
    return filterByQuery(listToRender, filters);
  }, [listToRender, filters]);

  if (isLoading) return <div className="fetching-data">Fetching movies...</div>;
  if (isApiError) return <div className="error-message">{isApiError}</div>;

  if (filteredMovieList.length === 0)
    return <div className="movie-list-empty">No movies to list.</div>;

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
  console.log(movieList);
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
