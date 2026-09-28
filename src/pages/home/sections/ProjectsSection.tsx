import { useRef } from "react";

import SectionSeparator from "../../../components/svgs/SectionSeparator";
import Postcard from "../../../components/svgs/PostCardc";
import DashedLine from "../../../components/svgs/DashedLine";
import { PROJECT_CARDS, PROJECT_COLORS } from "../data";

interface ProjectsSectionProps {
  projectRotation: number[];
}

export default function ProjectsSection({
  projectRotation,
}: ProjectsSectionProps) {
  const cardsScrollRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: -1 | 1) => {
    cardsScrollRef.current?.scrollBy({
      left: direction * 400,
      behavior: "smooth",
    });
  };

  return (
    <section id="project-section" className="project-section">
      <SectionSeparator id="project-section-separator-shadow-1" />
      <SectionSeparator id="project-section-separator-1" />
        <button
          type="button"
          id="project-fade-left"
          className="rubik-spray-paint-regular"
          aria-label="Scroll to previous projects"
          aria-controls="project-cards-list"
          onClick={() => scrollCards(-1)}
        >
          {"<"}
        </button>
        <button
          type="button"
          id="project-fade-right"
          className="rubik-spray-paint-regular"
          aria-label="Scroll to more projects"
          aria-controls="project-cards-list"
          onClick={() => scrollCards(1)}
        >
          {">"}
        </button>
      <div className="project-cards-container">


        <div id="project-cards-list" className="project-cards-scroll" ref={cardsScrollRef}>
          {PROJECT_CARDS.map((project, key) => (
            <a
              key={project.url}
              className="project-card-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Play ${project.title} on itch.io`}
            >
              <Postcard
                id={`project-card-${key}`}
                title={project.title}
                lines={[...project.lines]}
                paper={PROJECT_COLORS[key % PROJECT_COLORS.length]}
                rotation={`${projectRotation[key]}deg`}
                image={project.image}
              />
            </a>
          ))}
        </div>
      </div>
      <DashedLine id="projects-dashed-line" />
      <SectionSeparator id="project-section-separator-2" />
      <SectionSeparator id="project-section-separator-shadow-2" />
    </section>
  );
}
