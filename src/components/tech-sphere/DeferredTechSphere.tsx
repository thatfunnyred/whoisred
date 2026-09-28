import { lazy, Suspense, useEffect, useRef, useState } from "react";

const TechSphere = lazy(() => import("./TechSphere"));

function SpherePlaceholder() {
  return (
    <div
      className="ts-wrap"
      aria-hidden="true"
      style={{ width: "100%" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          aspectRatio: "1 / 1",
          margin: "0 auto",
        }}
      />
    </div>
  );
}

export default function DeferredTechSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Suspense fallback={<SpherePlaceholder />}>
          <TechSphere />
        </Suspense>
      ) : (
        <SpherePlaceholder />
      )}
    </div>
  );
}
