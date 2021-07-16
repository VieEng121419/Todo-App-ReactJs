import React from "react";
import "./nav.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function NavMobile(props) {
  const [showNav, setShowNav] = useState(false);
  const loggedIn = useSelector((state) => state.account.loggedIn);
  const classes = () => {
    return `menu__mobile ${showNav ? "open" : ""}`;
  };
  return (
    <div>
      <div className="menu" onClick={() => setShowNav(!showNav)}>
        {showNav ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </div>
      {loggedIn ? (
        <div className={classes()}>
          <li onClick={() => setShowNav(!showNav)}>
            <NavLink to="/">Todos</NavLink>
          </li>
          <li onClick={() => setShowNav(!showNav)}>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li onClick={() => setShowNav(!showNav)}>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </div>
      ) : (
        <div className={classes()}>
          <li onClick={() => setShowNav(!showNav)}>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li onClick={() => setShowNav(!showNav)}>
            <NavLink to="/register">Register</NavLink>
          </li>
        </div>
      )}
    </div>
  );
}

export default NavMobile;
