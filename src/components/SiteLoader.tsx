import { useEffect, useState } from "react";
import "../styles/site-loader.css";

const WORDMARK = ["W", "H", "O", "I", "S", "R", "E", "D", "?"];

export default function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitDelay = reducedMotion ? 180 : 1150;
    const removeDelay = reducedMotion ? 250 : 1650;
    const exitTimer = window.setTimeout(() => setLeaving(true), exitDelay);
    const removeTimer = window.setTimeout(() => setRemoved(true), removeDelay);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`site-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading WHOISRED portfolio"
    >
      <div className="site-loader__content" aria-hidden="true">
        <div className="site-loader__burst-wrap">
          <svg className="site-loader__burst" viewBox="0 0 180 180">
            <path
              d="M90 5 105 31 130 13 135 44 169 40 157 69 177 85 151 99 166 128 134 131 134 165 105 151 88 177 73 149 42 164 42 132 9 126 25 99 4 81 32 66 17 37 49 39 55 8 79 29Z"
              fill="currentColor"
              stroke="#1a1815"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
          <div className="site-loader__spark" />
          <span className="site-loader__orbit site-loader__orbit--one" />
          <span className="site-loader__orbit site-loader__orbit--two" />
        </div>

        <div className="site-loader__wordmark rubik-spray-paint-regular">
          {WORDMARK.map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </div>
        <p className="site-loader__caption geist-pixel-uniquifier">
          PREPARING YOUR PLAYGROUND
        </p>
        <div className="site-loader__track">
          <span />
        </div>
      </div>

      <span className="site-loader__note site-loader__note--top geist-pixel-uniquifier">
        EST. SOMEWHERE IN THE CLOUD
      </span>
      <span className="site-loader__note site-loader__note--bottom geist-pixel-uniquifier">
        GAMES · STORIES · GOOD STUFF
      </span>
    </div>
  );
}
