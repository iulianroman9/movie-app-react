import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { getMovie } from "./utils/getMovie.jsx";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import MovieCardStandalone from "./components/MovieCardStandalone/index.jsx";
import MoviesIndex from "./components/MoviesIndex/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: MoviesIndex,
      },
      {
        path: "/movies/:id",
        Component: MovieCardStandalone,
        loader: getMovie,
        hydrateFallbackElement: (
          <div className="fetching-data">Fetching movie...</div>
        ),
      },
      {
        path: "watchlist",
        element: <MoviesIndex view="watchlist" />,
      },
      {
        path: "*",
        element: <div className="error-message">Page not found.</div>,
      },
    ],
  },
]);

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
