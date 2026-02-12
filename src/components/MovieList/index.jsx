import MovieCard from "../MovieCard";
import "./MovieList.css";

function MovieList({ movies, isWatchlisted, toggleWatchlist }) {
  if (movies.length === 0 || !movies)
    return <div className="movie-list-empty">No movies to list.</div>;

  const movieList = movies.map((movie) => {
    const isInWatchlist = isWatchlisted(movie.id);

    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        isWatchlisted={isInWatchlist}
        toggleWatchlist={() => toggleWatchlist(movie)}
      />
    );
  });

  return <div className="movie-list">{movieList}</div>;
}

export default MovieList;
