import "./Search.css";

function Search({ filters, setFilters }) {
  const genres = ["drama", "action", "fantasy", "horror"];

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          id="movie-search"
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          autoComplete="off"
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        />
      </form>
      <select
        className="genre-select"
        value={filters.genre}
        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
      >
        <option value="all">all</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <button
        className="sorting-btn"
        onClick={() => handleSortTitle(filters, setFilters)}
      >
        {getSortTitleText(filters)}
      </button>

      <button
        className="sorting-btn"
        onClick={() => handleSortRating(filters, setFilters)}
      >
        {getSortRatingText(filters)}
      </button>
    </div>
  );
}

const handleSortTitle = (filters, setFilters) => {
  const nextState = getNextSortState(filters.title);
  setFilters({ ...filters, title: nextState, rating: "no-sort" });
};

const handleSortRating = (filters, setFilters) => {
  const nextState = getNextSortState(filters.rating);
  setFilters({ ...filters, title: "no-sort", rating: nextState });
};

const getSortTitleText = (filters) => {
  switch (filters.title) {
    case "asc":
      return "Titles: a-z";
    case "desc":
      return "Titles: z-a";
    default:
      return "Sort titles";
  }
};

const getSortRatingText = (filters) => {
  switch (filters.rating) {
    case "asc":
      return "Rating: low";
    case "desc":
      return "Rating: high";
    default:
      return "Sort ratings";
  }
};

const getNextSortState = (currentState) => {
  switch (currentState) {
    case "no-sort":
      return "asc";
    case "asc":
      return "desc";
    default:
      return "no-sort";
  }
};

export default Search;
