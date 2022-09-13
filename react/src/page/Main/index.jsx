import Menu from "./Menu";
import styles from "./Main.module.css";

export default function Main(){
    return (
        <div style={{background:"#da2127"}}>
            <span className={styles.deco+" material-icons-outlined"}>
            laptop_mac
            </span>
            <article className={styles.article}>
                <Menu cName={styles.menu+" "+ styles.disable} href="/" icon="mouse" iconType="-outlined" text="사물함 신청" date="9.19 ~"/>
                <Menu cName={styles.menu +" "+ styles.disable} disabled="true" href="/" icon="groups" text="동아리 사물함 신청" date="9.22 ~"/>
                <Menu cName={styles.menu} href="/result" icon="check_circle" text="지난 학기 조회" date=" ~ 9.19"/>
            </article>
        </div>
    )
}