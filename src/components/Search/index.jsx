import "./Search.css";

function Search({
  searchQuery,
  setSearchQuery,
  sortTitle,
  setSortTitle,
  sortRating,
  setSortRating,
  selectedGenre,
  setSelectedGenre,
}) {
  const getSortTitleText = () => {
    if (sortTitle === "asc") return "Titles: a-z";
    if (sortTitle === "desc") return "Titles: z-a";
    return "Sort titles";
  };

  const getSortRatingText = () => {
    if (sortRating === "asc") return "Rating: low";
    if (sortRating === "desc") return "Rating: high";
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
    const nextState = getNextSortState(sortTitle);
    setSortTitle(nextState);
    setSortRating("no-sort");
  };

  const handleSortRating = () => {
    const nextState = getNextSortState(sortRating);
    setSortRating(nextState);
    setSortTitle("no-sort");
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <select
        className="genre-select"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
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

export function filterByQuery(
  searchQuery,
  movieList,
  sortTitle,
  sortRating,
  selectedGenre,
) {
  let filteredMovieList = movieList;

  if (selectedGenre && selectedGenre !== "all") {
    filteredMovieList = filteredMovieList.filter(
      (movie) => movie.genre === selectedGenre,
    );
  }

  filteredMovieList = filteredMovieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (sortTitle === "asc")
    return filteredMovieList.toSorted((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
  else if (sortTitle === "desc")
    return filteredMovieList.toSorted((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
    );
  else if (sortRating === "asc")
    return filteredMovieList.toSorted(
      (a, b) => parseFloat(a.rating) - parseFloat(b.rating),
    );
  else if (sortRating === "desc")
    return filteredMovieList.toSorted(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
    );
  return filteredMovieList;
}

export default Search;
