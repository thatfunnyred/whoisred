import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar";

import "../styles/home-style.css";
import RoughCircle from "../components/svgs/RoughCircle";
import SectionSeparator from "../components/svgs/SectionSeparator";
import WiggleArrow from "../components/svgs/WiggleArrow";
import RoughUnderline from "../components/svgs/RoughUnderline";
import PaintSplatter, {
  PAINT_SPOT_1_SHAPES,
  PAINT_SPOT_2_SHAPES,
} from "../components/svgs/PaintSplatter";
import TitleScrible from "../components/svgs/TitleScrible";
import Sticky1 from "../components/svgs/Sticky1";
import Sticky2 from "../components/svgs/Sticky2";
import Sticky4 from "../components/svgs/Sticky4";
import ProjectArrow from "../components/svgs/ProjectArrow";
import Postcard from "../components/svgs/PostCardc";
import { getRandomInt } from "../Utils/utils";

/** The jagged, hand-drawn wavy divider used at both section-transition points. */

function CrayonFilterDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        {/* Rough wobble + fine grain — used on filled shapes (asterisk, splatters, icons) */}
        <filter id="crayon" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={2.2}
            xChannelSelector="R"
            yChannelSelector="G"
            result="wobble"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves={3}
            seed={3}
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
            result="grainAlpha"
          />
          <feComposite
            in="wobble"
            in2="grainAlpha"
            operator="out"
            result="textured"
          />
          <feMerge>
            <feMergeNode in="textured" />
            <feMergeNode in="wobble" />
          </feMerge>
        </filter>

        {/* Lighter wobble only — used on strokes (arrow, underline, circles) */}
        <filter id="crayonSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.9"
            numOctaves={2}
            seed={4}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={6}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Heavier wobble — used on the big section-divider path */}
        <filter id="crayonRough" x="-10%" y="-60%" width="120%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.18 0.35"
            numOctaves={5}
            seed={14}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={55}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function StickyFilter() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="crayonWobble" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.05"
            numOctaves={2}
            seed={6}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={3.5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function useTypingPlaceholder(
  queries: string[],
  inputRef: React.RefObject<HTMLInputElement | null>,
) {
  useEffect(() => {
    let queryIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const input = inputRef.current;
      if (!input) return;

      const current = queries[queryIndex];

      if (!deleting) {
        charIndex++;
        input.placeholder = `Search about ${current.slice(0, charIndex)}`;

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 100);
      } else {
        charIndex--;
        input.placeholder = `Search about ${current.slice(0, charIndex)}`;

        if (charIndex === 0) {
          deleting = false;
          queryIndex = (queryIndex + 1) % queries.length;
          setTimeout(type, 300);
          return;
        }
        setTimeout(type, 60);
      }
    };

    type();
  }, []);
}

const PLACEHOLDER_QUERIES: string[] = [
  "red...",
  "projects...",
  "skills...",
  "experience...",
];

export default function HomePage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const searchInputRef = useRef<null | HTMLInputElement>(null);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useTypingPlaceholder(PLACEHOLDER_QUERIES, searchInputRef);

  const [projectRotation, setProjectRotation] = useState<string[]>([]);
  const [stickyNoteRotation, setStickyNoteRotation] = useState<string[]>([]);
  
  useEffect(() => {
    let rotations_project = [];
    for(let i = 0; i < 4; i++) {
      rotations_project.push(`${getRandomInt(-10, 10)}deg`);
    }

    let rotations_stickynote = [];
    for(let i = 0; i < 4; i++) {
      rotations_stickynote.push(`${getRandomInt(-20, 20)}deg`);
    }

    setProjectRotation(rotations_project);
    setStickyNoteRotation(rotations_stickynote)
  }, []);

  return (
    <>
      <CrayonFilterDefs />
      <StickyFilter />

      <section
        id="landing-section"
        className="landing-section"
        style={
          {
            "--mouse-x": `${mouse.x}px`,
            "--mouse-y": `${mouse.y}px`,
          } as React.CSSProperties
        }
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: lerp(mouse.x, e.clientX - rect.left, 0.05),
            y: lerp(mouse.y, e.clientY - rect.top, 0.05),
          });
        }}
      >
        <NavBar />

        <div className="landing-section-content">
          <div className="landing-section-left-content">
            <div className="landing-section-title-container">
              <TitleScrible id="title-scrible" />

              <span id="landing-section-greeting" className="jersey-25-regular">
                <div>HELLO.</div>
              </span>

              <h1 id="landing-section-title" className="erica-one-regular">
                <div>
                  I AM A GAME <br/><span id="developer-text">DEVELOPER.</span>
                </div>
              </h1>
              <h3 id="landing-section-sub-title" className="jersey-25-regular">
                I build playful digital experiences where games, stories, and technology meet.
              </h3>
            </div>

            <div className="search-box-container">
              <div className="search-box">
                <input
                  id="search-input"
                  className="chelsea-market-regular"
                  type="text"
                  placeholder="Search about red..."
                  ref={searchInputRef}
                />
                <button id="search-btn">
                  <FontAwesomeIcon
                    id="search-icon"
                    filter="url(#crayon)"
                    icon={faMagnifyingGlass}
                  />
                </button>
              </div>
            </div>

            <h1 id="curious-hint" className="permanent-marker-regular" style={{filter: "url(#crayon)"}}>
              Try searching anything!
            </h1>
          </div>

          <div className="landing-section-right-content">
            <div className="right-grid-container">
              <div id="right-grid"></div>
            </div>
            <Sticky1 id="sticky-note-1" title="projects" rotation={stickyNoteRotation[0]}>
              Still building something weird here →
            </Sticky1>
            <Sticky2 id="sticky-note-2" title="projects" rotation={stickyNoteRotation[2]}>
              Still building something weird here →
            </Sticky2>
            <Sticky4 id="sticky-note-4" title="projects" rotation={stickyNoteRotation[3]}>
              Still building something weird here →
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

        <h1 id="projects-hint" className="permanent-marker-regular" style={{filter: "url(#crayon)"}}>
              MY PROJECTS
            </h1>
        <WiggleArrow id="project-arrow" />
      </section>


      <section id="project-section" className="project-section">
        <SectionSeparator id="project-section-separator-1" />
        <div className="project-cards-container">
        <Postcard id="project-card-1" paper="#f6ecd9" rotation={projectRotation[0]} image="assets/images/images(1).jpg" />
        <Postcard id="project-card-2" paper="#EB7F31" rotation={projectRotation[1]} image="assets/images/images(1).jpg" />
        <Postcard id="project-card-3" paper="#fbf6ed" rotation={projectRotation[2]} image="assets/images/images(1).jpg" />
        <Postcard id="project-card-4" paper="#F7ADAD" rotation={projectRotation[3]} image="assets/images/images(1).jpg" />
        </div>
        <SectionSeparator id="project-section-separator-2" />
      </section>

    </>
  );
}
