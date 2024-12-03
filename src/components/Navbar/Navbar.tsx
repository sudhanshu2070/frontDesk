import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Don't show the navbar on login and signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  // Add/remove the blur class dynamically
  const applyBlur = (shouldBlur: boolean) => {
    let divToBlur: HTMLElement | null = null; // Declare divToBlur once

    if (location.pathname === "/home") {
      divToBlur = document.querySelector('.home-container');
    } else if (location.pathname === "/add-contact") {
      divToBlur = document.querySelector('.page-background'); // Add Contact
    } else if (location.pathname === "/contact") {
      divToBlur = document.querySelector('.slider-container'); // View Contact
    }
    else{
      return false;
    }
    
    if (divToBlur !== null) {
      if (shouldBlur) {
        divToBlur.classList.add('blur');
      } else {
        divToBlur.classList.remove('blur');
      }
    }
  };

  // Function to show or hide the menu
  const toggleMenuVisibility = (isVisible: boolean) => {
    const menu = document.getElementsByClassName("navbar-menu")[0] as HTMLElement;
    if (menu) {
      if(isVisible){
        menu.style.display = "block";
      }
      else{
        menu.style.display = "none";
      }
    }
  };

  // If on login or signup page, return null early to not render navbar
  if (hideNavbar) {
    return null;
  }

  return (
    <div className="navbar-container">
      {/* Hamburger Icon */}
      <div className="hamburger"  id="divHamburger" onMouseEnter={() => { toggleMenuVisibility(true)}}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar Menu */}
      <div className="navbar-menu"
        onMouseEnter={() => { applyBlur(true)}} // Apply blur when mouse enters
        onMouseLeave={() => {
          toggleMenuVisibility(false); // Close menu
          applyBlur(false); // Remove blur when mouse leaves
        }}
      >
        {/* Close Button */}
        <div
            className="close-button"
              onClick={() => {
                toggleMenuVisibility(false); // Close the menu
                applyBlur(false); // Remove the blur
              }}
          >
          &times;
        </div>

        {/* Menu Items */}
        <ul>
          <li>
          <Link to="/home" onClick={() => {
            toggleMenuVisibility(false) ;
            applyBlur(false); // Remove blur when mouse leaves
          }}>Home</Link>
          </li>
          <li>
            <Link to="/add-contact" onClick={() => {
              toggleMenuVisibility(false) ;
              applyBlur(false); // Remove blur when mouse leaves
            }}
            >Add Contact</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => {
              toggleMenuVisibility(false) ;
              applyBlur(false); // Remove blur when mouse leaves
            }}
            >View Contacts</Link>
          </li>
          <li>
            <Link to="/cool-stuff" onClick={() => {
              toggleMenuVisibility(false) ;
              applyBlur(false); // Remove blur when mouse leaves
            }}
            >Cool Stuff</Link>
          </li>
          <li>
            <Link to="/" onClick={() => {
              toggleMenuVisibility(false) ;
              applyBlur(false); // Remove blur when mouse leaves
            }}
            >Log Out</Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="navbar-footer">Keep Smiling 😊</div>
      </div>
    </div>
  );
};

export default Navbar;