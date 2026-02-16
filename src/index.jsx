import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import MovieList from "./components/MovieList/index.jsx";
import MovieCard from "./components/MovieCard/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "movies",
    Component: MovieList,
    children: [
      {
        path: ":id",
        Component: MovieCard,
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
