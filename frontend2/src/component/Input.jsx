import styles from "./Input.module.css"

export default function Input(){
    return (
        <div className={styles.input}>
            <label htmlFor="name">
                이름
            </label>
            <input type="text" name="name" id="name" placeholder="호반우"/>
        </div>
    );
}