import { useEffect, type RefObject } from "react";

export function useTypingPlaceholder(
  queries: readonly string[],
  inputRef: RefObject<HTMLInputElement | null>,
): void {
  useEffect(() => {
    if (queries.length === 0) return;

    let queryIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: number | undefined;

    const type = () => {
      const input = inputRef.current;
      if (!input) return;

      const current = queries[queryIndex];

      if (!deleting) {
        charIndex++;
        input.placeholder = `Search about ${current.slice(0, charIndex)}`;

        if (charIndex === current.length) {
          deleting = true;
          timeoutId = window.setTimeout(type, 2000);
          return;
        }
        timeoutId = window.setTimeout(type, 100);
        return;
      }

      charIndex--;
      input.placeholder = `Search about ${current.slice(0, charIndex)}`;

      if (charIndex === 0) {
        deleting = false;
        queryIndex = (queryIndex + 1) % queries.length;
        timeoutId = window.setTimeout(type, 300);
        return;
      }
      timeoutId = window.setTimeout(type, 60);
    };

    type();
    return () => window.clearTimeout(timeoutId);
  }, [inputRef, queries]);
}
