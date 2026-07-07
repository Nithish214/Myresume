import { useEffect, useRef } from "react";

/**
 * Adds a subtle "fade + rise" reveal effect as elements enter the viewport.
 *
 * Usage: attach the returned ref to any element with the "reveal" CSS class
 * (defined in index.css). Once it's ~15% visible, "is-visible" is added and
 * the CSS transition takes over. This keeps the animation logic in one
 * small, reusable hook instead of repeating IntersectionObserver code in
 * every section component.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
