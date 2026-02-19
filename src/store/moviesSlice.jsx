import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("movies.json");
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    isLoading: false,
    isApiError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.isApiError = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isApiError = action.error.message || "Failed to fetch movies";
      });
  },
});

export default moviesSlice.reducer;
