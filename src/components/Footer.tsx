import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="flex gap-2 text-white text-4xl items-baseline">
        <span className="font-jp text-3xl">寝たきり</span>
        <span className="opacity-50">|</span>
        <span className="font-en tracking-wide">
          Late Night
        </span>
      </div>
      <span>Written from my bed</span>
      <span>© 2026 Ryosuke Osawa</span>
    </footer>
  );
}
