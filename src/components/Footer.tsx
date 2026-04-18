import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className="text-xl">netakiri-bed</span>
      <span>Written from my bed.</span>
      <span>© 2026 Ryosuke Osawa</span>
    </footer>
  );
}
