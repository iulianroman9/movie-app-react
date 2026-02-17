import { useMemo } from "react";
import { useSearchParams } from "react-router";
import Search from "../Search";
import MovieList from "../MovieList";

function MoviesIndex({ view = "home" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      query: searchParams.get("query") || "",
      title: searchParams.get("title") || "no-sort",
      rating: searchParams.get("rating") || "no-sort",
      genre: searchParams.get("genre") || "all",
    }),
    [searchParams],
  );

  return (
    <>
      <Search filters={filters} setFilters={setSearchParams} />
      <MovieList view={view} filters={filters} />
    </>
  );
}

export default MoviesIndex;
