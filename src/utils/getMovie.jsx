export async function getMovie({ params }) {
  try {
    const response = await fetch("http://localhost:5173/movies.json");
    if (!response.ok) {
      throw new Error(`API call error, status: ${response.status}`);
    }
    const movies = await response.json();
    const movie = movies.find((m) => m.id === parseInt(params.id));
    if (!movie) {
      throw new Error(`Movie with ID ${movieId} not found.`);
    }
    return movie;
  } catch (error) {
    console.error(`Error fetching movie: ${error}`);
  }
}
