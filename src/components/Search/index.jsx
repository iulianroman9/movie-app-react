import "./Search.css";

function Search({ filter, setFilter }) {
  const getSortTitleText = () => {
    if (filter.title === "asc") return "Titles: a-z";
    if (filter.title === "desc") return "Titles: z-a";
    return "Sort titles";
  };

  const getSortRatingText = () => {
    if (filter.rating === "asc") return "Rating: low";
    if (filter.rating === "desc") return "Rating: high";
    return "Sort ratings";
  };

  const getNextSortState = (currentState) => {
    if (currentState === "no-sort") {
      return "asc";
    } else if (currentState === "asc") {
      return "desc";
    } else {
      return "no-sort";
    }
  };

  const handleSortTitle = () => {
    const nextState = getNextSortState(filter.title);
    setFilter({ ...filter, title: nextState, rating: "no-sort" });
  };

  const handleSortRating = () => {
    const nextState = getNextSortState(filter.rating);
    setFilter({ ...filter, title: "no-sort", rating: nextState });
  };

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
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        />
      </form>
      <select
        className="genre-select"
        value={filter.genre}
        onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
      >
        <option value="all">all</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <button className="sorting-btn" onClick={handleSortTitle}>
        {getSortTitleText()}
      </button>

      <button className="sorting-btn" onClick={handleSortRating}>
        {getSortRatingText()}
      </button>
    </div>
  );
}

export function filterByQuery(movieList, filter) {
  let filteredMovieList = movieList;

  if (filter.genre !== "all") {
    filteredMovieList = filteredMovieList.filter(
      (movie) => movie.genre === filter.genre,
    );
  }

  filteredMovieList = filteredMovieList.filter((movie) =>
    movie.title.toLowerCase().includes(filter.query.toLowerCase()),
  );

  if (filter.title === "asc")
    return filteredMovieList.toSorted((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
  else if (filter.title === "desc")
    return filteredMovieList.toSorted((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
    );
  else if (filter.rating === "asc")
    return filteredMovieList.toSorted(
      (a, b) => parseFloat(a.rating) - parseFloat(b.rating),
    );
  else if (filter.rating === "desc")
    return filteredMovieList.toSorted(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
    );
  return filteredMovieList;
}

export default Search;
