import styles from "./Step.module.css";

export default function ({info}){
    if(info.status==="done")
        info.id = (<span class="material-icons-round">
        done
        </span>);
    else
        info.id = (<div>
            {info.id}
        </div>);
    return (
        <div className={styles.step+" "+styles[info.status]}>
            <div className={styles.circle}>
                {info.id}
            </div>
            <br/>
            <div className={styles.label}>
                {info.label}
            </div>
        </div>
    );
}