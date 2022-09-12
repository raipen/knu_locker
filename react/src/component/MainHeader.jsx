import { Link } from "react-router-dom";
import styles from "./MainHeader.module.css"

export default function MainHeader() {
  return (
    <header className={styles.header}>
        <Link to="/">
            <img src="/logo.png"/>
            <span className={styles.logo}>KNU CSE</span>
        </Link>
    </header>
  );
}