import "./Navbar.css";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/watchlist"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Watchlist
      </NavLink>
    </nav>
  );
}

export default Navbar;
