import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((arr) => setMovies(arr))
      .catch((error) => console.error(`Error fetching movies ${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="app">
      <main>
        {isLoading ? (
          <div className="fetching-data">Fetching data...</div>
        ) : (
          <MovieList
            movies={movies}
            watchlist={[1]}
            toggleWatchlist={() => {}}
          />
        )}
      </main>
    </div>
  );
}

export default App;
