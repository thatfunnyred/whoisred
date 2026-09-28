import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "../styles/contact-page.css";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formId) {
      setStatus("The contact form isn't connected yet. Please try again later.");
      return;
    }

    const form = event.currentTarget;
    setIsSubmitting(true);
    setStatus("Sending your message…");

    try {
      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        setStatus("Your message couldn't be sent. Please try again in a moment.");
        return;
      }

      form.reset();
      setStatus("Message sent. Thanks for reaching out!");
    } catch {
      setStatus("Couldn't connect to send your message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="route-page contact-page">
      <div className="route-page-topline">
        <Link to="/" className="route-back-link">
          <span aria-hidden="true">←</span> Back to the portfolio
        </Link>
        <span className="route-page-index">INBOX / 01</span>
      </div>

      <div className="contact-sheet">
        <section className="contact-sheet-intro" aria-labelledby="contact-page-title">
          <p className="route-eyebrow">GOOD IDEAS START WITH A HELLO</p>
          <h1 id="contact-page-title" className="erica-one-regular">
            GOT A <span>WEIRD</span> IDEA?
          </h1>
          <p className="contact-sheet-copy jersey-25-regular">
            Have a project in mind, want to collaborate, or just want to talk
            games? Send a note and tell me what you are dreaming up.
          </p>
          <p className="contact-sheet-note">No pitch deck required. Curiosity welcome.</p>
        </section>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">YOUR NAME</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="What should I call you?"
            required
          />

          <label htmlFor="contact-email">YOUR EMAIL</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="contact-subject">WHAT'S THIS ABOUT?</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="A game, a collaboration, a question..."
            maxLength={120}
          />

          <label htmlFor="contact-message">YOUR MESSAGE</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Start anywhere. The interesting bits usually show up along the way."
            maxLength={3000}
            required
          />

          <button className="contact-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "SENDING…" : "SEND MESSAGE"} <span aria-hidden="true">↗</span>
          </button>
          <p className="contact-form-status" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </main>
  );
}
