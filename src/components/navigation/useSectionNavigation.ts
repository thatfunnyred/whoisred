import { useCallback, useEffect, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SECTIONS = ["about", "project", "tools", "experiments", "contact"] as const;

function resetTabColor(): void {
  const tabContainer = document.querySelector(".navbar-links-container");
  if (!tabContainer) return;

  [...tabContainer.children].forEach((tab) => {
    (tab as HTMLElement).style.color = "black";
  });
}

export function useSectionNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((section: HTMLElement): void => {
    const headerOffset = 80;
    const rect = section.getBoundingClientRect();
    const visibleHeight = window.innerHeight - headerOffset;
    const targetY =
      rect.top +
      window.scrollY -
      headerOffset -
      (visibleHeight - rect.height) / 2;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleScrollTabChange = () => {
      const tabContainer = document.querySelector(".navbar-links-container");
      if (!tabContainer) return;

      SECTIONS.forEach((section, index) => {
        const sectionElement = document.querySelector(`.${section}-section`);
        if (!sectionElement) return;

        const sectionRect = sectionElement.getBoundingClientRect();
        if (
          sectionRect.top <= window.innerHeight / 2 &&
          sectionRect.bottom >= window.innerHeight / 2
        ) {
          resetTabColor();

          const tab = tabContainer.children[index] as HTMLElement | undefined;
          if (!tab) return;

          const tabRect = tab.getBoundingClientRect();
          const doubleUnderline = document.getElementById("rough-double-underline");

          tab.style.color = "var(--highlight-color)";
          if (doubleUnderline) {
            doubleUnderline.style.left =
              `${tabRect.left + tabRect.width / 2 - window.innerWidth / 2}px`;
          }
        }
      });
    };

    handleScrollTabChange();
    window.addEventListener("scroll", handleScrollTabChange);

    return () => window.removeEventListener("scroll", handleScrollTabChange);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const sectionId = location.hash.slice(1);
    const frameId = window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      scrollToSection(section);
      if (section instanceof HTMLInputElement) {
        section.focus({ preventScroll: true });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname, scrollToSection]);

  const scrollToContent = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ): void => {
    event.preventDefault();

    const section = document.getElementById(id);
    if (section) {
      scrollToSection(section);
      return;
    }

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: `#${id}` });
    }
  };

  return { scrollToContent };
}
