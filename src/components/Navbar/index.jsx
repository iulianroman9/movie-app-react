import "./Navbar.css";

function Navbar({ view, setView }) {
  return (
    <nav>
      <button
        className={view === "home" ? "nav-btn active" : "nav-btn"}
        onClick={() => setView("home")}
      >
        Home
      </button>

      <button
        className={view === "watchlist" ? "nav-btn active" : "nav-btn"}
        onClick={() => setView("watchlist")}
      >
        Watchlist
      </button>
    </nav>
  );
}

export default Navbar;
