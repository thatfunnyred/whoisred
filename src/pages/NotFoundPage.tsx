import { Link } from "react-router-dom";

import "../styles/not-found-page.css";

export default function NotFoundPage() {
  return (
    <main className="route-page not-found-page">
      <section className="lost-page-card" aria-labelledby="not-found-title">
        <p className="route-eyebrow">FIELD NOTE / PAGE MISSING</p>
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className="erica-one-regular">
          THIS PAGE WANDERED OFF.
        </h1>
        <p className="lost-page-copy jersey-25-regular">
          It may be chasing a curious idea. Let’s get you back to familiar ground.
        </p>
        <Link to="/" className="lost-page-home-link">
          BACK TO THE PORTFOLIO <span aria-hidden="true">↗</span>
        </Link>
        <span className="lost-page-stamp" aria-hidden="true">
          LOST<br />AND FOUND
        </span>
      </section>
    </main>
  );
}
