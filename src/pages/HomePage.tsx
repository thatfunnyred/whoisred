import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar";

import "../styles/home-style.css";

export default function HomePage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const PLACEHOLDER_QUERIES: string[] = [
    "red...",
    "projects...",
    "skills...",
    "experience...",
  ];

  const searchInputRef = useRef<null | HTMLInputElement>(null);

  const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t;
  };
  useEffect(() => {
    let queryIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const input = searchInputRef.current;
      if (!input) return;

      const current = PLACEHOLDER_QUERIES[queryIndex];

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
          queryIndex = (queryIndex + 1) % PLACEHOLDER_QUERIES.length;

          setTimeout(type, 300);
          return;
        }

        setTimeout(type, 60);
      }
    };

    type();
  }, []);

  return (
    <section
      className="landing-section"
      style={
        {
          "--mouse-x": `${mouse.x}px`,
          "--mouse-y": `${mouse.y}px`,
        } as React.CSSProperties
      }
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        console.log(mouse);

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
            <span id="landing-section-greeting" className="jersey-25-regular">
              HEY!
            </span>

            <h1 id="landing-section-title" className="rubik-dirt-regular">
              <div>
                SEARCH <br></br> ABOUT <span id="me-text">ME.</span>
              </div>
            </h1>
            <h3 id="landing-section-sub-title" className="jersey-25-regular">
              Lorem ipsum dolor sit, amet consectetur adipisi elit. Ab quam
              similique, cupiditate voluptatum delectus repellat quaerat facilis
              quaerat facilis facilis
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
              ></input>
              <button id="search-btn">
                <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>
        <div className="landing-section-right-content"></div>
      </div>

      <div id="wiggle-arrow-container">
        <svg
          width="700"
          height="420"
          viewBox="0 0 700 420"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="crayon" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="12"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
            </filter>

            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.7" />
            </filter>
          </defs>

          <path
            d="
      M120 310
      C175 315 240 315 305 285
      C355 262 380 220 365 165
      C350 120 295 110 275 155
      C252 205 300 255 370 292
      C450 334 535 270 520 165
      C510 90 565 50 635 78
      C665 90 685 102 695 118
    "
            fill="none"
            stroke="#caa61596"
            stroke-width="22"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#soft)"
            opacity="0.9"
          />

          <path
            d="
      M120 310
      C175 315 240 315 305 285
      C355 262 380 220 365 165
      C350 120 295 110 275 155
      C252 205 300 255 370 292
      C450 334 535 270 520 165
      C510 90 565 50 635 78
      C665 90 685 102 695 118
    "
            fill="none"
            stroke="#FFD11A"
            stroke-width="16"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#crayon)"
          />

          <path
            d="
      M118 313
      C174 319 239 320 303 288
      C352 265 377 223 362 168
      C348 122 297 114 279 156
      C257 202 302 253 368 289
      C447 330 530 267 516 166
      C506 92 560 52 631 80
      C660 91 681 103 692 119
    "
            fill="none"
            stroke="#caa61596"
            stroke-width="4"
            stroke-linecap="round"
            opacity="0.65"
            filter="url(#crayon)"
          />

          <path
            d="
      M122 307
      C178 311 243 310 308 282
      C357 259 383 218 368 164
      C353 118 300 108 281 152
      C260 199 306 251 372 294
      C452 338 539 274 524 169
      C514 93 568 55 636 82
      C665 93 684 104 694 117
    "
            fill="none"
            stroke="#FFC700"
            stroke-width="3"
            stroke-linecap="round"
            opacity="0.55"
            filter="url(#crayon)"
          />

          <path
            d="
      M120 310
      L148 286
      M120 310
      L152 336
    "
            fill="none"
            stroke="#FFD11A"
            stroke-width="16"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#crayon)"
          />

          <path
            d="
      M120 310
      L148 286
      M120 310
      L152 336
    "
            fill="none"
            stroke="#caa61596"
            stroke-width="3"
            stroke-linecap="round"
            opacity="0.6"
            filter="url(#crayon)"
          />
        </svg>
      </div>
    </section>
  );
}
