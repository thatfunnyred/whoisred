import { useEffect, useRef } from "react";

export function useBackgroundMotion(): void {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frameId = 0;
    let scrollY = window.scrollY;
    let pointerMoved = false;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const updateMotion = () => {
      frameId = 0;
      if (pointerMoved) {
        document.body.style.setProperty("--mouse-x", `${mouse.current.x}px`);
        document.body.style.setProperty("--mouse-y", `${mouse.current.y}px`);
      }
      document.body.style.setProperty("--scroll-y", `${scrollY * 0.1}px`);
    };

    const scheduleUpdate = () => {
      if (frameId === 0) frameId = window.requestAnimationFrame(updateMotion);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      pointerMoved = true;
      scheduleUpdate();
    };

    const handleScreenScroll = () => {
      scrollY = window.scrollY;
      scheduleUpdate();
    };

    if (hasFinePointer) window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScreenScroll, { passive: true });

    return () => {
      if (hasFinePointer) window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScreenScroll);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);
}
