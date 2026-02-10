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
