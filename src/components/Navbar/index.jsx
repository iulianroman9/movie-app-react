import "./Navbar.css";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>

      <NavLink to="/watchlist" className="nav-link">
        Watchlist
      </NavLink>
    </nav>
  );
}

export default Navbar;
