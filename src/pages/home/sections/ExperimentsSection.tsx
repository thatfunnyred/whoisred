import { Fragment, useEffect, useState } from "react";

import TitleScrible from "../../../components/svgs/TitleScrible";
import CurvedArrow from "../../../components/svgs/CurvedArrow";
import HighlightCircle from "../../../components/svgs/HighlightCircle";
import { PinBoard } from "../../../components/svgs/PinBoard";
import { EXPERIMENT_TABS } from "../data";
import { EXPERIMENT_CARDS, type ExperimentTab } from "../experiments";

export default function ExperimentsSection() {
  const [activeTab, setActiveTab] = useState<ExperimentTab>("all");
  const visibleExperiments =
    activeTab === "all"
      ? EXPERIMENT_CARDS
      : EXPERIMENT_CARDS.filter((experiment) =>
          experiment.categories.includes(activeTab),
        );
  const boardSplit = Math.ceil(visibleExperiments.length / 2);
  const boardExperiments = [
    visibleExperiments.slice(0, boardSplit),
    visibleExperiments.slice(boardSplit),
  ];

  useEffect(() => {
    const alignHighlight = () => {
      const highlightCircle = document.getElementById("highlight-circle");
      const tab = document.getElementById(`experiment-${activeTab}`);
      const tabsContainer = tab?.parentElement;
      if (!highlightCircle || !tab || !tabsContainer) return;

      const tabRect = tab.getBoundingClientRect();
      const containerRect = tabsContainer.getBoundingClientRect();
      const highlightWidth = highlightCircle.getBoundingClientRect().width;
      const highlightHeight = highlightCircle.getBoundingClientRect().height;

      highlightCircle.style.left = `${
        tabRect.left - containerRect.left + tabRect.width / 2 - highlightWidth * 0.447
      }px`;
      highlightCircle.style.top = `${
        tabRect.top - containerRect.top + tabRect.height / 2 - highlightHeight * 0.553
      }px`;
    };

    alignHighlight();
    window.addEventListener("resize", alignHighlight);

    return () => window.removeEventListener("resize", alignHighlight);
  }, [activeTab]);

  return (
    <section id="experiments-section" className="experiments-section">
      <h3 id="engage-text" className="jersey-25-regular">
        curiosity <br /> + <br /> chaos <br /> = <br /> progress?
      </h3>
      <CurvedArrow id="curved-arrow" />
      <TitleScrible id="experiments-title-scrible-1" />

      <h1 id="experiments-section-title" className="erica-one-regular">
        I LIKE TO BREAK THINGS. <br />
        <span id="experiments-text">THEN SEE WHAT HAPPENS.</span>
      </h1>

      <TitleScrible id="experiments-title-scrible-2" />

      <h3 id="experiments-section-sub-title" className="jersey-25-regular">
        Tiny prototypes, weird mechanics, visual experiments, technical tests, <br />
        and ideas that may or may not become games.
      </h3>

      <div
        className="experiment-tabs-container geist-pixel-uniquifier"
        role="group"
        aria-label="Filter experiments by category"
      >
        {EXPERIMENT_TABS.map((tab, key) => (
          <Fragment key={tab.id}>
            <button
              type="button"
              id={`experiment-${tab.id}`}
              aria-pressed={activeTab === tab.id}
              style={{
                color: activeTab === tab.id ? "var(--highlight-color)" : "black",
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
            {key !== EXPERIMENT_TABS.length - 1 && (
              <span aria-hidden="true">/</span>
            )}
          </Fragment>
        ))}
        <HighlightCircle id="highlight-circle" />
      </div>

      <div id="experiments-section-separator" />

      <div id="experiments-container">
        <PinBoard id="pin-board-1" />
        <PinBoard id="pin-board-2" />
        <div
          className="experiment-notes-grid"
          role="region"
          aria-live="polite"
          aria-label={`Experiments tagged ${activeTab}`}
        >
          {boardExperiments.map((experiments, boardIndex) => (
            <div className="experiment-board-notes" key={boardIndex}>
              {experiments.map((experiment) => (
                <article
                  className="experiment-note"
                  key={`${activeTab}-${experiment.title}`}
                >
                  <span className="experiment-note-pin" aria-hidden="true" />
                  <span className="experiment-note-kind">{experiment.kind}</span>
                  <h2>{experiment.title}</h2>
                  <p>{experiment.summary}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
