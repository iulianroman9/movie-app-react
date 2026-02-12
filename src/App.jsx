import { useState, useEffect } from "react";
import { useWatchlist } from "./utils/storage";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("home");
  const [movies, setMovies] = useState([]);
  const [watchlist, isWatchlisted, toggleWatchlist] = useWatchlist();
  const [filters, setFilters] = useState({
    query: "",
    title: "no-sort",
    rating: "no-sort",
    genre: "all",
  });

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

  return (
    <div className="app">
      <Navbar view={view} setView={setView} />
      <Search filters={filters} setFilters={setFilters} />
      <main>
        <MovieList
          movies={view === "home" ? movies : watchlist}
          isLoading={isLoading}
          apiError={apiError}
          filters={filters}
          isWatchlisted={isWatchlisted}
          toggleWatchlist={toggleWatchlist}
        />
      </main>
    </div>
  );
}

export default App;
