import React from "react";
import "../styles/navbar-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-universal-container">
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <NavLink
            to={"/"}
            id="navbar-logo"
            className="rubik-spray-paint-regular"
          >
            <span>W</span>
            <span>H</span>
            <span>O</span>
            <span>I</span>
            <span>S</span>
            <span>R</span>
            <span>E</span>
            <span>D</span>
            <span>?</span>
          </NavLink>
        </div>

        <div className="navbar-links-container geist-pixel-uniquifier">
          <a href="#">ABOUT</a>
          <a href="#">PROJECTS</a>
          <a href="#">EXPERIMENTS</a>
          <a href="#">PLAYGROUND</a>
          <a href="#">CONTACT</a>
        </div>

        <div className="navbar-cta-container">
          <div id="navbar-cta" className="chelsea-market-regular">
            LETS TALK
          </div>
        </div>
      </div>

      <div className="navbar-banner-container">
        <div id="navbar-banner" className="geist-pixel-uniquifier">
          SCROLL TO SEARCH{" "}
          <FontAwesomeIcon id="arrow-icon" icon={faArrowDown} />
        </div>
      </div>
    </div>
  );
}
