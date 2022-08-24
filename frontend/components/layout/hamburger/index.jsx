import styles from "./Hamburger.module.css";

export default function Hamburger({ isOpen, onToggle }) {
  return (
    <svg
      className={`${styles.ham} ${styles.hamRotate} ${
        isOpen ? styles.active : ""
      }`}
      viewBox="0 0 100 100"
      width="50"
      onClick={onToggle}
    >
      <path
        className={`${styles.line} ${styles.top}`}
        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
      />
      <path className={`${styles.line} ${styles.middle}`} d="m 70,50 h -40" />
      <path
        className={`${styles.line} ${styles.bottom}`}
        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
      />
    </svg>
  );
}
