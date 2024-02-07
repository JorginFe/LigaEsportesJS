import "./header-styles.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to={"/"} className="linkText">
        <img src="Images/logo.svg" className="logo" />
      </Link>
      <div className="links">
        <Link to={"/"} className="linkText">
          <div className="schedule">
            <img src="Images/schedule.png" />
            <span className="linkText">Schedule</span>
          </div>
        </Link>
        <Link to={"/leaderboard"} className="linkText">
          <div className="leaderboard">
            <img src="Images/leaderboard.png" />
            <span className="linkText">Leaderboard</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
