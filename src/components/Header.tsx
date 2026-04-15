import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">Netakiri Blog</Link>
      <nav aria-label="Primary">
        <ul className="flex flex-row gap-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/tags">Tags</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
