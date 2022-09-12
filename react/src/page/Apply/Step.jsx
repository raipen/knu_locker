import styles from "./Step.module.css";

export default function ({info}){
    return (
        <div className={styles.step}>
            <div className={styles.circle+" "+styles[info.status]}>
                <div className={styles[info.status]}>
                    {info.id}
                </div>
            </div>
            <br/>
            <div className={styles.label+" "+styles[info.status]}>
                {info.label}
            </div>
        </div>
    );
}