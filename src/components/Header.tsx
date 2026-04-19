import Link from "next/link";
import styles from "./Header.module.css";
import TagsDropdown from "./TagsDropdown";
import HamburgerMenu from "./HamburgerMenu";
import { getAllTags } from "@/lib/posts";

export default function Header() {
  const tags = getAllTags();

  return (
    <header className={styles.header}>
      <Link href="/" className="flex gap-2">
        <span className="font-jp text-xl">寝たきり</span>
        <span aria-hidden="true" className="opacity-50">|</span>
        <span className="font-en text-xl tracking-wide">
          Late Night
        </span>
      </Link>

      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex flex-row gap-4 items-center text-xl font-en">
          <li><Link href="/">Home</Link></li>
          <li><TagsDropdown tags={tags} /></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <HamburgerMenu tags={tags} />
    </header>
  );
}
