import { useState } from "react";

import "../styles/home-style.css";
import { getRandomInt } from "../Utils/utils";
import { PROJECT_CARDS } from "./home/data";
import AboutSection from "./home/sections/AboutSection";
import ProjectsSection from "./home/sections/ProjectsSection";
import ToolsSection from "./home/sections/ToolsSection";
import ExperimentsSection from "./home/sections/ExperimentsSection";
import ContactSection from "./home/sections/ContactSection";
import { useBackgroundMotion } from "./home/hooks/useBackgroundMotion";
import NavBar from "../components/NavBar";

export default function HomePage() {
  useBackgroundMotion();

  const [projectRotation] = useState<number[]>(() =>
    PROJECT_CARDS.map(() => getRandomInt(-15, 15)),
  );
  const [stickyNoteRotation] = useState<number[]>(() =>
    Array.from({ length: 3 }, () => getRandomInt(-20, 20)),
  );

  return (
    <>
      <NavBar />
      <AboutSection stickyNoteRotation={stickyNoteRotation} />
      <ProjectsSection projectRotation={projectRotation} />
      <ToolsSection />
      <ExperimentsSection />
      <ContactSection />
    </>
  );
}
