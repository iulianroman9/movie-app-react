import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [apiError, setApiError] = useState(null);

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

  const render = () => {
    if (isLoading) {
      return <div className="fetching-data">Fetching movies...</div>;
    }

    if (apiError) {
      return <div className="error-message">{apiError}</div>;
    }

    return (
      <MovieList movies={movies} watchlist={[1]} toggleWatchlist={() => {}} />
    );
  };

  return (
    <div className="app">
      <main>{render()}</main>
    </div>
  );
}

export default App;
