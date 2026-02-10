import MovieCard from "../MovieCard";
import "./MovieList.css";

function MovieList({ movies, watchlist, toggleWatchlist }) {
  if (movies.length === 0 || !movies)
    return <div className="movie-list-empty">No movies to list.</div>;

  const movieList = movies.map((movie) => {
    const isWatchlisted = watchlist.includes(movie.id);

    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        isWatchlisted={isWatchlisted}
        toggleWatchlist={toggleWatchlist}
      />
    );
  });

  return <div className="movie-list">{movieList}</div>;
}

export default MovieList;
