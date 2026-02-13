import { useState } from "react";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const [filters, setFilters] = useState({
    query: "",
    title: "no-sort",
    rating: "no-sort",
    genre: "all",
  });

  return (
    <div className="app">
      <Navbar view={view} setView={setView} />
      <Search filters={filters} setFilters={setFilters} />
      <main>
        <MovieList view={view} filters={filters} />
      </main>
    </div>
  );
}

export default App;
