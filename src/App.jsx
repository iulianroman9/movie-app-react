import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((arr) => setMovies(arr))
      .catch((error) => console.error(`Error fetching movies ${error}`));
  }, []);

  return (
    <div className="app">
      <main>
        <MovieList movies={movies} watchlist={[1]} toggleWatchlist={() => {}} />
      </main>
    </div>
  );
}

export default App;
