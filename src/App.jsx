import { useState, useEffect } from "react";
import { useWatchlist } from "./utils/storage";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Search, { filterByQuery } from "./components/Search";
import "./App.css";

function App() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("home");
  const [movies, setMovies] = useState([]);
  const [watchlist, isWatchlisted, toggleWatchlist] = useWatchlist();
  const [filter, setFilter] = useState({
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

  const renderMovieList = () => {
    if (isLoading)
      return <div className="fetching-data">Fetching movies...</div>;
    if (apiError) return <div className="error-message">{apiError}</div>;

    const whichMovies = view === "home" ? movies : watchlist;
    const filteredMovies = filterByQuery(whichMovies, filter);

    return (
      <MovieList
        movies={filteredMovies}
        isWatchlisted={isWatchlisted}
        toggleWatchlist={toggleWatchlist}
      />
    );
  };

  return (
    <div className="app">
      <Navbar view={view} setView={setView} />
      <Search filter={filter} setFilter={setFilter} />
      <main>{renderMovieList()}</main>
    </div>
  );
}

export default App;
