import "./nav.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Nav() {
  const loggedIn = useSelector((state) => state.account.loggedIn);
  return (
    <div>
      {loggedIn ? (
        <ul className="nav">
          <li>
            <NavLink to="/">Todos</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Nav;
