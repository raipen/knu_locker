import styles from "./index.module.css";

export default function ({info}) {
    return (
        <div className={styles.card}>
            <div className={styles.imgWrap}>
                <div className={styles.title}>사물함 신청 완료!</div>
                <img className={styles.img} src={process.env.PUBLIC_URL+"/person.svg"}/>
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{info.name}</p>
                <div className={styles.studentId}>{info.studentId}</div>
                <p className={styles.phone}>{info.phone.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)}</p>
                <div className={styles.locker}>
                    <div className={styles.lockerTitle}>1지망</div>
                    <div className={styles.lockerInfo}>{info.first}</div>
                </div>
                <div className={styles.locker}>
                    <div className={styles.lockerTitle}>2지망</div>
                    <div className={styles.lockerInfo}>{info.second}</div>
                </div>
            </div>
        </div>
    )
}