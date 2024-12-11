import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);


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
    } else if(location.pathname === "/theme"){
      divToBlur = document.querySelector('.theme-selector-container'); // Theme
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

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false); // Hide the message after a few seconds
    }, 5000); // Adjust the duration of the message display
  };

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
            <Link to="/theme" onClick={() => {
              toggleMenuVisibility(false) ;
              applyBlur(false); // Remove blur when mouse leaves
            }}
            >Themes</Link>
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
        <div className="navbar-footer" onClick={()=>{
          handleClick(); 
          toggleMenuVisibility(false);
        }}> Keep Smiling 😊 </div>
      </div>
      {showMessage && (
        <div className="surprise-container">
          <div className="firecrackers">
            {/* Firecracker animations */}
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
          </div>

          <svg className="curved-text-svg" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
          <path
            id="curve"
            d="M50,300 Q600,50 1150,300"  // Defines the curved path
            fill="transparent"
            />
              <text className="curved-text">
                <textPath href="#curve" startOffset="50%"> {/*to set where the text in the curve will start from*/}
                  Don't worry Mate, It all will be good 😊.
                </textPath>
            </text>
          </svg>
        </div>
      )}
    </div>
    
  );
};

export default Navbar;