import MovieCard from "./components/MovieCard";

function App() {
  return (
    <div>
      <h1>base app</h1>
      <MovieCard
        movie={{
          id: 1,
          title: "Dark Storm",
          image: "1.jpg",
          genre: "drama",
          rating: "8.3",
        }}
      />
    </div>
  );
}

export default App;
