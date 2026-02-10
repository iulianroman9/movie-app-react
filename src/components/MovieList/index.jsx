import MovieCard from "../MovieCard";
import "./MovieList.css";

function MovieList({ movies, watchlist, toggleWatchlist }) {
  if (movies.length === 0 || !movies)
    return <div className="movie-list-empty">No movies to list.</div>;

  const movieList = movies.map((movie) => {
    const mappedWatchList = watchlist.map((item) => item.id);
    const isWatchlisted = mappedWatchList.includes(movie.id);

    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        isWatchlisted={isWatchlisted}
        toggleWatchlist={() => toggleWatchlist(movie)}
      />
    );
  });

  return <div className="movie-list">{movieList}</div>;
}

export default MovieList;
