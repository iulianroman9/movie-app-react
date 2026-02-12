import { useState, useEffect } from "react";

export function getWatchlist() {
  const watchlist = localStorage.getItem("watchlist");

  if (watchlist) {
    try {
      const parsedList = JSON.parse(watchlist);
      return parsedList;
    } catch (error) {
      console.error(`Error parsing watchlist from local storage: ${error}`);
      return [];
    }
  }

  return [];
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(getWatchlist);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((watchlist) => {
      const exists = watchlist.find((elem) => elem.id === movie.id);

      if (exists) {
        return watchlist.filter((elem) => elem.id !== movie.id);
      } else {
        return [...watchlist, movie];
      }
    });
  };

  const isWatchlisted = (movieId) => {
    return watchlist.find((elem) => elem.id === movieId);
  };

  return [watchlist, isWatchlisted, toggleWatchlist];
}
