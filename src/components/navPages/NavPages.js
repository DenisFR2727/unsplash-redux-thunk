import {NavLink} from "react-router-dom";
import "./navpages.css";

const NavPages = () => {
  return (
    <div className="nav_pages">
    <nav>
      <ul className="unsplash_list">
        <li>
          <NavLink to="/unsplash"  className="nav-link">
              Unspalash Foto
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather"  className="nav-link">
              Weather
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  );
};
export default NavPages;