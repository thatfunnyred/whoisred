import "../styles/navbar-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Fragment, useState } from "react";
import SearchArrow from "./svgs/ProjectArrow";
import DoubleUnderline from "./svgs/DoubleUnderline";
import { SECTIONS, useSectionNavigation } from "./navigation/useSectionNavigation";

export default function NavBar() {
  const { scrollToContent } = useSectionNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="navbar-universal-container">
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <NavLink
            to={"/"}
            id="navbar-logo"
            className="rubik-spray-paint-regular"
            onClick={() => setMobileMenuOpen(false)}
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
          {SECTIONS.map((section, key) => (
            <Fragment key={section}>
              <a
                href={`#${section}-section`}
                onClick={(clickEvent) =>
                  scrollToContent(clickEvent, `${section}-section`)
                }
              >
                {section}
              </a>
              {key !== SECTIONS.length - 1 && "|"}
            </Fragment>
          ))}
          <DoubleUnderline id="rough-double-underline" />
        </div>

        <div className="navbar-cta-container">
          <NavLink
            id="navbar-cta"
            className="chelsea-market-regular"
            to="/contact"
          >
            HIRE ME!
            <SearchArrow id="search-arrow" />
          </NavLink>
        </div>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navbar-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

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
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1="0"
              y1="10"
              x2="1600"
              y2="8"
              stroke="#1a181567"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.45"
            />
            <line
              x1="0"
              y1="8"
              x2="1600"
              y2="10"
              stroke="#1a181567"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navbar-menu" className="mobile-navbar-menu" aria-label="Mobile navigation">
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}-section`}
              onClick={(clickEvent) => {
                scrollToContent(clickEvent, `${section}-section`);
                setMobileMenuOpen(false);
              }}
            >
              {section}
            </a>
          ))}
          <NavLink to="/cv" onClick={() => setMobileMenuOpen(false)}>
            CV
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
            Hire me
          </NavLink>
        </nav>
      )}

      <a
        className="navbar-banner-container"
        href="#search-input"
        onClick={(clickEvent) =>
                  scrollToContent(clickEvent, `about-section`)
                }
        aria-label="Scroll to the portfolio search"
      >
        <div id="navbar-banner" className="geist-pixel-uniquifier">
          SCROLL TO SEARCH{" "}
          <FontAwesomeIcon id="arrow-icon" icon={faArrowDown} />
        </div>
      </a>
    </div>
  );
}
