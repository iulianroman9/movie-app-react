import "./Search.css";

function Search({ searchQuery, setSearchQuery, sortOrder, setSortOrder }) {
  const getSortButtonText = () => {
    if (sortOrder === "asc") return "A-Z";
    if (sortOrder === "desc") return "Z-A";
    return "Sort";
  };

  const nextSortOrder = () => {
    if (sortOrder === "no-sort") {
      return "asc";
    } else if (sortOrder === "asc") {
      return "desc";
    } else {
      return "no-sort";
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          id="movie-search"
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <button
        className="sorting-btn"
        onClick={() => setSortOrder(nextSortOrder())}
      >
        {getSortButtonText()}
      </button>
    </div>
  );
}

export function filterByQuery(searchQuery, movieList, sortOrder) {
  const filteredMovieList = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (sortOrder === "no-sort") return filteredMovieList;
  else {
    let sortedMovieList;
    if (sortOrder === "asc") {
      sortedMovieList = filteredMovieList.toSorted((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
    } else
      sortedMovieList = filteredMovieList.toSorted((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
      );
    return sortedMovieList;
  }
}

export default Search;
