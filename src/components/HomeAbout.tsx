import Link from "next/link";
import styles from "@/app/HomeMotion.module.css";

export default function HomeAbout() {
  return (
    <section className={`mt-16 border-t border-white/25 pt-8 sm:mt-20 sm:grid sm:grid-cols-[minmax(12rem,0.5fr)_minmax(0,1fr)] sm:gap-x-12 sm:pt-10 ${styles.aboutSection}`} aria-labelledby="about-home-heading">
      <div data-reveal-once="content-enter" className={styles.aboutHeading}>
        <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">ABOUT</p>
        <h2 id="about-home-heading" className="font-jp mb-0 text-xl font-normal text-white">書いている人</h2>
      </div>
      <div data-reveal-once="content-enter" className={`mt-8 max-w-2xl sm:mt-0 ${styles.aboutContent}`}>
        <p className="font-jp mb-4 text-sm leading-8 text-white/70">
          2025年に新卒でIT企業に入社したエンジニアです。Java / Spring Bootをメインに、AWSも触っています。設計やアーキテクチャまわりに興味があり、「なぜそう作るのか」を考えるのが好きです。
        </p>
        <Link className="font-en text-sm text-white/85 underline decoration-white/40 underline-offset-4 hover:decoration-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="/about">
          More about me →
        </Link>
      </div>
    </section>
  );
}
