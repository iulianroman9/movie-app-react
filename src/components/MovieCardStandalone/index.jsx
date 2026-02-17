import { useLoaderData } from "react-router";
import { useWatchlist } from "../../utils/storage";
import MovieCard from "../MovieCard";
import "./MovieCardStandalone.css";

function MovieCardStandalone() {
  const movie = useLoaderData();
  const [watchlist, isWatchlisted, toggleWatchlist] = useWatchlist();

  return (
    <div className="movie-card-wrapper">
      <MovieCard
        movie={movie}
        isWatchlisted={isWatchlisted(movie.id)}
        toggleWatchlist={toggleWatchlist}
      />
    </div>
  );
}

export default MovieCardStandalone;
