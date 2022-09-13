import styles from "./Step.module.css";

export default function ({info}){
    if(info.status==="done")
        info.id = (<span class="material-icons-round">
        done
        </span>);
    else
        info.id = (<div className={styles[info.status]}>
            {info.id}
        </div>);
    return (
        <div className={styles.step}>
            <div className={styles.circle+" "+styles[info.status]}>
                {info.id}
            </div>
            <br/>
            <div className={styles.label+" "+styles[info.status]}>
                {info.label}
            </div>
        </div>
    );
}