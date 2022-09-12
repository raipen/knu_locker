import { Link } from "react-router-dom";
import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
        <Link to="/">
            <img src="/logo.png"/>
            <span className={styles.logo}>KNU CSE</span>
        </Link>
    </header>
  );
}