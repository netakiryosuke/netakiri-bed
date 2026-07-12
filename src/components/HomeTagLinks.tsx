import Link from "next/link";
import styles from "@/app/HomeMotion.module.css";

interface HomeTagLinksProps {
  tags: string[];
}

export default function HomeTagLinks({ tags }: HomeTagLinksProps) {
  return (
    <ul className={`font-en flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-white/70 sm:col-start-2 sm:justify-start lg:col-auto lg:justify-end ${styles.tagLinks}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link className="underline decoration-white/40 underline-offset-4 hover:decoration-white/80 focus-visible:decoration-white/80" href={`/tags/${encodeURIComponent(tag)}`}>
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
