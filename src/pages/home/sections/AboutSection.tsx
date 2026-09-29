import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faItchIo,
  faLeetcode,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import RoughCircle from "../../../components/svgs/RoughCircle";
import WiggleArrow from "../../../components/svgs/WiggleArrow";
import RoughUnderline from "../../../components/svgs/RoughUnderline";
import PaintSplatter from "../../../components/svgs/PaintSplatter";
import {
  PAINT_SPOT_1_SHAPES,
  PAINT_SPOT_2_SHAPES,
} from "../../../data/paintSplatters";
import TitleScrible from "../../../components/svgs/TitleScrible";
import Sticky1 from "../../../components/svgs/Sticky1";
import Sticky2 from "../../../components/svgs/Sticky2";
import Sticky4 from "../../../components/svgs/Sticky4";
import { PLACEHOLDER_QUERIES } from "../data";
import { useTypingPlaceholder } from "../hooks/useTypingPlaceholder";

interface SocialProfile {
  name: string;
  url: string;
  icon: IconDefinition;
}

const SOCIAL_PROFILES = {
  github: {
    name: "GitHub",
    url: "https://github.com/thatfunnyred",
    icon: faGithub,
  },
  leetcode: {
    name: "LeetCode",
    url: "https://leetcode.com/u/thatfunnyred/",
    icon: faLeetcode,
  },
  itch: {
    name: "itch.io",
    url: "https://thatfunnyred.itch.io",
    icon: faItchIo,
  },
  youtube: {
    name: "YouTube",
    url: "https://www.youtube.com/@thatfunnyred",
    icon: faYoutube,
  },
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/thatfunnyred/",
    icon: faInstagram,
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/thatfunnyred/",
    icon: faLinkedin,
  },
} satisfies Record<string, SocialProfile>;

const ALL_SOCIAL_PROFILES = Object.values(SOCIAL_PROFILES);

function SocialLinks({ profiles }: { profiles: SocialProfile[] }) {
  return (
    <div className="about-social-links">
      {profiles.map(({ name, url, icon }) => (
        <a
          className="about-social-link"
          href={url}
          key={name}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} profile (opens in a new tab)`}
        >
          <FontAwesomeIcon icon={icon} aria-hidden="true" />
          <span>{name}</span>
          <span className="about-social-link-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

interface AboutSectionProps {
  stickyNoteRotation: number[];
}

export default function AboutSection({
  stickyNoteRotation,
}: AboutSectionProps) {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");
  useTypingPlaceholder(PLACEHOLDER_QUERIES, searchInputRef);

  useEffect(
    () => () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    },
    [],
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchInputRef.current?.value.trim() ?? "";
    if (!query) {
      setSearchFeedback("Type a topic to search the portfolio.");
      searchInputRef.current?.focus();
      return;
    }
    if (isSearching) return;

    setSearchFeedback("");
    setIsSearching(true);
    navigationTimerRef.current = window.setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }, 200);
  };

  return (
    <section id="about-section" className="about-section">
      <div className="landing-section-content">
        <div className="landing-section-left-content">
          <div className="landing-section-title-container">
            <TitleScrible id="title-scrible" />

            <span id="landing-section-greeting" className="jersey-25-regular">
              <div>HELLO.</div>
            </span>

            <h1 id="landing-section-title" className="erica-one-regular">
              I AM A GAME <br /><span id="developer-text">DEVELOPER.</span>
            </h1>
            <h3 id="landing-section-sub-title" className="jersey-25-regular">
              I build playful digital experiences where games, stories, and technology meet.
            </h3>
          </div>

          <div className="search-box-container">
            <form
              className={`search-box${isSearching ? " is-searching" : ""}`}
              role="search"
              onSubmit={handleSearch}
            >
              <input
                id="search-input"
                className="chelsea-market-regular"
                type="text"
                placeholder="Search about game projects..."
                aria-label="Search this portfolio"
                autoComplete="off"
                disabled={isSearching}
                ref={searchInputRef}
              />
              <button
                id="search-btn"
                type="submit"
                aria-label={isSearching ? "Searching" : "Search"}
                disabled={isSearching}
              >
                <FontAwesomeIcon
                  id="search-icon"
                  filter="url(#crayon)"
                  icon={faMagnifyingGlass}
                />
              </button>
            </form>
            <p className="search-feedback" role="status" aria-live="polite">
              {searchFeedback}
            </p>
          </div>

          <nav className="about-social-mobile" aria-label="Find me online">
            <p className="about-social-mobile-title">FIND ME ONLINE</p>
            <SocialLinks profiles={ALL_SOCIAL_PROFILES} />
          </nav>

          <h1
            id="curious-hint"
            className="permanent-marker-regular"
            style={{ filter: "url(#crayon)" }}
          >
            Try searching anything!
          </h1>
        </div>

        <div className="landing-section-right-content">
          <div className="right-grid-container">
            <div id="right-grid" />
          </div>
          <Sticky1
            id="sticky-note-1"
            className="sticky-notes"
            title="code & puzzles"
            rotation={`${stickyNoteRotation[0]}deg`}
          >
            <SocialLinks
              profiles={[
                SOCIAL_PROFILES.github,
                SOCIAL_PROFILES.leetcode,
              ]}
            />
          </Sticky1>
          <Sticky2
            id="sticky-note-2"
            className="sticky-notes"
            title="games"
            rotation={`${stickyNoteRotation[1]}deg`}
          >
            <SocialLinks profiles={[SOCIAL_PROFILES.itch, SOCIAL_PROFILES.youtube]} />
          </Sticky2>
          <Sticky4
            id="sticky-note-4"
            className="sticky-notes"
            title="meet & share"
            rotation={`${stickyNoteRotation[2]}deg`}
          >
            <SocialLinks
              profiles={[
                SOCIAL_PROFILES.linkedin,
                SOCIAL_PROFILES.instagram,
              ]}
            />
          </Sticky4>
        </div>
      </div>

      <WiggleArrow id="wiggle-arrow" />
      <RoughUnderline id="rough-underline" />
      <RoughCircle id="rough-circle-1" />
      <RoughCircle id="rough-circle-2" />
      <RoughCircle id="rough-circle-3" />

      <PaintSplatter
        id="paint-spot-1"
        viewBox="0 0 140 120"
        shapes={PAINT_SPOT_1_SHAPES}
      />
      <PaintSplatter
        id="paint-spot-2"
        viewBox="0 0 160 140"
        shapes={PAINT_SPOT_2_SHAPES}
      />

      <h1
        id="projects-hint"
        className="permanent-marker-regular"
        style={{ filter: "url(#crayon)" }}
      >
        MY PROJECTS
      </h1>
      <WiggleArrow id="project-arrow" />
    </section>
  );
}
