import "./Search.css";

function Search({ searchQuery, setSearchQuery }) {
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
    </div>
  );
}

export function filterByQuery(searchQuery, movieList) {
  return movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
}

export default Search;
