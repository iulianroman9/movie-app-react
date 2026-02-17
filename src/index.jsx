import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import MovieCard from "./components/MovieCard/index.jsx";
import MovieIndex from "./components/MovieIndex/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "movies",
        children: [
          {
            index: true,
            Component: MovieIndex,
          },
          {
            path: ":id",
            Component: MovieCard,
          },
        ],
      },
      {
        path: "watchlist",
        element: <MovieIndex view="watchlist" />,
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
