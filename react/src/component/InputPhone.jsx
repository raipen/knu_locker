import styles from "./Input.module.css"

export default function ({info,event}){
    return (
        <div className={styles.input}>
            <label htmlFor={info.id}>
                {info.label}
            </label>
            <input type="text" name={info.id} id={info.id} placeholder={info.placeholder} onInput={event}/>
        </div>
    );
}