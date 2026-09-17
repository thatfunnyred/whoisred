import "../styles/navbar-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import SearchArrow from "./svgs/ProjectArrow";
import DoubleUnderline from "./svgs/DoubleUnderline";

export default function NavBar() {

  const scrollToContent = (event: any, id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    
    const doubleUnderline = document.querySelector(`#rough-double-underline`) as HTMLElement;

    const currentSelectedTab = event.currentTarget as HTMLElement;

    const rect = currentSelectedTab.getBoundingClientRect();

    doubleUnderline.style.transform = "scaleX(0) scaleY(0)";

    setTimeout(() => {
      doubleUnderline.style.left =
      `${rect.left + rect.width / 2 - window.innerWidth / 2}px`;
      doubleUnderline.style.transform = "scaleX(0.05) scaleY(0.12)";
    }, 200);

    
    };

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
          <a  onClick={(clickEvent) => scrollToContent(clickEvent, "landing-section")}>ABOUT</a>
          <a onClick={(clickEvent) => scrollToContent(clickEvent, "project-section")}>PROJECTS</a>
          <a href="#">EXPERIMENTS</a>
          <a href="#">PLAYGROUND</a>
          <a href="#">CONTACT</a>
          <DoubleUnderline id="rough-double-underline" />
        </div>

        <div className="navbar-cta-container">
          <div id="navbar-cta" className="chelsea-market-regular">
            HIRE ME!
            <SearchArrow id="search-arrow" />
          </div>       </div>

        <svg
          className="crayon-border"
          viewBox="0 0 1600 18"
          preserveAspectRatio="none"
        >
          <g filter="url(#crayon)">
            <line
              x1="0"
              y1="9"
              x2="1600"
              y2="9"
              stroke="#1a181567"
              stroke-width="3.2"
              stroke-linecap="round"
              opacity="0.9"
            />
            <line
              x1="0"
              y1="10"
              x2="1600"
              y2="8"
              stroke="#1a181567"
              stroke-width="2"
              stroke-linecap="round"
              opacity="0.45"
            />
            <line
              x1="0"
              y1="8"
              x2="1600"
              y2="10"
              stroke="#1a181567"
              stroke-width="1.4"
              stroke-linecap="round"
              opacity="0.3"
            />
          </g>
        </svg>
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
