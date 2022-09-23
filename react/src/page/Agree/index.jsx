import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function Main(){
    return (
        <article>
            <h1>개인정보 수집동의</h1>
            <p>
                <br/>
                경북대학교 컴퓨터학부 사물함 이용 신청을 위해 아래와 같이 개인정보를 수집·이용합니다.
                <br/>
                <div className={styles.table}>
                    <span>수집 목적</span><span>학생식별, 사물함 배정결과 안내, 사물함 관리</span>
                </div>
                <div className={styles.table}>
                    <span>수집 항목</span><span>이름, 학번, 전화번호</span>
                </div>
                <div className={styles.table}>
                    <span>보유·이용 기간</span><span>이용목적 달성 후 3개월</span>
                </div>
                <br/>
                동의를 거부할 권리가 있으며, 동의 거부 시 사물함 신청이 제한됩니다.
                <br/>
                위 개인정보 수집·이용에 동의합니다.
            </p>
            <p>위 개인정보 수집·이용에 동의하셨다면 "신청하기"를 눌러주세요.</p>
            <Link to="/apply"><button className={styles.apply}>신청하기</button></Link>
        </article>
    )
}