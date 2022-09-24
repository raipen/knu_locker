import Menu from "./Menu";
import styles from "./Main.module.css";

export default function Main(){
    return (
        <div style={{background:"#da2127"}}>
            <span className={styles.deco+" material-icons-outlined"}>
            laptop_mac
            </span>
            <article className={styles.article}>
                <Menu cName={styles.menu} href="/agree" icon="mouse" iconType="-outlined" text="사물함 신청" date="9.24~9.26 23:59"/>
                <Menu cName={styles.menu +" "+ styles.disable} href="/" icon="groups" text="동아리 사물함 신청" date="9.27 ~"/>
                <Menu cName={styles.menu +" "+ styles.disable} href="/" icon="check_circle" text="사물함 신청 결과" date="9.27 ~"/>
            </article>
        </div>
    )
}