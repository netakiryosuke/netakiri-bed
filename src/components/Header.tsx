"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import TagsDropdown from "./TagsDropdown";
import HamburgerMenu from "./HamburgerMenu";

interface Props {
  tags: string[];
}

export default function Header({ tags }: Props) {

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className="flex gap-2" onClick={handleClick}>
        <span className="font-jp text-xl">寝たきり</span>
        <span aria-hidden="true" className="opacity-50">|</span>
        <span className="font-en text-xl tracking-wide">
          Late Night
        </span>
      </Link>

      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex flex-row gap-4 items-center text-xl font-en">
          <li>
            <Link href="/" onClick={handleClick}>
              Home
            </Link>
          </li>
          <li><TagsDropdown tags={tags} /></li>
          <li><Link href="/about" onClick={handleClick}>About</Link></li>
          <li><a href="https://github.com/netakiryosuke/netakiri-bed" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </nav>

      <HamburgerMenu tags={tags} />
    </header>
  );
}
