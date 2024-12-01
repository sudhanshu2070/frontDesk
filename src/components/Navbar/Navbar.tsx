import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Don't show the navbar on login and signup pages
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <div className="navbar-container">
      <div className="navbar-button">
        {/* Hamburger Icon */}
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Navbar Menu */}
        <div className="navbar-menu">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/add-contact">Add Contact</Link>
            </li>
            <li>
              <Link to="/contact">View Contacts</Link>
            </li>
            <li>
              <Link to="/cool-stuff">Cool Stuff</Link>
            </li>
            <li>
              <Link to="/">Log Out</Link>
            </li>
          </ul>
          <div className="navbar-footer">Keep Smiling 😊</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;