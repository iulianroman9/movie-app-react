import MovieList from "./components/MovieList";

function App() {
  const movies = [
    {
      id: 1,
      title: "Dark Storm",
      image: "1.jpg",
      genre: "drama",
      rating: "8.3",
    },
    {
      id: 2,
      title: "Whisper of Fate",
      image: "2.jpg",
      genre: "fantasy",
      rating: "7.7",
    },
    {
      id: 3,
      title: "Beyond the Edge",
      image: "3.jpg",
      genre: "horror",
      rating: "6.3",
    },
    {
      id: 4,
      title: "Lost in Shadows",
      image: "4.jpg",
      genre: "action",
      rating: "9.3",
    },
    {
      id: 5,
      title: "Echoes of Power",
      image: "5.jpg",
      genre: "fantasy",
      rating: "6.9",
    },
    {
      id: 6,
      title: "Grim Reckoning",
      image: "6.jpg",
      genre: "drama",
      rating: "8.4",
    },
    {
      id: 7,
      title: "Fury's Flight",
      image: "7.jpg",
      genre: "action",
      rating: "9.8",
    },
    {
      id: 8,
      title: "Path of the Forgotten",
      image: "8.jpg",
      genre: "action",
      rating: "7.2",
    },
  ];

  return (
    <div>
      <MovieList movies={movies} watchlist={[1]} toggleWatchlist={() => {}} />
    </div>
  );
}

export default App;
