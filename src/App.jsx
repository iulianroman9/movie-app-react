import { useState, useEffect } from "react";
import { getWatchlist } from "./utils/storage";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Search, { filterByQuery } from "./components/Search";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("no-sort");
  let [watchlist, setWatchlist] = useState(getWatchlist());

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((watchlist) => {
      const mappedList = watchlist.map((elem) => elem.id);

      if (mappedList.includes(movie.id)) {
        return watchlist.filter((elem) => elem.id !== movie.id);
      } else {
        return [...watchlist, movie];
      }
    });
  };

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
    if (isLoading) {
      return <div className="fetching-data">Fetching movies...</div>;
    }

    if (apiError) {
      return <div className="error-message">{apiError}</div>;
    }

    let filteredMovies = view === "home" ? movies : watchlist;
    filteredMovies = filterByQuery(searchQuery, filteredMovies, sortOrder);

    return (
      <MovieList
        movies={filteredMovies}
        watchlist={watchlist}
        toggleWatchlist={toggleWatchlist}
      />
    );
  };

  return (
    <div className="app">
      <Navbar view={view} setView={setView} />
      <Search
        query={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <main>{renderMovieList()}</main>
    </div>
  );
}

export default App;
