import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function Main(){
    return (
        <article>
            <h1>개인정보 수집동의</h1>
            <div className={styles.main}>
                <p>경북대학교 컴퓨터학부 사물함 이용 신청을 위해<br/>
                아래와 같이 개인정보를 수집 및 이용합니다.</p>
                <p className={styles.table}>
                    <span>- 개인정보 수집 목적</span>
                    <span>학생식별, 사물함 배정결과 안내, 사물함 관리</span>
                </p>
                <p className={styles.table}>
                    <span>- 개인정보 수집 항목</span>
                    <span>이름, 학번, 전화번호</span>
                </p>
                <p className={styles.table}>
                    <span>- 보유 및 이용 기간</span>
                    <span>이용목적 달성 후 3개월</span>
                </p>
                <p>귀하는 개인정보 수집에 동의를 거부할 권리가 있으며<br/>
                동의 거부 시 사물함 신청이 제한됩니다.</p><br/>
            </div>
            <div className={styles.red}>위 개인정보 수집·이용에 동의합니다.</div>
            <Link to="/apply"><button className={styles.apply}>동의</button></Link>
        </article>
    )
}