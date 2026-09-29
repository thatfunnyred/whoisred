import { useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/cv-page.css";

const projectLinks = {
  thanksForWaiting: "https://thatfunnyred.itch.io/thanks-for-waiting",
  paperStreet: "https://thatfunnyred.itch.io/paper-street",
} as const;

export default function CvPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = description?.content;

    document.title = "CV | thatfunnyred — Game Developer";
    if (description) {
      description.content =
        "Game developer focused on gameplay systems, prototyping, and playful interactive experiences. Selected projects, experiments, and tools.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <main className="cv-page">
      <article className="cv-document" aria-labelledby="cv-title">
        <header className="cv-header">
          <div className="cv-topline">
            <Link className="cv-home-link" to="/">
              WHOISRED? <span aria-hidden="true">/</span> PORTFOLIO
            </Link>
            <span>CURRICULUM VITAE</span>
          </div>

          <div className="cv-identity">
            <p className="cv-eyebrow">GAME DEVELOPER · INDEPENDENT PROJECTS</p>
            <h1 id="cv-title">thatfunnyred</h1>
            <p className="cv-role">
              Gameplay systems <span>·</span> Prototyping <span>·</span> Interactive experiences
            </p>
            <p className="cv-intro">
              I build playful digital experiences where games, stories, and
              technology meet. I’m drawn to the point where a simple mechanic
              becomes a world a player wants to explore.
            </p>
          </div>

          <nav className="cv-contact" aria-label="Contact and work profiles">
            <Link to="/contact">Contact</Link>
            <a href="https://github.com/thatfunnyred">
              GitHub
            </a>
            <a href="https://thatfunnyred.itch.io">
              itch.io
            </a>
            <a href="https://www.linkedin.com/in/thatfunnyred/">
              LinkedIn
            </a>
          </nav>
        </header>

        <div className="cv-columns">
          <div className="cv-main-column">
            <section className="cv-section" aria-labelledby="cv-profile-title">
              <h2 id="cv-profile-title">Profile</h2>
              <p>
                Independent game developer working across gameplay, narrative,
                and interactive design. My portfolio brings together published
                game projects and small experiments in input, timing,
                navigation, and player choice.
              </p>
              <p>
                I like starting with a focused question, making the smallest
                playable test, and refining how the idea feels in a player’s
                hands. I’m interested in teams that value clear communication,
                thoughtful iteration, and unusual ideas made playable.
              </p>
            </section>

            <section className="cv-section" aria-labelledby="cv-work-title">
              <div className="cv-section-heading">
                <h2 id="cv-work-title">Selected work</h2>
                <span>02 PROJECTS</span>
              </div>

              <article className="cv-project">
                <div className="cv-project-meta">
                  <span>GAME PROJECT</span>
                  <span>HORROR · NARRATIVE</span>
                </div>
                <h3>
                  <a href={projectLinks.thanksForWaiting}>
                    Thanks For Waiting <span aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p>
                  A horror game built around the unsettling idea of a nightmare
                  coming to life. The project leads with a clear premise and a
                  strong sense of mood.
                </p>
              </article>

              <article className="cv-project">
                <div className="cv-project-meta">
                  <span>PLAYABLE IN BROWSER</span>
                  <span>SHOOTER</span>
                </div>
                <h3>
                  <a href={projectLinks.paperStreet}>
                    Paper Street <span aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p>
                  A compact browser-playable shooter introduced by the hook
                  “No Door Is Out of Reach.” It gives visitors an immediate way
                  to experience the work, not just read about it.
                </p>
              </article>
            </section>

            <section className="cv-section" aria-labelledby="cv-studies-title">
              <div className="cv-section-heading">
                <h2 id="cv-studies-title">Design studies</h2>
                <span>IDEAS IN MOTION</span>
              </div>
              <div className="cv-study-list">
                <p>
                  <strong>One Button Orchestra</strong>
                  <span>One input changes a small game’s rhythm and response.</span>
                </p>
                <p>
                  <strong>Branching Postcard</strong>
                  <span>A short scene shifts with what the player chooses to notice.</span>
                </p>
                <p>
                  <strong>False Floor</strong>
                  <span>Small visual clues reshape how a player reads a space.</span>
                </p>
              </div>
            </section>
          </div>

          <aside className="cv-side-column" aria-label="Skills and working approach">
            <section className="cv-side-section" aria-labelledby="cv-focus-title">
              <h2 id="cv-focus-title">Focus</h2>
              <ul className="cv-focus-list">
                <li>Gameplay programming</li>
                <li>Mechanic prototyping</li>
                <li>Player feedback and feel</li>
                <li>Interactive storytelling</li>
              </ul>
            </section>

            <section className="cv-side-section" aria-labelledby="cv-tools-title">
              <h2 id="cv-tools-title">Tools</h2>
              <p className="cv-tool-label">GAME DEVELOPMENT</p>
              <p>Unity · C# · Godot · Unreal Engine</p>
              <p className="cv-tool-label">INTERACTIVE AND WEB</p>
              <p>React · TypeScript · JavaScript · WebGL</p>
              <p className="cv-tool-label">MAKING AND COLLABORATION</p>
              <p>Git · Blender · Figma</p>
            </section>

            <section className="cv-side-section cv-approach" aria-labelledby="cv-approach-title">
              <h2 id="cv-approach-title">How I work</h2>
              <ol>
                <li><span>01</span> Find the player-facing question.</li>
                <li><span>02</span> Test it in a small playable form.</li>
                <li><span>03</span> Refine the feedback, pacing, and clarity.</li>
              </ol>
            </section>

            <section className="cv-side-section cv-next-step" aria-labelledby="cv-next-title">
              <h2 id="cv-next-title">Looking ahead</h2>
              <p>
                Interested in game development, gameplay programming, and
                prototyping opportunities where design and technology work
                closely together.
              </p>
              <p><Link to="/contact">Start a conversation</Link></p>
            </section>
          </aside>
        </div>

        <footer className="cv-footer">
          <span>THATFUNNYRED · GAME DEVELOPER</span>
          <Link to="/">thatstupidred.space</Link>
        </footer>
      </article>
    </main>
  );
}
