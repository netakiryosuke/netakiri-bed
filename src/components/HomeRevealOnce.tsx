"use client";

import { useEffect } from "react";

const COMPLETION_THRESHOLD = 0.995;
const PAGE_BOTTOM_TOLERANCE = 2;

function getScaleX(transform: string) {
  if (transform === "none") return 1;

  const values = transform.match(/matrix(?:3d)?\((.+)\)/)?.[1]
    .split(",")
    .map(Number);

  if (!values || values.some(Number.isNaN)) return 0;

  if (values.length === 16) {
    return Math.hypot(values[0], values[1], values[2]);
  }

  return Math.hypot(values[0], values[1]);
}

export default function HomeRevealOnce() {
  useEffect(() => {
    if (
      !CSS.supports("animation-timeline: view()") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const pending = new Set(
      document.querySelectorAll<HTMLElement>("[data-reveal-once]"),
    );
    let frameId: number | null = null;
    let listening = true;

    const stopListening = () => {
      if (!listening) return;
      window.removeEventListener("scroll", scheduleCheck);
      listening = false;
    };

    const check = () => {
      frameId = null;
      const atPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - PAGE_BOTTOM_TOLERANCE;

      pending.forEach((element) => {
        const isLine = element.dataset.revealOnce === "line-enter";
        const progress = isLine
          ? getScaleX(getComputedStyle(element, "::after").transform)
          : Number.parseFloat(getComputedStyle(element).opacity);
        const complete =
          progress >= COMPLETION_THRESHOLD || (atPageBottom && progress > 0);

        if (!complete) return;

        element.dataset.revealed = "true";
        pending.delete(element);
      });

      if (pending.size === 0) stopListening();
    };

    function scheduleCheck() {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(check);
    }

    window.addEventListener("scroll", scheduleCheck, { passive: true });
    scheduleCheck();

    return () => {
      stopListening();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
