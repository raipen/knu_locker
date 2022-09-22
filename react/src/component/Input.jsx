import styles from "./Input.module.css"

export default function Input({info,event}){
    return (
        <div className={styles.input}>
            <label htmlFor={info.id}>
                {info.label}
            </label>
            <input type={info.type} name={info.id} id={info.id} placeholder={info.placeholder} onInput={event}/>
        </div>
    );
}