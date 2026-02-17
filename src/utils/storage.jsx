import { useState, useEffect, useCallback } from "react";

export function getWatchlist() {
  const watchlist = localStorage.getItem("watchlist");

  if (watchlist) {
    try {
      const parsedList = JSON.parse(watchlist);

      if (!Array.isArray(parsedList)) {
        throw new Error("watchlist is not an array");
      }

      if (
        !parsedList.every(
          (el) =>
            typeof el === object &&
            "id" in el &&
            typeof el.id === "number" &&
            "title" in el &&
            typeof el.title === "string" &&
            "genre" in el &&
            typeof el.genre === "string" &&
            "rating" in el &&
            typeof el.rating === "number",
        )
      ) {
        throw new Error("watchlist items don't respect expected structure");
      }

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

  const toggleWatchlist = useCallback((movie) => {
    setWatchlist((watchlist) => {
      const exists = watchlist.find((elem) => elem.id === movie.id);

      if (exists) {
        return watchlist.filter((elem) => elem.id !== movie.id);
      } else {
        return [...watchlist, movie];
      }
    });
  }, []);

  const isWatchlisted = useCallback(
    (movieId) => {
      return watchlist.find((elem) => elem.id === movieId);
    },
    [watchlist],
  );

  return [watchlist, isWatchlisted, toggleWatchlist];
}
