import { useRef, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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

interface AboutSectionProps {
  stickyNoteRotation: number[];
}

export default function AboutSection({
  stickyNoteRotation,
}: AboutSectionProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchCursor, setSearchCursor] = useState({ query: "", nextIndex: 0 });
  const [searchFeedback, setSearchFeedback] = useState("");
  useTypingPlaceholder(PLACEHOLDER_QUERIES, searchInputRef);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchInputRef.current?.value.trim().toLocaleLowerCase() ?? "";
    if (!query) {
      setSearchFeedback("Type a topic to search the portfolio.");
      searchInputRef.current?.focus();
      return;
    }

    const queryTerms = query.split(/\s+/);
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".about-section, .project-section, .tools-section, .experiments-section, .contact-section",
      ),
    );
    const matches = sections.filter((section) => {
      const text = section.innerText.toLocaleLowerCase();
      return queryTerms.every((term) => text.includes(term));
    });

    if (matches.length === 0) {
      setSearchCursor({ query, nextIndex: 0 });
      setSearchFeedback(`No results for “${query}”. Try another topic.`);
      return;
    }

    const matchIndex =
      searchCursor.query === query
        ? searchCursor.nextIndex % matches.length
        : 0;
    const section = matches[matchIndex];
    const sectionName = section.id
      .replace("-section", "")
      .replace(/^./, (letter) => letter.toUpperCase());

    setSearchCursor({ query, nextIndex: matchIndex + 1 });
    setSearchFeedback(
      `Result ${matchIndex + 1} of ${matches.length}: ${sectionName}.`,
    );
    section.scrollIntoView({ behavior: "auto", block: "center" });
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
            <form className="search-box" role="search" onSubmit={handleSearch}>
              <input
                id="search-input"
                className="chelsea-market-regular"
                type="text"
                placeholder="Search about game projects..."
                aria-label="Search this portfolio"
                autoComplete="off"
                ref={searchInputRef}
              />
              <button id="search-btn" type="submit" aria-label="Search">
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
            title="projects"
            rotation={`${stickyNoteRotation[0]}deg`}
          >
            Game ideas built through code, craft, and play
          </Sticky1>
          <Sticky2
            id="sticky-note-2"
            className="sticky-notes"
            title="projects"
            rotation={`${stickyNoteRotation[1]}deg`}
          >
            Small prototypes for curious mechanics
          </Sticky2>
          <Sticky4
            id="sticky-note-4"
            className="sticky-notes"
            title="projects"
            rotation={`${stickyNoteRotation[2]}deg`}
          >
            Games, stories, and playful experiences
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
