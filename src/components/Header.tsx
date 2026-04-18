import Link from "next/link";
import styles from "./Header.module.css";
import TagsDropdown from "./TagsDropdown";
import { getAllTags } from "@/lib/posts";

export default function Header() {
  const tags = getAllTags();

  return (
    <header className={styles.header}>
      <Link href="/">Netakiri Blog</Link>
      <nav aria-label="Primary">
        <ul className="flex flex-row gap-4 items-center">
          <li><Link href="/">Home</Link></li>
          <li><TagsDropdown tags={tags} /></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
