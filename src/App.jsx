import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
