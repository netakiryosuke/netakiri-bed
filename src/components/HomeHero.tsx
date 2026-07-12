"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/HomeMotion.module.css";

export default function HomeHero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight * 0.7, 1), 1);
      const content = contentRef.current;
      const cue = cueRef.current;

      if (content) {
        content.style.opacity = String(1 - progress * 1.1);
        content.style.transform = `translate3d(0, ${progress * -20}px, 0)`;
      }
      if (cue) {
        cue.style.opacity = String(1 - progress * 1.15);
        cue.style.transform = `translate3d(0, ${progress * 12}px, 0)`;
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="site-title">
      <div ref={contentRef} className={styles.heroContent}>
        <h1 id="site-title" className="flex items-baseline gap-2 text-4xl font-normal tracking-normal text-white">
          <span className="font-jp text-3xl">寝たきり</span>
          <span aria-hidden="true" className="opacity-50">|</span>
          <span className="font-en tracking-wide">Late Night</span>
        </h1>
        <p className="pt-2 text-base text-gray-300">ベッドで読み返せるような、そんな深夜のメモ</p>
      </div>
      <a ref={cueRef} href="#article-index" className={styles.scrollCue}>
        <span className="font-en">Scroll to read</span>
        <span aria-hidden="true" className={styles.scrollLine} />
      </a>
    </section>
  );
}
