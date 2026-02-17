import { useState } from "react";
import Search from "../Search";
import MovieList from "../MovieList";

function MoviesIndex({ view = "home" }) {
  const [filters, setFilters] = useState({
    query: "",
    title: "no-sort",
    rating: "no-sort",
    genre: "all",
  });

  return (
    <>
      <Search filters={filters} setFilters={setFilters} />
      <MovieList view={view} filters={filters} />
    </>
  );
}

export default MoviesIndex;
