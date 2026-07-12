import Link from "next/link";
import styles from "@/app/HomeMotion.module.css";

export interface HomeTopic {
  tag: string;
  count: number;
}

interface HomeTopicsProps {
  topics: HomeTopic[];
}

export default function HomeTopics({ topics }: HomeTopicsProps) {
  if (topics.length === 0) return null;

  return (
    <section className="mt-20 border-t border-white/25 pt-8 sm:mt-28 sm:grid sm:grid-cols-[minmax(12rem,0.5fr)_minmax(0,1fr)] sm:gap-x-12 sm:pt-10" aria-labelledby="topics-heading">
      <div data-reveal-once="content-enter" className={styles.topicsHeading}>
        <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">TOPICS</p>
        <h2 id="topics-heading" className="font-jp mb-0 text-xl font-normal text-white">タグから探す</h2>
      </div>
      <ul data-reveal-once="content-enter" className={`mt-8 grid border-t border-white/20 sm:mt-0 sm:grid-cols-2 sm:gap-x-8 ${styles.topicsList}`}>
        {topics.map(({ tag, count }) => (
          <li key={tag} className="border-b border-white/20">
            <Link className={`font-en flex items-baseline justify-between gap-4 px-[clamp(0.75rem,2vw,1.25rem)] py-4 text-base text-white/85 ${styles.topicLink}`} href={`/tags/${encodeURIComponent(tag)}`}>
              <span>#{tag}</span>
              <span className="text-xs tracking-[0.12em] text-white/55">{String(count).padStart(2, "0")} NOTES</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
