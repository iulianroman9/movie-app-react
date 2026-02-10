import "./MovieCard.css";

function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const classList = isWatchlisted
    ? "movie-watchlist-button active"
    : "movie-watchlist-button";
  const buttonText = isWatchlisted ? "In watchlist " : "Add to watchlist";

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={`/images/${movie.id}.jpg`} alt="movie-poster" />
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <div className="movie-meta-info">
          <p>{`Genre: ${movie.genre}`}</p>
          <p>{`Rating: ${movie.rating}/10`}</p>
        </div>
      </div>
      <button className={classList} onClick={() => toggleWatchlist(movie)}>
        {buttonText}
      </button>
    </div>
  );
}

export default MovieCard;
